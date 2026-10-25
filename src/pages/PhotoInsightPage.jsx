import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Compass,
  Layers,
  Heart,
  Save,
  Trash2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useChild } from '../context/ChildContext';
import { analyzePhotoInsight } from '../services/aiService';

export function PhotoInsightPage() {
  const { child, savedInsights, savePhotoInsight, deletePhotoInsight } = useChild();

  const [activeTab, setActiveTab] = useState('scan'); // 'scan' | 'saved'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [parentConsent, setParentConsent] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [insightResult, setInsightResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be under 10MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setInsightResult(null);
      setErrorMessage('');
      setParentConsent(false);
    }
  };

  const handleLoadDemo = (scenario) => {
    setSelectedFile({ name: `${scenario}_play_moment.jpg` });
    if (scenario === 'blocks') {
      setPreviewUrl('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80');
    } else {
      setPreviewUrl('https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80');
    }
    setInsightResult(null);
    setParentConsent(true);
    setErrorMessage('');
  };

  const handleAnalyze = async () => {
    if (!previewUrl) return;
    if (!parentConsent) {
      setErrorMessage('Please confirm parental consent before proceeding with image analysis.');
      return;
    }

    setErrorMessage('');
    setIsScanning(true);

    try {
      const data = await analyzePhotoInsight(selectedFile, child);
      setInsightResult(data);
    } catch (err) {
      setErrorMessage('Unable to process photo insight at this time. Please retry.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToProfile = () => {
    if (!insightResult) return;
    savePhotoInsight({
      title: `${child.name}’s Play Observation`,
      imageUrl: previewUrl,
      category: insightResult.activityContext?.category || 'Active Play',
      observation: insightResult.activityContext?.observation || '',
      playSuggestion: insightResult.playSuggestion?.guidance || '',
      disclaimer: insightResult.disclaimer || 'Non-diagnostic play observation.'
    });
    setSaveSuccess('Insight saved to child timeline & profile.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              AI Photo Insight
            </h1>
            <Badge variant="aqua" size="sm">
              Non-Diagnostic
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Turn everyday play photos of {child.name} into supportive observations of spatial exploration and environment.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'scan' ? 'bg-white text-[#023859] shadow-xs font-bold' : 'text-slate-500'
            }`}
          >
            Scan Moment
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'saved' ? 'bg-white text-[#023859] shadow-xs font-bold' : 'text-slate-500'
            }`}
          >
            <span>Saved Insights</span>
            <span className="w-4 h-4 rounded-full bg-[#26658c] text-white text-[9px] font-bold flex items-center justify-center">
              {savedInsights.length}
            </span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Mode 1: Scan Moment */}
      {activeTab === 'scan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload and Consent Section */}
          <Card className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#023859] mb-1">
                Select or Capture a Play Photograph
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Choose a photo of {child.name} exploring toys, climbing, drawing, or engaged in sensory discovery.
              </p>

              {/* Dropzone Container */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="relative rounded-3xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50/70 min-h-[300px] flex items-center justify-center p-4">
                {previewUrl ? (
                  <div className="relative w-full h-[300px] rounded-2xl overflow-hidden group">
                    <img
                      src={previewUrl}
                      alt="Uploaded moment"
                      className="w-full h-full object-cover"
                    />

                    {isScanning && (
                      <div className="absolute inset-0 bg-[#011c40]/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#a7ebf2] to-transparent absolute radar-line shadow-md shadow-[#54acbf]" />
                        <div className="p-4 rounded-2xl bg-white text-[#023859] text-xs font-bold flex items-center gap-2 shadow-2xl border border-slate-200">
                          <Sparkles className="w-4 h-4 text-[#26658c] animate-spin" />
                          <span>Scanning spatial patterns and environment...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="text-center p-6 space-y-3 cursor-pointer hover:bg-[#a7ebf2]/10 transition-colors rounded-2xl"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-[#a7ebf2]/30 text-[#26658c] mx-auto flex items-center justify-center">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#023859]">
                        Click to select photo or drag & drop here
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        JPEG, PNG, HEIC up to 10MB
                      </p>
                    </div>
                    <Button variant="primary" size="sm" icon={Upload} type="button">
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>

              {/* Sample Demos */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Try sample moments:</span>
                <button
                  type="button"
                  onClick={() => handleLoadDemo('blocks')}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-[#a7ebf2]/40 text-slate-700 font-semibold border border-slate-200 transition-colors"
                >
                  🧱 Wooden Blocks
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadDemo('outdoors')}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-[#a7ebf2]/40 text-slate-700 font-semibold border border-slate-200 transition-colors"
                >
                  🍂 Outdoor Park Play
                </button>
              </div>
            </div>

            {/* Mandatory Parental Consent Checkbox */}
            {previewUrl && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={parentConsent}
                    onChange={(e) => setParentConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#26658c] focus:ring-[#26658c]"
                  />
                  <label htmlFor="consent-check" className="text-xs text-slate-600 leading-tight cursor-pointer">
                    <strong>Parental Consent:</strong> I confirm that I am the parent/authorized caregiver of {child.name} and request supportive AI observation of play dynamics. Images are not retained for model training.
                  </label>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={RefreshCw}
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      setInsightResult(null);
                    }}
                  >
                    Clear Photo
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    loading={isScanning}
                    disabled={!parentConsent || isScanning}
                    icon={Sparkles}
                    onClick={handleAnalyze}
                  >
                    Analyze Play Dynamics
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Right: Insight Output Card */}
          <div className="space-y-4">
            {insightResult ? (
              <Card highlight className="p-6 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-[#023859]">
                      Developmental Play Observation
                    </h3>
                    <p className="text-xs text-slate-500">Contextualized for {child.name} ({child.age})</p>
                  </div>
                  <Badge variant="teal" size="sm">
                    {insightResult.activityContext?.category || 'Active Play'}
                  </Badge>
                </div>

                {/* Observation Detail */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#26658c] uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>Activity Observation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-slate-200">
                    {insightResult.activityContext?.observation}
                  </p>
                </div>

                {/* Environment */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Play Environment & Sensory Space</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-2xl border border-slate-200">
                    {insightResult.environment?.safetyObservation}
                  </p>
                </div>

                {/* Play Extension Suggestion */}
                <div className="p-4 rounded-2xl bg-[#a7ebf2]/25 border border-[#a7ebf2] space-y-1.5">
                  <span className="text-xs font-bold text-[#023859] uppercase tracking-wider block">
                    Suggested Play Expansion: {insightResult.playSuggestion?.title}
                  </span>
                  <p className="text-xs text-[#011c40] leading-relaxed">
                    {insightResult.playSuggestion?.guidance}
                  </p>
                  <span className="text-[10px] font-bold text-[#26658c] block pt-1">
                    Skill supported: {insightResult.playSuggestion?.skillSupported}
                  </span>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Save}
                    onClick={handleSaveToProfile}
                  >
                    Save Insight to Profile
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-10 text-center min-h-[350px] flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-3xl bg-[#a7ebf2]/30 text-[#26658c] flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#023859]">
                  No Photo Analyzed Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5 leading-relaxed">
                  Upload an image of your child playing, or test one of the demo moments to view supportive non-diagnostic observations.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadDemo('blocks')}
                >
                  Load Demo Play Moment
                </Button>
              </Card>
            )}

            {/* Mandatory Non-Diagnostic Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#26658c] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#023859] mb-0.5">
                  Parental Observation Notice
                </p>
                <p className="leading-relaxed">
                  AI Photo Insight provides supportive play observations and is strictly not a medical diagnostic tool. Never attempt to use photograph scanning to evaluate clinical health, neurological status, or motor disorders. Always seek professional advice from your pediatrician.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Saved Insights List */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedInsights.map((insight) => (
              <Card key={insight.id} className="p-5 flex flex-col justify-between space-y-4">
                <div>
                  {insight.imageUrl && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                      <img src={insight.imageUrl} alt={insight.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="teal" size="sm">
                      {insight.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-semibold">{insight.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#023859]">{insight.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                    {insight.observation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Recorded for {child.name}</span>
                  <button
                    onClick={() => {
                      if (confirm('Delete this saved insight?')) {
                        deletePhotoInsight(insight.id);
                      }
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Insight"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {savedInsights.length === 0 && (
            <Card className="p-12 text-center text-slate-500 text-xs">
              No saved observations yet. Scan a play moment in the "Scan Moment" tab and click "Save Insight to Profile".
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoInsightPage;
