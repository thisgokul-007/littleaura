import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  ShieldCheck,
  Stethoscope,
  Pill,
  BookOpen,
  Bell,
  MapPin,
  CheckCircle2,
  Trash2,
  Sparkles,
  Scissors
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';

export function CalendarPage() {
  const { child, calendarEvents, addCalendarEvent, deleteCalendarEvent } = useChild();
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week'
  const [currentMonth, setCurrentMonth] = useState('October 2026');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-10-14',
    time: '10:00 AM',
    type: 'doctor',
    recurrence: 'once',
    notes: ''
  });

  const getEventBadgeVariant = (type) => {
    switch (type) {
      case 'vaccination': return 'ocean';
      case 'doctor': return 'teal';
      case 'medicine': return 'navy';
      case 'care': return 'aqua';
      default: return 'gray';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'vaccination': return ShieldCheck;
      case 'doctor': return Stethoscope;
      case 'medicine': return Pill;
      case 'care': return Scissors;
      default: return Bell;
    }
  };

  const filteredEvents = calendarEvents.filter(ev => {
    if (selectedTypeFilter !== 'all' && ev.type !== selectedTypeFilter) return false;
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    addCalendarEvent({
      ...newEvent,
      badge: newEvent.type.charAt(0).toUpperCase() + newEvent.type.slice(1)
    });
    setIsAddModalOpen(false);
    setNewEvent({
      title: '',
      date: '2026-10-14',
      time: '10:00 AM',
      type: 'doctor',
      recurrence: 'once',
      notes: ''
    });
  };

  // Calendar dates representation for October 2026 (starting on Thursday, 31 days)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Helper to find events on a given day of October 2026
  const getEventsForDay = (day) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const targetDate = `2026-10-${dayStr}`;
    return filteredEvents.filter(e => e.date === targetDate);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navyBlue tracking-tight">
            Family Calendar & Care Schedules
          </h1>
          <p className="text-xs sm:text-sm text-navyBlue/70 mt-0.5">
            Synchronized pediatric checkups, vaccination reminders, and routine care tasks for {child.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'month' ? 'bg-pureWhite text-navyBlue shadow-xs' : 'text-navyBlue/60'
              }`}
            >
              Month View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                viewMode === 'week' ? 'bg-pureWhite text-navyBlue shadow-xs' : 'text-navyBlue/60'
              }`}
            >
              Schedule List
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Event
          </Button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All Schedules' },
          { id: 'vaccination', label: 'Vaccinations' },
          { id: 'doctor', label: 'Doctor Visits' },
          { id: 'medicine', label: 'Medications' },
          { id: 'care', label: 'Recurring Care' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedTypeFilter(item.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedTypeFilter === item.id
                ? 'bg-deepOcean text-pureWhite shadow-xs'
                : 'bg-pureWhite border border-slate-200 text-navyBlue/70 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Calendar + Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month Calendar Grid or Week Schedule */}
        <div className="lg:col-span-2">
          {viewMode === 'month' ? (
            <Card className="p-6 border-slate-200 shadow-sm bg-pureWhite">
              {/* Month Header Switcher */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base sm:text-lg font-bold text-navyBlue">
                  {currentMonth}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-navyBlue"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-navyBlue"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-navyBlue/60 mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1.5 text-xs">
                {/* Blank days for Thursday start (4 days) */}
                {[null, null, null, null].map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 sm:h-24 p-1.5 rounded-xl bg-slate-50/50 border border-transparent" />
                ))}

                {daysInMonth.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = day === 8;

                  return (
                    <div
                      key={day}
                      className={`h-20 sm:h-24 p-1.5 rounded-xl border transition-all flex flex-col justify-between select-none ${
                        isToday
                          ? 'border-deepOcean bg-aquaMist/20 shadow-xs'
                          : 'border-slate-200/80 bg-pureWhite hover:border-deepOcean/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-bold ${isToday ? 'text-deepOcean font-black' : 'text-navyBlue'}`}>
                          {day}
                        </span>
                        {isToday && (
                          <span className="text-[9px] uppercase font-bold text-deepOcean">Today</span>
                        )}
                      </div>

                      <div className="space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 2).map((ev) => {
                          const Icon = getEventIcon(ev.type);
                          return (
                            <div
                              key={ev.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(ev);
                              }}
                              className="px-1.5 py-0.5 rounded-md bg-deepOcean text-pureWhite text-[10px] font-medium truncate flex items-center gap-1 cursor-pointer hover:bg-navyBlue transition-colors"
                              title={`${ev.time} - ${ev.title}`}
                            >
                              <Icon className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{ev.title}</span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-[9px] text-deepOcean font-bold text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ) : (
            /* Schedule List View */
            <Card className="p-6 border-slate-200 shadow-sm bg-pureWhite space-y-4">
              <h2 className="text-base font-bold text-navyBlue">
                Chronological Schedule Feed
              </h2>
              <div className="space-y-3">
                {filteredEvents.map((ev) => {
                  const Icon = getEventIcon(ev.type);
                  const badgeVariant = getEventBadgeVariant(ev.type);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="p-4 rounded-2xl bg-pureWhite border border-slate-200 hover:border-deepOcean transition-all cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-aquaMist/30 text-deepOcean flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-navyBlue">{ev.title}</h4>
                            <Badge variant={badgeVariant} size="sm">{ev.type}</Badge>
                          </div>
                          <p className="text-xs text-navyBlue/70 mt-0.5">
                            {ev.date} at {ev.time} {ev.notes ? `• ${ev.notes}` : ''}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-deepOcean">
                        Details
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar: Upcoming Reminders & Care Tasks */}
        <div className="space-y-6">
          <Card className="p-5 border-slate-200 shadow-sm bg-pureWhite space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-navyBlue uppercase tracking-wider">
                <Bell className="w-4 h-4 text-deepOcean" />
                <span>Upcoming This Month</span>
              </div>
              <Badge variant="aqua" size="sm">{filteredEvents.length} Tasks</Badge>
            </div>

            <div className="space-y-3">
              {filteredEvents.slice(0, 5).map((ev) => {
                const Icon = getEventIcon(ev.type);
                const badgeVariant = getEventBadgeVariant(ev.type);

                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="p-3.5 rounded-xl border border-slate-200/80 hover:border-deepOcean bg-slate-50/50 transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant={badgeVariant} size="sm">
                        {ev.type.toUpperCase()}
                      </Badge>
                      <span className="text-[11px] font-bold text-deepOcean">
                        {ev.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-navyBlue">
                      {ev.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] text-navyBlue/60">
                      <Clock className="w-3 h-3 text-deepOcean" />
                      <span>{ev.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Care Routines Checklist Card */}
          <Card className="p-5 border-slate-200 shadow-sm bg-pureWhite space-y-3">
            <h3 className="text-xs font-bold text-navyBlue uppercase tracking-wider flex items-center gap-2">
              <Scissors className="w-4 h-4 text-oceanTeal" />
              <span>Recurring Care Hygiene</span>
            </h3>
            <div className="space-y-2 text-xs text-navyBlue">
              <div className="p-2.5 rounded-xl bg-aquaMist/20 border border-aquaMist/50 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Nail Trimming</span>
                  <span className="text-[10px] text-navyBlue/70">Every Sunday morning after bath</span>
                </div>
                <Badge variant="aqua" size="sm">Weekly</Badge>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Toothbrush Replacement</span>
                  <span className="text-[10px] text-navyBlue/70">Every 3 months</span>
                </div>
                <Badge variant="ocean" size="sm">Quarterly</Badge>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Toy Disinfection & Bath</span>
                  <span className="text-[10px] text-navyBlue/70">Bi-weekly routine</span>
                </div>
                <Badge variant="teal" size="sm">Bi-Weekly</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          isOpen={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          subtitle={`${selectedEvent.date} at ${selectedEvent.time} • ${selectedEvent.type.toUpperCase()}`}
          size="md"
        >
          <div className="space-y-4 text-navyBlue">
            <div className="p-4 rounded-2xl bg-aquaMist/20 border border-aquaMist/50 space-y-1">
              <span className="text-xs font-bold text-deepOcean uppercase tracking-wider">
                Event Description & Instructions
              </span>
              <p className="text-xs sm:text-sm text-navyBlue leading-relaxed">
                {selectedEvent.notes || 'Routine pediatric event scheduled in LittleAura.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-navyBlue/60 font-semibold block mb-0.5">Category</span>
                <span className="font-bold text-navyBlue capitalize">{selectedEvent.type}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-navyBlue/60 font-semibold block mb-0.5">Child</span>
                <span className="font-bold text-navyBlue">{child.name}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => {
                  deleteCalendarEvent(selectedEvent.id);
                  setSelectedEvent(null);
                }}
              >
                Delete Event
              </Button>

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

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Schedule Calendar Event"
          subtitle={`Add an appointment or care reminder for ${child.name}`}
          size="md"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <Input
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g. 24-Month Pediatric Checkup, Vitamin D3 refill"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />

              <Input
                label="Time"
                type="text"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="e.g. 10:00 AM"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                  Event Category
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-pureWhite border border-slate-200 text-navyBlue focus:outline-none focus:ring-2 focus:ring-deepOcean/30"
                >
                  <option value="doctor">Doctor Visit / Checkup</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="medicine">Medication Dose</option>
                  <option value="care">Recurring Care Task</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-navyBlue uppercase tracking-wider">
                  Recurrence
                </label>
                <select
                  value={newEvent.recurrence}
                  onChange={(e) => setNewEvent({ ...newEvent, recurrence: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-pureWhite border border-slate-200 text-navyBlue focus:outline-none focus:ring-2 focus:ring-deepOcean/30"
                >
                  <option value="once">One-Time Only</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Preparation Notes & Details"
              value={newEvent.notes}
              onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
              placeholder="e.g. Bring vaccination record card; fast 1 hour prior if required..."
              rows={3}
            />

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Save Schedule
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
