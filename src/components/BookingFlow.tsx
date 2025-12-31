'use client';

import { useState, useMemo } from 'react';
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
  HelpCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Sparkles,
  ChevronLeft,
  ChevronRight
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
  name: string;
  email: string;
  phone: string;
  gemeente: string;
  selectedDate: string;
  selectedTime: string;
  message: string;
}

interface BookedSlot {
  date: string; // Format: YYYY-MM-DD
  times: string[]; // Array of booked times, or ['all'] if entire day is booked
}

// MOCK DATA: In production, this would come from an API/database
// When NamBV confirms a booking, add the date/time here
const bookedSlots: BookedSlot[] = [
  { date: '2025-01-06', times: ['09:00', '10:00', '14:00'] },
  { date: '2025-01-08', times: ['all'] }, // Entire day booked
  { date: '2025-01-10', times: ['11:00', '15:00', '16:00'] },
  { date: '2025-01-15', times: ['all'] },
  { date: '2025-01-17', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'] },
  { date: '2025-01-22', times: ['14:00', '15:00'] },
];

const projectTypes = [
  { id: 'totaal', label: 'Totaalrenovatie', description: 'Complete renovatie van A tot Z', icon: Home },
  { id: 'renovatie', label: 'Renovatie & Verbouwing', description: 'Gerichte renovatiewerken', icon: Home },
  { id: 'badkamer', label: 'Badkamerrenovatie', description: 'Nieuwe badkamer', icon: Home },
  { id: 'keuken', label: 'Keukenrenovatie', description: 'Nieuwe keuken', icon: Home },
  { id: 'afwerking', label: 'Afwerking', description: 'Tegelwerk, schilderwerk, ...', icon: Home },
  { id: 'technieken', label: 'Technieken', description: 'Elektriciteit, sanitair, verwarming', icon: Home },
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
  { id: 'hergebruik', label: 'Hergebruik bestaand materiaal', icon: Recycle },
  { id: 'energie', label: 'Energiebesparing', icon: Sparkles },
  { id: 'comfort', label: 'Wooncomfort', icon: Home },
  { id: 'design', label: 'Design & esthetiek', icon: Sparkles },
  { id: 'budget', label: 'Prijsbewust', icon: Euro },
];

const materialPreferences = [
  { id: 'eco', label: 'Ecologisch & duurzaam', description: 'Natuurlijke, milieuvriendelijke materialen' },
  { id: 'hergebruik', label: 'Hergebruik waar mogelijk', description: 'Bestaande materialen behouden en opwaarderen' },
  { id: 'mix', label: 'Combinatie', description: 'Mix van nieuw en hergebruik' },
  { id: 'standaard', label: 'Standaard kwaliteit', description: 'Gangbare, kwalitatieve materialen' },
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
  { id: 'asap', label: 'Zo snel mogelijk' },
  { id: '3maanden', label: 'Binnen 3 maanden' },
  { id: '6maanden', label: '3 - 6 maanden' },
  { id: 'later', label: 'Later / flexibel' },
];

const allTimeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const monthNames = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];

// Helper functions for calendar
function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Get the day of week for the first day (0 = Sunday, we want Monday = 0)
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const days: (number | null)[] = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

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
    updateFormData('selectedTime', ''); // Reset time when date changes
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      let newMonth = prev.month + (direction === 'next' ? 1 : -1);
      let newYear = prev.year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      return { year: newYear, month: newMonth };
    });
  };

  const canNavigatePrev = () => {
    return !(currentMonth.year === today.year && currentMonth.month === today.month);
  };

  const canNavigateNext = () => {
    // Allow navigation up to 3 months ahead
    const maxMonth = (today.month + 3) % 12;
    const maxYear = today.year + Math.floor((today.month + 3) / 12);
    return !(currentMonth.year === maxYear && currentMonth.month === maxMonth);
  };

  const isDaySelectable = (day: number | null) => {
    if (day === null) return false;

    const dateKey = formatDateKey(currentMonth.year, currentMonth.month, day);
    const date = new Date(currentMonth.year, currentMonth.month, day);
    const dayOfWeek = date.getDay();

    // Not selectable if it's Sunday (0)
    if (dayOfWeek === 0) return false;

    // Not selectable if it's in the past
    if (
      currentMonth.year < today.year ||
      (currentMonth.year === today.year && currentMonth.month < today.month) ||
      (currentMonth.year === today.year && currentMonth.month === today.month && day <= today.day)
    ) {
      return false;
    }

    // Not selectable if entire day is booked
    if (isDateBooked(dateKey)) return false;

    return true;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType !== '';
      case 2:
        return formData.propertyType !== '';
      case 3:
        return formData.materialPreference !== '';
      case 4:
        return formData.budget !== '' && formData.timing !== '';
      case 5:
        return formData.name !== '' && formData.email !== '' && formData.phone !== '' && formData.gemeente !== '' && formData.selectedDate !== '' && formData.selectedTime !== '';
      default:
        return true;
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
    return date.toLocaleDateString('nl-BE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-forest-50 to-cream-50 rounded-3xl p-10 text-center border border-forest-100">
        <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-forest-600" />
        </div>
        <h3 className="text-2xl font-display font-semibold text-stone-900 mb-3">
          Uw afspraak is bevestigd!
        </h3>
        <div className="bg-white rounded-2xl p-6 mb-6 max-w-sm mx-auto border border-sand-100">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-forest-600" />
            <span className="font-semibold text-stone-900">{formatSelectedDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-forest-600" />
            <span className="font-semibold text-stone-900">{formData.selectedTime}</span>
          </div>
        </div>
        <p className="text-stone-600 mb-8 max-w-md mx-auto">
          We sturen een bevestiging naar <strong>{formData.email}</strong>.
          We kijken ernaar uit om uw project te bespreken!
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setFormData({
              projectType: '',
              propertyType: '',
              propertyAge: '',
              priorities: [],
              materialPreference: '',
              budget: '',
              timing: '',
              subsidyInterest: false,
              paymentSpread: false,
              name: '',
              email: '',
              phone: '',
              gemeente: '',
              selectedDate: '',
              selectedTime: '',
              message: '',
            });
          }}
          className="inline-flex items-center px-6 py-3 bg-white border-2 border-forest-200 text-forest-700 rounded-full font-medium hover:bg-forest-50 transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Nieuwe afspraak
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-sand-100 overflow-hidden">
      {/* Progress bar */}
      <div className="bg-cream-50 px-6 py-4 border-b border-sand-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-stone-600">Stap {step} van {totalSteps}</span>
          <span className="text-sm text-stone-500">
            {step === 1 && 'Type project'}
            {step === 2 && 'Uw woning'}
            {step === 3 && 'Uw voorkeuren'}
            {step === 4 && 'Budget & timing'}
            {step === 5 && 'Afspraak inplannen'}
          </span>
        </div>
        <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-forest-500 to-forest-600 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                Wat voor project heeft u in gedachten?
              </h3>
              <p className="text-stone-500">Selecteer het type renovatie</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateFormData('projectType', type.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    formData.projectType === type.id
                      ? 'border-forest-500 bg-forest-50'
                      : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                  }`}
                >
                  <p className="font-semibold text-stone-900">{type.label}</p>
                  <p className="text-sm text-stone-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                Vertel ons over uw woning
              </h3>
              <p className="text-stone-500">Dit helpt ons om beter advies te geven</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Type woning</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('propertyType', type.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.propertyType === type.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                    }`}
                  >
                    <p className="font-medium text-stone-900 text-sm">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Bouwjaar (optioneel)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyAges.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => updateFormData('propertyAge', age.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.propertyAge === age.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                    }`}
                  >
                    <p className="font-medium text-stone-900 text-sm">{age.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Priorities & Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                Wat is voor u belangrijk?
              </h3>
              <p className="text-stone-500">Selecteer uw prioriteiten (meerdere mogelijk)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => togglePriority(priority.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-3 ${
                    formData.priorities.includes(priority.id)
                      ? 'border-forest-500 bg-forest-50'
                      : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                  }`}
                >
                  <priority.icon className={`h-5 w-5 flex-shrink-0 ${
                    formData.priorities.includes(priority.id) ? 'text-forest-600' : 'text-stone-400'
                  }`} />
                  <span className="font-medium text-stone-900">{priority.label}</span>
                  {formData.priorities.includes(priority.id) && (
                    <CheckCircle2 className="h-5 w-5 text-forest-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                Voorkeur materiaalgebruik
              </label>
              <div className="space-y-3">
                {materialPreferences.map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => updateFormData('materialPreference', pref.id)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                      formData.materialPreference === pref.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {pref.id === 'hergebruik' && <Recycle className="h-5 w-5 text-terracotta-600" />}
                      {pref.id === 'eco' && <Leaf className="h-5 w-5 text-forest-600" />}
                      {pref.id === 'mix' && <Sparkles className="h-5 w-5 text-sand-700" />}
                      {pref.id === 'standaard' && <Home className="h-5 w-5 text-stone-600" />}
                      <div>
                        <p className="font-semibold text-stone-900">{pref.label}</p>
                        <p className="text-sm text-stone-500">{pref.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Timing */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                Budget & planning
              </h3>
              <p className="text-stone-500">Dit helpt ons een realistisch voorstel te maken</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Indicatief budget</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => updateFormData('budget', range.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.budget === range.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                    }`}
                  >
                    <p className="font-medium text-stone-900 text-sm">{range.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Wanneer wilt u starten?</label>
              <div className="grid grid-cols-2 gap-3">
                {timingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFormData('timing', option.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                      formData.timing === option.id
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-sand-200 hover:border-forest-300 bg-cream-50/50'
                    }`}
                  >
                    <p className="font-medium text-stone-900 text-sm">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra options */}
            <div className="space-y-3 pt-4 border-t border-sand-100">
              <p className="text-sm font-medium text-stone-700">Bijkomende opties</p>

              <button
                onClick={() => updateFormData('subsidyInterest', !formData.subsidyInterest)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                  formData.subsidyInterest
                    ? 'border-terracotta-500 bg-terracotta-50'
                    : 'border-sand-200 hover:border-terracotta-300 bg-cream-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  formData.subsidyInterest ? 'bg-terracotta-100' : 'bg-sand-100'
                }`}>
                  <FileCheck className={`h-5 w-5 ${formData.subsidyInterest ? 'text-terracotta-600' : 'text-stone-400'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">Ondersteuning subsidies & premies</p>
                  <p className="text-sm text-stone-500">We helpen bij het aanvragen van beschikbare premies</p>
                </div>
                {formData.subsidyInterest && <CheckCircle2 className="h-5 w-5 text-terracotta-600" />}
              </button>

              <button
                onClick={() => updateFormData('paymentSpread', !formData.paymentSpread)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                  formData.paymentSpread
                    ? 'border-sand-500 bg-sand-50'
                    : 'border-sand-200 hover:border-sand-400 bg-cream-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  formData.paymentSpread ? 'bg-sand-200' : 'bg-sand-100'
                }`}>
                  <Euro className={`h-5 w-5 ${formData.paymentSpread ? 'text-sand-700' : 'text-stone-400'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">Interesse in betalingsspreiding</p>
                  <p className="text-sm text-stone-500">Betaal in fasen naargelang de vordering van het project</p>
                </div>
                {formData.paymentSpread && <CheckCircle2 className="h-5 w-5 text-sand-700" />}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact & Calendar Appointment */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">
                Plan uw gratis adviesgesprek
              </h3>
              <p className="text-stone-500">Kies een datum en tijdstip dat u past</p>
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" /> Naam *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all"
                  placeholder="Uw naam"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" /> Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all"
                  placeholder="uw@email.be"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" /> Telefoon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all"
                  placeholder="+32 ..."
                />
              </div>
              <div>
                <label htmlFor="gemeente" className="block text-sm font-medium text-stone-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" /> Gemeente *
                </label>
                <input
                  type="text"
                  id="gemeente"
                  value={formData.gemeente}
                  onChange={(e) => updateFormData('gemeente', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all"
                  placeholder="Gent, Mariakerke, ..."
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-cream-50 rounded-2xl p-4 border border-sand-100">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  disabled={!canNavigatePrev()}
                  className={`p-2 rounded-xl transition-all ${
                    canNavigatePrev()
                      ? 'hover:bg-sand-100 text-stone-700'
                      : 'text-stone-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h4 className="text-lg font-semibold text-stone-900">
                  {monthNames[currentMonth.month]} {currentMonth.year}
                </h4>
                <button
                  onClick={() => navigateMonth('next')}
                  disabled={!canNavigateNext()}
                  className={`p-2 rounded-xl transition-all ${
                    canNavigateNext()
                      ? 'hover:bg-sand-100 text-stone-700'
                      : 'text-stone-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-stone-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

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
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-forest-600 text-white shadow-lg shadow-forest-600/25'
                          : isFullyBooked
                            ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                            : isPast || isSunday
                              ? 'text-stone-300 cursor-not-allowed'
                              : 'hover:bg-forest-100 text-stone-700 cursor-pointer'
                      }`}
                    >
                      <span className="font-medium">{day}</span>
                      {isSelectable && !isSelected && availableTimes < allTimeSlots.length && availableTimes > 0 && (
                        <span className="text-[10px] text-terracotta-500 font-medium">
                          {availableTimes} vrij
                        </span>
                      )}
                      {isFullyBooked && (
                        <span className="text-[10px] text-stone-400">vol</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-sand-200 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-forest-600" />
                  <span>Geselecteerd</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-stone-100" />
                  <span>Niet beschikbaar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-sand-200" />
                  <span>Beschikbaar</span>
                </div>
              </div>
            </div>

            {/* Time selection - only show when date is selected */}
            {formData.selectedDate && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  <Clock className="h-4 w-4 inline mr-1" /> Kies een tijdstip voor {formatSelectedDateDisplay()} *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {allTimeSlots.map((time) => {
                    const isBooked = isTimeBooked(formData.selectedDate, time);
                    const isSelected = formData.selectedTime === time;

                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && updateFormData('selectedTime', time)}
                        disabled={isBooked}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                          isSelected
                            ? 'border-forest-500 bg-forest-500 text-white'
                            : isBooked
                              ? 'border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed line-through'
                              : 'border-sand-200 hover:border-forest-300 bg-cream-50/50 text-stone-700'
                        }`}
                      >
                        <p className="font-medium text-sm">{time}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Optional message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                <HelpCircle className="h-4 w-4 inline mr-1" /> Extra informatie (optioneel)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-cream-50/50 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 focus:bg-white transition-all resize-none"
                placeholder="Speciale wensen of vragen?"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 md:px-8 py-6 bg-cream-50/50 border-t border-sand-100 flex justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center px-5 py-2.5 text-stone-600 hover:text-stone-900 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Vorige
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-forest-600 text-white hover:bg-forest-700 hover:shadow-lg hover:shadow-forest-600/25'
                : 'bg-sand-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            Volgende
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-forest-600 text-white hover:bg-forest-700 hover:shadow-lg hover:shadow-forest-600/25'
                : 'bg-sand-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Bevestig afspraak
          </button>
        )}
      </div>
    </div>
  );
}
