/**
 * LittleAura Initial State & Multi-Child Sample Data
 * Seeded with evidence-based pediatric milestones, WHO growth percentiles,
 * and realistic daily care rhythms for children aged 0-3 years.
 */

export const demoParentUser = {
  id: 'usr_gokul_01',
  name: 'Gokul & Priya',
  email: 'parent@littleaura.app',
  role: 'Primary Caregivers',
  partnerLinked: 'Priya (Co-Parent)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250&q=80',
  createdAt: '2026-01-10T08:00:00Z',
  preferences: {
    unitSystem: 'metric', // 'metric' (cm/kg) | 'imperial' (in/lbs)
    notificationsEnabled: true
  }
};

export const initialChildren = [
  {
    id: 'child_aarav_01',
    userId: 'usr_gokul_01',
    name: 'Aarav',
    dateOfBirth: '2024-09-05',
    gender: 'Boy',
    photoUrl: null, // Initial SVG avatar
    height: '87.4 cm',
    weight: '12.8 kg',
    headCircumference: '48.5 cm',
    bmi: '16.8',
    bloodGroup: 'O+',
    allergies: 'No known allergies',
    pediatrician: 'Dr. Ananya Sharma, MD (Pediatrics)',
    clinicName: 'Apollo Children’s Care',
    summary: 'Active toddler with steady language expansion and motor development.',
    parentNotes: 'Enjoys building tall block towers and animal picture books. Responds well to gentle 5-minute transition warnings.',
    routine: {
      wakeTime: '7:00 AM',
      breakfastTime: '8:00 AM',
      napTime: '1:00 PM – 2:30 PM',
      dinnerTime: '7:00 PM',
      bedtime: '8:30 PM'
    },
    lastUpdated: 'Today'
  },
  {
    id: 'child_maya_02',
    userId: 'usr_gokul_01',
    name: 'Maya',
    dateOfBirth: '2026-02-14',
    gender: 'Girl',
    photoUrl: null,
    height: '69.5 cm',
    weight: '8.2 kg',
    headCircumference: '43.2 cm',
    bmi: '17.0',
    bloodGroup: 'A+',
    allergies: 'Mild cow milk sensitivity (monitored)',
    pediatrician: 'Dr. Ananya Sharma, MD (Pediatrics)',
    clinicName: 'Apollo Children’s Care',
    summary: 'Curious 8-month infant exploring finger foods and sitting unsupported.',
    parentNotes: 'Loves soft lullabies and crinkle texture fabric toys. Starting gentle babbling.',
    routine: {
      wakeTime: '6:30 AM',
      breakfastTime: '7:30 AM',
      napTime: '10:00 AM & 2:00 PM',
      dinnerTime: '6:30 PM',
      bedtime: '7:45 PM'
    },
    lastUpdated: 'Yesterday'
  }
];

// Helper to calculate exact age string from date of birth
export function calculateAge(dobString) {
  if (!dobString) return 'Age unknown';
  const birth = new Date(dobString);
  const now = new Date();
  if (isNaN(birth.getTime())) return 'Age unknown';

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0) {
    if (months === 0) {
      const diffTime = Math.abs(now - birth);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    }
    return `${months} months`;
  }
  return months > 0 ? `${years}y ${months}m` : `${years} years`;
}

export const initialGrowthRecords = [
  // Aarav (child_aarav_01)
  { id: 'g1', childId: 'child_aarav_01', date: '2025-03-10', ageMonths: 6, height: 68.2, weight: 7.9, headCircumference: 43.1, bmi: 17.0, whoPercentile: '62nd', notes: '6-month well-child visit. Smiling and rolling both ways.' },
  { id: 'g2', childId: 'child_aarav_01', date: '2025-06-12', ageMonths: 9, height: 72.5, weight: 8.8, headCircumference: 45.0, bmi: 16.7, whoPercentile: '64th', notes: 'Sitting unsupported, beginning finger food textures.' },
  { id: 'g3', childId: 'child_aarav_01', date: '2025-09-08', ageMonths: 12, height: 76.1, weight: 9.7, headCircumference: 46.2, bmi: 16.8, whoPercentile: '65th', notes: '1st birthday milestone. Taking first independent steps.' },
  { id: 'g4', childId: 'child_aarav_01', date: '2025-12-14', ageMonths: 15, height: 79.4, weight: 10.6, headCircumference: 47.1, bmi: 16.8, whoPercentile: '65th', notes: 'Walking with steady balance. 6 distinct single words.' },
  { id: 'g5', childId: 'child_aarav_01', date: '2026-03-15', ageMonths: 18, height: 82.3, weight: 11.4, headCircumference: 47.8, bmi: 16.8, whoPercentile: '66th', notes: '18-month checkup. Climbs stairs with assistance.' },
  { id: 'g6', childId: 'child_aarav_01', date: '2026-06-20', ageMonths: 21, height: 84.8, weight: 12.1, headCircumference: 48.2, bmi: 16.8, whoPercentile: '65th', notes: 'Stacking 5 wooden blocks steadily.' },
  { id: 'g7', childId: 'child_aarav_01', date: '2026-09-10', ageMonths: 24, height: 86.8, weight: 12.6, headCircumference: 48.4, bmi: 16.7, whoPercentile: '64th', notes: '2-year milestone. Combining two-word phrases.' },
  { id: 'g8', childId: 'child_aarav_01', date: '2026-10-18', ageMonths: 25, height: 87.4, weight: 12.8, headCircumference: 48.5, bmi: 16.8, whoPercentile: '65th', notes: 'Recent home check. Curve aligns with WHO standards.' },

  // Maya (child_maya_02)
  { id: 'gm1', childId: 'child_maya_02', date: '2026-02-14', ageMonths: 0, height: 49.5, weight: 3.3, headCircumference: 34.5, bmi: 13.5, whoPercentile: '50th', notes: 'Birth records. Strong APGAR score 9/10.' },
  { id: 'gm2', childId: 'child_maya_02', date: '2026-04-16', ageMonths: 2, height: 56.8, weight: 5.2, headCircumference: 38.2, bmi: 16.1, whoPercentile: '55th', notes: 'Social smiling and vocalizing coos.' },
  { id: 'gm3', childId: 'child_maya_02', date: '2026-06-18', ageMonths: 4, height: 62.4, weight: 6.5, headCircumference: 40.8, bmi: 16.7, whoPercentile: '58th', notes: 'Rolling from tummy to back smoothly.' },
  { id: 'gm4', childId: 'child_maya_02', date: '2026-08-20', ageMonths: 6, height: 66.5, weight: 7.5, headCircumference: 42.1, bmi: 16.9, whoPercentile: '60th', notes: 'Starting sweet potato puree.' },
  { id: 'gm5', childId: 'child_maya_02', date: '2026-10-15', ageMonths: 8, height: 69.5, weight: 8.2, headCircumference: 43.2, bmi: 17.0, whoPercentile: '62nd', notes: 'Sitting firmly unsupported.' }
];

export const initialMedicalRecords = [
  // Aarav
  {
    id: 'm_aarav_pkg',
    childId: 'child_aarav_01',
    vaccinations: [
      { id: 'v1', childId: 'child_aarav_01', name: 'BCG (Tuberculosis)', date: '2024-09-06', status: 'Completed', provider: 'City Maternity Care' },
      { id: 'v2', childId: 'child_aarav_01', name: 'Hepatitis B (Dose 1-3)', date: '2025-03-10', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v3', childId: 'child_aarav_01', name: 'DTaP (Primary Series)', date: '2025-03-10', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v4', childId: 'child_aarav_01', name: 'IPV (Polio 1-3)', date: '2025-03-10', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v5', childId: 'child_aarav_01', name: 'MMR (Dose 1)', date: '2025-09-15', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v6', childId: 'child_aarav_01', name: 'Varicella (Chickenpox Dose 1)', date: '2025-09-15', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v7', childId: 'child_aarav_01', name: 'Hepatitis A (Dose 1)', date: '2025-10-02', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'v8', childId: 'child_aarav_01', name: 'DTaP Booster (18-24m)', date: 'Tomorrow • 10:00 AM', status: 'Upcoming', provider: 'Dr. Ananya Sharma Clinic', dateIso: '2026-10-26' },
      { id: 'v9', childId: 'child_aarav_01', name: 'Annual Influenza Shot', date: '2026-11-15', status: 'Upcoming', provider: 'Apollo Childrens Center', dateIso: '2026-11-15' },
      { id: 'v10', childId: 'child_aarav_01', name: 'MMR (Dose 2 Booster)', date: 'Age 4-6 Years', status: 'Due', provider: 'Scheduled for preschool entry' },
    ],
    reports: [
      { id: 'r1', childId: 'child_aarav_01', title: '24-Month Well-Child Pediatric Assessment', date: '2026-09-12', type: 'Clinical Consultation', doctor: 'Dr. Ananya Sharma, MD', size: '1.4 MB', fileType: 'PDF', status: 'Verified' },
      { id: 'r2', childId: 'child_aarav_01', title: 'Routine Complete Blood Count (CBC) Screen', date: '2026-06-22', type: 'Lab Diagnostic', doctor: 'Apollo Diagnostics', size: '820 KB', fileType: 'PDF', status: 'Normal' },
      { id: 'r3', childId: 'child_aarav_01', title: 'Digital Immunization Certificate', date: '2026-09-15', type: 'Vaccination Record', doctor: 'National Immunization Registry', size: '450 KB', fileType: 'PDF', status: 'Verified' }
    ],
    appointments: [
      { id: 'a1', childId: 'child_aarav_01', title: '2-Year Booster & Growth Review', date: 'Tomorrow • 10:00 AM', doctor: 'Dr. Ananya Sharma', location: 'Apollo Childrens Center, Suite 402', status: 'Confirmed' },
      { id: 'a2', childId: 'child_aarav_01', title: 'Pediatric Dental First Checkup', date: 'Nov 02, 2026 • 3:30 PM', doctor: 'Dr. Meera Nambiar, DDS', location: 'Bright Smiles Pediatric Dental', status: 'Scheduled' }
    ],
    medications: [
      { id: 'm1', childId: 'child_aarav_01', name: 'Vitamin D3 Liquid Drops', dosage: '400 IU (1 ml)', frequency: 'Daily after morning feeding', status: 'Active', prescribedBy: 'Dr. Ananya Sharma' },
      { id: 'm2', childId: 'child_aarav_01', name: 'Saline Nasal Mist', dosage: '1 spray per nostril', frequency: 'As needed for seasonal congestion', status: 'As Needed', prescribedBy: 'Dr. Ananya Sharma' }
    ]
  },
  // Maya
  {
    id: 'm_maya_pkg',
    childId: 'child_maya_02',
    vaccinations: [
      { id: 'vm1', childId: 'child_maya_02', name: 'BCG (Tuberculosis)', date: '2026-02-15', status: 'Completed', provider: 'City Maternity Care' },
      { id: 'vm2', childId: 'child_maya_02', name: 'Rotavirus (Dose 1-3)', date: '2026-06-18', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'vm3', childId: 'child_maya_02', name: 'DTaP-IPV-Hib (Dose 1-3)', date: '2026-08-20', status: 'Completed', provider: 'Apollo Childrens Center' },
      { id: 'vm4', childId: 'child_maya_02', name: 'Influenza Season Shot', date: '2026-11-10', status: 'Upcoming', provider: 'Dr. Ananya Sharma', dateIso: '2026-11-10' },
      { id: 'vm5', childId: 'child_maya_02', name: 'MMR (Dose 1)', date: '2027-02-14', status: 'Due', provider: 'Due at 12 months' },
    ],
    reports: [
      { id: 'rm1', childId: 'child_maya_02', title: '6-Month Comprehensive Well-Baby Exam', date: '2026-08-20', type: 'Clinical Consultation', doctor: 'Dr. Ananya Sharma, MD', size: '1.1 MB', fileType: 'PDF', status: 'Verified' }
    ],
    appointments: [
      { id: 'am1', childId: 'child_maya_02', title: '9-Month Developmental Wellness Check', date: 'Nov 14, 2026 • 11:30 AM', doctor: 'Dr. Ananya Sharma', location: 'Apollo Childrens Center', status: 'Scheduled' }
    ],
    medications: [
      { id: 'mm1', childId: 'child_maya_02', name: 'Infant Vitamin D3 Drops', dosage: '400 IU (1 ml)', frequency: 'Daily morning routine', status: 'Active', prescribedBy: 'Dr. Ananya Sharma' }
    ]
  }
];

export const initialDailyCare = [
  // Aarav
  { id: 'dc1', childId: 'child_aarav_01', type: 'feeding', title: 'Breakfast', time: '8:00 AM', detail: 'Warm oats with mashed banana & chia seeds (180 ml)', completed: true, feedingType: 'Solids', amount: '180 ml' },
  { id: 'dc2', childId: 'child_aarav_01', type: 'activity', title: 'Morning Sensory Play', time: '10:00 AM', detail: 'Wooden block stacking & texture boards (30 min)', completed: true },
  { id: 'dc3', childId: 'child_aarav_01', type: 'feeding', title: 'Lunch', time: '12:30 PM', detail: 'Steamed yellow lentils, soft cumin rice & avocado slices', completed: true, feedingType: 'Solids', amount: '200 g' },
  { id: 'dc4', childId: 'child_aarav_01', type: 'sleep', title: 'Afternoon Nap', time: '1:00 PM – 2:30 PM', detail: '1h 30m peaceful crib sleep with white noise', completed: true, sleepDuration: '1.5 hours' },
  { id: 'dc5', childId: 'child_aarav_01', type: 'diaper', title: 'Post-Nap Diaper Check', time: '2:45 PM', detail: 'Wet diaper changed, barrier cream applied', completed: true, diaperStatus: 'Wet' },
  { id: 'dc6', childId: 'child_aarav_01', type: 'feeding', title: 'Afternoon Snack', time: '4:00 PM', detail: 'Steamed apple slices & Greek yogurt', completed: false, feedingType: 'Solids', amount: '100 g' },
  { id: 'dc7', childId: 'child_aarav_01', type: 'activity', title: 'Park / Stroller Walk', time: '4:45 PM', detail: 'Observing birds and fresh autumn air', completed: false },
  { id: 'dc8', childId: 'child_aarav_01', type: 'hygiene', title: 'Warm Evening Bath', time: '6:30 PM', detail: 'Gentle oat wash bath, lavender massage', completed: false },
  { id: 'dc9', childId: 'child_aarav_01', type: 'feeding', title: 'Dinner', time: '7:15 PM', detail: 'Soft vegetable khichdi with tender carrots & ghee', completed: false, feedingType: 'Solids', amount: '180 g' },
  { id: 'dc10', childId: 'child_aarav_01', type: 'sleep', title: 'Bedtime Routine', time: '8:30 PM', detail: 'Storybook reading (Goodnight Moon), dim light, sleep', completed: false, sleepDuration: 'Target: 10.5 hours' },

  // Maya
  { id: 'dcm1', childId: 'child_maya_02', type: 'feeding', title: 'Morning Milk', time: '7:00 AM', detail: 'Expressed breastmilk bottle (180 ml)', completed: true, feedingType: 'Bottle', amount: '180 ml' },
  { id: 'dcm2', childId: 'child_maya_02', type: 'sleep', title: 'Morning Nap', time: '9:30 AM – 10:45 AM', detail: '1h 15m morning nap', completed: true, sleepDuration: '1.25 hours' },
  { id: 'dcm3', childId: 'child_maya_02', type: 'feeding', title: 'Puree Lunch', time: '12:00 PM', detail: 'Pureed peas & sweet potato with breastmilk (120 ml)', completed: true, feedingType: 'Solids', amount: '120 ml' },
  { id: 'dcm4', childId: 'child_maya_02', type: 'diaper', title: 'Diaper Change', time: '12:30 PM', detail: 'Clean change, no irritation', completed: true, diaperStatus: 'Both' },
  { id: 'dcm5', childId: 'child_maya_02', type: 'sleep', title: 'Afternoon Nap', time: '2:00 PM – 3:30 PM', detail: '1h 30m peaceful nap', completed: true, sleepDuration: '1.5 hours' }
];

export const initialEssentials = [
  { id: 'e1', childId: 'all', name: 'Diapers (Size 4 / Ultra-Dry)', category: 'Diapers', quantity: 12, unit: 'pcs', minThreshold: 20, status: 'LOW STOCK', urgency: 'high', notes: 'Needs replenishment within 24-48 hours' },
  { id: 'e2', childId: 'all', name: 'Calming Baby Lotion (Oat & Chamomile)', category: 'Baby Lotion', quantity: 2, unit: 'bottles', minThreshold: 1, status: 'In Stock', urgency: 'normal', notes: 'Sufficient for 4+ weeks' },
  { id: 'e3', childId: 'all', name: 'Vitamin D3 Infant Drops (400 IU)', category: 'Medicine', quantity: 1, unit: 'bottle (30ml)', minThreshold: 1, status: 'In Stock', urgency: 'normal', notes: 'Half bottle remaining in safe medicine cabinet' },
  { id: 'e4', childId: 'all', name: 'Organic Cotton Sleepsuits', category: 'Clothes', quantity: 7, unit: 'sets', minThreshold: 4, status: 'In Stock', urgency: 'normal', notes: 'Freshly washed & stored' },
  { id: 'e5', childId: 'all', name: 'Gentle Tear-Free Wash', category: 'Bath Products', quantity: 1, unit: 'bottle (250ml)', minThreshold: 2, status: 'LOW STOCK', urgency: 'medium', notes: 'Almost empty, recommend ordering soon' },
  { id: 'e6', childId: 'all', name: 'Water-Based Hypoallergenic Wipes', category: 'Diapers', quantity: 4, unit: 'packs', minThreshold: 3, status: 'In Stock', urgency: 'normal', notes: 'Supply for ~2 weeks' },
  { id: 'e7', childId: 'all', name: 'Baby Nail Care Kit & Buffer', category: 'Hygiene Tasks', quantity: 1, unit: 'kit', minThreshold: 1, status: 'In Stock', urgency: 'normal', notes: 'Recurring reminder set for every Sunday' }
];

export const initialLearningActivities = [
  {
    id: 'la1',
    childId: 'all',
    title: 'Story & Picture Hunt',
    ageGroup: '12-36 Months',
    targetMonthsMin: 12,
    targetMonthsMax: 36,
    category: 'Language & Cognitive',
    duration: '10 min',
    location: 'Indoor',
    materials: 'Any picture board book with animals or vehicles',
    skillSupported: 'Vocabulary Building & Joint Attention',
    description: 'Open a favorite picture book. Ask your toddler to spot and point to specific items: "Where is the puppy?" or "Can you find the yellow bus?"',
    steps: [
      'Choose a colorful board book with familiar everyday objects.',
      'Point to an item and describe it: "Look at that round red apple!"',
      'Pause and ask: "Can you touch the green frog?"',
      'Celebrate every attempt with warm enthusiastic praise.'
    ],
    completed: true,
    favorite: true
  },
  {
    id: 'la2',
    childId: 'all',
    title: 'Color Bowl Sorting Treasure',
    ageGroup: '18-36 Months',
    targetMonthsMin: 18,
    targetMonthsMax: 36,
    category: 'Cognitive & Fine Motor',
    duration: '15 min',
    location: 'Indoor',
    materials: '3 colored bowls (red, blue, green), large safe plastic rings or toys',
    skillSupported: 'Pattern Recognition & Bilateral Dexterity',
    description: 'Place 3 bowls on a low play mat. Hand your child large colored rings to match with each corresponding bowl.',
    steps: [
      'Set out the bowls clearly separated on the rug.',
      'Demonstrate dropping a blue block into the blue bowl.',
      'Hand a green ring to your child: "Where does this green ring go?"',
      'Let them explore without rushing.'
    ],
    completed: false,
    favorite: false
  },
  {
    id: 'la3',
    childId: 'all',
    title: 'Living Room Cushion Mountain',
    ageGroup: '12-36 Months',
    targetMonthsMin: 12,
    targetMonthsMax: 36,
    category: 'Gross Motor Skills',
    duration: '15 min',
    location: 'Indoor',
    materials: 'Sofa cushions, pillows, soft play mat',
    skillSupported: 'Balance, Core Strength & Spatial Awareness',
    description: 'Stack cushions in a gentle slope on a carpeted area. Encourage climbing, stepping over, and balancing.',
    steps: [
      'Arrange firm pillows on the carpet away from sharp furniture corners.',
      'Hold both hands as your toddler steps over the cushion.',
      'Encourage crawling over the peak.',
      'Celebrate balance and safe tumbling on the soft mat.'
    ],
    completed: true,
    favorite: true
  },
  {
    id: 'la4',
    childId: 'all',
    title: 'Texture & Crinkle Exploration',
    ageGroup: '0-12 Months',
    targetMonthsMin: 0,
    targetMonthsMax: 12,
    category: 'Sensory & Motor',
    duration: '10 min',
    location: 'Indoor',
    materials: 'Crinkle cloth, velvet fabric, wooden spoon',
    skillSupported: 'Tactile Sensory Processing & Grasp Reflex',
    description: 'Introduce different textures to your baby’s palms and feet during tummy time or supported sitting.',
    steps: [
      'Place a crinkle cloth gently in baby’s hands to encourage grasping.',
      'Stroke their feet with a soft plush cloth.',
      'Name each texture softly: "This one is so soft... this one makes crinkle sounds!"'
    ],
    completed: true,
    favorite: false
  }
];

export const initialTimeline = [
  { id: 't1', childId: 'child_aarav_01', date: 'Today', type: 'growth', title: 'Growth Measurement Added', description: 'Height: 87.4 cm • Weight: 12.8 kg (65th Percentile)', icon: 'Scale' },
  { id: 't2', childId: 'child_aarav_01', date: 'Yesterday', type: 'daily-care', title: 'Daily Care Milestone', description: 'Completed 100% of planned feeding, nap and hygiene routines', icon: 'Clock' },
  { id: 't3', childId: 'child_aarav_01', date: 'Oct 15, 2026', type: 'learning', title: 'Completed Activity: Story & Picture Hunt', description: 'Demonstrated sharp visual focus identifying 6 objects in board book', icon: 'Sparkles' },
  { id: 't4', childId: 'child_aarav_01', date: 'Sep 15, 2026', type: 'medical', title: 'Document Uploaded: Digital Immunization Passport', description: 'Verified clinical certificate logged under Pediatric Records', icon: 'FileText' },
  { id: 't5', childId: 'child_aarav_01', date: 'Sep 05, 2026', type: 'milestone', title: '2nd Birthday Celebration!', description: 'Reached 2 years milestone. Speaking 50+ words in 2-word combinations.', icon: 'Gift' },

  { id: 'tm1', childId: 'child_maya_02', date: 'Oct 15, 2026', type: 'growth', title: 'Growth Check: 8 Months', description: 'Height: 69.5 cm • Weight: 8.2 kg (Steady 62nd Percentile)', icon: 'Scale' },
  { id: 'tm2', childId: 'child_maya_02', date: 'Oct 10, 2026', type: 'milestone', title: 'First Unsupported Sitting', description: 'Sat upright for over 5 minutes playing with wooden rings', icon: 'Gift' }
];

export const initialCalendarEvents = [
  { id: 'ce1', childId: 'child_aarav_01', title: 'DTaP Booster Vaccine', date: '2026-10-26', time: '10:00 AM', type: 'vaccination', notes: 'Apollo Childrens Center, Suite 402 with Dr. Ananya Sharma', badge: 'Vaccine' },
  { id: 'ce2', childId: 'child_aarav_01', title: 'Pediatric Dental Checkup', date: '2026-11-02', time: '3:30 PM', type: 'doctor', notes: 'First primary teeth routine inspection', badge: 'Clinic' },
  { id: 'ce3', childId: 'all', title: 'Weekly Nail Trimming Routine', date: '2026-10-25', time: '6:00 PM', type: 'care', notes: 'Gentle baby clipper trim after warm bath', badge: 'Care Task' },
  { id: 'ce4', childId: 'child_maya_02', title: 'Maya 9-Month Wellness Visit', date: '2026-11-14', time: '11:30 AM', type: 'doctor', notes: 'Dr. Ananya Sharma review and developmental check', badge: 'Clinic' }
];

export const initialSavedInsights = [
  {
    id: 'pi_1',
    childId: 'child_aarav_01',
    date: '2026-10-20',
    title: 'Block Stacking & Spatial Curiosity',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    category: 'Active Motor & Sensory Play',
    observation: 'Focused bilateral hand coordination and steady grasp when positioning geometric blocks.',
    playSuggestion: 'Encourage bridge building by placing a third block across two upright towers.',
    disclaimer: 'AI Photo Insight provides supportive observations of play and is not a medical diagnostic tool.'
  }
];

export const initialNotifications = [
  {
    id: 'n1',
    childId: 'child_aarav_01',
    title: 'Upcoming Booster: DTaP Vaccine',
    description: 'Scheduled for tomorrow at 10:00 AM at Apollo Children’s Center.',
    time: '2 hours ago',
    dateIso: '2026-10-25T14:00:00Z',
    category: 'medical',
    read: false,
    section: 'Today',
    link: '/medical'
  },
  {
    id: 'n2',
    childId: 'all',
    title: 'Low Stock Alert: Diapers (Size 4)',
    description: 'Only 12 diapers remaining. Replenishment recommended within 48h.',
    time: '5 hours ago',
    dateIso: '2026-10-25T11:00:00Z',
    category: 'essentials',
    read: false,
    section: 'Today',
    link: '/essentials'
  },
  {
    id: 'n3',
    childId: 'child_aarav_01',
    title: 'Daily Care Check-in',
    description: 'Afternoon nap logged successfully (1.5 hours rest).',
    time: '3:00 PM',
    dateIso: '2026-10-25T09:30:00Z',
    category: 'growth',
    read: true,
    section: 'Today',
    link: '/daily-care'
  },
  {
    id: 'n4',
    childId: 'all',
    title: 'Recurring Care: Sunday Nail Care',
    description: 'Scheduled for 6:00 PM this evening after warm bath.',
    time: 'Yesterday',
    dateIso: '2026-10-24T18:00:00Z',
    category: 'reminders',
    read: true,
    section: 'Earlier',
    link: '/calendar'
  }
];
