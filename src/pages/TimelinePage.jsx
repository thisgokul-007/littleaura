import React, { useState } from 'react';
import {
  GitCommit,
  Scale,
  Moon,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Gift,
  Calendar,
  Filter,
  Plus,
  Search,
  Clock,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Input, Textarea } from '../components/common/Input';
import { EmptyState } from '../components/common/EmptyState';
import { useChild } from '../context/ChildContext';

export function TimelinePage() {
  const { child, timeline, addTimelineMilestone } = useChild();
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);

  const [newMilestone, setNewMilestone] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Motor & Movement',
    notes: ''
  });

  const filterOptions = [
    { id: 'All', label: 'All Events' },
    { id: 'growth', label: 'Growth Measurements' },
    { id: 'medical', label: 'Medical & Vaccines' },
    { id: 'daily-care', label: 'Daily Care' },
    { id: 'learning', label: 'Early Learning' },
    { id: 'milestone', label: 'Milestones' }
  ];

  const filteredTimeline = timeline.filter(item => {
    if (filterType !== 'All' && item.type !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'growth': return Scale;
      case 'daily-care': return Moon;
      case 'learning': return Sparkles;
      case 'medical': return ShieldCheck;
      case 'milestone': return Gift;
      default: return Calendar;
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'growth': return 'ocean';
      case 'daily-care': return 'teal';
      case 'learning': return 'aqua';
      case 'medical': return 'navy';
      case 'milestone': return 'yellow';
      default: return 'gray';
    }
  };

  const handleAddMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!newMilestone.title) return;
    addTimelineMilestone({
      title: newMilestone.title,
      description: newMilestone.notes || 'Celebrated milestone recorded in journal.',
      date: newMilestone.date,
      category: newMilestone.category
    });
    setIsAddMilestoneOpen(false);
    setNewMilestone({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Motor & Movement',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
            Child Life Timeline
          </h1>
          <p className="text-xs sm:text-sm text-navyBlue/70 mt-0.5">
            A continuous chronological journal of {child.name}’s milestones, care routines, vaccinations, and growth records.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsAddMilestoneOpen(true)}
        >
          Add Milestone
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 space-y-3.5 border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-deepOcean/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline records by event name or description..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-navyBlue placeholder:text-navyBlue/40 focus:outline-none focus:ring-2 focus:ring-deepOcean/30"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilterType(opt.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                filterType === opt.id
                  ? 'bg-deepOcean text-pureWhite shadow-xs'
                  : 'bg-pureWhite border border-slate-200 text-navyBlue/70 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Timeline Stream */}
      {filteredTimeline.length === 0 ? (
        <EmptyState
          icon={GitCommit}
          title="No timeline events found"
          description="There are no events matching your selected filter or search query."
          actionText="Clear Filters"
          onAction={() => {
            setFilterType('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-aquaMist/60">
          {filteredTimeline.map((item) => {
            const Icon = getIcon(item.type);
            const badgeVariant = getBadgeVariant(item.type);

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Pin */}
                <div className="absolute -left-6 sm:-left-8 top-3.5 w-6 h-6 rounded-full bg-pureWhite border-2 border-deepOcean flex items-center justify-center text-deepOcean shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-deepOcean" />
                </div>

                {/* Event Card */}
                <Card
                  className="p-5 hover:border-deepOcean hover:shadow-md transition-all cursor-pointer border-slate-200 bg-pureWhite"
                  onClick={() => setSelectedEvent(item)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={badgeVariant} size="sm">
                        {item.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-navyBlue/60">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-semibold text-deepOcean">
                      <span>View details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-aquaMist/30 text-deepOcean flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-navyBlue">
                        {item.title}
                      </h3>
                      <p className="text-xs text-navyBlue/70 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          subtitle={`Recorded on ${selectedEvent.date} • ${selectedEvent.type.toUpperCase()}`}
          size="md"
        >
          <div className="space-y-4 text-navyBlue">
            <div className="p-4 rounded-2xl bg-aquaMist/20 border border-aquaMist/50 space-y-1">
              <span className="text-xs font-bold text-deepOcean uppercase tracking-wider">
                Event Description
              </span>
              <p className="text-xs sm:text-sm text-navyBlue leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-navyBlue/60 font-semibold block mb-0.5">Category</span>
                <span className="font-bold text-navyBlue capitalize">{selectedEvent.type.replace('-', ' ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-navyBlue/60 font-semibold block mb-0.5">Child</span>
                <span className="font-bold text-navyBlue">{child.name}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Custom Milestone Modal */}
      {isAddMilestoneOpen && (
        <Modal
          isOpen={isAddMilestoneOpen}
          onClose={() => setIsAddMilestoneOpen(false)}
          title="Record Childhood Milestone"
          subtitle={`Capture an unforgettable victory or developmental step for ${child.name}`}
          size="md"
        >
          <form onSubmit={handleAddMilestoneSubmit} className="space-y-4">
            <Input
              label="Milestone Title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              placeholder="e.g. First Independent Steps, Spoke 3-word phrase"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Date of Milestone"
                type="date"
                value={newMilestone.date}
                onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                  Milestone Category
                </label>
                <select
                  value={newMilestone.category}
                  onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-pureWhite border border-slate-200 text-navyBlue focus:outline-none focus:ring-2 focus:ring-deepOcean/30"
                >
                  <option value="Motor & Movement">Motor & Movement</option>
                  <option value="Speech & Communication">Speech & Communication</option>
                  <option value="Social & Emotional">Social & Emotional</option>
                  <option value="Cognitive & Curiosity">Cognitive & Curiosity</option>
                  <option value="Sleep & Routine">Sleep & Routine</option>
                  <option value="Nutrition & Eating">Nutrition & Eating</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Parent Notes & Reflections"
              value={newMilestone.notes}
              onChange={(e) => setNewMilestone({ ...newMilestone, notes: e.target.value })}
              placeholder="Describe what happened, how your child reacted, or how the family celebrated..."
              rows={3}
            />

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddMilestoneOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Save to Timeline
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
