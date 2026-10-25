import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Trash2,
  Plus,
  ShieldAlert,
  Info,
  Clock,
  Heart,
  ChevronRight,
  Smile,
  CheckCircle2,
  Calendar,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';
import { sendMessageToAI } from '../services/aiService';

export function AIAssistantPage() {
  const { child, growthRecords, dailyCare } = useChild();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const [conversations, setConversations] = useState([
    { id: 'c1', title: 'Bedtime Routine Strategies', date: 'Today' },
    { id: 'c2', title: 'Encouraging Balanced Nutrition', date: 'Yesterday' },
    { id: 'c3', title: 'Sensory Exploration Ideas', date: '3 days ago' },
  ]);
  const [activeConvId, setActiveConvId] = useState('c1');

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello! I'm **LittleAura AI**, your calm, evidence-informed parenting companion. I have ${child.name}'s context (${child.age}, ${child.height}, ${child.weight}) ready. 

How can I support your family today? You can ask about:
- Calming bedtime and sleep wind-down routines
- Age-appropriate sensory and motor play activities
- Fostering low-stress family mealtimes
- Preparing for upcoming pediatrician checkups`,
      timestamp: '10:00 AM',
      source: 'LittleAura AI Engine'
    }
  ]);

  // Suggested prompt questions
  const examplePrompts = [
    'Help me establish a calming bedtime routine',
    'Suggest age-appropriate motor activities',
    `Summarize ${child.name}'s sleep records`,
    'Help me prepare for an upcoming vaccination',
    'Explain recent growth trajectory trends'
  ];

  // Handle initial prompt passed from dashboard
  useEffect(() => {
    if (location.state?.initialPrompt) {
      handleSend(location.state.initialPrompt);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    setErrorMessage('');
    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      // Build child context for AI request
      const childContext = {
        name: child.name,
        age: child.age,
        dateOfBirth: child.dateOfBirth,
        height: child.height,
        weight: child.weight,
        headCircumference: child.headCircumference,
        allergies: child.allergies,
        routine: child.routine,
        summary: child.summary
      };

      const result = await sendMessageToAI(query, childContext, messages);
      const aiReplyText = typeof result === 'string' ? result : (result.reply || result.text);
      const aiSource = typeof result === 'object' && result.source ? result.source : 'LittleAura Intelligence Engine';

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: aiSource
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setErrorMessage('Unable to connect to parenting intelligence service. Click retry to try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    const newId = `c_${Date.now()}`;
    const newConv = { id: newId, title: 'New Conversation', date: 'Just now' };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMessages([
      {
        id: `m_${Date.now()}`,
        sender: 'assistant',
        text: `Starting a fresh conversation for **${child.name}** (${child.age}). What parenting topic would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'LittleAura AI Engine'
      }
    ]);
  };

  const handleClearCurrentChat = () => {
    setMessages([
      {
        id: `m_init_${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. I am ready with **${child.name}**’s records. What would you like guidance on?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'LittleAura AI Engine'
      }
    ]);
    setIsClearModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              AI Parenting Assistant
            </h1>
            <Badge variant="aqua" size="sm">
              Context: {child.name} ({child.age})
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Empathetic, evidence-informed guidance for day-to-day parenting and developmental rhythms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={handleNewConversation}
          >
            New Chat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setIsClearModalOpen(true)}
          >
            Clear History
          </Button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[580px]">
        {/* Left: Saved Conversations Sidebar */}
        <div className="hidden lg:block space-y-3">
          <Card className="p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              Conversations
            </span>
            <div className="space-y-1">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConvId(c.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                    activeConvId === c.id
                      ? 'bg-[#a7ebf2]/30 text-[#023859] font-bold border border-[#a7ebf2]'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#26658c] shrink-0" />
                    <span className="truncate">{c.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{c.date}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Child Context Glance Card */}
          <Card className="p-4 bg-slate-50 border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-[#023859] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#54acbf]" />
              Active Child Context
            </h4>
            <div className="space-y-1 text-slate-600 text-[11px]">
              <div><strong>Name:</strong> {child.name}</div>
              <div><strong>Age:</strong> {child.age}</div>
              <div><strong>Latest Stats:</strong> {child.height} • {child.weight}</div>
              <div><strong>Allergies:</strong> {child.allergies}</div>
            </div>
          </Card>
        </div>

        {/* Right: Interactive Message Stream */}
        <Card className="lg:col-span-3 p-0 flex flex-col justify-between overflow-hidden border-slate-200 h-[620px]">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-50/50 via-white to-white">
            {messages.map((msg) => {
              const isAi = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isAi ? 'bg-[#26658c] text-white' : 'bg-slate-200 text-[#023859]'
                  }`}>
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`space-y-1.5 ${isAi ? 'text-left' : 'text-right'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        {isAi ? 'LittleAura AI' : 'You'}
                      </span>
                      <span className="text-[10px] text-slate-400">• {msg.timestamp}</span>
                      {isAi && msg.source && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-[#a7ebf2]/50 text-[#011c40] font-semibold">
                          {msg.source}
                        </span>
                      )}
                    </div>

                    <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-white border border-slate-200 text-[#011c40] shadow-xs'
                        : 'bg-[#26658c] text-white font-medium shadow-xs text-left'
                    }`}>
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-[#023859] prose-headings:font-bold prose-headings:text-xs">
                        {msg.text.split('\n').map((line, idx) => (
                          <p key={idx} className="mb-1.5 last:mb-0">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#26658c] text-white flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2 text-xs text-slate-500 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#54acbf] animate-spin" />
                  <span>Formulating evidence-informed guidance for {child.name}...</span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center justify-between gap-3">
                <span>{errorMessage}</span>
                <Button
                  variant="outline"
                  size="xs"
                  icon={RotateCcw}
                  onClick={() => handleSend(messages[messages.length - 1]?.text)}
                >
                  Retry
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Pills */}
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Prompts:</span>
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 hover:bg-[#a7ebf2]/30 hover:border-[#54acbf] whitespace-nowrap transition-colors shadow-2xs font-medium"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-[#26658c]/20 focus-within:border-[#26658c] transition-all"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask anything regarding ${child.name}'s sleep, routines, or developmental play...`}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent border-none text-[#011c40] placeholder-slate-400 focus:outline-none"
                disabled={loading}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!inputMessage.trim() || loading}
                icon={Send}
              >
                Send
              </Button>
            </form>

            <p className="text-[10px] text-slate-400 text-center mt-2">
              LittleAura provides supportive parenting guidance. Never use AI advice for emergency triage, symptom diagnosis, or medication dosing.
            </p>
          </div>
        </Card>
      </div>

      {/* Clear Chat Confirmation Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear Conversation History"
        subtitle="This will reset the active chat view for your current session."
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to clear the active conversation? Your child’s medical records and growth curves remain safely persisted.
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={() => setIsClearModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleClearCurrentChat}>
              Clear Chat
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AIAssistantPage;
