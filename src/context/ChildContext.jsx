import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  initialChildren,
  calculateAge,
  initialGrowthRecords,
  initialMedicalRecords,
  initialDailyCare,
  initialEssentials,
  initialLearningActivities,
  initialTimeline,
  initialCalendarEvents,
  initialSavedInsights
} from '../data/demoData';

const ChildContext = createContext();

export function ChildProvider({ children }) {
  // 1. Children List & Active Child Selection
  const [childrenList, setChildrenList] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_children_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialChildren;
  });

  const [activeChildId, setActiveChildId] = useState(() => {
    const saved = localStorage.getItem('littleaura_active_child_id');
    return saved || 'child_aarav_01';
  });

  // 2. Records States
  const [allGrowthRecords, setAllGrowthRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_growth');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].childId) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialGrowthRecords;
  });

  const [allMedicalPackages, setAllMedicalPackages] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_medical');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].vaccinations) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialMedicalRecords;
  });

  const [allDailyCare, setAllDailyCare] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_daily_care');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].childId) {
          return parsed;
        }
      }
    } catch (e) {}
    return initialDailyCare;
  });

  const [essentials, setEssentials] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_essentials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialEssentials;
  });

  const [learningActivities, setLearningActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_learning');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialLearningActivities;
  });

  const [allTimeline, setAllTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_timeline');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialTimeline;
  });

  const [allCalendarEvents, setAllCalendarEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_calendar');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return initialCalendarEvents;
  });

  const [allSavedInsights, setAllSavedInsights] = useState(() => {
    try {
      const saved = localStorage.getItem('littleaura_saved_insights');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return initialSavedInsights;
  });

  // LocalStorage synchronizers
  useEffect(() => {
    localStorage.setItem('littleaura_children_list', JSON.stringify(childrenList));
  }, [childrenList]);

  useEffect(() => {
    localStorage.setItem('littleaura_active_child_id', activeChildId);
  }, [activeChildId]);

  useEffect(() => {
    localStorage.setItem('littleaura_growth', JSON.stringify(allGrowthRecords));
  }, [allGrowthRecords]);

  useEffect(() => {
    localStorage.setItem('littleaura_medical', JSON.stringify(allMedicalPackages));
  }, [allMedicalPackages]);

  useEffect(() => {
    localStorage.setItem('littleaura_daily_care', JSON.stringify(allDailyCare));
  }, [allDailyCare]);

  useEffect(() => {
    localStorage.setItem('littleaura_essentials', JSON.stringify(essentials));
  }, [essentials]);

  useEffect(() => {
    localStorage.setItem('littleaura_learning', JSON.stringify(learningActivities));
  }, [learningActivities]);

  useEffect(() => {
    localStorage.setItem('littleaura_timeline', JSON.stringify(allTimeline));
  }, [allTimeline]);

  useEffect(() => {
    localStorage.setItem('littleaura_calendar', JSON.stringify(allCalendarEvents));
  }, [allCalendarEvents]);

  useEffect(() => {
    localStorage.setItem('littleaura_saved_insights', JSON.stringify(allSavedInsights));
  }, [allSavedInsights]);

  // Active Child Getter with dynamic age calculation
  const activeChild = useMemo(() => {
    const found = childrenList.find(c => c.id === activeChildId) || childrenList[0];
    if (!found) {
      return {
        id: 'child_fallback',
        name: 'My Child',
        dateOfBirth: '2024-09-05',
        age: '2 years',
        height: '87.4 cm',
        weight: '12.8 kg',
        headCircumference: '48.5 cm',
        bmi: '16.8',
        gender: 'Toddler'
      };
    }
    return {
      ...found,
      age: calculateAge(found.dateOfBirth)
    };
  }, [childrenList, activeChildId]);

  // Backward-compatible alias
  const child = activeChild;

  // Multi-child Management
  const switchChild = (childId) => {
    setActiveChildId(childId);
  };

  const addChild = (newChildData) => {
    const id = `child_${Date.now()}`;
    const newChild = {
      id,
      userId: 'usr_gokul_01',
      name: newChildData.name || 'New Child',
      dateOfBirth: newChildData.dateOfBirth || new Date().toISOString().split('T')[0],
      gender: newChildData.gender || 'Not specified',
      photoUrl: newChildData.photoUrl || null,
      height: newChildData.height ? `${newChildData.height} cm` : '75.0 cm',
      weight: newChildData.weight ? `${newChildData.weight} kg` : '9.5 kg',
      headCircumference: newChildData.headCircumference ? `${newChildData.headCircumference} cm` : '45.0 cm',
      bmi: '16.5',
      bloodGroup: newChildData.bloodGroup || 'O+',
      allergies: newChildData.allergies || 'No known allergies',
      pediatrician: newChildData.pediatrician || 'Family Pediatrician',
      clinicName: newChildData.clinicName || 'Community Pediatric Center',
      summary: newChildData.summary || 'Enrolled in LittleAura smart tracking.',
      parentNotes: newChildData.parentNotes || '',
      routine: {
        wakeTime: '7:00 AM',
        breakfastTime: '8:00 AM',
        napTime: '1:00 PM – 2:30 PM',
        dinnerTime: '7:00 PM',
        bedtime: '8:30 PM'
      },
      lastUpdated: 'Just now'
    };

    setChildrenList(prev => [...prev, newChild]);
    setActiveChildId(id);

    // Initialise empty medical records for new child
    setAllMedicalPackages(prev => [
      ...prev,
      {
        id: `m_${id}`,
        childId: id,
        vaccinations: [
          { id: `v_init_${Date.now()}`, childId: id, name: 'BCG (Tuberculosis)', date: newChild.dateOfBirth, status: 'Completed', provider: 'Maternity Care' },
          { id: `v_up_${Date.now()}`, childId: id, name: 'Upcoming Routine Booster', date: 'Next month', status: 'Upcoming', provider: newChild.pediatrician }
        ],
        reports: [],
        appointments: [],
        medications: []
      }
    ]);

    // Initial timeline entry
    setAllTimeline(prev => [
      {
        id: `t_${Date.now()}`,
        childId: id,
        date: 'Today',
        type: 'milestone',
        title: `Welcome ${newChild.name}!`,
        description: `Profile created and smart growth tracking initialized.`,
        icon: 'Gift'
      },
      ...prev
    ]);
  };

  const updateChildProfile = (updatedFields) => {
    setChildrenList(prev =>
      prev.map(c => (c.id === activeChildId ? { ...c, ...updatedFields, lastUpdated: 'Just now' } : c))
    );
  };

  const deleteChild = (idToDelete) => {
    if (childrenList.length <= 1) {
      alert("At least one child profile must remain in LittleAura.");
      return;
    }
    const remaining = childrenList.filter(c => c.id !== idToDelete);
    setChildrenList(remaining);
    setActiveChildId(remaining[0].id);
  };

  // 3. Child-Specific Data Filtering (Strict Isolation)
  const growthRecords = useMemo(() => {
    return allGrowthRecords.filter(g => g.childId === activeChildId);
  }, [allGrowthRecords, activeChildId]);

  const medicalRecords = useMemo(() => {
    const pkg = allMedicalPackages.find(m => m.childId === activeChildId);
    return pkg || { vaccinations: [], reports: [], appointments: [], medications: [] };
  }, [allMedicalPackages, activeChildId]);

  const dailyCare = useMemo(() => {
    return allDailyCare.filter(dc => dc.childId === activeChildId);
  }, [allDailyCare, activeChildId]);

  const timeline = useMemo(() => {
    return allTimeline.filter(t => t.childId === activeChildId || t.childId === 'all');
  }, [allTimeline, activeChildId]);

  const calendarEvents = useMemo(() => {
    return allCalendarEvents.filter(ce => ce.childId === activeChildId || ce.childId === 'all');
  }, [allCalendarEvents, activeChildId]);

  const savedInsights = useMemo(() => {
    return allSavedInsights.filter(si => si.childId === activeChildId);
  }, [allSavedInsights, activeChildId]);

  // 4. Growth Record Actions
  const addGrowthMeasurement = ({ height, weight, headCircumference, date, notes }) => {
    const hNum = parseFloat(height);
    const wNum = parseFloat(weight);
    const hcNum = headCircumference ? parseFloat(headCircumference) : null;
    const calculatedBmi = hNum && wNum ? (wNum / ((hNum / 100) * (hNum / 100))).toFixed(1) : '16.8';

    const newRecord = {
      id: `g_${Date.now()}`,
      childId: activeChildId,
      date: date || new Date().toISOString().split('T')[0],
      height: hNum,
      weight: wNum,
      headCircumference: hcNum,
      bmi: parseFloat(calculatedBmi),
      whoPercentile: '65th',
      notes: notes || 'Routine measurement'
    };

    setAllGrowthRecords(prev => [...prev, newRecord]);

    // Update child profile's current baseline stats
    updateChildProfile({
      height: `${hNum} cm`,
      weight: `${wNum} kg`,
      headCircumference: hcNum ? `${hcNum} cm` : activeChild.headCircumference,
      bmi: calculatedBmi,
      lastUpdated: 'Just now'
    });

    // Add to timeline
    setAllTimeline(prev => [
      {
        id: `t_${Date.now()}`,
        childId: activeChildId,
        date: 'Today',
        type: 'growth',
        title: 'Growth Check Recorded',
        description: `Height: ${hNum} cm • Weight: ${wNum} kg ${hcNum ? `• Head: ${hcNum} cm` : ''}`,
        icon: 'Scale'
      },
      ...prev
    ]);
  };

  const deleteGrowthMeasurement = (id) => {
    setAllGrowthRecords(prev => prev.filter(r => r.id !== id));
  };

  const editGrowthMeasurement = (id, updatedFields) => {
    setAllGrowthRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  // 5. Medical Actions
  const addMedicalReport = (newReport) => {
    const reportItem = {
      id: `r_${Date.now()}`,
      childId: activeChildId,
      size: newReport.size || '1.2 MB',
      fileType: newReport.fileType || 'PDF',
      fileData: newReport.fileData || null, // data URL for document preview
      status: 'Verified',
      ...newReport
    };

    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            reports: [reportItem, ...pkg.reports]
          };
        }
        return pkg;
      })
    );

    // Timeline entry
    setAllTimeline(prev => [
      {
        id: `t_${Date.now()}`,
        childId: activeChildId,
        date: 'Today',
        type: 'medical',
        title: `Medical Report: ${newReport.title}`,
        description: `Uploaded document from ${newReport.doctor || 'Healthcare provider'}`,
        icon: 'FileText'
      },
      ...prev
    ]);
  };

  const deleteMedicalReport = (reportId) => {
    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            reports: pkg.reports.filter(r => r.id !== reportId)
          };
        }
        return pkg;
      })
    );
  };

  const addVaccination = (vacData) => {
    const newVac = {
      id: `v_${Date.now()}`,
      childId: activeChildId,
      status: vacData.status || 'Upcoming',
      ...vacData
    };

    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            vaccinations: [newVac, ...pkg.vaccinations]
          };
        }
        return pkg;
      })
    );
  };

  const updateVaccinationStatus = (vacId, newStatus) => {
    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            vaccinations: pkg.vaccinations.map(v => (v.id === vacId ? { ...v, status: newStatus } : v))
          };
        }
        return pkg;
      })
    );
  };

  const addMedication = (medData) => {
    const newMed = {
      id: `med_${Date.now()}`,
      childId: activeChildId,
      status: 'Active',
      ...medData
    };

    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            medications: [newMed, ...pkg.medications]
          };
        }
        return pkg;
      })
    );
  };

  const deleteMedication = (medId) => {
    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            medications: pkg.medications.filter(m => m.id !== medId)
          };
        }
        return pkg;
      })
    );
  };

  const addAppointment = (aptData) => {
    const newApt = {
      id: `apt_${Date.now()}`,
      childId: activeChildId,
      status: 'Scheduled',
      ...aptData
    };

    setAllMedicalPackages(prev =>
      prev.map(pkg => {
        if (pkg.childId === activeChildId) {
          return {
            ...pkg,
            appointments: [newApt, ...pkg.appointments]
          };
        }
        return pkg;
      })
    );

    // Also add to Calendar
    setAllCalendarEvents(prev => [
      {
        id: `ce_apt_${Date.now()}`,
        childId: activeChildId,
        title: aptData.title,
        date: aptData.date || new Date().toISOString().split('T')[0],
        time: aptData.time || '10:00 AM',
        type: 'doctor',
        notes: `${aptData.doctor || 'Doctor'} at ${aptData.location || 'Clinic'}`,
        badge: 'Clinic'
      },
      ...prev
    ]);
  };

  // 6. Daily Care Actions
  const toggleCareCompleted = (id) => {
    setAllDailyCare(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addCareRecord = (newCare) => {
    const careItem = {
      id: `dc_${Date.now()}`,
      childId: activeChildId,
      completed: false,
      ...newCare
    };
    setAllDailyCare(prev => [careItem, ...prev]);

    // Add to timeline
    setAllTimeline(prev => [
      {
        id: `t_${Date.now()}`,
        childId: activeChildId,
        date: 'Today',
        type: 'daily-care',
        title: `${newCare.title} Logged`,
        description: newCare.detail || `${newCare.type} event recorded`,
        icon: 'Clock'
      },
      ...prev
    ]);
  };

  const deleteCareRecord = (id) => {
    setAllDailyCare(prev => prev.filter(c => c.id !== id));
  };

  const editCareRecord = (id, updatedFields) => {
    setAllDailyCare(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  // 7. Essentials Actions
  const restockEssential = (id, additionalCount) => {
    setEssentials(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + (parseInt(additionalCount, 10) || 10);
          return {
            ...item,
            quantity: newQty,
            status: newQty < item.minThreshold ? 'LOW STOCK' : 'In Stock'
          };
        }
        return item;
      })
    );
  };

  const addEssentialItem = (newItem) => {
    const item = {
      id: `e_${Date.now()}`,
      childId: 'all',
      status: newItem.quantity < newItem.minThreshold ? 'LOW STOCK' : 'In Stock',
      urgency: newItem.quantity < newItem.minThreshold ? 'high' : 'normal',
      ...newItem
    };
    setEssentials(prev => [item, ...prev]);
  };

  const deleteEssentialItem = (id) => {
    setEssentials(prev => prev.filter(e => e.id !== id));
  };

  // 8. Learning Activity Actions
  const toggleLearningActivity = (id) => {
    setLearningActivities(prev =>
      prev.map(act =>
        act.id === id ? { ...act, completed: !act.completed } : act
      )
    );

    const target = learningActivities.find(a => a.id === id);
    if (target && !target.completed) {
      setAllTimeline(prev => [
        {
          id: `t_${Date.now()}`,
          childId: activeChildId,
          date: 'Today',
          type: 'learning',
          title: `Completed Activity: ${target.title}`,
          description: `Supported ${target.skillSupported || 'early development'}`,
          icon: 'Sparkles'
        },
        ...prev
      ]);
    }
  };

  const toggleFavoriteActivity = (id) => {
    setLearningActivities(prev =>
      prev.map(act =>
        act.id === id ? { ...act, favorite: !act.favorite } : act
      )
    );
  };

  // 9. Calendar Actions
  const addCalendarEvent = (newEvent) => {
    const ev = {
      id: `ce_${Date.now()}`,
      childId: activeChildId,
      ...newEvent
    };
    setAllCalendarEvents(prev => [...prev, ev]);
  };

  const deleteCalendarEvent = (id) => {
    setAllCalendarEvents(prev => prev.filter(e => e.id !== id));
  };

  // 10. Saved Photo Insights Actions
  const savePhotoInsight = (insightData) => {
    const newInsight = {
      id: `pi_${Date.now()}`,
      childId: activeChildId,
      date: new Date().toISOString().split('T')[0],
      ...insightData
    };
    setAllSavedInsights(prev => [newInsight, ...prev]);

    setAllTimeline(prev => [
      {
        id: `t_${Date.now()}`,
        childId: activeChildId,
        date: 'Today',
        type: 'learning',
        title: `AI Photo Insight Saved`,
        description: insightData.title || 'Play observations logged',
        icon: 'Sparkles'
      },
      ...prev
    ]);
  };

  const deletePhotoInsight = (id) => {
    setAllSavedInsights(prev => prev.filter(pi => pi.id !== id));
  };

  // 11. Custom Milestone Action
  const addTimelineMilestone = ({ title, description, date, category }) => {
    const newEvent = {
      id: `t_${Date.now()}`,
      childId: activeChildId,
      date: date || 'Today',
      type: 'milestone',
      title,
      description: description || 'Special milestone celebrated',
      category: category || 'General Milestone',
      icon: 'Gift'
    };
    setAllTimeline(prev => [newEvent, ...prev]);
  };

  return (
    <ChildContext.Provider
      value={{
        // Children management
        childrenList,
        activeChildId,
        activeChild,
        child,
        switchChild,
        addChild,
        updateChildProfile,
        deleteChild,
        calculateAge,

        // Growth records
        growthRecords,
        addGrowthMeasurement,
        editGrowthMeasurement,
        deleteGrowthMeasurement,

        // Medical records
        medicalRecords,
        addMedicalReport,
        deleteMedicalReport,
        addVaccination,
        updateVaccinationStatus,
        addMedication,
        deleteMedication,
        addAppointment,

        // Daily care
        dailyCare,
        toggleCareCompleted,
        addCareRecord,
        deleteCareRecord,
        editCareRecord,

        // Essentials
        essentials,
        restockEssential,
        addEssentialItem,
        deleteEssentialItem,

        // Learning
        learningActivities,
        toggleLearningActivity,
        toggleFavoriteActivity,

        // Timeline
        timeline,
        addTimelineMilestone,

        // Calendar
        calendarEvents,
        addCalendarEvent,
        deleteCalendarEvent,

        // Saved Insights
        savedInsights,
        savePhotoInsight,
        deletePhotoInsight
      }}
    >
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
}

export default ChildContext;
