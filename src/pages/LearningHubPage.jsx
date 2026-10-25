import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  Play,
  Filter,
  Check,
  Award,
  Layers,
  Smile,
  Heart,
  Search,
  AlertTriangle,
  Lightbulb,
  Compass
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useChild } from '../context/ChildContext';

export function LearningHubPage() {
  const { child, learningActivities, toggleLearningActivity, toggleFavoriteActivity } = useChild();
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeActivityModal, setActiveActivityModal] = useState(null);

  const ageStages = ['All', '0–6m', '6–12m', '12–24m', '24–36m'];
  const categories = [
    'All',
    'Language & Cognitive',
    'Gross Motor Skills',
    'Cognitive & Fine Motor',
    'Social & Sensory Play',
    'Motor & Social',
    'Fine Motor & Hand-Eye'
  ];

  const filteredActivities = learningActivities.filter(act => {
    if (selectedAge !== 'All' && act.ageGroup && !act.ageGroup.includes(selectedAge.replace('m', ''))) return false;
    if (selectedCategory !== 'All' && act.category !== selectedCategory) return false;
    if (selectedLocation !== 'All' && act.location !== selectedLocation) return false;
    if (selectedDuration !== 'All' && act.duration !== selectedDuration) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = act.title?.toLowerCase().includes(q);
      const matchDesc = act.description?.toLowerCase().includes(q);
      const matchSkill = act.skillSupported?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSkill) return false;
    }
    return true;
  });

  const completedCount = learningActivities.filter(a => a.completed).length;

  const handleCompleteActivity = (id) => {
    const act = learningActivities.find(a => a.id === id);
    const willBeCompleted = !act?.completed;
    toggleLearningActivity(id);

    if (willBeCompleted) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    setActiveActivityModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
              Early Learning Hub
            </h1>
            <Badge variant="aqua" size="md">
              Stage: {child.age}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-navyBlue/70 mt-1">
            Curated 5 to 15-minute screen-free play activities tailored to nurture communication, motor precision, and emotional discovery.
          </p>
        </div>

        {/* Completed Counter Badge */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-aquaMist/25 border border-aquaMist/50 text-navyBlue">
          <Award className="w-5 h-5 text-deepOcean" />
          <div className="text-left">
            <div className="text-xs font-bold leading-none">{completedCount} Completed</div>
            <div className="text-[10px] text-navyBlue/60 mt-0.5">Development milestones logged</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3.5 border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-deepOcean/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities by name, skill, or materials (e.g. blocks, colors, jumping)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-navyBlue placeholder:text-navyBlue/40 focus:outline-none focus:ring-2 focus:ring-deepOcean/30"
          />
        </div>

        {/* Age Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-navyBlue shrink-0 mr-1">Age Window:</span>
          {ageStages.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => setSelectedAge(age)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedAge === age
                  ? 'bg-deepOcean text-pureWhite shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-navyBlue/70 hover:bg-slate-100'
              }`}
            >
              {age}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-aquaMist/50 text-navyBlue border border-deepOcean/30 shadow-xs'
                  : 'bg-pureWhite border border-slate-200 text-navyBlue/70 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Location & Duration Filter Chips */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-navyBlue/60 px-1.5">Location:</span>
            {['All', 'Indoor', 'Outdoor'].map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedLocation === loc ? 'bg-pureWhite text-navyBlue shadow-xs' : 'text-navyBlue/60'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-navyBlue/60 px-1.5">Duration:</span>
            {['All', '5 min', '10 min', '15 min'].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setSelectedDuration(dur)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedDuration === dur ? 'bg-pureWhite text-navyBlue shadow-xs' : 'text-navyBlue/60'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No activities match your filters"
          description="Try broadening your search or clearing selected categories to see more age-appropriate play ideas."
          actionText="Reset Filters"
          onAction={() => {
            setSelectedAge('All');
            setSelectedCategory('All');
            setSelectedLocation('All');
            setSelectedDuration('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <Card
              key={act.id}
              className={`p-5 flex flex-col justify-between border-slate-200 hover:border-deepOcean hover:shadow-md transition-all ${
                act.completed ? 'bg-slate-50/70 border-emerald-200' : 'bg-pureWhite'
              }`}
            >
              <div>
                {/* Card Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="aqua" size="sm">
                    {act.category}
                  </Badge>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFavoriteActivity(act.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        act.favorite ? 'text-rose-500' : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={act.favorite ? 'Remove favorite' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${act.favorite ? 'fill-rose-500' : ''}`} />
                    </button>

                    {act.completed && (
                      <Badge variant="mint" size="sm">
                        <Check className="w-3 h-3 mr-0.5 inline" /> Done
                      </Badge>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-navyBlue mb-1.5 hover:text-deepOcean transition-colors cursor-pointer" onClick={() => setActiveActivityModal(act)}>
                  {act.title}
                </h3>
                <p className="text-xs text-navyBlue/70 line-clamp-2 mb-4 leading-relaxed">
                  {act.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-navyBlue/70 mb-4">
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                    <Clock className="w-3.5 h-3.5 text-deepOcean" />
                    <span>{act.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                    <MapPin className="w-3.5 h-3.5 text-deepOcean" />
                    <span>{act.location}</span>
                  </div>
                  {act.materials && (
                    <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium truncate max-w-[140px]">
                      <span>📦 {act.materials}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-deepOcean hover:bg-aquaMist/20 text-xs px-2.5"
                  onClick={() => setActiveActivityModal(act)}
                >
                  View Guide
                </Button>

                <Button
                  variant={act.completed ? 'secondary' : 'primary'}
                  size="sm"
                  className="text-xs px-3"
                  onClick={() => handleCompleteActivity(act.id)}
                >
                  {act.completed ? 'Completed' : 'Mark Done'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Activity Detail Modal */}
      {activeActivityModal && (
        <Modal
          isOpen={Boolean(activeActivityModal)}
          onClose={() => setActiveActivityModal(null)}
          title={activeActivityModal.title}
          subtitle={`${activeActivityModal.category} • ${activeActivityModal.duration} • ${activeActivityModal.location}`}
          size="lg"
        >
          <div className="space-y-5 text-navyBlue">
            {/* Why This Helps Development */}
            <div className="p-4 rounded-2xl bg-aquaMist/20 border border-aquaMist/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-deepOcean uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-oceanTeal" />
                <span>Developmental Purpose</span>
              </div>
              <p className="text-xs sm:text-sm text-navyBlue/90 leading-relaxed">
                {activeActivityModal.developmentalGoal ||
                  `This activity supports ${activeActivityModal.skillSupported || 'fine motor, bilateral integration, and cognitive problem-solving'}. It encourages exploratory play without screen fatigue.`}
              </p>
            </div>

            {/* Materials List */}
            {activeActivityModal.materials && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-navyBlue uppercase tracking-wider">
                  Materials Needed
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navyBlue">
                  {activeActivityModal.materials}
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-navyBlue uppercase tracking-wider">
                How to Play Together
              </h4>
              <div className="space-y-2 text-xs leading-relaxed text-navyBlue/85">
                {activeActivityModal.steps && activeActivityModal.steps.length > 0 ? (
                  activeActivityModal.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-5 h-5 rounded-lg bg-deepOcean text-pureWhite flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <p>1. Find a calm, open floor space with adequate natural light.</p>
                    <p>2. Introduce the materials gently and allow your toddler to handle and inspect them autonomously.</p>
                    <p>3. Ask open-ended questions like: <em>“Which texture feels softer?”</em> or <em>“Can we balance two blocks together?”</em></p>
                    <p>4. Celebrate curiosity and effort rather than perfection.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Safety & Parental Supervision */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Parental supervision required:</strong> Inspect all materials for small parts or choking hazards before starting play. Always stay within arm's reach.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveActivityModal(null)}
              >
                Close
              </Button>

              <Button
                variant={activeActivityModal.completed ? 'secondary' : 'primary'}
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleCompleteActivity(activeActivityModal.id)}
              >
                {activeActivityModal.completed ? 'Mark as Incomplete' : 'Celebrate & Mark Done'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
