import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock,
  Heart,
  Bot,
  Package,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Activity,
  Smile,
  ChevronDown,
  Camera,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
  Lock,
  FileText
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How does LittleAura protect my child's sensitive data?",
      a: "We adhere to strict medical-grade data isolation. Your child's growth measurements, medical reports, and photos are secured with per-user Firebase Authentication and strict Firestore and Storage security rules. Your family's data is never sold, shared with third parties, or used to train public AI models."
    },
    {
      q: "Does LittleAura provide medical diagnoses?",
      a: "No. LittleAura is an intelligent parenting companion designed for tracking routines, organizing health records, and offering evidence-informed developmental ideas. It explicitly does not diagnose illnesses or prescribe medication dosages. For clinical concerns, fever, or health symptoms, you should always consult a licensed pediatrician."
    },
    {
      q: "Can I manage multiple children in one account?",
      a: "Yes! LittleAura includes seamless multi-child support. You can add each of your children, switch between their profiles with one click from the header, and keep their growth curves, medical documents, and routines completely isolated."
    },
    {
      q: "How does the WHO Growth Analysis work?",
      a: "Our growth engine is calibrated against the official World Health Organization (WHO) Child Growth Standards for boys and girls aged 0 to 36 months. As you record height and weight, LittleAura calculates standard percentiles, monitors velocity, and identifies healthy developmental trajectories."
    },
    {
      q: "What is AI Photo Insight and how is it used?",
      a: "AI Photo Insight lets you upload photos of your toddler during playtime or sensory exploration. With your explicit parental consent, it provides non-diagnostic observations of play engagement, environmental ergonomics, and age-appropriate play suggestions."
    }
  ];

  return (
    <div className="min-h-screen bg-pureWhite text-midnightNavy selection:bg-aquaMist/60 font-sans">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-pureWhite/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-deepOcean flex items-center justify-center text-aquaMist shadow-sm group-hover:bg-navyBlue transition-colors">
              <Sparkles className="w-5 h-5 text-aquaMist" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-navyBlue">
                LittleAura
              </span>
              <p className="text-[10px] text-oceanTeal font-bold uppercase tracking-wider -mt-1">
                Growing Together, Every Day.
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-deepOcean">
            <a href="#features" className="hover:text-navyBlue transition-colors">Ecosystem</a>
            <a href="#growth" className="hover:text-navyBlue transition-colors">WHO Growth</a>
            <a href="#ai-assistant" className="hover:text-navyBlue transition-colors">AI Assistant</a>
            <a href="#photo-insight" className="hover:text-navyBlue transition-colors">Photo Insight</a>
            <a href="#privacy" className="hover:text-navyBlue transition-colors">Privacy & Security</a>
            <a href="#faq" className="hover:text-navyBlue transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-navyBlue hover:bg-aquaMist/20">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-aquaMist/15 via-pureWhite to-pureWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Subtle Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pureWhite border border-aquaMist text-navyBlue shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-oceanTeal animate-pulse" />
            <span className="text-xs font-bold tracking-wide">
              Smart Parenting Web Platform for Ages 0–3 Years
            </span>
          </div>

          {/* Headline and Description */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-navyBlue max-w-4xl mx-auto leading-[1.1]">
            Every little milestone.
            <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-deepOcean mt-2">
              A clearer way forward.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-navyBlue/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Your child's growth, daily routines, health records, and parenting guidance—brought together in one intelligent, calm space.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right" className="shadow-md">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="border border-oceanTeal/30">
                Explore LittleAura
              </Button>
            </Link>
          </div>

          {/* Real Application UI Mockup */}
          <div className="mt-14 max-w-5xl mx-auto text-left">
            <div className="rounded-3xl border border-slate-200 bg-pureWhite shadow-xl overflow-hidden p-6 sm:p-8">
              {/* Mockup Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-deepOcean flex items-center justify-center font-bold text-aquaMist text-lg shadow-xs">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-navyBlue">Aarav Sharma</span>
                      <Badge variant="aqua" size="sm">
                        2 years 1 month
                      </Badge>
                    </div>
                    <p className="text-xs text-navyBlue/60">Healthy growth trajectory • Next pediatric checkup in 6 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-aquaMist/25 border border-aquaMist/50 text-navyBlue text-xs font-bold">
                    Height: 87.4 cm (65th %tile)
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-aquaMist/25 border border-aquaMist/50 text-navyBlue text-xs font-bold">
                    Weight: 12.8 kg (58th %tile)
                  </div>
                </div>
              </div>

              {/* LittleAura AI Prompt Hero Banner */}
              <div className="mt-6 p-5 rounded-2xl bg-aquaMist/20 border border-aquaMist/60 relative">
                <div className="flex items-center gap-2 text-deepOcean font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-oceanTeal" />
                  <span>LittleAura AI Parenting Companion</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-navyBlue mb-2">
                  “Personalized guidance calibrated to your child’s routine and age window.”
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-pureWhite text-navyBlue font-medium border border-slate-200 shadow-xs">
                    🌙 30-min bedtime wind-down bridge
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-pureWhite text-navyBlue font-medium border border-slate-200 shadow-xs">
                    🥣 Nutrient-dense toddler breakfasts
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-pureWhite text-navyBlue font-medium border border-slate-200 shadow-xs">
                    🧩 10-minute sensory texture sorting
                  </span>
                </div>
              </div>

              {/* Status Metric Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-deepOcean font-bold text-xs mb-1">
                    <TrendingUp className="w-4 h-4 text-oceanTeal" />
                    <span>WHO Growth Standards</span>
                  </div>
                  <p className="text-base font-black text-navyBlue">50th–75th Percentile</p>
                  <p className="text-[11px] text-navyBlue/70 mt-0.5">Smooth, steady monthly velocity</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-deepOcean font-bold text-xs mb-1">
                    <ShieldCheck className="w-4 h-4 text-oceanTeal" />
                    <span>Immunization Schedule</span>
                  </div>
                  <p className="text-base font-black text-navyBlue">12 / 13 Completed</p>
                  <p className="text-[11px] text-navyBlue/70 mt-0.5">DTaP Booster due Oct 14, 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-deepOcean font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 text-oceanTeal" />
                    <span>Today's Daily Care</span>
                  </div>
                  <p className="text-base font-black text-navyBlue">3 Feeds • 1 Nap (1.5h)</p>
                  <p className="text-[11px] text-navyBlue/70 mt-0.5">Diapers checked & hydrated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Ecosystem Grid */}
      <section id="features" className="py-20 bg-pureWhite border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-oceanTeal mb-2">
              All-In-One Childcare Ecosystem
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue">
              Everything your child needs, in one calm place.
            </h3>
            <p className="mt-4 text-navyBlue/70">
              Replace multiple fragmented apps with a unified system crafted for clarity, clinical organization, and daily ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Child Profiles & Multi-Child',
                desc: 'Manage profiles with dynamic age calculation, photo uploads, and strict data isolation between siblings.',
                icon: Smile,
                link: '/child'
              },
              {
                title: 'WHO Growth Trajectories',
                desc: 'Plot height, weight, and BMI against WHO percentiles with metric/imperial toggle and growth velocity indicators.',
                icon: TrendingUp,
                link: '/growth'
              },
              {
                title: 'Medical Records & Vaccines',
                desc: 'Secure digital immunization passport, pediatric consultation PDFs, and prescription reminders with safety notes.',
                icon: ShieldCheck,
                link: '/medical'
              },
              {
                title: 'Daily Care Tracker',
                desc: 'Log feeding amounts, sleep windows, and diaper changes in seconds with calculated daily totals and timelines.',
                icon: Clock,
                link: '/daily-care'
              },
              {
                title: 'Smart Essentials Inventory',
                desc: 'Monitor diaper and formula counts, configure safety thresholds, and restock with automated low-stock warnings.',
                icon: Package,
                link: '/essentials'
              },
              {
                title: 'Early Learning Hub',
                desc: 'Discover curated screen-free, 5 to 15-minute developmental activities filtered by age stage and developmental domain.',
                icon: BookOpen,
                link: '/learning'
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <Link
                  key={i}
                  to={f.link}
                  className="p-6 rounded-3xl bg-pureWhite border border-slate-200 hover:border-deepOcean hover:shadow-md transition-all group block"
                >
                  <div className="w-12 h-12 rounded-2xl bg-aquaMist/30 text-deepOcean flex items-center justify-center mb-4 group-hover:bg-deepOcean group-hover:text-pureWhite transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-navyBlue mb-2 group-hover:text-deepOcean transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-xs text-navyBlue/70 leading-relaxed">
                    {f.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO Growth Tracker Deep Dive */}
      <section id="growth" className="py-20 bg-aquaMist/15 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aquaMist/40 border border-aquaMist text-navyBlue text-xs font-bold mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-deepOcean" />
                <span>Calibrated Against WHO Standards</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue leading-tight">
                Understand physical development with scientific clarity.
              </h3>
              <p className="mt-4 text-navyBlue/80 leading-relaxed">
                LittleAura benchmarks height, weight, and BMI against the World Health Organization (WHO) Child Growth Standards for children 0–36 months.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Automatic percentile calculations (3rd, 15th, 50th, 85th, 97th percentiles).',
                  'Support for both Metric (cm/kg) and Imperial (in/lbs) units with seamless switching.',
                  'Clear growth velocity delta comparisons between successive checkups.',
                  'Always non-diagnostic: designed to prepare informative summaries for your pediatrician.'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-deepOcean shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-navyBlue font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/growth">
                  <Button variant="primary" icon={ArrowRight} iconPosition="right">
                    Open Growth Tracker
                  </Button>
                </Link>
              </div>
            </div>

            {/* Growth Visual Preview */}
            <div className="p-6 rounded-3xl bg-pureWhite border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-navyBlue">Aarav • Height Growth vs WHO Median</span>
                <Badge variant="ocean" size="sm">WHO Standard</Badge>
              </div>
              <div className="h-44 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between">
                <div className="flex justify-between text-xs font-bold text-navyBlue">
                  <span>WHO 50th Percentile: 86.8 cm</span>
                  <span className="text-deepOcean">Aarav: 87.4 cm (+0.6 cm)</span>
                </div>
                <div className="flex items-end justify-between gap-3 h-28 px-3">
                  {[
                    { age: '6m', val: 50 },
                    { age: '12m', val: 65 },
                    { age: '18m', val: 78 },
                    { age: '24m', val: 92 },
                    { age: '30m', val: 100 },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div
                        className="w-full bg-deepOcean rounded-t-lg transition-all"
                        style={{ height: `${bar.val}%` }}
                      />
                      <span className="text-[10px] text-navyBlue/70 font-semibold">{bar.age}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-aquaMist/20 text-xs text-navyBlue">
                <strong>Pediatric Note:</strong> Aarav maintains a consistent 65th percentile trajectory. Growth velocity is healthy and stable.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Parenting Assistant Section */}
      <section id="ai-assistant" className="py-20 bg-pureWhite border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Chat Preview */}
            <div className="p-6 rounded-3xl bg-pureWhite border border-slate-200 shadow-lg space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-deepOcean flex items-center justify-center text-aquaMist">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-navyBlue">LittleAura Assistant</h5>
                  <p className="text-[10px] text-navyBlue/60">Contextualized for Aarav (2 yrs 1 mo)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-navyBlue">
                <p className="font-bold text-navyBlue/70 mb-1">Parent asked:</p>
                “My toddler is waking up twice around 3:00 AM recently. What gentle routine adjustments can we make?”
              </div>

              <div className="p-4 rounded-2xl bg-aquaMist/25 border border-aquaMist/60 text-xs text-navyBlue space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-deepOcean">
                  <Sparkles className="w-3.5 h-3.5 text-oceanTeal" />
                  <span>LittleAura Guidance:</span>
                </div>
                <p className="leading-relaxed">
                  “At 25 months, night wakings frequently coincide with cognitive leaps or daytime nap transitions. Consider these gentle steps:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-navyBlue/90">
                  <li>Cap afternoon naps at 90 minutes and conclude them by 3:00 PM.</li>
                  <li>Ensure an evening protein-fiber snack (like banana with almond butter) to prevent blood sugar dips.</li>
                  <li>Keep night visits calm, brief, and dimly lit without stimulating conversation.</li>
                </ul>
                <p className="text-[10px] text-navyBlue/70 italic pt-1 border-t border-aquaMist/40">
                  Non-diagnostic guidance. If wakings are accompanied by fever or breathing changes, consult your pediatrician.
                </p>
              </div>
            </div>

            {/* Content info */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aquaMist/40 border border-aquaMist text-navyBlue text-xs font-bold mb-4">
                <Bot className="w-3.5 h-3.5 text-deepOcean" />
                <span>Empathetic, Evidence-Informed Support</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue leading-tight">
                Clear guidance for late-night parenting questions.
              </h3>
              <p className="mt-4 text-navyBlue/80 leading-relaxed">
                Parenting questions don't follow office hours. LittleAura AI provides compassionate, research-backed support that takes your child's age, routine, and historical milestones into account.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Answers contextualized to your child’s precise stage and recent logs.',
                  'Safe, structured prompt suggestions for sleep, nutrition, and tantrums.',
                  'Strict medical disclaimers prioritizing your relationship with your pediatrician.',
                  'Zero data retention for public model training.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-deepOcean shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-navyBlue font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/ai-assistant">
                  <Button variant="primary" icon={ArrowRight} iconPosition="right">
                    Ask LittleAura Assistant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Photo Insight Explanation */}
      <section id="photo-insight" className="py-20 bg-aquaMist/15 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pureWhite border border-aquaMist text-navyBlue text-xs font-bold mb-4">
              <Camera className="w-3.5 h-3.5 text-deepOcean" />
              <span>Visual Milestone Insights</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue">
              AI Photo Insight: Gentle, Non-Diagnostic Observations
            </h3>
            <p className="mt-4 text-navyBlue/80 text-sm sm:text-base leading-relaxed">
              Capture spontaneous play moments and receive constructive observations on tactile engagement, fine motor precision, and environmental ergonomics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-pureWhite border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-aquaMist/30 text-deepOcean flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h5 className="font-bold text-navyBlue text-base mb-1">Play Engagement Context</h5>
              <p className="text-xs text-navyBlue/70 leading-relaxed">
                Identifies open-ended play patterns, object handling, and bilateral hand exploration during building and puzzle tasks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-pureWhite border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-aquaMist/30 text-deepOcean flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h5 className="font-bold text-navyBlue text-base mb-1">Environmental Ergonomics</h5>
              <p className="text-xs text-navyBlue/70 leading-relaxed">
                Assesses safe play posture, natural lighting, and floor organization to support autonomous movement.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-pureWhite border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-aquaMist/30 text-deepOcean flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h5 className="font-bold text-navyBlue text-base mb-1">Play Expansion Ideas</h5>
              <p className="text-xs text-navyBlue/70 leading-relaxed">
                Suggests gentle parent prompt questions and follow-up activities to expand on the child’s natural curiosity.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/photo-insight">
              <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                Explore Photo Insight
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy and Security Section */}
      <section id="privacy" className="py-20 bg-midnightNavy text-pureWhite border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-12 h-12 rounded-2xl bg-deepOcean text-aquaMist flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-aquaMist" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pureWhite">
              Medical-Grade Privacy & Transparent AI
            </h3>
            <p className="mt-4 text-aquaMist/80 text-sm sm:text-base leading-relaxed">
              Your child’s photos, vaccination cards, and growth logs belong only to your family. We enforce strict per-user database rules and never monetize sensitive childhood data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-navyBlue/70 border border-slate-700/80">
              <h5 className="font-bold text-pureWhite text-base mb-1">Owner-Only Access</h5>
              <p className="text-xs text-slate-300">Strict Firestore and Storage security rules guarantee that only authenticated parents access records.</p>
            </div>
            <div className="p-6 rounded-2xl bg-navyBlue/70 border border-slate-700/80">
              <h5 className="font-bold text-pureWhite text-base mb-1">Non-Diagnostic Safety</h5>
              <p className="text-xs text-slate-300">Clear safety guardrails reinforce pediatric consultation for any medical questions or prescriptions.</p>
            </div>
            <div className="p-6 rounded-2xl bg-navyBlue/70 border border-slate-700/80">
              <h5 className="font-bold text-pureWhite text-base mb-1">Zero Data Selling</h5>
              <p className="text-xs text-slate-300">No ad-trackers, commercial ad-targeting, or public AI model training on your baby’s records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-20 bg-pureWhite border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-oceanTeal mb-2">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navyBlue">
              Answers for Mindful Parents
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-pureWhite hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-navyBlue">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-deepOcean shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-navyBlue/80 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-tr from-aquaMist/30 via-pureWhite to-oceanTeal/15 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-5xl font-black text-navyBlue">
            Give your parenting journey the calm it deserves.
          </h3>
          <p className="mt-4 text-base text-navyBlue/80 max-w-xl mx-auto">
            Experience intelligent guidance, organized health records, and joyful milestones with LittleAura today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right" className="shadow-md">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-pureWhite border-t border-slate-200 py-12 text-xs text-navyBlue/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-deepOcean flex items-center justify-center text-aquaMist">
              <Sparkles className="w-4 h-4 text-aquaMist" />
            </div>
            <div>
              <span className="font-bold text-navyBlue text-sm">LittleAura</span>
              <p className="text-[11px] text-oceanTeal font-semibold">Growing Together, Every Day.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-deepOcean">
            <Link to="/dashboard" className="hover:text-navyBlue">Dashboard</Link>
            <Link to="/growth" className="hover:text-navyBlue">Growth</Link>
            <Link to="/medical" className="hover:text-navyBlue">Medical</Link>
            <Link to="/daily-care" className="hover:text-navyBlue">Daily Care</Link>
            <Link to="/ai-assistant" className="hover:text-navyBlue">AI Assistant</Link>
            <Link to="/photo-insight" className="hover:text-navyBlue">Photo Insight</Link>
            <Link to="/settings" className="hover:text-navyBlue">Privacy & Settings</Link>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} LittleAura. All rights reserved.</p>
            <p className="text-[10px] text-navyBlue/50 mt-1 max-w-xs">
              Not a medical diagnostic service. Always consult qualified healthcare providers for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
