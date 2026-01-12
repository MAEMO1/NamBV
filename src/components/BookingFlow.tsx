'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Clock,
  Home,
  Leaf,
  Recycle,
  Euro,
  FileCheck,
  MapPin,
  User,
  Mail,
  Phone,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  Target,
  Wallet,
  MessageSquare,
} from 'lucide-react';

// Types
interface FormData {
  projectType: string;
  propertyType: string;
  propertyAge: string;
  priorities: string[];
  materialPreference: string;
  budget: string;
  timing: string;
  subsidyInterest: boolean;
  paymentSpread: boolean;
  motivation: string;
  name: string;
  email: string;
  phone: string;
  gemeente: string;
  selectedDate: string;
  selectedTime: string;
  message: string;
}

interface BookedSlot {
  date: string;
  times: string[];
}

// MOCK DATA
const bookedSlots: BookedSlot[] = [
  { date: '2025-01-06', times: ['09:00', '10:00', '14:00'] },
  { date: '2025-01-08', times: ['all'] },
  { date: '2025-01-10', times: ['11:00', '15:00', '16:00'] },
  { date: '2025-01-15', times: ['all'] },
  { date: '2025-01-17', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { date: '2025-01-22', times: ['14:00', '15:00'] },
];

const projectTypes = [
  { id: 'totaal', label: 'Totaalrenovatie', description: 'Complete renovatie van A tot Z', icon: Home },
  { id: 'renovatie', label: 'Renovatie & Verbouwing', description: 'Gerichte renovatiewerken', icon: Building2 },
  { id: 'badkamer', label: 'Badkamerrenovatie', description: 'Nieuwe badkamer', icon: Sparkles },
  { id: 'keuken', label: 'Keukenrenovatie', description: 'Nieuwe keuken', icon: Sparkles },
  { id: 'afwerking', label: 'Afwerking', description: 'Tegelwerk, schilderwerk, ...', icon: Sparkles },
  { id: 'technieken', label: 'Technieken', description: 'Elektriciteit, sanitair, verwarming', icon: Sparkles },
];

const propertyTypes = [
  { id: 'rijwoning', label: 'Rijwoning' },
  { id: 'herenhuis', label: 'Herenhuis' },
  { id: 'appartement', label: 'Appartement' },
  { id: 'vrijstaand', label: 'Vrijstaande woning' },
  { id: 'koppelwoning', label: 'Koppelwoning' },
  { id: 'anders', label: 'Anders' },
];

const propertyAges = [
  { id: 'voor1945', label: 'Voor 1945' },
  { id: '1945-1970', label: '1945 - 1970' },
  { id: '1970-1990', label: '1970 - 1990' },
  { id: '1990-2010', label: '1990 - 2010' },
  { id: 'na2010', label: 'Na 2010' },
  { id: 'onbekend', label: 'Weet ik niet' },
];

const priorities = [
  { id: 'duurzaam', label: 'Duurzame materialen', icon: Leaf },
  { id: 'hergebruik', label: 'Hergebruik materiaal', icon: Recycle },
  { id: 'energie', label: 'Energiebesparing', icon: Sparkles },
  { id: 'comfort', label: 'Wooncomfort', icon: Home },
  { id: 'design', label: 'Design & esthetiek', icon: Sparkles },
  { id: 'budget', label: 'Prijsbewust', icon: Euro },
];

const materialPreferences = [
  { id: 'eco', label: 'Ecologisch & duurzaam', description: 'Natuurlijke, milieuvriendelijke materialen' },
  { id: 'hergebruik', label: 'Hergebruik waar mogelijk', description: 'Bestaande materialen behouden' },
  { id: 'mix', label: 'Combinatie', description: 'Mix van nieuw en hergebruik' },
  { id: 'standaard', label: 'Standaard kwaliteit', description: 'Gangbare, kwalitatieve materialen' },
];

const motivationOptions = [
  { id: 'verkoop', label: 'Verkoop van de woning', description: 'Waarde verhogen voor verkoop' },
  { id: 'comfort', label: 'Meer wooncomfort', description: 'Beter wonen in uw huidige woning' },
  { id: 'energie', label: 'Energiebesparing', description: 'Lagere energiekosten en duurzaamheid' },
  { id: 'noodzaak', label: 'Noodzakelijke reparaties', description: 'Dringende problemen oplossen' },
  { id: 'uitbreiding', label: 'Uitbreiding gezin', description: 'Meer ruimte nodig' },
  { id: 'anders', label: 'Anders', description: 'Andere reden' },
];

const budgetRanges = [
  { id: 'klein', label: '< €25.000' },
  { id: 'medium', label: '€25.000 - €50.000' },
  { id: 'groot', label: '€50.000 - €100.000' },
  { id: 'xl', label: '€100.000 - €200.000' },
  { id: 'xxl', label: '> €200.000' },
  { id: 'onbekend', label: 'Nog geen idee' },
];

const timingOptions = [
  { id: 'asap', label: 'Zo snel mogelijk', icon: '🚀' },
  { id: '3maanden', label: 'Binnen 3 maanden', icon: '📅' },
  { id: '6maanden', label: '3 - 6 maanden', icon: '📆' },
  { id: 'later', label: 'Later / flexibel', icon: '🔄' },
];

const allTimeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const monthNames = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  const days: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isDateBooked(dateKey: string): boolean {
  const booking = bookedSlots.find(b => b.date === dateKey);
  return booking?.times.includes('all') || false;
}

function isTimeBooked(dateKey: string, time: string): boolean {
  const booking = bookedSlots.find(b => b.date === dateKey);
  if (!booking) return false;
  return booking.times.includes('all') || booking.times.includes(time);
}

function getAvailableTimesCount(dateKey: string): number {
  const booking = bookedSlots.find(b => b.date === dateKey);
  if (!booking) return allTimeSlots.length;
  if (booking.times.includes('all')) return 0;
  return allTimeSlots.length - booking.times.length;
}

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    propertyType: '',
    propertyAge: '',
    priorities: [],
    materialPreference: '',
    budget: '',
    timing: '',
    subsidyInterest: false,
    paymentSpread: false,
    motivation: '',
    name: '',
    email: '',
    phone: '',
    gemeente: '',
    selectedDate: '',
    selectedTime: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 5;
  const stepLabels = ['Project', 'Woning', 'Voorkeuren', 'Budget', 'Afspraak'];

  const monthDays = useMemo(
    () => getMonthDays(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
  }, []);

  const updateFormData = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePriority = (priorityId: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priorityId)
        ? prev.priorities.filter(p => p !== priorityId)
        : [...prev.priorities, priorityId]
    }));
  };

  const handleDateSelect = (day: number) => {
    const dateKey = formatDateKey(currentMonth.year, currentMonth.month, day);
    updateFormData('selectedDate', dateKey);
    updateFormData('selectedTime', '');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      let newMonth = prev.month + (direction === 'next' ? 1 : -1);
      let newYear = prev.year;
      if (newMonth > 11) { newMonth = 0; newYear++; }
      else if (newMonth < 0) { newMonth = 11; newYear--; }
      return { year: newYear, month: newMonth };
    });
  };

  const canNavigatePrev = () => !(currentMonth.year === today.year && currentMonth.month === today.month);
  const canNavigateNext = () => {
    const maxMonth = (today.month + 3) % 12;
    const maxYear = today.year + Math.floor((today.month + 3) / 12);
    return !(currentMonth.year === maxYear && currentMonth.month === maxMonth);
  };

  const isDaySelectable = (day: number | null) => {
    if (day === null) return false;
    const dateKey = formatDateKey(currentMonth.year, currentMonth.month, day);
    const date = new Date(currentMonth.year, currentMonth.month, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return false;
    if (
      currentMonth.year < today.year ||
      (currentMonth.year === today.year && currentMonth.month < today.month) ||
      (currentMonth.year === today.year && currentMonth.month === today.month && day <= today.day)
    ) return false;
    if (isDateBooked(dateKey)) return false;
    return true;
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.projectType !== '';
      case 2: return formData.propertyType !== '';
      case 3: return formData.materialPreference !== '';
      case 4: return formData.budget !== '' && formData.timing !== '';
      case 5: return formData.name !== '' && formData.email !== '' && formData.phone !== '' && formData.gemeente !== '' && formData.selectedDate !== '' && formData.selectedTime !== '';
      default: return true;
    }
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', formData);
    setIsSubmitted(true);
  };

  const formatSelectedDateDisplay = () => {
    if (!formData.selectedDate) return '';
    const [year, month, day] = formData.selectedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Success state - Premium design
  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-noir-950 via-noir-900 to-accent-900 p-8 md:p-12 text-center rounded-2xl">
        {/* Animated success icon */}
        <div className="relative mb-10">
          <div className="w-24 h-24 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-accent-500/30">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <div className="absolute inset-0 bg-accent-500/30 rounded-2xl blur-xl animate-pulse" />
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
          Uw afspraak is bevestigd!
        </h3>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-4 text-white justify-center">
            <Calendar className="h-5 w-5 text-accent-400" />
            <span className="font-medium">{formatSelectedDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-3 text-white justify-center">
            <Clock className="h-5 w-5 text-accent-400" />
            <span className="font-medium">{formData.selectedTime}</span>
          </div>
        </div>

        <p className="text-white/70 mb-10 max-w-md mx-auto">
          We sturen een bevestiging naar <strong className="text-white">{formData.email}</strong>.
          We kijken ernaar uit om uw project te bespreken.
        </p>

        <button
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setFormData({
              projectType: '', propertyType: '', propertyAge: '', priorities: [],
              materialPreference: '', budget: '', timing: '', subsidyInterest: false,
              paymentSpread: false, motivation: '', name: '', email: '', phone: '', gemeente: '',
              selectedDate: '', selectedTime: '', message: '',
            });
          }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-noir-900 font-medium rounded-xl hover:bg-accent-100 transition-all duration-500"
        >
          <Sparkles className="h-5 w-5" />
          Nieuwe afspraak
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft-xl border border-noir-100 overflow-hidden">
      {/* Progress bar - Premium design matching offerte */}
      <div className="bg-noir-950 px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          {stepLabels.map((label, idx) => (
            <div key={label} className={`flex items-center gap-2 ${idx < stepLabels.length - 1 ? 'flex-1' : ''}`}>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                  step > idx + 1
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                    : step === idx + 1
                    ? 'bg-white text-noir-900 shadow-lg'
                    : 'bg-noir-800 text-noir-500'
                }`}
              >
                {step > idx + 1 ? <Check className="h-5 w-5" /> : idx + 1}
              </div>
              <span className={`hidden md:block text-sm font-medium transition-colors ${
                step === idx + 1 ? 'text-white' : 'text-noir-500'
              }`}>
                {label}
              </span>
              {idx < stepLabels.length - 1 && (
                <div className="hidden md:block flex-1 h-1 mx-4 rounded-full bg-noir-800 overflow-hidden">
                  <div
                    className={`h-full bg-accent-500 transition-all duration-700 ${
                      step > idx + 1 ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-noir-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-600 to-accent-400 transition-all duration-700 ease-out rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="p-8 md:p-12">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                Wat voor project heeft u in gedachten?
              </h3>
            </div>
            <p className="text-noir-500 mb-10 ml-[52px]">Selecteer het type renovatie</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {projectTypes.map((type) => {
                const isSelected = formData.projectType === type.id;
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('projectType', type.id)}
                    className={`relative p-5 text-left rounded-xl border-2 transition-all duration-300 group ${
                      isSelected
                        ? 'border-accent-500 bg-accent-50 shadow-lg shadow-accent-500/10'
                        : 'border-noir-200 hover:border-accent-300 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className="h-5 w-5 text-accent-500" />
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected ? 'bg-accent-500 text-white' : 'bg-noir-100 text-noir-500 group-hover:bg-accent-100 group-hover:text-accent-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p className={`font-medium ${isSelected ? 'text-accent-700' : 'text-noir-900'}`}>
                      {type.label}
                    </p>
                    <p className="text-sm text-noir-500 mt-1">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="animate-fade-up space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-accent-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  Vertel ons over uw woning
                </h3>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">Dit helpt ons om beter advies te geven</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-700 mb-4">
                Type woning <span className="text-accent-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map((type) => {
                  const isSelected = formData.propertyType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateFormData('propertyType', type.id)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-700 mb-4">Bouwjaar (optioneel)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyAges.map((age) => {
                  const isSelected = formData.propertyAge === age.id;
                  return (
                    <button
                      key={age.id}
                      onClick={() => updateFormData('propertyAge', age.id)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      {age.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Priorities & Preferences */}
        {step === 3 && (
          <div className="animate-fade-up space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Target className="h-5 w-5 text-accent-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  Wat is voor u belangrijk?
                </h3>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">Selecteer uw prioriteiten (meerdere mogelijk)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {priorities.map((priority) => {
                const isSelected = formData.priorities.includes(priority.id);
                const IconComponent = priority.icon;
                return (
                  <button
                    key={priority.id}
                    onClick={() => togglePriority(priority.id)}
                    className={`p-4 text-left rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                      isSelected
                        ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-500/10'
                        : 'border-noir-200 hover:border-accent-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-accent-500 text-white' : 'bg-noir-100 text-noir-500'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-accent-700' : 'text-noir-900'}`}>
                      {priority.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-accent-500 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-700 mb-4">
                Voorkeur materiaalgebruik <span className="text-accent-500">*</span>
              </label>
              <div className="space-y-3">
                {materialPreferences.map((pref) => {
                  const isSelected = formData.materialPreference === pref.id;
                  return (
                    <button
                      key={pref.id}
                      onClick={() => updateFormData('materialPreference', pref.id)}
                      className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      <p className={`font-medium ${isSelected ? 'text-accent-700' : 'text-noir-900'}`}>
                        {pref.label}
                      </p>
                      <p className="text-sm text-noir-500 mt-1">{pref.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-700 mb-4">
                Waarom wilt u renoveren?
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {motivationOptions.map((option) => {
                  const isSelected = formData.motivation === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('motivation', option.id)}
                      className={`p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      <p className={`font-medium ${isSelected ? 'text-accent-700' : 'text-noir-900'}`}>
                        {option.label}
                      </p>
                      <p className="text-sm text-noir-500 mt-1">{option.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Timing */}
        {step === 4 && (
          <div className="animate-fade-up space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-accent-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  Budget & planning
                </h3>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">Dit helpt ons een realistisch voorstel te maken</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-700 mb-4">
                Indicatief budget <span className="text-accent-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {budgetRanges.map((range) => {
                  const isSelected = formData.budget === range.id;
                  return (
                    <button
                      key={range.id}
                      onClick={() => updateFormData('budget', range.id)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-4">
                <Calendar className="h-4 w-4 text-noir-400" />
                Wanneer wilt u starten? <span className="text-accent-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {timingOptions.map((option) => {
                  const isSelected = formData.timing === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => updateFormData('timing', option.id)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                          : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra options */}
            <div className="space-y-3 pt-8 border-t border-noir-100">
              <p className="text-sm font-medium text-noir-700 mb-4">Bijkomende opties</p>

              <button
                onClick={() => updateFormData('subsidyInterest', !formData.subsidyInterest)}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                  formData.subsidyInterest
                    ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-500/10'
                    : 'border-noir-200 hover:border-accent-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  formData.subsidyInterest ? 'bg-accent-500 text-white' : 'bg-noir-100 text-noir-500'
                }`}>
                  <FileCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${formData.subsidyInterest ? 'text-accent-700' : 'text-noir-900'}`}>
                    Ondersteuning subsidies & premies
                  </p>
                  <p className="text-sm text-noir-500">We helpen bij het aanvragen van beschikbare premies</p>
                </div>
                {formData.subsidyInterest && <CheckCircle2 className="h-5 w-5 text-accent-500" />}
              </button>

              <button
                onClick={() => updateFormData('paymentSpread', !formData.paymentSpread)}
                className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                  formData.paymentSpread
                    ? 'border-accent-500 bg-accent-50 shadow-md shadow-accent-500/10'
                    : 'border-noir-200 hover:border-accent-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  formData.paymentSpread ? 'bg-accent-500 text-white' : 'bg-noir-100 text-noir-500'
                }`}>
                  <Euro className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${formData.paymentSpread ? 'text-accent-700' : 'text-noir-900'}`}>
                    Interesse in betalingsspreiding
                  </p>
                  <p className="text-sm text-noir-500">Betaal in fasen naargelang de vordering</p>
                </div>
                {formData.paymentSpread && <CheckCircle2 className="h-5 w-5 text-accent-500" />}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact & Calendar */}
        {step === 5 && (
          <div className="animate-fade-up space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-accent-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  Plan uw gratis adviesgesprek
                </h3>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">Kies een datum en tijdstip dat u past</p>
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                  <User className="h-4 w-4 text-noir-400" />
                  Naam <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all"
                  placeholder="Uw naam"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                  <Mail className="h-4 w-4 text-noir-400" />
                  Email <span className="text-accent-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all"
                  placeholder="uw@email.be"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                  <Phone className="h-4 w-4 text-noir-400" />
                  Telefoon <span className="text-accent-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all"
                  placeholder="+32 ..."
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                  <MapPin className="h-4 w-4 text-noir-400" />
                  Gemeente <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.gemeente}
                  onChange={(e) => updateFormData('gemeente', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all"
                  placeholder="Gent, Mariakerke, ..."
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-gradient-to-br from-ivory-100 to-ivory-50 rounded-2xl p-6 border border-noir-100">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  disabled={!canNavigatePrev()}
                  className={`p-3 rounded-xl transition-all ${
                    canNavigatePrev() ? 'hover:bg-white text-noir-700 shadow-sm' : 'text-noir-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h4 className="text-lg font-display font-medium text-noir-900">
                  {monthNames[currentMonth.month]} {currentMonth.year}
                </h4>
                <button
                  onClick={() => navigateMonth('next')}
                  disabled={!canNavigateNext()}
                  className={`p-3 rounded-xl transition-all ${
                    canNavigateNext() ? 'hover:bg-white text-noir-700 shadow-sm' : 'text-noir-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Week headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-noir-500 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, index) => {
                  if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;

                  const dateKey = formatDateKey(currentMonth.year, currentMonth.month, day);
                  const isSelectable = isDaySelectable(day);
                  const isSelected = formData.selectedDate === dateKey;
                  const isFullyBooked = isDateBooked(dateKey);
                  const availableTimes = getAvailableTimesCount(dateKey);
                  const date = new Date(currentMonth.year, currentMonth.month, day);
                  const isSunday = date.getDay() === 0;
                  const isPast =
                    currentMonth.year < today.year ||
                    (currentMonth.year === today.year && currentMonth.month < today.month) ||
                    (currentMonth.year === today.year && currentMonth.month === today.month && day <= today.day);

                  return (
                    <button
                      key={day}
                      onClick={() => isSelectable && handleDateSelect(day)}
                      disabled={!isSelectable}
                      className={`aspect-square flex flex-col items-center justify-center text-sm rounded-xl transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                          : isFullyBooked
                            ? 'bg-noir-100 text-noir-300 cursor-not-allowed'
                            : isPast || isSunday
                              ? 'text-noir-300 cursor-not-allowed'
                              : 'hover:bg-white hover:shadow-md text-noir-700 cursor-pointer'
                      }`}
                    >
                      <span className="font-medium">{day}</span>
                      {isSelectable && !isSelected && availableTimes < allTimeSlots.length && availableTimes > 0 && (
                        <span className="text-[9px] text-accent-600 font-medium">{availableTimes} vrij</span>
                      )}
                      {isFullyBooked && <span className="text-[9px] text-noir-400">vol</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time selection */}
            {formData.selectedDate && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-4">
                  <Clock className="h-4 w-4 text-noir-400" />
                  Kies een tijdstip <span className="text-accent-500">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {allTimeSlots.map((time) => {
                    const isBooked = isTimeBooked(formData.selectedDate, time);
                    const isSelected = formData.selectedTime === time;

                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && updateFormData('selectedTime', time)}
                        disabled={isBooked}
                        className={`p-3 text-center rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                            : isBooked
                              ? 'bg-noir-100 text-noir-300 cursor-not-allowed line-through'
                              : 'border-2 border-noir-200 text-noir-700 hover:border-accent-500 hover:shadow-sm'
                        }`}
                      >
                        <p className="font-medium text-sm">{time}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                <MessageSquare className="h-4 w-4 text-noir-400" />
                Extra informatie (optioneel)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all resize-none"
                placeholder="Speciale wensen of vragen?"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation - Premium design */}
      <div className="px-8 md:px-12 py-6 bg-gradient-to-br from-ivory-100 to-ivory-50 border-t border-noir-100 flex justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-noir-200 text-noir-700 font-medium hover:bg-white hover:border-noir-300 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Vorige
          </button>
        ) : <div />}

        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-noir-900 text-white hover:bg-accent-600 shadow-lg hover:shadow-xl hover:shadow-accent-500/20'
                : 'bg-noir-200 text-noir-400 cursor-not-allowed'
            }`}
          >
            Volgende
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-lg hover:shadow-xl hover:shadow-accent-500/30'
                : 'bg-noir-200 text-noir-400 cursor-not-allowed'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Bevestig afspraak
          </button>
        )}
      </div>
    </div>
  );
}
