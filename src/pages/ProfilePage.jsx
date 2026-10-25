import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Heart,
  Edit3,
  Users,
  Clock,
  Sparkles,
  Save,
  CheckCircle2,
  Camera,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';
import { useChild } from '../context/ChildContext';

export function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { childrenList, activeChildId, switchChild } = useChild();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || 'Gokul');
  const [email, setEmail] = useState(user?.email || 'gokul@littleaura.app');
  const [role, setRole] = useState(user?.role || 'Primary Parent (Father)');
  const [partnerLinked, setPartnerLinked] = useState(user?.partnerLinked || 'Priya (Co-Parent)');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      role,
      partnerLinked,
      avatar: avatarUrl || user?.avatar
    });
    setIsEditModalOpen(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
            Parent Profile & Family Hub
          </h1>
          <p className="text-xs sm:text-sm text-navyBlue/70 mt-0.5">
            Manage your personal credentials, linked co-parent access, and enrolled children.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Edit3}
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Profile
        </Button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Parent profile updated successfully.</span>
        </div>
      )}

      {/* Parent Profile Card */}
      <Card className="p-6 md:p-8 border-slate-200 shadow-sm bg-pureWhite">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-aquaMist bg-aquaMist/30 flex items-center justify-center font-bold text-2xl text-navyBlue shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || 'Gokul'}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.[0] || 'G'
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h2 className="text-2xl font-black text-navyBlue">
                {user?.name || 'Gokul'}
              </h2>
              <Badge variant="ocean" size="md">
                {user?.role || 'Primary Parent'}
              </Badge>
              <Badge variant="mint" size="md">
                Verified Account
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-navyBlue/70 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-deepOcean" />
              <span>{user?.email || 'gokul@littleaura.app'}</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-navyBlue/70">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-deepOcean" />
                <span>Co-Parent: <strong>{user?.partnerLinked || 'Priya'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-deepOcean" />
                <span>Security: <strong>Firestore Rules Active</strong></span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Enrolled Children Section */}
      <Card className="p-6 border-slate-200 shadow-sm bg-pureWhite space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-navyBlue">Enrolled Children</h3>
            <p className="text-xs text-navyBlue/60">Switch active profiles or edit health records</p>
          </div>
          <Link to="/child">
            <Button variant="ghost" size="sm" className="text-deepOcean hover:bg-aquaMist/20 text-xs">
              Manage in Child Profile <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChildId;
            return (
              <div
                key={ch.id}
                onClick={() => switchChild(ch.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isActive
                    ? 'border-deepOcean bg-aquaMist/20 ring-2 ring-deepOcean/20 shadow-xs'
                    : 'border-slate-200 bg-pureWhite hover:border-deepOcean/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-deepOcean text-aquaMist flex items-center justify-center font-bold text-base overflow-hidden shrink-0">
                    {ch.photoUrl ? (
                      <img src={ch.photoUrl} alt={ch.name} className="w-full h-full object-cover" />
                    ) : (
                      ch.name?.[0] || 'C'
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-navyBlue">{ch.name}</h4>
                      {isActive && <Badge variant="aqua" size="sm">Active</Badge>}
                    </div>
                    <p className="text-xs text-navyBlue/70 mt-0.5">
                      {ch.gender} • {ch.dateOfBirth}
                    </p>
                  </div>
                </div>

                <Button
                  variant={isActive ? 'primary' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  {isActive ? 'Current' : 'Switch'}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Parent Profile"
          subtitle="Update your personal details and family co-parenting role"
          size="md"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 pb-3 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-aquaMist/30 border border-slate-200 flex items-center justify-center overflow-hidden font-bold text-navyBlue shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  name?.[0] || 'P'
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-navyBlue mb-1">
                  Profile Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="text-xs text-navyBlue file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-deepOcean file:text-pureWhite hover:file:bg-navyBlue cursor-pointer"
                />
              </div>
            </div>

            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gokul"
              icon={User}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. parent@littleaura.app"
              icon={Mail}
              required
            />

            <Input
              label="Family Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Primary Parent, Father, Mother"
            />

            <Input
              label="Co-Parent / Partner Link"
              value={partnerLinked}
              onChange={(e) => setPartnerLinked(e.target.value)}
              placeholder="e.g. Priya (Co-Parent)"
              icon={Users}
            />

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Save}
              >
                Save Profile
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
