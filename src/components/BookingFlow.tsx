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
  ChevronRight,
  Check
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
  motivation: string; // Waarom wilt u renoveren?
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
  { id: 'totaal', label: 'Totaalrenovatie', description: 'Complete renovatie van A tot Z' },
  { id: 'renovatie', label: 'Renovatie & Verbouwing', description: 'Gerichte renovatiewerken' },
  { id: 'badkamer', label: 'Badkamerrenovatie', description: 'Nieuwe badkamer' },
  { id: 'keuken', label: 'Keukenrenovatie', description: 'Nieuwe keuken' },
  { id: 'afwerking', label: 'Afwerking', description: 'Tegelwerk, schilderwerk, ...' },
  { id: 'technieken', label: 'Technieken', description: 'Elektriciteit, sanitair, verwarming' },
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

const motivationOptions = [
  { id: 'verkoop', label: 'Verkoop van de woning', description: 'Waarde verhogen voor verkoop' },
  { id: 'comfort', label: 'Meer wooncomfort', description: 'Beter wonen in uw huidige woning' },
  { id: 'energie', label: 'Energiebesparing', description: 'Lagere energiekosten en duurzaamheid' },
  { id: 'noodzaak', label: 'Noodzakelijke reparaties', description: 'Dringende problemen oplossen' },
  { id: 'uitbreiding', label: 'Uitbreiding gezin', description: 'Meer ruimte nodig' },
  { id: 'anders', label: 'Anders', description: 'Andere reden' },
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

  // Success state
  if (isSubmitted) {
    return (
      <div className="bg-noir-900 p-12 text-center">
        <div className="w-20 h-20 bg-accent-500 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
          Uw afspraak is bevestigd
        </h3>
        <div className="bg-noir-800 p-6 mb-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 mb-3 text-white">
            <Calendar className="h-5 w-5 text-accent-500" />
            <span className="font-medium">{formatSelectedDateDisplay()}</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Clock className="h-5 w-5 text-accent-500" />
            <span className="font-medium">{formData.selectedTime}</span>
          </div>
        </div>
        <p className="text-noir-400 mb-10 max-w-md mx-auto">
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
          className="inline-flex items-center gap-2 px-8 py-4 border border-noir-700 text-white font-medium uppercase tracking-wide hover:bg-noir-800 transition-all duration-300"
        >
          <Sparkles className="h-5 w-5" />
          Nieuwe afspraak
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow-soft-lg">
      {/* Progress bar - Elegant step indicator */}
      <div className="bg-noir-900 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          {stepLabels.map((label, idx) => (
            <div key={label} className={`flex items-center gap-2 ${idx < stepLabels.length - 1 ? 'flex-1' : ''}`}>
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step > idx + 1
                    ? 'bg-accent-500 text-white'
                    : step === idx + 1
                    ? 'bg-white text-noir-900'
                    : 'bg-noir-800 text-noir-500'
                }`}
              >
                {step > idx + 1 ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className={`hidden md:block text-sm font-medium uppercase tracking-wide ${
                step === idx + 1 ? 'text-white' : 'text-noir-500'
              }`}>
                {label}
              </span>
              {idx < stepLabels.length - 1 && (
                <div className={`hidden md:block flex-1 h-px mx-4 transition-colors duration-500 ${
                  step > idx + 1 ? 'bg-accent-500' : 'bg-noir-800'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="h-1 bg-noir-800 overflow-hidden">
          <div
            className="h-full bg-accent-500 transition-all duration-700 ease-smooth"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="p-8 md:p-12">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-2">
                Wat voor project heeft u in gedachten?
              </h3>
              <p className="text-noir-500">Selecteer het type renovatie</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateFormData('projectType', type.id)}
                  className={`p-5 text-left border transition-all duration-300 ${
                    formData.projectType === type.id
                      ? 'border-accent-500 bg-accent-500/5'
                      : 'border-noir-200 hover:border-noir-400'
                  }`}
                >
                  <p className={`font-medium ${formData.projectType === type.id ? 'text-accent-600' : 'text-noir-900'}`}>
                    {type.label}
                  </p>
                  <p className="text-sm text-noir-500 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-2">
                Vertel ons over uw woning
              </h3>
              <p className="text-noir-500">Dit helpt ons om beter advies te geven</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">Type woning *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('propertyType', type.id)}
                    className={`p-4 text-sm font-medium border transition-all duration-300 ${
                      formData.propertyType === type.id
                        ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                        : 'border-noir-200 text-noir-700 hover:border-noir-400'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">Bouwjaar (optioneel)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyAges.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => updateFormData('propertyAge', age.id)}
                    className={`p-4 text-sm font-medium border transition-all duration-300 ${
                      formData.propertyAge === age.id
                        ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                        : 'border-noir-200 text-noir-700 hover:border-noir-400'
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Priorities & Preferences */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-2">
                Wat is voor u belangrijk?
              </h3>
              <p className="text-noir-500">Selecteer uw prioriteiten (meerdere mogelijk)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => togglePriority(priority.id)}
                  className={`p-4 text-left border transition-all duration-300 flex items-center gap-4 ${
                    formData.priorities.includes(priority.id)
                      ? 'border-accent-500 bg-accent-500/5'
                      : 'border-noir-200 hover:border-noir-400'
                  }`}
                >
                  <priority.icon className={`h-5 w-5 flex-shrink-0 ${
                    formData.priorities.includes(priority.id) ? 'text-accent-600' : 'text-noir-400'
                  }`} />
                  <span className={`font-medium ${formData.priorities.includes(priority.id) ? 'text-accent-600' : 'text-noir-900'}`}>
                    {priority.label}
                  </span>
                  {formData.priorities.includes(priority.id) && (
                    <CheckCircle2 className="h-5 w-5 text-accent-500 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">
                Voorkeur materiaalgebruik *
              </label>
              <div className="space-y-3">
                {materialPreferences.map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => updateFormData('materialPreference', pref.id)}
                    className={`w-full p-5 text-left border transition-all duration-300 ${
                      formData.materialPreference === pref.id
                        ? 'border-accent-500 bg-accent-500/5'
                        : 'border-noir-200 hover:border-noir-400'
                    }`}
                  >
                    <p className={`font-medium ${formData.materialPreference === pref.id ? 'text-accent-600' : 'text-noir-900'}`}>
                      {pref.label}
                    </p>
                    <p className="text-sm text-noir-500 mt-1">{pref.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">
                Waarom wilt u renoveren?
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {motivationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFormData('motivation', option.id)}
                    className={`p-4 text-left border transition-all duration-300 ${
                      formData.motivation === option.id
                        ? 'border-accent-500 bg-accent-500/5'
                        : 'border-noir-200 hover:border-noir-400'
                    }`}
                  >
                    <p className={`font-medium ${formData.motivation === option.id ? 'text-accent-600' : 'text-noir-900'}`}>
                      {option.label}
                    </p>
                    <p className="text-sm text-noir-500 mt-1">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Timing */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-2">
                Budget & planning
              </h3>
              <p className="text-noir-500">Dit helpt ons een realistisch voorstel te maken</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">Indicatief budget *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => updateFormData('budget', range.id)}
                    className={`p-4 text-sm font-medium border transition-all duration-300 ${
                      formData.budget === range.id
                        ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                        : 'border-noir-200 text-noir-700 hover:border-noir-400'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">Wanneer wilt u starten? *</label>
              <div className="grid grid-cols-2 gap-3">
                {timingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFormData('timing', option.id)}
                    className={`p-4 text-sm font-medium border transition-all duration-300 ${
                      formData.timing === option.id
                        ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                        : 'border-noir-200 text-noir-700 hover:border-noir-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra options */}
            <div className="space-y-3 pt-6 border-t border-noir-100">
              <p className="text-sm font-medium text-noir-500 uppercase tracking-wider">Bijkomende opties</p>

              <button
                onClick={() => updateFormData('subsidyInterest', !formData.subsidyInterest)}
                className={`w-full p-5 text-left border transition-all duration-300 flex items-center gap-4 ${
                  formData.subsidyInterest
                    ? 'border-accent-500 bg-accent-500/5'
                    : 'border-noir-200 hover:border-noir-400'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center ${
                  formData.subsidyInterest ? 'bg-accent-500' : 'bg-noir-100'
                }`}>
                  <FileCheck className={`h-5 w-5 ${formData.subsidyInterest ? 'text-white' : 'text-noir-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${formData.subsidyInterest ? 'text-accent-600' : 'text-noir-900'}`}>
                    Ondersteuning subsidies & premies
                  </p>
                  <p className="text-sm text-noir-500">We helpen bij het aanvragen van beschikbare premies</p>
                </div>
              </button>

              <button
                onClick={() => updateFormData('paymentSpread', !formData.paymentSpread)}
                className={`w-full p-5 text-left border transition-all duration-300 flex items-center gap-4 ${
                  formData.paymentSpread
                    ? 'border-accent-500 bg-accent-500/5'
                    : 'border-noir-200 hover:border-noir-400'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center ${
                  formData.paymentSpread ? 'bg-accent-500' : 'bg-noir-100'
                }`}>
                  <Euro className={`h-5 w-5 ${formData.paymentSpread ? 'text-white' : 'text-noir-400'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${formData.paymentSpread ? 'text-accent-600' : 'text-noir-900'}`}>
                    Interesse in betalingsspreiding
                  </p>
                  <p className="text-sm text-noir-500">Betaal in fasen naargelang de vordering</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Contact & Calendar */}
        {step === 5 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-2">
                Plan uw gratis adviesgesprek
              </h3>
              <p className="text-noir-500">Kies een datum en tijdstip dat u past</p>
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  <User className="h-4 w-4 inline mr-2" />Naam *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                  placeholder="Uw naam"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  <Mail className="h-4 w-4 inline mr-2" />Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                  placeholder="uw@email.be"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  <Phone className="h-4 w-4 inline mr-2" />Telefoon *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                  placeholder="+32 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  <MapPin className="h-4 w-4 inline mr-2" />Gemeente *
                </label>
                <input
                  type="text"
                  value={formData.gemeente}
                  onChange={(e) => updateFormData('gemeente', e.target.value)}
                  className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                  placeholder="Gent, Mariakerke, ..."
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-ivory-200 p-6 border border-noir-100">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth('prev')}
                  disabled={!canNavigatePrev()}
                  className={`p-2 transition-all ${
                    canNavigatePrev() ? 'hover:bg-noir-100 text-noir-700' : 'text-noir-300 cursor-not-allowed'
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
                  className={`p-2 transition-all ${
                    canNavigateNext() ? 'hover:bg-noir-100 text-noir-700' : 'text-noir-300 cursor-not-allowed'
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
                      className={`aspect-square flex flex-col items-center justify-center text-sm transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-accent-500 text-white'
                          : isFullyBooked
                            ? 'bg-noir-100 text-noir-300 cursor-not-allowed'
                            : isPast || isSunday
                              ? 'text-noir-300 cursor-not-allowed'
                              : 'hover:bg-accent-500/10 text-noir-700 cursor-pointer'
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
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Kies een tijdstip *
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {allTimeSlots.map((time) => {
                    const isBooked = isTimeBooked(formData.selectedDate, time);
                    const isSelected = formData.selectedTime === time;

                    return (
                      <button
                        key={time}
                        onClick={() => !isBooked && updateFormData('selectedTime', time)}
                        disabled={isBooked}
                        className={`p-3 text-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-accent-500 text-white'
                            : isBooked
                              ? 'bg-noir-100 text-noir-300 cursor-not-allowed line-through'
                              : 'border border-noir-200 text-noir-700 hover:border-accent-500'
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
              <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                <HelpCircle className="h-4 w-4 inline mr-2" />Extra informatie (optioneel)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors resize-none"
                placeholder="Speciale wensen of vragen?"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-8 md:px-12 py-6 bg-ivory-200 border-t border-noir-100 flex justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-noir-300 text-noir-700 font-medium hover:bg-white transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Vorige
          </button>
        ) : <div />}

        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className={`inline-flex items-center gap-2 px-8 py-3 font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-noir-900 text-white hover:bg-accent-500'
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
            className={`inline-flex items-center gap-2 px-8 py-3 font-medium transition-all duration-300 ${
              canProceed()
                ? 'bg-accent-500 text-white hover:bg-accent-600'
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
