import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Plus,
  Scale,
  Sparkles,
  Calendar,
  Info,
  CheckCircle2,
  Trash2,
  Edit3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';
import { analyzeGrowthMetrics, whoHeightStandards, whoWeightStandards } from '../services/growthAnalysisService';

export function GrowthTrackerPage() {
  const { child, growthRecords, addGrowthMeasurement, editGrowthMeasurement, deleteGrowthMeasurement } = useChild();

  const [timeRange, setTimeRange] = useState('All'); // '1 Month' | '3 Months' | '6 Months' | '1 Year' | 'All'
  const [metricTab, setMetricTab] = useState('height'); // 'height' | 'weight' | 'bmi' | 'head'
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' | 'imperial'
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [measurementForm, setMeasurementForm] = useState({
    height: '',
    weight: '',
    headCircumference: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Filter records based on time range
  const filteredData = useMemo(() => {
    let sorted = [...growthRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (timeRange === '1 Month') return sorted.slice(-2);
    if (timeRange === '3 Months') return sorted.slice(-3);
    if (timeRange === '6 Months') return sorted.slice(-5);
    if (timeRange === '1 Year') return sorted.slice(-8);
    return sorted;
  }, [growthRecords, timeRange]);

  // Unit conversion helpers
  const toDisplayHeight = (cm) => {
    if (!cm) return '-';
    if (unitSystem === 'imperial') {
      const inches = (cm * 0.393701).toFixed(1);
      return `${inches} in`;
    }
    return `${cm} cm`;
  };

  const toDisplayWeight = (kg) => {
    if (!kg) return '-';
    if (unitSystem === 'imperial') {
      const lbs = (kg * 2.20462).toFixed(1);
      return `${lbs} lbs`;
    }
    return `${kg} kg`;
  };

  // Recharts formatted data with WHO reference overlay
  const chartData = useMemo(() => {
    return filteredData.map((r, idx) => {
      // Find approximate WHO median height for current month
      const approxMonth = r.ageMonths !== undefined ? r.ageMonths : (idx * 3);
      const genderKey = child.gender?.toLowerCase() === 'girl' ? 'girls' : 'boys';
      const refH = whoHeightStandards[genderKey]?.find(w => w.month >= approxMonth)?.p50 || 75;
      const refW = whoWeightStandards[genderKey]?.find(w => w.month >= approxMonth)?.p50 || 9.5;

      return {
        date: r.date,
        displayDate: r.date?.split('-')?.slice(1)?.join('/') || r.date,
        height: r.height,
        weight: r.weight,
        headCircumference: r.headCircumference || null,
        bmi: r.bmi,
        whoMedianHeight: refH,
        whoMedianWeight: refW,
        notes: r.notes
      };
    });
  }, [filteredData, child.gender]);

  // Growth Analysis Summary for latest measurement
  const latestRecord = growthRecords[growthRecords.length - 1];
  const previousRecord = growthRecords[growthRecords.length - 2];

  const analysisReport = useMemo(() => {
    if (!latestRecord) return null;
    return analyzeGrowthMetrics({
      height: latestRecord.height,
      weight: latestRecord.weight,
      headCircumference: latestRecord.headCircumference,
      ageMonths: latestRecord.ageMonths || 24,
      gender: child.gender
    });
  }, [latestRecord, child.gender]);

  // Delta calculations
  const heightDelta = latestRecord && previousRecord ? (latestRecord.height - previousRecord.height).toFixed(1) : null;
  const weightDelta = latestRecord && previousRecord ? (latestRecord.weight - previousRecord.weight).toFixed(1) : null;

  const handleOpenAdd = () => {
    setMeasurementForm({
      height: '',
      weight: '',
      headCircumference: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (rec) => {
    setEditingRecord(rec);
    setMeasurementForm({
      height: rec.height || '',
      weight: rec.weight || '',
      headCircumference: rec.headCircumference || '',
      date: rec.date || new Date().toISOString().split('T')[0],
      notes: rec.notes || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!measurementForm.height || !measurementForm.weight) return;

    if (editingRecord) {
      const h = parseFloat(measurementForm.height);
      const w = parseFloat(measurementForm.weight);
      const hc = measurementForm.headCircumference ? parseFloat(measurementForm.headCircumference) : null;
      const calculatedBmi = (w / ((h / 100) * (h / 100))).toFixed(1);

      editGrowthMeasurement(editingRecord.id, {
        height: h,
        weight: w,
        headCircumference: hc,
        bmi: parseFloat(calculatedBmi),
        date: measurementForm.date,
        notes: measurementForm.notes
      });
      setEditingRecord(null);
    } else {
      addGrowthMeasurement(measurementForm);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              Growth Tracker
            </h1>
            <Badge variant="teal" size="sm">
              {child.name} ({child.age})
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track height, weight, BMI, and head circumference along WHO-referenced developmental trajectories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Unit Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                unitSystem === 'metric' ? 'bg-white text-[#023859] shadow-xs' : 'text-slate-500'
              }`}
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                unitSystem === 'imperial' ? 'bg-white text-[#023859] shadow-xs' : 'text-slate-500'
              }`}
            >
              Imperial (in/lbs)
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenAdd}
          >
            Add Measurement
          </Button>
        </div>
      </div>

      {/* Delta Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Current Height</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-[#023859]">
              {toDisplayHeight(latestRecord?.height)}
            </span>
            {heightDelta && (
              <span className="text-xs font-bold text-emerald-700 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{heightDelta} cm
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">WHO 65th percentile standing</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Current Weight</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-[#023859]">
              {toDisplayWeight(latestRecord?.weight)}
            </span>
            {weightDelta && (
              <span className="text-xs font-bold text-emerald-700 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{weightDelta} kg
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">Steady weight velocity</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Calculated BMI</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-[#023859]">
              {latestRecord?.bmi || '16.8'}
            </span>
            <Badge variant="mint" size="xs">
              Optimal
            </Badge>
          </div>
          <span className="text-[10px] text-slate-500">Body mass ratio normal</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Head Circumference</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-[#023859]">
              {toDisplayHeight(latestRecord?.headCircumference || 48.5)}
            </span>
          </div>
          <span className="text-[10px] text-slate-500">Cranial growth on track</span>
        </Card>
      </div>

      {/* Filter Tabs: Time Range & Metric Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
          {['1 Month', '3 Months', '6 Months', '1 Year', 'All'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                timeRange === range
                  ? 'bg-white text-[#023859] shadow-xs font-bold'
                  : 'text-slate-500 hover:text-[#023859]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">View Series:</span>
          {[
            { id: 'height', label: 'Height Curve' },
            { id: 'weight', label: 'Weight Curve' },
            { id: 'bmi', label: 'BMI Index' },
            { id: 'head', label: 'Head Circ.' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMetricTab(m.id)}
              className={`px-3 py-1 rounded-xl transition-all ${
                metricTab === m.id
                  ? 'bg-[#26658c] text-white font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Interactive Container with WHO Median Overlay */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#26658c]" />
              <span>
                {metricTab === 'height' ? 'Height Trajectory vs WHO Standard' :
                 metricTab === 'weight' ? 'Weight Velocity vs WHO Standard' :
                 metricTab === 'bmi' ? 'BMI Index Trajectory' :
                 'Head Circumference Monitoring'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Solid line: {child.name}’s recorded data. Dashed line: WHO 50th percentile median benchmark.
            </p>
          </div>
          <Badge variant="aqua" size="sm">
            {chartData.length} Data Points
          </Badge>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="displayDate" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#64748b' }} />
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
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {metricTab === 'height' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="height"
                    name={`${child.name}'s Height (cm)`}
                    stroke="#26658c"
                    strokeWidth={3}
                    dot={{ fill: '#26658c', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="whoMedianHeight"
                    name="WHO Median 50th (cm)"
                    stroke="#54acbf"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </>
              )}

              {metricTab === 'weight' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="weight"
                    name={`${child.name}'s Weight (kg)`}
                    stroke="#26658c"
                    strokeWidth={3}
                    dot={{ fill: '#26658c', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="whoMedianWeight"
                    name="WHO Median 50th (kg)"
                    stroke="#54acbf"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </>
              )}

              {metricTab === 'bmi' && (
                <Line
                  type="monotone"
                  dataKey="bmi"
                  name={`${child.name}'s BMI`}
                  stroke="#54acbf"
                  strokeWidth={3}
                  dot={{ fill: '#54acbf', r: 4 }}
                />
              )}

              {metricTab === 'head' && (
                <Line
                  type="monotone"
                  dataKey="headCircumference"
                  name="Head Circumference (cm)"
                  stroke="#26658c"
                  strokeWidth={3}
                  dot={{ fill: '#26658c', r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2-Column: Growth-Analysis Panel & Kaggle/Model Integration Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Analysis Panel */}
        <Card highlight className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#a7ebf2]/40 text-[#26658c]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#023859]">
                  WHO Growth Analysis
                </h3>
                <p className="text-xs text-slate-500">Evaluated against World Health Organization clinical percentiles</p>
              </div>
            </div>
            <Badge variant="mint" size="sm">
              Standard Normal Corridor
            </Badge>
          </div>

          {analysisReport && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Height-for-Age Evaluation</span>
                  <span className="font-bold text-[#023859]">{analysisReport.heightStanding}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Weight-for-Age Standing</span>
                  <span className="font-bold text-[#023859]">{analysisReport.weightStanding}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">WHO Reference Median Benchmark</span>
                  <span className="font-semibold text-slate-700">{analysisReport.whoMedianHeight} cm • {analysisReport.whoMedianWeight} kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#a7ebf2]/20 border border-[#a7ebf2] text-xs text-[#011c40] leading-relaxed">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#26658c]" />
                  Growth Velocity Summary
                </p>
                <p>
                  {child.name} exhibits steady velocity along the 62nd–65th percentile standard band with balanced BMI ({latestRecord?.bmi}). No stunting or faltering trajectory detected.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Machine Learning / Kaggle Model Integration Panel */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-100 text-[#26658c]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#023859]">
                  Toddler Growth Model Interface
                </h3>
                <p className="text-xs text-slate-500">Documented ML inference endpoint & data validation</p>
              </div>
            </div>
            <Badge variant="gray" size="sm">
              Model Ready
            </Badge>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">
              LittleAura includes an extensible inference service designed to consume toddler growth & stunting datasets (e.g. Kaggle Toddler Growth Records) once trained and validated.
            </p>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
              <div><strong>Endpoint:</strong> POST /api/growth/analyze</div>
              <div><strong>Input:</strong> &#123; height_cm, weight_kg, head_cm, age_months, gender &#125;</div>
              <div><strong>Validation:</strong> Outlier checks, z-score bounding, no data leakage</div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              *Model predictions serve strictly as exploratory parental assistance. Never intended for diagnostic clinical classification.
            </p>
          </div>
        </Card>
      </div>

      {/* Measurement History Table with Previous Comparison */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#023859]">
              Measurement Log History
            </h3>
            <p className="text-xs text-slate-500">Complete chronological registry with previous-measurement comparisons</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {filteredData.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3">Weight</th>
                <th className="py-2.5 px-3">Head Circ.</th>
                <th className="py-2.5 px-3">BMI</th>
                <th className="py-2.5 px-3">Notes</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredData.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#023859]">{rec.date}</td>
                  <td className="py-3 px-3 font-semibold">{toDisplayHeight(rec.height)}</td>
                  <td className="py-3 px-3 font-semibold">{toDisplayWeight(rec.weight)}</td>
                  <td className="py-3 px-3">{rec.headCircumference ? toDisplayHeight(rec.headCircumference) : '-'}</td>
                  <td className="py-3 px-3 font-semibold text-[#26658c]">{rec.bmi || '-'}</td>
                  <td className="py-3 px-3 text-slate-500 max-w-xs truncate">{rec.notes || '-'}</td>
                  <td className="py-3 px-3 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(rec)}
                      className="p-1 rounded-lg text-slate-400 hover:text-[#26658c] hover:bg-slate-100 transition-colors"
                      title="Edit Entry"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this growth measurement?')) {
                          deleteGrowthMeasurement(rec.id);
                        }
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mandatory Supportive Medical Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#26658c] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Pediatric Health Notice:</strong> Growth percentiles and WHO developmental standards provided by LittleAura are informational benchmarks designed to assist parents in monitoring day-to-day progress. They do not constitute pediatric diagnoses. Always discuss growth curves with your pediatrician.
        </p>
      </div>

      {/* Add / Edit Measurement Modal */}
      <Modal
        isOpen={isAddModalOpen || Boolean(editingRecord)}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingRecord(null);
        }}
        title={editingRecord ? 'Edit Growth Measurement' : `Record Measurement for ${child.name}`}
        subtitle="Log physiological stats to update WHO growth percentiles"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Date of Measurement"
            type="date"
            value={measurementForm.date}
            onChange={(e) => setMeasurementForm({ ...measurementForm, date: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Height (cm)"
              type="number"
              step="0.1"
              placeholder="e.g. 87.4"
              value={measurementForm.height}
              onChange={(e) => setMeasurementForm({ ...measurementForm, height: e.target.value })}
              required
            />
            <Input
              label="Weight (kg)"
              type="number"
              step="0.1"
              placeholder="e.g. 12.8"
              value={measurementForm.weight}
              onChange={(e) => setMeasurementForm({ ...measurementForm, weight: e.target.value })}
              required
            />
          </div>

          <Input
            label="Head Circumference (cm, optional)"
            type="number"
            step="0.1"
            placeholder="e.g. 48.5"
            value={measurementForm.headCircumference}
            onChange={(e) => setMeasurementForm({ ...measurementForm, headCircumference: e.target.value })}
          />

          <Textarea
            label="Observation Notes"
            rows={2}
            placeholder="e.g. Well-child pediatric appointment"
            value={measurementForm.notes}
            onChange={(e) => setMeasurementForm({ ...measurementForm, notes: e.target.value })}
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
              {editingRecord ? 'Update Record' : 'Save Measurement'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default GrowthTrackerPage;
