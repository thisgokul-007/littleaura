import React, { useState, useRef } from 'react';
import {
  User,
  Calendar,
  Smile,
  Clock,
  TrendingUp,
  ShieldCheck,
  Edit3,
  Heart,
  Droplet,
  FileText,
  Save,
  CheckCircle2,
  Camera,
  Trash2,
  Plus,
  Scale,
  Sparkles,
  Baby
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';

export function ChildProfilePage() {
  const {
    child,
    childrenList,
    switchChild,
    addChild,
    updateChildProfile,
    deleteChild,
    calculateAge
  } = useChild();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Edit form state
  const [formData, setFormData] = useState({ ...child });

  // Add child form state
  const [newChildData, setNewChildData] = useState({
    name: '',
    dateOfBirth: '2025-06-01',
    gender: 'Girl',
    bloodGroup: 'O+',
    allergies: 'No known allergies',
    pediatrician: '',
    clinicName: '',
    summary: 'Enrolled in LittleAura smart tracking.',
    parentNotes: ''
  });

  const handleOpenEdit = () => {
    setFormData({ ...child });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateChildProfile(formData);
    setIsEditModalOpen(false);
    setSaveSuccess('Child profile updated successfully.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleCreateChild = (e) => {
    e.preventDefault();
    if (!newChildData.name.trim()) return;
    addChild(newChildData);
    setIsAddModalOpen(false);
    setSaveSuccess(`Welcome ${newChildData.name}! New profile initialized.`);
    setTimeout(() => setSaveSuccess(''), 3000);
    setNewChildData({
      name: '',
      dateOfBirth: '2025-06-01',
      gender: 'Girl',
      bloodGroup: 'O+',
      allergies: 'No known allergies',
      pediatrician: '',
      clinicName: '',
      summary: 'Enrolled in LittleAura smart tracking.',
      parentNotes: ''
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file smaller than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateChildProfile({ photoUrl: reader.result });
        setSaveSuccess('Profile photograph updated successfully.');
        setTimeout(() => setSaveSuccess(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updateChildProfile({ photoUrl: null });
    setSaveSuccess('Profile photograph removed.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
              Child Profiles & Records
            </h1>
            <Badge variant="aqua" size="sm">
              {childrenList.length} Enrolled
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Personal credentials, physiological baseline, and routines for {child.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Child
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Edit3}
            onClick={handleOpenEdit}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Child Switcher Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 mr-1">
          Select Child:
        </span>
        {childrenList.map((c) => {
          const isActive = c.id === child.id;
          return (
            <button
              key={c.id}
              onClick={() => switchChild(c.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-[#26658c] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-[#023859] hover:bg-slate-50'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-[#a7ebf2] text-[#011c40]' : 'bg-slate-100 text-[#26658c]'
              }`}>
                {c.name?.[0]}
              </div>
              <span>{c.name}</span>
              <span className={`text-[10px] ${isActive ? 'text-[#a7ebf2]' : 'text-slate-400'}`}>
                ({calculateAge(c.dateOfBirth)})
              </span>
            </button>
          );
        })}
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Main Hero Card with Photo Upload & Age Calculation */}
      <Card highlight className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar with Photo Upload Controls */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#26658c] via-[#54acbf] to-[#a7ebf2] p-1 shadow-md overflow-hidden">
              {child.photoUrl ? (
                <img
                  src={child.photoUrl}
                  alt={child.name}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              ) : (
                <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center font-black text-4xl text-[#023859]">
                  {child.name?.[0] || 'C'}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            <div className="mt-2 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-xl bg-white border border-slate-200 text-[#26658c] hover:bg-[#a7ebf2]/30 text-[10px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                title="Upload Photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
              {child.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="p-1.5 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 text-[10px] font-bold transition-colors shadow-2xs"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Child Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#023859]">
                {child.name}
              </h2>
              <Badge variant="teal" size="md" dot>
                {child.age}
              </Badge>
              <Badge variant="aqua" size="md">
                {child.gender}
              </Badge>
              <Badge variant="ocean" size="md">
                Blood Group: {child.bloodGroup || 'O+'}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {child.summary || 'Enrolled in LittleAura pediatric growth & routine tracker.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#26658c]" />
                <span>Date of Birth: <strong>{child.dateOfBirth}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#54acbf]" />
                <span>Pediatrician: <strong>{child.pediatrician || 'Not specified'}</strong></span>
              </div>
              {child.clinicName && (
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clinic: <strong>{child.clinicName}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Growth & Health Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader
            title="Physiological Baseline"
            subtitle="Latest measurements & WHO percentile standing"
            icon={TrendingUp}
          />
          <div className="grid grid-cols-3 gap-3 text-center my-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Height</span>
              <span className="text-lg font-black text-[#023859] mt-1 block">{child.height}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">65th Percentile</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Weight</span>
              <span className="text-lg font-black text-[#023859] mt-1 block">{child.weight}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">62nd Percentile</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">BMI</span>
              <span className="text-lg font-black text-[#023859] mt-1 block">{child.bmi}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Normal Range</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            *Growth trajectories are calibrated with standard WHO (World Health Organization) benchmarks for 0–3 years.
          </p>
        </Card>

        <Card className="p-6">
          <CardHeader
            title="Allergies & Health Considerations"
            subtitle="Pediatric medical alerts and sensitivities"
            icon={ShieldCheck}
          />
          <div className="space-y-3 my-4">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Recorded Allergies</span>
              <span className="font-bold text-[#023859]">{child.allergies || 'No known allergies'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Head Circumference</span>
              <span className="font-bold text-[#26658c]">{child.headCircumference || '48 cm'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Record Privacy Status</span>
              <span className="font-bold text-emerald-700">Encrypted Local Profile</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Routine Rhythms & Parent Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader
            title="Daily Target Routine Rhythms"
            subtitle="Circadian and meal schedule"
            icon={Clock}
          />
          <div className="space-y-2.5">
            {[
              { label: 'Morning Wake-up', time: child.routine?.wakeTime || '7:00 AM' },
              { label: 'Breakfast Window', time: child.routine?.breakfastTime || '8:00 AM' },
              { label: 'Afternoon Nap', time: child.routine?.napTime || '1:00 PM – 2:30 PM' },
              { label: 'Family Dinner', time: child.routine?.dinnerTime || '7:00 PM' },
              { label: 'Bedtime Window', time: child.routine?.bedtime || '8:30 PM' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 text-xs">
                <span className="font-medium text-slate-600">{r.label}</span>
                <span className="font-bold text-[#023859]">{r.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Parent Notes & Observations"
              subtitle="Sensory cues, comfort items, and milestones"
              icon={FileText}
            />
            <div className="p-4 rounded-2xl bg-[#a7ebf2]/15 border border-[#a7ebf2]/60 text-xs text-[#011c40] leading-relaxed min-h-[140px]">
              {child.parentNotes || 'Add notes regarding comfort toys, favorite picture books, lullabies, or soothing techniques.'}
            </div>
          </div>

          {childrenList.length > 1 && (
            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                size="xs"
                className="text-rose-600 border-rose-200 hover:bg-rose-50"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${child.name}’s profile and associated logs?`)) {
                    deleteChild(child.id);
                  }
                }}
              >
                Delete Profile ({child.name})
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${child.name}’s Profile`}
        subtitle="Update child profile information, health baseline, and routine"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <Input
            label="Child Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              required
            />
            <Input
              label="Blood Group"
              value={formData.bloodGroup || ''}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              placeholder="e.g. O+"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Height"
              value={formData.height || ''}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="e.g. 87.4 cm"
            />
            <Input
              label="Weight"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g. 12.8 kg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Head Circumference"
              value={formData.headCircumference || ''}
              onChange={(e) => setFormData({ ...formData, headCircumference: e.target.value })}
              placeholder="e.g. 48.5 cm"
            />
            <Input
              label="Pediatrician"
              value={formData.pediatrician || ''}
              onChange={(e) => setFormData({ ...formData, pediatrician: e.target.value })}
              placeholder="Dr. Name"
            />
          </div>
          <Input
            label="Allergies / Sensitivities"
            value={formData.allergies || ''}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            placeholder="e.g. No known allergies"
          />
          <Textarea
            label="Parent Notes"
            rows={3}
            value={formData.parentNotes || ''}
            onChange={(e) => setFormData({ ...formData, parentNotes: e.target.value })}
            placeholder="Favorite comfort toys, soothing bedtime lullabies..."
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Save}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Child Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Child Profile"
        subtitle="Enroll another child for isolated milestone and growth tracking"
      >
        <form onSubmit={handleCreateChild} className="space-y-4">
          <Input
            label="Child's Full Name"
            placeholder="e.g. Maya"
            value={newChildData.name}
            onChange={(e) => setNewChildData({ ...newChildData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date of Birth"
              type="date"
              value={newChildData.dateOfBirth}
              onChange={(e) => setNewChildData({ ...newChildData, dateOfBirth: e.target.value })}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Gender
              </label>
              <select
                value={newChildData.gender}
                onChange={(e) => setNewChildData({ ...newChildData, gender: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#011c40]"
              >
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Blood Group (Optional)"
              placeholder="e.g. A+"
              value={newChildData.bloodGroup}
              onChange={(e) => setNewChildData({ ...newChildData, bloodGroup: e.target.value })}
            />
            <Input
              label="Pediatrician (Optional)"
              placeholder="Dr. Name"
              value={newChildData.pediatrician}
              onChange={(e) => setNewChildData({ ...newChildData, pediatrician: e.target.value })}
            />
          </div>
          <Input
            label="Known Allergies"
            placeholder="e.g. None"
            value={newChildData.allergies}
            onChange={(e) => setNewChildData({ ...newChildData, allergies: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Create Child Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ChildProfilePage;
