'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import {
  QuoteRequestInputSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  budgetRangeLabels,
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

const budgetRanges = [
  { id: 'UNDER_10K', label: budgetRangeLabels.UNDER_10K },
  { id: 'RANGE_10K_25K', label: budgetRangeLabels.RANGE_10K_25K },
  { id: 'RANGE_25K_50K', label: budgetRangeLabels.RANGE_25K_50K },
  { id: 'RANGE_50K_100K', label: budgetRangeLabels.RANGE_50K_100K },
  { id: 'OVER_100K', label: budgetRangeLabels.OVER_100K },
  { id: 'UNKNOWN', label: budgetRangeLabels.UNKNOWN },
]

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
  const stepLabels = ['Project', 'Details', 'Contact', 'Bevestig']

  // Track form start on first interaction
  const trackStart = () => {
    if (!formStartTracked.current) {
      formStartTracked.current = true
      trackFormStart('offerte', '/offerte')
    }
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    trackStart() // Track on first field interaction
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
    trackStart() // Track on first field interaction
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
      setErrors({ submit: 'Er is iets misgegaan. Probeer het opnieuw.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-noir-950 flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-accent-500 flex items-center justify-center mx-auto mb-8">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
            Aanvraag ontvangen
          </h1>
          <p className="text-lg text-noir-400 mb-8">
            Bedankt voor uw interesse in Nam Construction.
            We nemen binnen 24 uur contact met u op.
          </p>
          {referenceNumber && (
            <div className="bg-noir-900 p-4 mb-8">
              <span className="text-sm text-noir-500 uppercase tracking-wider">Referentie</span>
              <p className="text-xl text-white font-medium mt-1">{referenceNumber}</p>
            </div>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-noir-900 font-medium uppercase tracking-wide hover:bg-accent-500 hover:text-white transition-all duration-500"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory-200">
      {/* Header */}
      <header className="bg-noir-950 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center gap-1">
              <span className="text-xl font-display font-semibold text-white">NAM</span>
              <span className="text-xl font-display font-normal text-white/40">CONSTRUCTION</span>
            </div>
          </Link>
          <a
            href="tel:+32493812789"
            onClick={() => trackClickToCall('+32493812789', 'header')}
            className="flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+32 493 81 27 89</span>
          </a>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-noir-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            {stepLabels.map((label, idx) => (
              <div
                key={label}
                className={`flex items-center gap-3 ${idx < stepLabels.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors ${
                    step > idx + 1
                      ? 'bg-accent-500 text-white'
                      : step === idx + 1
                      ? 'bg-noir-900 text-white'
                      : 'bg-noir-100 text-noir-400'
                  }`}
                >
                  {step > idx + 1 ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`hidden sm:block text-sm font-medium ${
                  step === idx + 1 ? 'text-noir-900' : 'text-noir-400'
                }`}>
                  {label}
                </span>
                {idx < stepLabels.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-px mx-4 ${
                    step > idx + 1 ? 'bg-accent-500' : 'bg-noir-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-noir-100 overflow-hidden">
            <div
              className="h-full bg-accent-500 transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-8 md:p-12">

          {/* Step 1: Project Type */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2">
                Wat wilt u laten renoveren?
              </h1>
              <p className="text-noir-500 mb-10">
                Selecteer alle onderdelen die van toepassing zijn
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
                {serviceTypes.map(service => {
                  const isSelected = formData.serviceTypeIds.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-4 text-center border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-500/5'
                          : 'border-noir-200 hover:border-noir-400'
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-accent-600' : 'text-noir-700'
                      }`}>
                        {service.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              {errors.serviceTypeIds && (
                <p className="text-red-600 text-sm mb-8">{errors.serviceTypeIds}</p>
              )}

              <h2 className="text-lg font-display font-medium text-noir-900 mb-4">
                Type woning
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map(type => {
                  const isSelected = formData.propertyTypeId === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => updateField('propertyTypeId', type.id)}
                      className={`p-4 text-sm font-medium border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                          : 'border-noir-200 text-noir-700 hover:border-noir-400'
                      }`}
                    >
                      {type.name}
                    </button>
                  )
                })}
              </div>
              {errors.propertyTypeId && (
                <p className="text-red-600 text-sm mt-3">{errors.propertyTypeId}</p>
              )}
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2">
                Vertel ons meer over uw project
              </h1>
              <p className="text-noir-500 mb-10">
                Hoe meer details, hoe beter we kunnen inschatten
              </p>

              <div className="mb-8">
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  Omschrijving *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Beschrijf uw project zo gedetailleerd mogelijk..."
                  rows={5}
                  className={`w-full p-4 border bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors ${
                    errors.description ? 'border-red-500' : 'border-noir-200'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-2">{errors.description}</p>
                )}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                  Gewenste startdatum
                </label>
                <input
                  type="text"
                  value={formData.preferredStart}
                  onChange={(e) => updateField('preferredStart', e.target.value)}
                  placeholder="Bijv. 'Maart 2026' of 'Zo snel mogelijk'"
                  className="w-full p-4 border border-noir-200 bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-4">
                  Budget-indicatie
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {budgetRanges.map(range => {
                    const isSelected = formData.budgetRange === range.id
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => updateField('budgetRange', range.id)}
                        className={`p-3 text-sm font-medium border transition-all duration-300 ${
                          isSelected
                            ? 'border-accent-500 bg-accent-500/5 text-accent-600'
                            : 'border-noir-200 text-noir-700 hover:border-noir-400'
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
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2">
                Uw contactgegevens
              </h1>
              <p className="text-noir-500 mb-10">
                Hoe kunnen we u bereiken?
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                    Naam *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jan Janssens"
                    className={`w-full p-4 border bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-2">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="jan@voorbeeld.be"
                    className={`w-full p-4 border bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                    Telefoon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0493 12 34 56"
                    className={`w-full p-4 border bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-noir-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-noir-500 uppercase tracking-wider mb-3">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="9000"
                    className={`w-full p-4 border bg-ivory-200 text-noir-800 placeholder:text-noir-400 focus:outline-none focus:border-noir-900 transition-colors ${
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
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2">
                Controleer uw aanvraag
              </h1>
              <p className="text-noir-500 mb-10">
                Klopt alles? Dan versturen we uw aanvraag.
              </p>

              <div className="bg-ivory-200 p-6 mb-8">
                <div className="grid gap-6">
                  <div>
                    <span className="text-xs text-noir-500 uppercase tracking-wider">Renovatie</span>
                    <p className="text-noir-900 font-medium mt-1">
                      {formData.serviceTypeIds.map(id =>
                        serviceTypes.find(s => s.id === id)?.name
                      ).join(', ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-noir-500 uppercase tracking-wider">Woning</span>
                    <p className="text-noir-900 font-medium mt-1">
                      {propertyTypes.find(p => p.id === formData.propertyTypeId)?.name}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-noir-500 uppercase tracking-wider">Omschrijving</span>
                    <p className="text-noir-900 mt-1 leading-relaxed">
                      {formData.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-noir-200">
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">Naam</span>
                      <p className="text-noir-900 font-medium mt-1">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">E-mail</span>
                      <p className="text-noir-900 font-medium mt-1">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">Telefoon</span>
                      <p className="text-noir-900 font-medium mt-1">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-xs text-noir-500 uppercase tracking-wider">Postcode</span>
                      <p className="text-noir-900 font-medium mt-1">{formData.postalCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <label
                className={`flex items-start gap-4 cursor-pointer p-4 border transition-colors ${
                  errors.gdprConsent ? 'border-red-500' : formData.gdprConsent ? 'border-accent-500 bg-accent-500/5' : 'border-noir-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-accent-500"
                />
                <span className="text-sm text-noir-600 leading-relaxed">
                  Ik ga akkoord met de{' '}
                  <Link href="/privacy" className="text-accent-600 hover:underline">privacyverklaring</Link>
                  {' '}en geef toestemming om mijn gegevens te verwerken.
                </span>
              </label>
              {errors.gdprConsent && (
                <p className="text-red-600 text-sm mt-2">{errors.gdprConsent}</p>
              )}
              {errors.submit && (
                <p className="text-red-600 text-sm mt-4 p-3 bg-red-50">{errors.submit}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-noir-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-6 py-3 border border-noir-300 text-noir-700 font-medium hover:bg-noir-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Vorige
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 bg-noir-900 text-white font-medium hover:bg-accent-500 transition-colors"
              >
                Volgende
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white font-medium hover:bg-accent-400 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Versturen...' : 'Verstuur aanvraag'}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
