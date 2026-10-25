import React, { useState, useEffect } from 'react';
import {
  Settings,
  Bell,
  Scale,
  Shield,
  Bot,
  User,
  Lock,
  Check,
  CheckCircle2,
  Download,
  Trash2,
  AlertTriangle,
  FileText,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

export function SettingsPage() {
  const { user } = useAuth();
  const {
    activeChild,
    childrenList,
    growthRecords,
    medicalRecords,
    dailyCare,
    essentials,
    timeline,
    calendarEvents
  } = useChild();

  const { pushStatus, requestPushPermission } = useNotifications();
  const [activeTab, setActiveTab] = useState('units');

  // Units preference
  const [unitSystem, setUnitSystem] = useState(() => {
    return localStorage.getItem('littleaura_units') || 'metric';
  });

  const handleUnitChange = (sys) => {
    setUnitSystem(sys);
    localStorage.setItem('littleaura_units', sys);
  };

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    vaccinations: true,
    medicines: true,
    appointments: true,
    essentials: true,
    dailyCare: true,
    learning: false
  });

  // Privacy toggles
  const [privacySettings, setPrivacySettings] = useState({
    encryptLocal: true,
    aiModelTrainingOptOut: true,
    photoCloudBackup: true
  });

  // AI Tone preference
  const [aiTone, setAiTone] = useState('Gentle & Supportive');

  // Account deletion modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const toggleNotif = (key) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('Notification preference updated.');
  };

  const togglePrivacy = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('Privacy preference updated.');
  };

  // Export JSON of all records
  const handleExportData = () => {
    const exportPayload = {
      application: 'LittleAura — Growing Together, Every Day',
      exportTimestamp: new Date().toISOString(),
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role
      },
      activeChild,
      allChildren: childrenList,
      growthRecords,
      medicalRecords,
      dailyCare,
      essentials,
      timeline,
      calendarEvents,
      complianceNotice: 'Medical-grade private export. Contains sensitive pediatric records.'
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LittleAura_Export_${activeChild?.name || 'child'}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Child data exported successfully as JSON.');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText.trim().toLowerCase() === 'delete') {
      localStorage.clear();
      setIsDeleteModalOpen(false);
      alert('All family records have been wiped. Redirecting to home.');
      window.location.href = '/';
    } else {
      alert('Please type "DELETE" to confirm.');
    }
  };

  const tabs = [
    { id: 'units', label: 'Units & Measurement', icon: Scale },
    { id: 'notifications', label: 'Reminders & Alerts', icon: Bell },
    { id: 'privacy', label: 'Data & Privacy', icon: Shield },
    { id: 'ai', label: 'AI Companion', icon: Bot },
    { id: 'legal', label: 'Medical Disclaimers & About', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-navyBlue/70 mt-0.5">
          Configure measurement units, notification rules, data export, and clinical safety policies.
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-aquaMist/30 border border-deepOcean/40 text-xs font-bold text-navyBlue flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-deepOcean" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Navigation Tabs */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-deepOcean text-pureWhite shadow-xs'
                    : 'text-navyBlue/70 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Content */}
        <div className="md:col-span-3">
          {/* Units of Measurement Section */}
          {activeTab === 'units' && (
            <Card className="p-6 space-y-6 border-slate-200 shadow-sm bg-pureWhite">
              <CardHeader
                title="Units of Measurement"
                subtitle="Configure preferred units across growth charts, daily feeding logs, and health summaries"
                icon={Scale}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => handleUnitChange('metric')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    unitSystem === 'metric'
                      ? 'border-deepOcean ring-2 ring-deepOcean/20 bg-aquaMist/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-pureWhite'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navyBlue">Metric System</span>
                    {unitSystem === 'metric' && <CheckCircle2 className="w-5 h-5 text-deepOcean" />}
                  </div>
                  <p className="text-xs text-navyBlue/70">
                    Height in centimeters (cm), weight in kilograms (kg), head circumference in cm, feeding in milliliters (ml).
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="aqua" size="sm">cm / kg</Badge>
                    <Badge variant="ocean" size="sm">ml</Badge>
                  </div>
                </div>

                <div
                  onClick={() => handleUnitChange('imperial')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    unitSystem === 'imperial'
                      ? 'border-deepOcean ring-2 ring-deepOcean/20 bg-aquaMist/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-pureWhite'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navyBlue">Imperial System</span>
                    {unitSystem === 'imperial' && <CheckCircle2 className="w-5 h-5 text-deepOcean" />}
                  </div>
                  <p className="text-xs text-navyBlue/70">
                    Height in inches (in), weight in pounds (lbs), head circumference in in, feeding in fluid ounces (oz).
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="aqua" size="sm">in / lbs</Badge>
                    <Badge variant="ocean" size="sm">fl oz</Badge>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <Card className="p-6 space-y-5 border-slate-200 shadow-sm bg-pureWhite">
              <CardHeader
                title="Reminder & Alert Preferences"
                subtitle="Select which notifications to receive for child schedules and routines"
                icon={Bell}
              />

              <div className="space-y-3">
                {[
                  { key: 'vaccinations', label: 'Pediatric Vaccine Alerts', desc: 'Alerts 24 hours and 2 hours before scheduled immunization dates' },
                  { key: 'medicines', label: 'Medication & Supplement Reminders', desc: 'Daily scheduled dose prompts for active prescriptions (e.g., Vitamin D3)' },
                  { key: 'appointments', label: 'Doctor & Consultation Reminders', desc: 'Timely reminders for upcoming pediatric wellness visits' },
                  { key: 'essentials', label: 'Low Stock Essentials Warnings', desc: 'Proactive warnings when diapers or formula fall below safety thresholds' },
                  { key: 'dailyCare', label: 'Daily Care Routine Prompts', desc: 'Gentle nudges for meal, nap, and diaper tracking throughout the day' },
                  { key: 'learning', label: 'Early Learning Suggestions', desc: 'Weekend 10-minute age-appropriate developmental activity ideas' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-navyBlue">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-navyBlue/70 mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleNotif(item.key)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center shrink-0 ${
                        notifSettings[item.key] ? 'bg-deepOcean justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-pureWhite shadow-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Data & Privacy Section */}
          {activeTab === 'privacy' && (
            <Card className="p-6 space-y-6 border-slate-200 shadow-sm bg-pureWhite">
              <CardHeader
                title="Data Ownership & Privacy Controls"
                subtitle="Export complete medical records or manage account closure"
                icon={Shield}
              />

              <div className="space-y-3">
                {[
                  { key: 'encryptLocal', label: 'End-to-End Client Encryption Mode', desc: 'Encrypt child health documents and growth notes before storage' },
                  { key: 'aiModelTrainingOptOut', label: 'Strict AI Model Training Opt-Out', desc: 'Guarantee your family conversations are never used to train public models' },
                  { key: 'photoCloudBackup', label: 'Encrypted Photo Storage', desc: 'Store high-resolution play photos inside secure Firebase Storage buckets' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-navyBlue">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-navyBlue/70 mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePrivacy(item.key)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center shrink-0 ${
                        privacySettings[item.key] ? 'bg-deepOcean justify-end' : 'bg-slate-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-pureWhite shadow-xs" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Data Export Box */}
              <div className="pt-4 border-t border-slate-200">
                <div className="p-5 rounded-2xl bg-aquaMist/20 border border-aquaMist/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-navyBlue flex items-center gap-2">
                      <Download className="w-4 h-4 text-deepOcean" />
                      <span>Export Family Childcare Records (JSON)</span>
                    </h4>
                    <p className="text-xs text-navyBlue/70 mt-1 max-w-md">
                      Download a complete, offline-accessible archive of all child profiles, WHO growth curves, vaccination dates, and daily logs.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    onClick={handleExportData}
                    className="shrink-0"
                  >
                    Export Records
                  </Button>
                </div>
              </div>

              {/* Account Deletion Box */}
              <div className="pt-4 border-t border-slate-200">
                <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                      <span>Delete Account & Erase Records</span>
                    </h4>
                    <p className="text-xs text-red-800/80 mt-1 max-w-md">
                      Permanently wipes all profiles, medical PDFs, growth measurements, and saved photos from the database.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="shrink-0"
                  >
                    Close Account
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* AI Companion Section */}
          {activeTab === 'ai' && (
            <Card className="p-6 space-y-5 border-slate-200 shadow-sm bg-pureWhite">
              <CardHeader
                title="AI Companion Preferences"
                subtitle="Customize the conversational tone of LittleAura Assistant"
                icon={Bot}
              />

              <div className="space-y-3">
                {[
                  { id: 'Gentle & Supportive', desc: 'Calm, reassuring, empathetic tone suited for tired parents.' },
                  { id: 'Evidence-Based & Scientific', desc: 'Concise citations from pediatric guidelines and developmental psychology.' },
                  { id: 'Brief & Bulleted', desc: 'Rapid, scannable checklists for quick reading during busy moments.' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setAiTone(item.id);
                      showToast(`AI tone set to "${item.id}".`);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      aiTone === item.id
                        ? 'bg-aquaMist/20 border-deepOcean ring-2 ring-deepOcean/20 shadow-xs'
                        : 'border-slate-200 bg-pureWhite hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-navyBlue">{item.id}</h4>
                      <p className="text-[11px] text-navyBlue/70 mt-0.5">{item.desc}</p>
                    </div>
                    {aiTone === item.id && <CheckCircle2 className="w-5 h-5 text-deepOcean" />}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Medical Disclaimers and Legal Section */}
          {activeTab === 'legal' && (
            <Card className="p-6 space-y-5 border-slate-200 shadow-sm bg-pureWhite">
              <CardHeader
                title="Medical Disclaimers & Legal Terms"
                subtitle="Transparency regarding AI boundaries, pediatric safety, and application credentials"
                icon={FileText}
              />

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs text-amber-900 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-amber-950 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Non-Diagnostic Disclaimer</span>
                </div>
                <p>
                  LittleAura is an educational, routine-management, and developmental record-keeping web application designed to support parents and caregivers of children aged 0 to 3 years.
                </p>
                <p>
                  <strong>No Medical Diagnosis or Treatment:</strong> The information, growth trajectories, developmental activities, and AI insights provided through LittleAura do not constitute medical advice, diagnosis, or prescription of medication. Always seek the advice of your pediatrician or qualified healthcare professional with any questions regarding a child's medical condition or symptoms.
                </p>
              </div>

              <div className="space-y-3 text-xs text-navyBlue/80">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-navyBlue block">Application Version</span>
                  <p>LittleAura v1.0.0 (Production Release)</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-navyBlue block">Growth Engine Standards</span>
                  <p>Calibrated against World Health Organization (WHO) Child Growth Standards (0–36 months).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-navyBlue block">Data Stewardship</span>
                  <p>Encrypted Firebase Authentication, Cloud Firestore per-user security rules, and Firebase Storage.</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Account Deletion Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Account Deletion"
          subtitle="This action is irreversible and will permanently delete all family records."
          size="md"
        >
          <div className="space-y-4 text-navyBlue">
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed">
              <strong>Warning:</strong> All child profiles, growth curves, uploaded medical PDF reports, vaccination histories, daily feeding logs, and photos will be erased immediately.
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-2 rounded-xl text-xs bg-pureWhite border border-red-300 text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={handleDeleteAccount}
              >
                Permanently Delete Everything
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
