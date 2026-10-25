import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Clock,
  BookOpen,
  Bot,
  Bell,
  Heart,
  User,
  Calendar,
  Smile,
  Upload,
  Camera,
  Lock,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input, Textarea } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useChild } from '../context/ChildContext';
import { calculateAge } from '../data/demoData';

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const { user, updateUserProfile } = useAuth();
  const { child, updateChildProfile } = useChild();
  const navigate = useNavigate();

  // Step 1: Parent Information
  const [parentName, setParentName] = useState(user?.name || 'Gokul');
  const [relationship, setRelationship] = useState('Father');

  // Step 2: Child Information
  const [childName, setChildName] = useState(child?.name || 'Aarav');
  const [dob, setDob] = useState(child?.dateOfBirth || '2024-09-05');
  const [gender, setGender] = useState(child?.gender || 'Boy');
  const [avatarPreview, setAvatarPreview] = useState(child?.avatar || '');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('None known');
  const [pediatrician, setPediatrician] = useState('Dr. Priya Sharma');

  // Step 3: Parenting Goals
  const availableGoals = [
    { id: 'growth', label: 'Growth Tracking', desc: 'Monitor height, weight & WHO percentiles', icon: TrendingUp },
    { id: 'health', label: 'Health Records', desc: 'Vaccine schedules & doctor consultations', icon: ShieldCheck },
    { id: 'daily', label: 'Daily Care', desc: 'Feeding, nap times & diaper routine', icon: Clock },
    { id: 'learning', label: 'Learning & Play', desc: 'Age-tailored 10-minute activities', icon: BookOpen },
    { id: 'guidance', label: 'Parenting Guidance', desc: 'AI sleep & nutrition support', icon: Bot },
    { id: 'reminders', label: 'Smart Reminders', desc: 'Medicine alerts & inventory restock', icon: Bell },
  ];
  const [selectedGoals, setSelectedGoals] = useState(['growth', 'health', 'daily', 'guidance']);

  // Dynamic age calculated from entered date of birth
  const calculatedAge = calculateAge(dob);

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      updateUserProfile({ name: parentName, relationship });
      setStep(2);
    } else if (step === 2) {
      updateChildProfile({
        name: childName,
        dateOfBirth: dob,
        gender,
        avatar: avatarPreview,
        bloodGroup,
        allergies,
        pediatrician
      });
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-pureWhite text-midnightNavy flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-deepOcean flex items-center justify-center text-aquaMist shadow-xs">
            <Sparkles className="w-5 h-5 text-aquaMist" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-navyBlue">
              LittleAura
            </span>
            <p className="text-[10px] text-oceanTeal font-bold uppercase tracking-wider -mt-1">
              Personalized Setup
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-deepOcean'
                  : s < step
                  ? 'w-2 bg-oceanTeal'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-deepOcean ml-2">
            Step {step} of 4
          </span>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-xl mx-auto w-full my-auto py-8">
        {/* Step 1: Parent Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-oceanTeal uppercase tracking-wider">
                Step 1 of 4 • Parent Details
              </span>
              <h2 className="text-2xl font-extrabold text-navyBlue mt-1">
                Tell us about yourself
              </h2>
              <p className="text-xs text-navyBlue/70 mt-1">
                We personalize greetings, daily logs, and co-parenting roles based on your profile.
              </p>
            </div>

            <Card className="p-6 space-y-4 border-slate-200 shadow-sm">
              <Input
                label="Your Full Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Gokul"
                icon={User}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                  Relationship to Child
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mother', 'Father', 'Guardian'].map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => setRelationship(rel)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        relationship === rel
                          ? 'border-deepOcean bg-aquaMist/30 text-navyBlue shadow-xs'
                          : 'border-slate-200 text-navyBlue/70 hover:bg-slate-50'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-navyBlue/80">
                <Lock className="w-4 h-4 text-deepOcean shrink-0 mt-0.5" />
                <p>
                  Your details are private to your family. You can invite a co-parent or caregiver at any time from Settings.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Child Information */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-oceanTeal uppercase tracking-wider">
                Step 2 of 4 • Child Profile
              </span>
              <h2 className="text-2xl font-extrabold text-navyBlue mt-1">
                Tell us about your little one
              </h2>
              <p className="text-xs text-navyBlue/70 mt-1">
                Growth curves, WHO benchmarks, and routine insights will be accurately calibrated to this age window.
              </p>
            </div>

            <Card className="p-6 space-y-5 border-slate-200 shadow-sm">
              {/* Optional Photo Upload Preview */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-aquaMist/30 border-2 border-deepOcean/30 overflow-hidden flex items-center justify-center font-bold text-navyBlue text-lg">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Child preview" className="w-full h-full object-cover" />
                    ) : (
                      childName?.[0] || 'C'
                    )}
                  </div>
                  <label
                    htmlFor="child-photo-input"
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-deepOcean text-aquaMist flex items-center justify-center cursor-pointer shadow-xs hover:bg-navyBlue transition-colors"
                    title="Upload child photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </label>
                  <input
                    id="child-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navyBlue">Child's Photo (Optional)</h4>
                  <p className="text-[11px] text-navyBlue/60">Upload a portrait or avatar for personalized milestone tracking.</p>
                </div>
              </div>

              <Input
                label="Child's Full Name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Aarav"
                icon={Smile}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    icon={Calendar}
                    required
                  />
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-navyBlue/80">
                    <span className="font-semibold">Calculated Age:</span>
                    <Badge variant="aqua" size="sm">{calculatedAge}</Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                    Gender (For WHO Standards)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Boy', 'Girl'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          gender === g
                            ? 'border-deepOcean bg-aquaMist/30 text-navyBlue shadow-xs'
                            : 'border-slate-200 text-navyBlue/70 hover:bg-slate-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional Health Information */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navyBlue uppercase tracking-wider">
                    Optional Health Profile
                  </span>
                  <span className="text-[10px] text-oceanTeal font-bold">You can update this anytime</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Pediatrician Name"
                    value={pediatrician}
                    onChange={(e) => setPediatrician(e.target.value)}
                    placeholder="e.g. Dr. Priya Sharma"
                    icon={Stethoscope}
                  />

                  <Input
                    label="Known Allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. None known, Dairy"
                    icon={AlertCircle}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Parenting Goals */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-oceanTeal uppercase tracking-wider">
                Step 3 of 4 • Primary Modules
              </span>
              <h2 className="text-2xl font-extrabold text-navyBlue mt-1">
                What are your main parenting priorities?
              </h2>
              <p className="text-xs text-navyBlue/70 mt-1">
                Select features you would like highlighted on your dashboard overview.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableGoals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <div
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isSelected
                        ? 'border-deepOcean bg-aquaMist/20 text-navyBlue shadow-xs'
                        : 'border-slate-200 bg-pureWhite text-navyBlue/70 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-deepOcean text-aquaMist' : 'bg-slate-100 text-navyBlue/60'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-navyBlue">{goal.label}</h4>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-deepOcean shrink-0" />}
                      </div>
                      <p className="text-[11px] text-navyBlue/70 mt-0.5 line-clamp-1">{goal.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation & Welcome */}
        {step === 4 && (
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-deepOcean text-aquaMist flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-aquaMist" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-navyBlue tracking-tight">
                Welcome to LittleAura.
              </h2>
              <p className="text-sm text-navyBlue/80 mt-2 max-w-sm mx-auto">
                {childName}’s smart profile and customized health companion are initialized. Let’s explore your new dashboard!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pureWhite border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-2.5 shadow-xs">
              <div className="flex justify-between items-center text-navyBlue/70">
                <span>Child</span>
                <span className="font-bold text-navyBlue">{childName} ({gender}, {calculatedAge})</span>
              </div>
              <div className="flex justify-between items-center text-navyBlue/70">
                <span>Parent</span>
                <span className="font-bold text-navyBlue">{parentName} ({relationship})</span>
              </div>
              <div className="flex justify-between items-center text-navyBlue/70">
                <span>Pediatrician</span>
                <span className="font-bold text-navyBlue">{pediatrician || 'Not specified'}</span>
              </div>
              <div className="flex justify-between items-center text-navyBlue/70">
                <span>Connected Modules</span>
                <span className="font-bold text-deepOcean">{selectedGoals.length} Activated</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-aquaMist/20 text-xs text-navyBlue max-w-sm mx-auto">
              You can easily edit these details, add siblings, or update growth measurements at any time.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="max-w-2xl mx-auto w-full pt-6 flex items-center justify-between border-t border-slate-200">
        {step > 1 && step < 4 ? (
          <Button
            variant="outline"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={() => setStep(prev => prev - 1)}
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          onClick={handleNext}
        >
          {step === 4 ? 'Launch Dashboard' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
