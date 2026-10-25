import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  FileText,
  Clock,
  Package,
  BookOpen,
  Camera,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Pill,
  Send,
  ShieldCheck,
  ChevronRight,
  Plus,
  Utensils,
  Moon,
  Baby,
  Scale,
  Smile,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input, Textarea } from '../components/common/Input';
import { useChild } from '../context/ChildContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export function DashboardPage() {
  const {
    child,
    growthRecords,
    addGrowthMeasurement,
    medicalRecords,
    dailyCare,
    toggleCareCompleted,
    addCareRecord,
    essentials,
    restockEssential,
    learningActivities,
    timeline
  } = useChild();

  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const [quickQuestion, setQuickQuestion] = useState('');
  const [quickActionModal, setQuickActionModal] = useState(null); // 'feeding' | 'sleep' | 'diaper' | 'growth'

  // Form states for quick action logging
  const [feedingData, setFeedingData] = useState({
    title: 'Snack / Milk',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    feedingType: 'Solids',
    amount: '150 ml',
    detail: 'Balanced portion'
  });

  const [sleepData, setSleepData] = useState({
    title: 'Afternoon Nap',
    time: '1:00 PM – 2:30 PM',
    sleepDuration: '1.5 hours',
    detail: 'Peaceful crib sleep'
  });

  const [diaperData, setDiaperData] = useState({
    title: 'Diaper Change',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    diaperStatus: 'Wet',
    detail: 'Clean change, skin healthy'
  });

  const [growthData, setGrowthData] = useState({
    height: '',
    weight: '',
    headCircumference: '',
    notes: 'Home check'
  });

  // Calculate Today's Summaries from actual dailyCare
  const careSummary = useMemo(() => {
    const feeds = dailyCare.filter(c => c.type === 'feeding');
    const sleeps = dailyCare.filter(c => c.type === 'sleep');
    const diapers = dailyCare.filter(c => c.type === 'diaper');

    const completedFeeds = feeds.filter(f => f.completed).length;
    const completedSleeps = sleeps.filter(s => s.completed).length;
    const completedDiapers = diapers.filter(d => d.completed).length;

    return {
      totalFeeds: feeds.length,
      completedFeeds,
      totalSleeps: sleeps.length,
      completedSleeps,
      totalDiapers: diapers.length,
      completedDiapers,
      completionRate: dailyCare.length > 0 ? Math.round((dailyCare.filter(c => c.completed).length / dailyCare.length) * 100) : 0
    };
  }, [dailyCare]);

  // Today's Date formatted
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  // Growth chart data (last 6 records)
  const chartData = useMemo(() => {
    return growthRecords.slice(-6).map(r => ({
      date: r.date?.split('-')?.slice(1)?.join('/') || r.date,
      height: r.height,
      weight: r.weight
    }));
  }, [growthRecords]);

  // Low stock essentials count
  const lowStockItems = useMemo(() => {
    return essentials.filter(e => e.quantity <= e.minThreshold);
  }, [essentials]);

  // Next upcoming vaccine and appointment
  const nextVaccine = useMemo(() => {
    return medicalRecords.vaccinations?.find(v => v.status === 'Upcoming') || medicalRecords.vaccinations?.[0];
  }, [medicalRecords]);

  const nextAppointment = useMemo(() => {
    return medicalRecords.appointments?.[0];
  }, [medicalRecords]);

  const activeMedications = useMemo(() => {
    return medicalRecords.medications?.filter(m => m.status === 'Active') || [];
  }, [medicalRecords]);

  // AI prompt handler
  const handleAskAI = (promptText) => {
    const query = promptText || quickQuestion;
    if (!query) return;
    navigate('/ai-assistant', { state: { initialPrompt: query } });
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickActionModal === 'feeding') {
      addCareRecord({
        type: 'feeding',
        title: feedingData.title,
        time: feedingData.time,
        feedingType: feedingData.feedingType,
        amount: feedingData.amount,
        detail: `${feedingData.feedingType} (${feedingData.amount}) - ${feedingData.detail}`,
        completed: true
      });
    } else if (quickActionModal === 'sleep') {
      addCareRecord({
        type: 'sleep',
        title: sleepData.title,
        time: sleepData.time,
        sleepDuration: sleepData.sleepDuration,
        detail: `${sleepData.sleepDuration} • ${sleepData.detail}`,
        completed: true
      });
    } else if (quickActionModal === 'diaper') {
      addCareRecord({
        type: 'diaper',
        title: diaperData.title,
        time: diaperData.time,
        diaperStatus: diaperData.diaperStatus,
        detail: `Status: ${diaperData.diaperStatus} • ${diaperData.detail}`,
        completed: true
      });
    } else if (quickActionModal === 'growth') {
      if (growthData.height && growthData.weight) {
        addGrowthMeasurement({
          height: growthData.height,
          weight: growthData.weight,
          headCircumference: growthData.headCircumference,
          notes: growthData.notes
        });
      }
    }
    setQuickActionModal(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#54acbf] uppercase tracking-wider">
              {todayFormatted}
            </span>
            {unreadCount > 0 && (
              <Badge variant="aqua" size="xs" dot>
                {unreadCount} Alerts
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#023859] tracking-tight mt-0.5">
            Welcome back, {user?.name?.split(' ')[0] || 'Parent'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here is your daily care pulse and milestone summary for <span className="font-bold text-[#26658c]">{child.name}</span>.
          </p>
        </div>

        {/* Quick Log Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Utensils}
            onClick={() => setQuickActionModal('feeding')}
          >
            + Feed
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Moon}
            onClick={() => setQuickActionModal('sleep')}
          >
            + Sleep
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Baby}
            onClick={() => setQuickActionModal('diaper')}
          >
            + Diaper
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Scale}
            onClick={() => setQuickActionModal('growth')}
          >
            + Growth
          </Button>
        </div>
      </div>

      {/* 2. Active Child Hero Card */}
      <Card highlight className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#26658c] via-[#54acbf] to-[#a7ebf2] p-1 shadow-md shrink-0">
              <div className="w-full h-full bg-white rounded-[12px] flex items-center justify-center font-black text-2xl text-[#023859]">
                {child.name?.[0] || 'C'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#023859] tracking-tight">
                  {child.name}
                </h2>
                <Badge variant="teal" size="sm" dot>
                  {child.age}
                </Badge>
                <Badge variant="aqua" size="sm">
                  {child.gender}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{child.summary || 'Growth trajectory tracking normally along WHO curves.'}</span>
              </p>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="flex items-center gap-4 sm:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Height</span>
              <span className="text-sm sm:text-base font-extrabold text-[#023859]">{child.height}</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Weight</span>
              <span className="text-sm sm:text-base font-extrabold text-[#023859]">{child.weight}</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Head Circ.</span>
              <span className="text-sm sm:text-base font-extrabold text-[#023859]">{child.headCircumference || '48 cm'}</span>
            </div>
            <Link to="/child" className="ml-2">
              <Button variant="outline" size="sm">
                Full Profile →
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 3. Today's Care Metric Cards (Feeding, Sleep, Diaper) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Feeding Card */}
        <Link to="/daily-care" className="group">
          <Card hoverable className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-[#a7ebf2]/40 text-[#26658c]">
                  <Utensils className="w-5 h-5" />
                </div>
                <Badge variant="blue" size="sm">
                  {careSummary.completedFeeds}/{careSummary.totalFeeds} Completed
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-[#023859] group-hover:text-[#26658c] transition-colors">
                Feeding Routine
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {dailyCare.find(c => c.type === 'feeding' && c.completed)?.detail || 'Meals and hydration logged.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#26658c]">
              <span>Manage Feeding</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Sleep Card */}
        <Link to="/daily-care" className="group">
          <Card hoverable className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-[#54acbf]/20 text-[#26658c]">
                  <Moon className="w-5 h-5" />
                </div>
                <Badge variant="teal" size="sm">
                  {careSummary.completedSleeps} Rest Windows
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-[#023859] group-hover:text-[#26658c] transition-colors">
                Sleep & Nap Cycles
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {dailyCare.find(c => c.type === 'sleep')?.detail || 'Peaceful rest rhythm.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#26658c]">
              <span>Sleep Logs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Diaper Card */}
        <Link to="/daily-care" className="group">
          <Card hoverable className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                  <Baby className="w-5 h-5" />
                </div>
                <Badge variant="mint" size="sm">
                  {careSummary.completedDiapers} Changes
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-[#023859] group-hover:text-[#26658c] transition-colors">
                Diaper & Hygiene
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Skin clean, barrier protection applied.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#26658c]">
              <span>Hygiene Tracker</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Card>
        </Link>
      </div>

      {/* 4. Prominent AI Parenting Assistant Banner */}
      <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[#a7ebf2]/25 via-white to-[#54acbf]/20 border border-[#a7ebf2] shadow-ai-glow">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#54acbf]/40 text-xs font-bold text-[#023859] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#26658c]" />
            <span>LittleAura Intelligence Assistant</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#023859] tracking-tight">
            Ask LittleAura for gentle guidance
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Evidence-informed suggestions tailored for {child.name}’s age window ({child.age}).
          </p>

          {/* Quick AI Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskAI();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-2xl bg-white p-2 rounded-2xl border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-[#26658c]/20 transition-all"
          >
            <div className="flex-1 w-full flex items-center pl-3">
              <Sparkles className="w-4 h-4 text-[#54acbf] mr-2 shrink-0" />
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="e.g. Help me establish a calming bedtime routine..."
                className="w-full text-xs sm:text-sm bg-transparent border-none text-[#011c40] placeholder-slate-400 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Send}
              className="w-full sm:w-auto"
            >
              Ask AI
            </Button>
          </form>

          {/* Quick Pill Prompts */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Try:</span>
            {[
              'Bedtime routine tips',
              'Age-appropriate motor play',
              'Encouraging vegetables',
              'Teething comfort measures'
            ].map((promptText) => (
              <button
                key={promptText}
                onClick={() => handleAskAI(promptText)}
                className="px-3 py-1 rounded-xl bg-white/90 border border-slate-200 text-xs font-semibold text-[#023859] hover:bg-[#a7ebf2]/40 hover:border-[#54acbf] transition-all shadow-2xs"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Two-Column Core Layout: Growth Chart Preview & Clinical Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Growth Trajectory Preview */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#26658c]" />
                  <span>Growth Trajectory (Height & Weight)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  WHO 50th–75th Percentile Corridor
                </p>
              </div>
              <Link to="/growth">
                <Button variant="outline" size="sm">
                  View Full Curves →
                </Button>
              </Link>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#54acbf" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#54acbf" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      color: '#011c40',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(2, 56, 89, 0.08)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="height"
                    name="Height (cm)"
                    stroke="#26658c"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#growthAreaGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Latest: <strong>{child.height}</strong> • <strong>{child.weight}</strong></span>
            <span className="text-emerald-700 font-bold">✓ Normal Growth Rate</span>
          </div>
        </Card>

        {/* Right: Upcoming Vaccinations & Appointments */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#26658c]" />
                  <span>Clinical Records & Upcoming Care</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scheduled boosters, visits, and active medications
                </p>
              </div>
              <Link to="/medical">
                <Button variant="outline" size="sm">
                  Medical Hub →
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {/* Vaccine Notice */}
              {nextVaccine && (
                <div className="p-3.5 rounded-2xl bg-[#a7ebf2]/20 border border-[#a7ebf2] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#26658c] shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#023859]">{nextVaccine.name}</h4>
                      <p className="text-[11px] text-slate-500">{nextVaccine.date} • {nextVaccine.provider}</p>
                    </div>
                  </div>
                  <Badge variant={nextVaccine.status === 'Completed' ? 'mint' : 'yellow'} size="sm">
                    {nextVaccine.status}
                  </Badge>
                </div>
              )}

              {/* Appointment Notice */}
              {nextAppointment && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#54acbf] shadow-xs">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#023859]">{nextAppointment.title}</h4>
                      <p className="text-[11px] text-slate-500">{nextAppointment.date} • {nextAppointment.doctor}</p>
                    </div>
                  </div>
                  <Badge variant="teal" size="sm">
                    {nextAppointment.status}
                  </Badge>
                </div>
              )}

              {/* Active Medication Schedule */}
              {activeMedications.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white text-purple-700 shadow-xs">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#023859]">{activeMedications[0].name}</h4>
                      <p className="text-[11px] text-slate-500">Dosage: {activeMedications[0].dosage} ({activeMedications[0].frequency})</p>
                    </div>
                  </div>
                  <Badge variant="gray" size="sm">
                    Active
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Pediatrician: <strong>{child.pediatrician || 'Family Doctor'}</strong></span>
            <span className="text-[#26658c] font-semibold">{medicalRecords.vaccinations?.filter(v => v.status === 'Completed').length || 0} Vaccines Done</span>
          </div>
        </Card>
      </div>

      {/* 6. Essentials Low-Stock Alerts & Recent Timeline Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Essentials Alert Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#26658c]" />
                  <span>Essentials & Restocking</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diapers, wipes, lotions, and consumables
                </p>
              </div>
              <Link to="/essentials">
                <Button variant="outline" size="sm">
                  Inventory →
                </Button>
              </Link>
            </div>

            {lowStockItems.length > 0 ? (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-950">
                      Low Stock Warning ({lowStockItems.length} items)
                    </h4>
                    <p className="text-[11px] text-amber-800">
                      {lowStockItems.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => {
                      if (lowStockItems[0]) restockEssential(lowStockItems[0].id, 15);
                    }}
                  >
                    Quick Restock {lowStockItems[0]?.name.split(' ')[0]} (+15)
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All nursery essentials and diaper packs are comfortably stocked!</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Catalog: {essentials.length} items</span>
            <span className="font-semibold text-[#023859]">{lowStockItems.length} require ordering</span>
          </div>
        </Card>

        {/* Recent Child Activity Feed */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#26658c]" />
                  <span>Recent Child Activity</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Unified milestone and logging stream
                </p>
              </div>
              <Link to="/timeline">
                <Button variant="outline" size="sm">
                  Full Timeline →
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {timeline.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white text-[#26658c] shrink-0 shadow-xs mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#023859] truncate">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing recent updates for {child.name}</span>
            <span className="text-[#26658c] font-semibold">Real-time sync</span>
          </div>
        </Card>
      </div>

      {/* 7. Quick Entry Modal Dialog */}
      <Modal
        isOpen={Boolean(quickActionModal)}
        onClose={() => setQuickActionModal(null)}
        title={
          quickActionModal === 'feeding' ? 'Log Feeding Event' :
          quickActionModal === 'sleep' ? 'Log Sleep Window' :
          quickActionModal === 'diaper' ? 'Log Diaper Change' :
          'Record Growth Measurement'
        }
        subtitle={`Fast entry logged directly into ${child.name}’s records`}
      >
        <form onSubmit={handleQuickSubmit} className="space-y-4">
          {quickActionModal === 'feeding' && (
            <>
              <Input
                label="Meal Description"
                value={feedingData.title}
                onChange={(e) => setFeedingData({ ...feedingData, title: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                    Feeding Type
                  </label>
                  <select
                    value={feedingData.feedingType}
                    onChange={(e) => setFeedingData({ ...feedingData, feedingType: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#011c40]"
                  >
                    <option value="Solids">Solids</option>
                    <option value="Bottle">Bottle (Formula / Expressed)</option>
                    <option value="Nursing">Nursing</option>
                  </select>
                </div>
                <Input
                  label="Amount / Volume"
                  value={feedingData.amount}
                  onChange={(e) => setFeedingData({ ...feedingData, amount: e.target.value })}
                  placeholder="e.g. 180 ml"
                />
              </div>
              <Input
                label="Time of Feeding"
                value={feedingData.time}
                onChange={(e) => setFeedingData({ ...feedingData, time: e.target.value })}
              />
            </>
          )}

          {quickActionModal === 'sleep' && (
            <>
              <Input
                label="Sleep Description"
                value={sleepData.title}
                onChange={(e) => setSleepData({ ...sleepData, title: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Time Window"
                  value={sleepData.time}
                  onChange={(e) => setSleepData({ ...sleepData, time: e.target.value })}
                  placeholder="e.g. 1:00 PM – 2:30 PM"
                />
                <Input
                  label="Duration (Hours)"
                  value={sleepData.sleepDuration}
                  onChange={(e) => setSleepData({ ...sleepData, sleepDuration: e.target.value })}
                  placeholder="e.g. 1.5 hours"
                />
              </div>
            </>
          )}

          {quickActionModal === 'diaper' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                  Diaper Condition
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Wet', 'Dirty', 'Both', 'Dry'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setDiaperData({ ...diaperData, diaperStatus: status })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        diaperData.diaperStatus === status
                          ? 'border-[#26658c] bg-[#a7ebf2]/40 text-[#023859]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="Time of Change"
                value={diaperData.time}
                onChange={(e) => setDiaperData({ ...diaperData, time: e.target.value })}
              />
              <Input
                label="Notes / Observations"
                value={diaperData.detail}
                onChange={(e) => setDiaperData({ ...diaperData, detail: e.target.value })}
                placeholder="e.g. Normal skin, barrier cream used"
              />
            </>
          )}

          {quickActionModal === 'growth' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Height (cm)"
                  type="number"
                  step="0.1"
                  value={growthData.height}
                  onChange={(e) => setGrowthData({ ...growthData, height: e.target.value })}
                  placeholder="e.g. 87.5"
                  required
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  step="0.1"
                  value={growthData.weight}
                  onChange={(e) => setGrowthData({ ...growthData, weight: e.target.value })}
                  placeholder="e.g. 12.8"
                  required
                />
              </div>
              <Input
                label="Head Circumference (cm, optional)"
                type="number"
                step="0.1"
                value={growthData.headCircumference}
                onChange={(e) => setGrowthData({ ...growthData, headCircumference: e.target.value })}
                placeholder="e.g. 48.5"
              />
              <Input
                label="Observation Notes"
                value={growthData.notes}
                onChange={(e) => setGrowthData({ ...growthData, notes: e.target.value })}
                placeholder="e.g. Pediatrician routine wellness visit"
              />
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setQuickActionModal(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Save to {child.name}’s Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default DashboardPage;
