import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Upload,
  ShieldCheck,
  Calendar,
  Pill,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Info,
  Trash2,
  Search,
  Filter,
  Check,
  Stethoscope
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';

export function MedicalReportsPage() {
  const {
    child,
    medicalRecords,
    addMedicalReport,
    deleteMedicalReport,
    addVaccination,
    updateVaccinationStatus,
    addMedication,
    deleteMedication,
    addAppointment
  } = useChild();

  const [activeTab, setActiveTab] = useState('vaccinations'); // 'vaccinations' | 'reports' | 'appointments' | 'medications'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);

  const fileInputRef = useRef(null);

  // Upload Form
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'Clinical Consultation',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    fileName: '',
    fileSize: '',
    fileData: null
  });

  // Vaccination Form
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    provider: 'Pediatric Health Clinic',
    status: 'Completed'
  });

  // Medication Form
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '400 IU (1 ml)',
    frequency: 'Daily morning routine',
    prescribedBy: 'Dr. Ananya Sharma'
  });

  // Appointment Form
  const [newApt, setNewApt] = useState({
    title: '',
    date: '2026-11-05',
    time: '10:00 AM',
    doctor: 'Dr. Ananya Sharma',
    location: 'Apollo Childrens Center, Suite 402'
  });

  // Search filtering
  const filteredVaccinations = useMemo(() => {
    return (medicalRecords.vaccinations || []).filter(v =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicalRecords.vaccinations, searchQuery]);

  const filteredReports = useMemo(() => {
    return (medicalRecords.reports || []).filter(r =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicalRecords.reports, searchQuery]);

  const filteredAppointments = useMemo(() => {
    return (medicalRecords.appointments || []).filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicalRecords.appointments, searchQuery]);

  const filteredMedications = useMemo(() => {
    return (medicalRecords.medications || []).filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medicalRecords.medications, searchQuery]);

  // File selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the 10MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReport(prev => ({
          ...prev,
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileData: reader.result,
          title: prev.title || file.name.replace(/\.[^/.]+$/, '')
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newReport.title) return;
    addMedicalReport({
      title: newReport.title,
      type: newReport.type,
      doctor: newReport.doctor || child.pediatrician || 'Pediatric Clinic',
      date: newReport.date,
      size: newReport.fileSize || '1.2 MB',
      fileType: newReport.fileName?.endsWith('.pdf') ? 'PDF' : 'Document',
      fileData: newReport.fileData
    });
    setIsUploadModalOpen(false);
    setNewReport({
      title: '',
      type: 'Clinical Consultation',
      doctor: '',
      date: new Date().toISOString().split('T')[0],
      fileName: '',
      fileSize: '',
      fileData: null
    });
  };

  const handleVaccineSubmit = (e) => {
    e.preventDefault();
    if (!newVaccine.name) return;
    addVaccination(newVaccine);
    setIsVaccineModalOpen(false);
    setNewVaccine({
      name: '',
      date: new Date().toISOString().split('T')[0],
      provider: 'Pediatric Health Clinic',
      status: 'Completed'
    });
  };

  const handleMedicationSubmit = (e) => {
    e.preventDefault();
    if (!newMed.name) return;
    addMedication(newMed);
    setIsMedicationModalOpen(false);
    setNewMed({
      name: '',
      dosage: '400 IU (1 ml)',
      frequency: 'Daily morning routine',
      prescribedBy: 'Dr. Ananya Sharma'
    });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!newApt.title) return;
    addAppointment(newApt);
    setIsAppointmentModalOpen(false);
    setNewApt({
      title: '',
      date: '2026-11-05',
      time: '10:00 AM',
      doctor: 'Dr. Ananya Sharma',
      location: 'Apollo Childrens Center, Suite 402'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              Medical Reports & Records
            </h1>
            <Badge variant="teal" size="sm">
              {child.name} ({child.age})
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Official immunization records, clinic consultations, active prescriptions, and appointments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'vaccinations' && (
            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => setIsVaccineModalOpen(true)}
            >
              Add Vaccine
            </Button>
          )}
          {activeTab === 'reports' && (
            <Button
              variant="primary"
              size="sm"
              icon={Upload}
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Report
            </Button>
          )}
          {activeTab === 'appointments' && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              Book Visit
            </Button>
          )}
          {activeTab === 'medications' && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsMedicationModalOpen(true)}
            >
              Add Medicine
            </Button>
          )}
        </div>
      </div>

      {/* Tabs & Search Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'vaccinations', label: 'Vaccinations', count: medicalRecords.vaccinations?.length || 0 },
            { id: 'reports', label: 'Reports & Labs', count: medicalRecords.reports?.length || 0 },
            { id: 'appointments', label: 'Appointments', count: medicalRecords.appointments?.length || 0 },
            { id: 'medications', label: 'Medications', count: medicalRecords.medications?.length || 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-2xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#26658c] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search within medical records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-[#011c40] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#26658c]/20"
          />
        </div>
      </div>

      {/* Tab 1: Vaccinations Roadmap */}
      {activeTab === 'vaccinations' && (
        <Card className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#26658c]" />
                <span>Pediatric Immunization Schedule (0–3 Years)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive tracking aligned with National Pediatric Immunization Guidelines
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="mint" size="xs" dot>
                {filteredVaccinations.filter(v => v.status === 'Completed').length} Completed
              </Badge>
              <Badge variant="yellow" size="xs" dot>
                {filteredVaccinations.filter(v => v.status === 'Upcoming').length} Upcoming
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {filteredVaccinations.map((vac) => {
              const isCompleted = vac.status === 'Completed';
              const isUpcoming = vac.status === 'Upcoming';

              return (
                <div
                  key={vac.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCompleted
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : isUpcoming
                      ? 'bg-[#a7ebf2]/20 border-[#a7ebf2]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' :
                      isUpcoming ? 'bg-[#a7ebf2] text-[#011c40]' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#023859]">
                        {vac.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {vac.provider} • Date: {vac.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Badge variant={isCompleted ? 'mint' : isUpcoming ? 'yellow' : 'gray'} size="sm">
                      {vac.status}
                    </Badge>
                    {!isCompleted && (
                      <button
                        onClick={() => updateVaccinationStatus(vac.id, 'Completed')}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:bg-emerald-50 text-[11px] font-bold text-emerald-700 transition-colors shadow-2xs"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tab 2: Reports & Lab Documents */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#a7ebf2]/40 text-[#26658c]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <Badge variant="teal" size="sm">
                      {report.status}
                    </Badge>
                  </div>

                  <h4 className="text-sm font-bold text-[#023859] line-clamp-1">
                    {report.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {report.type}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Doctor: {report.doctor}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {report.date} • {report.size} ({report.fileType})
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    className="flex-1 text-[11px]"
                    onClick={() => setViewingReport(report)}
                  >
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Download}
                    className="flex-1 text-[11px]"
                    onClick={() => alert(`Downloading verified digital record of: ${report.title}`)}
                  >
                    Download
                  </Button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete document "${report.title}"?`)) {
                        deleteMedicalReport(report.id);
                      }
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card className="p-8 text-center text-slate-500 text-xs">
              No reports match your current filter. Click "Upload Report" to attach pediatric consults.
            </Card>
          )}
        </div>
      )}

      {/* Tab 3: Appointments */}
      {activeTab === 'appointments' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#26658c]" />
                <span>Pediatric Visits & Clinical Appointments</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Scheduled checkups, dental visits, and booster appointments
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              Add Appointment
            </Button>
          </div>

          <div className="space-y-3">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white text-[#26658c] shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#023859]">{apt.title}</h4>
                    <p className="text-xs text-[#26658c] font-semibold mt-0.5">{apt.date}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{apt.doctor} • {apt.location}</p>
                  </div>
                </div>
                <Badge variant="teal" size="sm">{apt.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Medications & Prescriptions */}
      {activeTab === 'medications' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
                <Pill className="w-5 h-5 text-purple-700" />
                <span>Active Pediatric Prescriptions</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Parent-logged vitamin supplements and physician-prescribed medications
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsMedicationModalOpen(true)}
            >
              Add Medication
            </Button>
          </div>

          {/* Strict Safety Disclaimer for Medications */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 flex items-start gap-3">
            <Info className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Pediatric Safety Notice:</strong> LittleAura provides personal recordkeeping tools for tracking schedules prescribed by your healthcare provider. LittleAura does not evaluate, recommend, alter, or prescribe medications, nor does it determine pediatric dosages. Always follow your certified pediatrician's instructions.
            </p>
          </div>

          <div className="space-y-3">
            {filteredMedications.map((med) => (
              <div key={med.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#023859]">{med.name}</h4>
                  <p className="text-xs text-purple-800 font-semibold mt-0.5">Dosage: {med.dosage}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Schedule: {med.frequency} • Prescribed by: {med.prescribedBy}</p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Badge variant="mint" size="sm">{med.status}</Badge>
                  <button
                    onClick={() => {
                      if (confirm(`Remove prescription "${med.name}"?`)) {
                        deleteMedication(med.id);
                      }
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove Medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* General Medical Legal Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#26658c] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          LittleAura organizes your child’s health history, clinic reports, and immunization dates for parental convenience. For fever, illness, or emergency medical treatment, immediately contact local emergency services or your pediatrician.
        </p>
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Medical Document"
        subtitle="Store pediatric reports, lab diagnostics, and vaccination cards securely"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <Input
            label="Document Title"
            placeholder="e.g. 24-Month Well-Child Pediatric Assessment"
            value={newReport.title}
            onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Document Type
              </label>
              <select
                value={newReport.type}
                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-[#011c40]"
              >
                <option>Clinical Consultation</option>
                <option>Lab Diagnostic</option>
                <option>Vaccination Record</option>
                <option>Prescription</option>
              </select>
            </div>

            <Input
              label="Date of Examination"
              type="date"
              value={newReport.date}
              onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
              required
            />
          </div>

          <Input
            label="Doctor / Clinic Name"
            placeholder="e.g. Dr. Ananya Sharma"
            value={newReport.doctor}
            onChange={(e) => setNewReport({ ...newReport, doctor: e.target.value })}
          />

          {/* Real File Input Dropzone */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,image/png,image/jpeg"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-6 border-2 border-dashed border-slate-300 rounded-2xl text-center bg-slate-50/70 hover:bg-[#a7ebf2]/15 cursor-pointer transition-colors"
          >
            <Upload className="w-8 h-8 text-[#26658c] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#023859]">
              {newReport.fileName ? `Selected: ${newReport.fileName} (${newReport.fileSize})` : 'Choose PDF, PNG, or JPG document'}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Supports medical files up to 10MB
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Upload}>
              Upload Document
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Vaccine Modal */}
      <Modal
        isOpen={isVaccineModalOpen}
        onClose={() => setIsVaccineModalOpen(false)}
        title="Add Vaccination Record"
        subtitle="Log scheduled pediatric booster or completed shot"
      >
        <form onSubmit={handleVaccineSubmit} className="space-y-4">
          <Input
            label="Vaccine Name"
            placeholder="e.g. DTaP Booster (18-24m)"
            value={newVaccine.name}
            onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date Administered / Scheduled"
              type="date"
              value={newVaccine.date}
              onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Status
              </label>
              <select
                value={newVaccine.status}
                onChange={(e) => setNewVaccine({ ...newVaccine, status: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-[#011c40]"
              >
                <option value="Completed">Completed</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Due">Due</option>
              </select>
            </div>
          </div>
          <Input
            label="Provider / Clinic Name"
            placeholder="e.g. Apollo Children’s Center"
            value={newVaccine.provider}
            onChange={(e) => setNewVaccine({ ...newVaccine, provider: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsVaccineModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Save Vaccine
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Medication Modal */}
      <Modal
        isOpen={isMedicationModalOpen}
        onClose={() => setIsMedicationModalOpen(false)}
        title="Add Pediatric Medication"
        subtitle="Record vitamins or prescribed pediatric drops"
      >
        <form onSubmit={handleMedicationSubmit} className="space-y-4">
          <Input
            label="Medication Name"
            placeholder="e.g. Vitamin D3 Liquid Drops"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Dosage Prescribed"
              placeholder="e.g. 400 IU (1 ml)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              required
            />
            <Input
              label="Schedule / Frequency"
              placeholder="e.g. Once daily with milk"
              value={newMed.frequency}
              onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
              required
            />
          </div>
          <Input
            label="Prescribed By (Doctor)"
            placeholder="e.g. Dr. Ananya Sharma"
            value={newMed.prescribedBy}
            onChange={(e) => setNewMed({ ...newMed, prescribedBy: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsMedicationModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Save Medication
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title="Schedule Pediatric Visit"
        subtitle="Add consultation or routine wellness review"
      >
        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
          <Input
            label="Visit Reason / Title"
            placeholder="e.g. 2-Year Routine Booster & Growth Review"
            value={newApt.title}
            onChange={(e) => setNewApt({ ...newApt, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={newApt.date}
              onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
              required
            />
            <Input
              label="Time"
              placeholder="e.g. 10:00 AM"
              value={newApt.time}
              onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
              required
            />
          </div>
          <Input
            label="Doctor Name"
            placeholder="e.g. Dr. Ananya Sharma"
            value={newApt.doctor}
            onChange={(e) => setNewApt({ ...newApt, doctor: e.target.value })}
          />
          <Input
            label="Clinic Location"
            placeholder="e.g. Apollo Childrens Center, Suite 402"
            value={newApt.location}
            onChange={(e) => setNewApt({ ...newApt, location: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAppointmentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Confirm Appointment
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Document Modal */}
      <Modal
        isOpen={Boolean(viewingReport)}
        onClose={() => setViewingReport(null)}
        title={viewingReport?.title || 'Document Viewer'}
        subtitle={`Verified pediatric document: ${viewingReport?.type}`}
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center py-10">
            <FileText className="w-12 h-12 text-[#26658c] mx-auto mb-3" />
            <h4 className="text-base font-bold text-[#023859]">
              {viewingReport?.title}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Physician: {viewingReport?.doctor} • Date: {viewingReport?.date}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-2">
              ✓ Verified clinical document associated with {child.name}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setViewingReport(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={() => alert(`Downloading verified copy of: ${viewingReport?.title}`)}
            >
              Download File
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MedicalReportsPage;
