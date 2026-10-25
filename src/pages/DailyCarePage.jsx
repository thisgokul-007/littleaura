import React, { useState, useMemo } from 'react';
import {
  Clock,
  Plus,
  CheckCircle2,
  Utensils,
  Moon,
  Sparkles,
  Bath,
  Activity,
  Smile,
  Trash2,
  Edit3,
  Calendar,
  Baby,
  Info
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';

export function DailyCarePage() {
  const { child, dailyCare, toggleCareCompleted, addCareRecord, deleteCareRecord, editCareRecord } = useChild();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'feeding' | 'sleep' | 'diaper' | 'activity'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // New record form state
  const [entryType, setEntryType] = useState('feeding');
  const [formData, setFormData] = useState({
    title: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    feedingType: 'Solids',
    amount: '180 ml',
    sleepStart: '1:00 PM',
    sleepEnd: '2:30 PM',
    sleepDuration: '1.5 hours',
    diaperStatus: 'Wet',
    detail: '',
    notes: ''
  });

  const filteredLogs = useMemo(() => {
    if (activeTab === 'all') return dailyCare;
    return dailyCare.filter(item => item.type === activeTab);
  }, [dailyCare, activeTab]);

  // Derived summaries from actual recorded data
  const summaryMetrics = useMemo(() => {
    const feeds = dailyCare.filter(c => c.type === 'feeding');
    const sleeps = dailyCare.filter(c => c.type === 'sleep');
    const diapers = dailyCare.filter(c => c.type === 'diaper');

    const completedCount = dailyCare.filter(c => c.completed).length;
    const rate = dailyCare.length > 0 ? Math.round((completedCount / dailyCare.length) * 100) : 0;

    return {
      feedCount: feeds.length,
      completedFeeds: feeds.filter(f => f.completed).length,
      sleepCount: sleeps.length,
      diaperCount: diapers.length,
      completionRate: rate
    };
  }, [dailyCare]);

  const handleOpenAdd = (type = 'feeding') => {
    setEntryType(type);
    setEditingRecord(null);
    setFormData({
      title: type === 'feeding' ? 'Meal / Milk' : type === 'sleep' ? 'Nap Window' : type === 'diaper' ? 'Diaper Change' : 'Play Activity',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedingType: 'Solids',
      amount: '180 ml',
      sleepStart: '1:00 PM',
      sleepEnd: '2:30 PM',
      sleepDuration: '1.5 hours',
      diaperStatus: 'Wet',
      detail: '',
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingRecord(item);
    setEntryType(item.type || 'feeding');
    setFormData({
      title: item.title || '',
      time: item.time || '',
      feedingType: item.feedingType || 'Solids',
      amount: item.amount || '',
      sleepStart: item.sleepStart || '',
      sleepEnd: item.sleepEnd || '',
      sleepDuration: item.sleepDuration || '',
      diaperStatus: item.diaperStatus || 'Wet',
      detail: item.detail || '',
      notes: item.notes || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    let constructedDetail = formData.detail;
    if (entryType === 'feeding') {
      constructedDetail = `${formData.feedingType} (${formData.amount}) - ${formData.detail || 'Feeding recorded'}`;
    } else if (entryType === 'sleep') {
      constructedDetail = `${formData.sleepDuration} (${formData.time}) - ${formData.detail || 'Sleep recorded'}`;
    } else if (entryType === 'diaper') {
      constructedDetail = `Status: ${formData.diaperStatus} - ${formData.detail || 'Diaper change completed'}`;
    }

    if (editingRecord) {
      editCareRecord(editingRecord.id, {
        type: entryType,
        title: formData.title,
        time: formData.time,
        feedingType: formData.feedingType,
        amount: formData.amount,
        sleepDuration: formData.sleepDuration,
        diaperStatus: formData.diaperStatus,
        detail: constructedDetail,
        notes: formData.notes
      });
      setEditingRecord(null);
    } else {
      addCareRecord({
        type: entryType,
        title: formData.title,
        time: formData.time,
        feedingType: formData.feedingType,
        amount: formData.amount,
        sleepDuration: formData.sleepDuration,
        diaperStatus: formData.diaperStatus,
        detail: constructedDetail,
        notes: formData.notes,
        completed: true
      });
      setIsAddModalOpen(false);
    }
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'feeding': return Utensils;
      case 'sleep': return Moon;
      case 'diaper': return Baby;
      case 'hygiene': return Bath;
      case 'activity': return Activity;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              Daily Care Routines
            </h1>
            <Badge variant="teal" size="sm">
              {child.name} ({child.age})
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Functional logging for feeding, sleep cycles, and diaper hygiene.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Utensils}
            onClick={() => handleOpenAdd('feeding')}
          >
            + Feed
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Moon}
            onClick={() => handleOpenAdd('sleep')}
          >
            + Sleep
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Baby}
            onClick={() => handleOpenAdd('diaper')}
          >
            + Diaper
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => handleOpenAdd('feeding')}
          >
            Add Record
          </Button>
        </div>
      </div>

      {/* Routine Completion Progress Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
              <span>Today’s Care Progress</span>
              <Badge variant="mint" size="sm">{summaryMetrics.completedFeeds} Feeds • {summaryMetrics.sleepCount} Naps • {summaryMetrics.diaperCount} Diapers</Badge>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Derived from recorded events for {child.name} today
            </p>
          </div>
          <span className="text-2xl font-black text-[#26658c]">{summaryMetrics.completionRate}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#26658c] to-[#54acbf] transition-all duration-500"
            style={{ width: `${summaryMetrics.completionRate}%` }}
          />
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'all', label: 'All Routines', count: dailyCare.length },
          { id: 'feeding', label: 'Feeding', count: summaryMetrics.feedCount },
          { id: 'sleep', label: 'Sleep & Naps', count: summaryMetrics.sleepCount },
          { id: 'diaper', label: 'Diaper Hygiene', count: summaryMetrics.diaperCount },
          { id: 'activity', label: 'Sensory Play', count: dailyCare.filter(c => c.type === 'activity').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-2xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#26658c] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Daily Timeline Registry */}
      <div className="space-y-3">
        {filteredLogs.map((item) => {
          const Icon = getCategoryIcon(item.type);
          return (
            <Card key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleCareCompleted(item.id)}
                  className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-all shrink-0 mt-0.5 sm:mt-0 ${
                    item.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 hover:border-[#26658c] text-transparent'
                  }`}
                  aria-label="Toggle completion"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>

                <div className="p-2 rounded-xl bg-[#a7ebf2]/30 text-[#26658c] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold transition-colors ${item.completed ? 'text-slate-500 line-through' : 'text-[#023859]'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">• {item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Badge variant={item.completed ? 'mint' : 'gray'} size="sm">
                  {item.completed ? 'Logged' : 'Scheduled'}
                </Badge>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#26658c] hover:bg-slate-100 transition-colors"
                  title="Edit Log"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this care log entry?')) {
                      deleteCareRecord(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          );
        })}

        {filteredLogs.length === 0 && (
          <Card className="p-8 text-center text-slate-500 text-xs">
            No routines logged in this category. Click "+ Add Record" to log an event.
          </Card>
        )}
      </div>

      {/* Healthcare Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#26658c] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Daily care summaries reflect parent-logged routines and are intended solely for personal childcare management. Daily variations in toddler appetite and nap duration are normal developmental patterns.
        </p>
      </div>

      {/* Add / Edit Daily Care Modal */}
      <Modal
        isOpen={isAddModalOpen || Boolean(editingRecord)}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRecord(null);
        }}
        title={editingRecord ? 'Edit Care Record' : `Log Care Event for ${child.name}`}
        subtitle="Record nutrition, sleep window, or diaper change details"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
              Activity Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'feeding', label: 'Feeding' },
                { id: 'sleep', label: 'Sleep' },
                { id: 'diaper', label: 'Diaper' },
                { id: 'activity', label: 'Play' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setEntryType(c.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    entryType === c.id
                      ? 'border-[#26658c] bg-[#a7ebf2]/40 text-[#023859]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Activity Title"
            placeholder="e.g. Lunch / Puree"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Time"
            placeholder="e.g. 12:30 PM"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          {entryType === 'feeding' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                  Feeding Method
                </label>
                <select
                  value={formData.feedingType}
                  onChange={(e) => setFormData({ ...formData, feedingType: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#011c40]"
                >
                  <option value="Solids">Solids</option>
                  <option value="Bottle">Bottle (Formula / Expressed)</option>
                  <option value="Nursing">Nursing</option>
                </select>
              </div>
              <Input
                label="Amount / Portion"
                placeholder="e.g. 180 ml or 150g"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
          )}

          {entryType === 'sleep' && (
            <Input
              label="Sleep Duration"
              placeholder="e.g. 1 hr 30 min"
              value={formData.sleepDuration}
              onChange={(e) => setFormData({ ...formData, sleepDuration: e.target.value })}
            />
          )}

          {entryType === 'diaper' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Diaper Observation
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Wet', 'Dirty', 'Both', 'Dry'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, diaperStatus: status })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.diaperStatus === status
                        ? 'border-[#26658c] bg-[#a7ebf2]/40 text-[#023859]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Textarea
            label="Additional Notes"
            rows={2}
            placeholder="Details on food textures, mood, or sleep quality"
            value={formData.detail}
            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingRecord(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              {editingRecord ? 'Update Record' : 'Save Record'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default DailyCarePage;
