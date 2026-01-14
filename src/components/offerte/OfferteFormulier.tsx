'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Home,
  Bath,
  UtensilsCrossed,
  Sofa,
  BedDouble,
  Expand,
  Zap,
  Droplet,
  Layers,
  Paintbrush,
  MoreHorizontal,
  Sparkles,
  Building2,
  CheckCircle2,
  Mail,
  User,
  MapPin,
  Calendar,
} from 'lucide-react'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import {
  QuoteRequestInputSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
} from '@/lib/validations/quote'
import {
  trackFormStart,
  trackFormProgress,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  trackClickToCall,
} from '@/lib/analytics'

type ServiceType = { id: string; name: string; slug: string; icon: string }
type PropertyType = { id: string; name: string; slug: string }

// Icon mapping for service types
const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  bath: Bath,
  utensils: UtensilsCrossed,
  toilet: Bath,
  sofa: Sofa,
  bed: BedDouble,
  expand: Expand,
  zap: Zap,
  droplet: Droplet,
  layers: Layers,
  paintbrush: Paintbrush,
  'more-horizontal': MoreHorizontal,
}

// Budget range IDs - labels come from translations
const budgetRangeIds = [
  'UNDER_10K',
  'RANGE_10K_25K',
  'RANGE_25K_50K',
  'RANGE_50K_100K',
  'OVER_100K',
  'UNKNOWN',
] as const

// Generate years (current year + next 3 years)
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const availableYears = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3]

type FormData = {
  fullName: string
  email: string
  phone: string
  postalCode: string
  propertyTypeId: string
  serviceTypeIds: string[]
  description: string
  preferredStart: string
  budgetRange: string
  gdprConsent: boolean
}

export default function OfferteFormulier() {
  const t = useTranslations('offertePage')
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null)
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([])
  const formStartTracked = useRef(false)

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    propertyTypeId: '',
    serviceTypeIds: [],
    description: '',
    preferredStart: '',
    budgetRange: '',
    gdprConsent: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Get translated month names
  const monthNames = [
    t('months.0'), t('months.1'), t('months.2'), t('months.3'),
    t('months.4'), t('months.5'), t('months.6'), t('months.7'),
    t('months.8'), t('months.9'), t('months.10'), t('months.11')
  ]

  // Get translated budget ranges
  const budgetRanges = budgetRangeIds.map(id => ({
    id,
    label: t(`budgetRanges.${id}`)
  }))

  // Helper to get translated service/property type name
  const getServiceTypeName = (slug: string, fallbackName: string) => {
    try {
      return t(`serviceTypes.${slug}`)
    } catch {
      return fallbackName
    }
  }

  const getPropertyTypeName = (slug: string, fallbackName: string) => {
    try {
      return t(`propertyTypes.${slug}`)
    } catch {
      return fallbackName
    }
  }

  // Load service types and property types from API
  useEffect(() => {
    async function loadFormData() {
      try {
        const response = await fetch('/api/quotes')
        if (response.ok) {
          const data = await response.json()
          setServiceTypes(data.serviceTypes || [])
          setPropertyTypes(data.propertyTypes || [])
        }
      } catch (error) {
        console.error('Failed to load form data:', error)
      }
    }
    loadFormData()
  }, [])

  const totalSteps = 4
  const stepLabels = [t('stepLabels.0'), t('stepLabels.1'), t('stepLabels.2'), t('stepLabels.3')]

  // Track form start on first interaction
  const trackStart = () => {
    if (!formStartTracked.current) {
      formStartTracked.current = true
      trackFormStart('offerte', '/offerte')
    }
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    trackStart()
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const toggleService = (serviceId: string) => {
    trackStart()
    setFormData(prev => ({
      ...prev,
      serviceTypeIds: prev.serviceTypeIds.includes(serviceId)
        ? prev.serviceTypeIds.filter(id => id !== serviceId)
        : [...prev.serviceTypeIds, serviceId]
    }))
    if (errors.serviceTypeIds) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.serviceTypeIds
        return newErrors
      })
    }
  }

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {}

    try {
      if (stepNum === 1) {
        Step1Schema.parse({
          serviceTypeIds: formData.serviceTypeIds,
          propertyTypeId: formData.propertyTypeId
        })
      } else if (stepNum === 2) {
        Step2Schema.parse({
          description: formData.description,
          preferredStart: formData.preferredStart || undefined,
          budgetRange: formData.budgetRange || undefined
        })
      } else if (stepNum === 3) {
        Step3Schema.parse({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone.replace(/\s/g, ''),
          postalCode: formData.postalCode.replace(/\s/g, '')
        })
      } else if (stepNum === 4) {
        Step4Schema.parse({
          gdprConsent: formData.gdprConsent
        })
      }
    } catch (err) {
      if (err instanceof Error && 'errors' in err) {
        const zodError = err as { errors: Array<{ path: string[]; message: string }> }
        zodError.errors.forEach((e) => {
          const field = e.path[0]
          if (field) {
            newErrors[field] = e.message
          }
        })
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      const newStep = Math.min(step + 1, totalSteps)
      trackFormProgress('offerte', stepLabels[step - 1], step, totalSteps)
      setStep(newStep)
    }
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsSubmitting(true)
    trackFormSubmit('offerte', '/offerte')

    try {
      const validatedData = QuoteRequestInputSchema.parse({
        ...formData,
        phone: formData.phone.replace(/\s/g, ''),
        postalCode: formData.postalCode.replace(/\s/g, ''),
        budgetRange: formData.budgetRange || undefined,
        preferredStart: formData.preferredStart || undefined,
        gdprConsent: formData.gdprConsent as true
      })

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      const result = await response.json()
      setReferenceNumber(result.referenceNumber)
      trackFormSuccess('offerte', result.referenceNumber)
      setIsSubmitted(true)
    } catch {
      trackFormError('offerte', 'server', undefined, 'Submission failed')
      setErrors({ submit: t('submitError') })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-noir-950 via-noir-900 to-accent-900 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          {/* Animated success icon */}
          <div className="relative mb-10">
            <div className="w-24 h-24 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto animate-scale-in shadow-glow">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-accent-500/30 rounded-2xl blur-xl animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 animate-fade-up">
            {t('successTitle')}
          </h1>
          <p className="text-lg text-white/70 mb-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {t('successMessage')}
          </p>

          {referenceNumber && (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <span className="text-sm text-white/50 uppercase tracking-wider">{t('referenceLabel')}</span>
              <p className="text-2xl text-white font-display font-medium mt-2">{referenceNumber}</p>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-noir-900 font-medium rounded-lg hover:bg-accent-100 transition-all duration-500 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <Home className="h-5 w-5" />
            {t('backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-ivory-50 to-white">
      {/* Header */}
      <header className="bg-noir-950 px-6 py-5 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="group">
            <Logo color="light" showTagline={true} />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="light" />
            <a
              href="tel:+32493812789"
              onClick={() => trackClickToCall('+32493812789', 'header')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+32 493 81 27 89</span>
            </a>
          </div>
        </div>
      </header>

      {/* Progress Bar - Premium design */}
      <div className="bg-white shadow-sm border-b border-noir-100 sticky top-[68px] z-40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            {stepLabels.map((label, idx) => (
              <div
                key={label}
                className={`flex items-center gap-3 ${idx < stepLabels.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                    step > idx + 1
                      ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                      : step === idx + 1
                      ? 'bg-noir-900 text-white shadow-lg'
                      : 'bg-noir-100 text-noir-400'
                  }`}
                >
                  {step > idx + 1 ? <Check className="h-5 w-5" /> : idx + 1}
                </div>
                <span className={`hidden sm:block text-sm font-medium transition-colors ${
                  step === idx + 1 ? 'text-noir-900' : 'text-noir-400'
                }`}>
                  {label}
                </span>
                {idx < stepLabels.length - 1 && (
                  <div className="hidden sm:block flex-1 h-1 mx-4 rounded-full bg-noir-100 overflow-hidden">
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
          <div className="h-1.5 bg-noir-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-600 to-accent-400 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-soft-xl p-8 md:p-12 border border-noir-100">

          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-accent-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  {t('step1Title')}
                </h1>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">
                {t('step1Subtitle')}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                {serviceTypes.map(service => {
                  const isSelected = formData.serviceTypeIds.includes(service.id)
                  const IconComponent = serviceIcons[service.icon] || MoreHorizontal
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`relative p-5 text-center rounded-xl border-2 transition-all duration-300 group ${
                        isSelected
                          ? 'border-accent-500 bg-accent-50 shadow-lg shadow-accent-500/10'
                          : 'border-noir-200 hover:border-accent-300 hover:shadow-md'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="h-5 w-5 text-accent-500" />
                        </div>
                      )}
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-accent-500 text-white' : 'bg-noir-100 text-noir-500 group-hover:bg-accent-100 group-hover:text-accent-600'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className={`text-sm font-medium block ${
                        isSelected ? 'text-accent-700' : 'text-noir-700'
                      }`}>
                        {getServiceTypeName(service.slug, service.name)}
                      </span>
                    </button>
                  )
                })}
              </div>
              {errors.serviceTypeIds && (
                <p className="text-red-600 text-sm mb-8 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                  {errors.serviceTypeIds}
                </p>
              )}

              <div className="border-t border-noir-100 pt-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-noir-100 rounded-xl flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-noir-600" />
                  </div>
                  <h2 className="text-lg font-display font-medium text-noir-900">
                    {t('propertyTypeTitle')}
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {propertyTypes.map(type => {
                    const isSelected = formData.propertyTypeId === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => updateField('propertyTypeId', type.id)}
                        className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                            : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                        }`}
                      >
                        {getPropertyTypeName(type.slug, type.name)}
                      </button>
                    )
                  })}
                </div>
                {errors.propertyTypeId && (
                  <p className="text-red-600 text-sm mt-4 flex items-center gap-2">
                    <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                    {errors.propertyTypeId}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Layers className="h-5 w-5 text-accent-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  {t('step2Title')}
                </h1>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">
                {t('step2Subtitle')}
              </p>

              <div className="mb-8">
                <label className="block text-sm font-medium text-noir-700 mb-3">
                  {t('descriptionLabel')} <span className="text-accent-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder={t('descriptionPlaceholder')}
                  rows={5}
                  className={`w-full p-4 rounded-xl border-2 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all ${
                    errors.description ? 'border-red-500' : 'border-noir-200'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-4">
                  <Calendar className="h-4 w-4 text-noir-400" />
                  {t('preferredStartLabel')}
                </label>

                {/* Option: Not yet determined */}
                <button
                  type="button"
                  onClick={() => updateField('preferredStart', formData.preferredStart === 'flexible' ? '' : 'flexible')}
                  className={`w-full mb-4 p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                    formData.preferredStart === 'flexible'
                      ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                      : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    formData.preferredStart === 'flexible'
                      ? 'bg-accent-500 border-accent-500'
                      : 'border-noir-300'
                  }`}>
                    {formData.preferredStart === 'flexible' && <Check className="h-3 w-3 text-white" />}
                  </div>
                  {t('flexibleOption')}
                </button>

                {/* Month/Year selector - only show if not flexible */}
                {formData.preferredStart !== 'flexible' && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Month selector */}
                    <div>
                      <label className="block text-xs text-noir-500 uppercase tracking-wider mb-2">{t('monthLabel')}</label>
                      <select
                        value={formData.preferredStart ? formData.preferredStart.split('-')[0] || '' : ''}
                        onChange={(e) => {
                          const month = e.target.value
                          const year = formData.preferredStart?.split('-')[1] || String(currentYear)
                          if (month) {
                            updateField('preferredStart', `${month}-${year}`)
                          } else {
                            updateField('preferredStart', '')
                          }
                        }}
                        className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('selectMonth')}</option>
                        {monthNames.map((month, idx) => {
                          // Don't show past months for current year
                          const selectedYear = formData.preferredStart?.split('-')[1]
                          if (selectedYear === String(currentYear) && idx < currentMonth) {
                            return null
                          }
                          return (
                            <option key={month} value={String(idx + 1).padStart(2, '0')}>
                              {month}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Year selector */}
                    <div>
                      <label className="block text-xs text-noir-500 uppercase tracking-wider mb-2">{t('yearLabel')}</label>
                      <select
                        value={formData.preferredStart ? formData.preferredStart.split('-')[1] || '' : ''}
                        onChange={(e) => {
                          const year = e.target.value
                          const month = formData.preferredStart?.split('-')[0] || ''
                          if (year) {
                            // Reset month if it's in the past for new year
                            if (year === String(currentYear) && month && parseInt(month) <= currentMonth) {
                              updateField('preferredStart', `-${year}`)
                            } else {
                              updateField('preferredStart', `${month}-${year}`)
                            }
                          } else {
                            updateField('preferredStart', month ? `${month}-` : '')
                          }
                        }}
                        className="w-full p-4 rounded-xl border-2 border-noir-200 bg-ivory-50 text-noir-800 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">{t('selectYear')}</option>
                        {availableYears.map(year => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Visual preview of selected date */}
                {formData.preferredStart && formData.preferredStart !== 'flexible' && formData.preferredStart.includes('-') && (
                  <div className="mt-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                    <p className="text-sm text-accent-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        {t('preferredStartPreview')}{' '}
                        {(() => {
                          const [month, year] = formData.preferredStart.split('-')
                          if (month && year) {
                            return `${monthNames[parseInt(month) - 1]} ${year}`
                          } else if (year) {
                            return year
                          }
                          return ''
                        })()}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-noir-700 mb-4">
                  {t('budgetLabel')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {budgetRanges.map(range => {
                    const isSelected = formData.budgetRange === range.id
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => updateField('budgetRange', range.id)}
                        className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md shadow-accent-500/10'
                            : 'border-noir-200 text-noir-700 hover:border-accent-300 hover:shadow-sm'
                        }`}
                      >
                        {range.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-accent-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  {t('step3Title')}
                </h1>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">
                {t('step3Subtitle')}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                    <User className="h-4 w-4 text-noir-400" />
                    {t('nameLabel')} <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className={`w-full p-4 rounded-xl border-2 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all ${
                      errors.fullName ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-2">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                    <Mail className="h-4 w-4 text-noir-400" />
                    {t('emailLabel')} <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className={`w-full p-4 rounded-xl border-2 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all ${
                      errors.email ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                    <Phone className="h-4 w-4 text-noir-400" />
                    {t('phoneLabel')} <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className={`w-full p-4 rounded-xl border-2 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-noir-700 mb-3">
                    <MapPin className="h-4 w-4 text-noir-400" />
                    {t('postalCodeLabel')} <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder={t('postalCodePlaceholder')}
                    className={`w-full p-4 rounded-xl border-2 bg-ivory-50 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all ${
                      errors.postalCode ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-600 text-sm mt-2">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary & Confirm */}
          {step === 4 && (
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-accent-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
                  {t('step4Title')}
                </h1>
              </div>
              <p className="text-noir-500 mb-10 ml-[52px]">
                {t('step4Subtitle')}
              </p>

              <div className="bg-gradient-to-br from-ivory-100 to-ivory-50 rounded-2xl p-6 md:p-8 mb-8 border border-noir-100">
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-accent-600" />
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">{t('renovationLabel')}</span>
                      <p className="text-noir-900 font-medium mt-1">
                        {formData.serviceTypeIds.map(id => {
                          const service = serviceTypes.find(s => s.id === id)
                          return service ? getServiceTypeName(service.slug, service.name) : ''
                        }).filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-noir-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-noir-600" />
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">{t('propertyLabel')}</span>
                      <p className="text-noir-900 font-medium mt-1">
                        {(() => {
                          const propType = propertyTypes.find(p => p.id === formData.propertyTypeId)
                          return propType ? getPropertyTypeName(propType.slug, propType.name) : ''
                        })()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-noir-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Layers className="h-5 w-5 text-noir-600" />
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">{t('descriptionSummaryLabel')}</span>
                      <p className="text-noir-900 mt-1 leading-relaxed">
                        {formData.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-noir-200">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-noir-400 mt-0.5" />
                      <div>
                        <span className="text-xs text-noir-500 uppercase tracking-wider">{t('nameLabel')}</span>
                        <p className="text-noir-900 font-medium mt-1">{formData.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-noir-400 mt-0.5" />
                      <div>
                        <span className="text-xs text-noir-500 uppercase tracking-wider">{t('emailLabel')}</span>
                        <p className="text-noir-900 font-medium mt-1">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-noir-400 mt-0.5" />
                      <div>
                        <span className="text-xs text-noir-500 uppercase tracking-wider">{t('phoneLabel')}</span>
                        <p className="text-noir-900 font-medium mt-1">{formData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-noir-400 mt-0.5" />
                      <div>
                        <span className="text-xs text-noir-500 uppercase tracking-wider">{t('postalCodeLabel')}</span>
                        <p className="text-noir-900 font-medium mt-1">{formData.postalCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <label
                className={`flex items-start gap-4 cursor-pointer p-5 rounded-xl border-2 transition-all duration-300 ${
                  errors.gdprConsent
                    ? 'border-red-500 bg-red-50'
                    : formData.gdprConsent
                    ? 'border-accent-500 bg-accent-50'
                    : 'border-noir-200 hover:border-accent-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  formData.gdprConsent
                    ? 'bg-accent-500 border-accent-500'
                    : 'border-noir-300'
                }`}>
                  {formData.gdprConsent && <Check className="h-4 w-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="sr-only"
                />
                <span className="text-sm text-noir-600 leading-relaxed">
                  {t('gdprConsent')}{' '}
                  <Link href="/privacy" className="text-accent-600 hover:underline font-medium">{t('gdprConsentLink')}</Link>
                  {' '}{t('gdprConsentSuffix')}
                </span>
              </label>
              {errors.gdprConsent && (
                <p className="text-red-600 text-sm mt-3">{errors.gdprConsent}</p>
              )}
              {errors.submit && (
                <p className="text-red-600 text-sm mt-4 p-4 bg-red-50 rounded-xl">{errors.submit}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-noir-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-noir-200 text-noir-700 font-medium hover:bg-noir-50 hover:border-noir-300 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('prevButton')}
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-noir-900 text-white font-medium hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-500/20"
              >
                {t('nextButton')}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-500 text-white font-medium hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('submittingButton')}
                  </>
                ) : (
                  <>
                    {t('submitButton')}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
