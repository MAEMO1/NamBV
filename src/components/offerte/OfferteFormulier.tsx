'use client'

import { useState } from 'react'
import {
  QuoteRequestInputSchema,
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  budgetRangeLabels,
  type QuoteRequestInput
} from '@/lib/validations/quote'

const NAM_TEAL = '#0D7377'
const NAM_GOLD = '#C9A227'

const serviceTypes = [
  { id: '1', name: 'Totaalrenovatie', icon: '🏠' },
  { id: '2', name: 'Badkamer', icon: '🚿' },
  { id: '3', name: 'Keuken', icon: '👨‍🍳' },
  { id: '4', name: 'Toilet', icon: '🚽' },
  { id: '5', name: 'Woonkamer', icon: '🛋️' },
  { id: '6', name: 'Slaapkamer', icon: '🛏️' },
  { id: '7', name: 'Uitbouw/Zolder', icon: '🏗️' },
  { id: '8', name: 'Elektriciteit', icon: '⚡' },
  { id: '9', name: 'Sanitair', icon: '💧' },
  { id: '10', name: 'Vloeren', icon: '🪵' },
  { id: '11', name: 'Schilderwerk', icon: '🖌️' },
  { id: '12', name: 'Anders', icon: '✨' },
]

const propertyTypes = [
  { id: '1', name: 'Appartement' },
  { id: '2', name: 'Tussenwoning' },
  { id: '3', name: 'Hoekwoning' },
  { id: '4', name: 'Vrijstaande woning' },
  { id: '5', name: 'Herenhuis' },
  { id: '6', name: 'Bedrijfspand' },
]

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

  const totalSteps = 4

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
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
      setStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsSubmitting(true)

    try {
      // Validate entire form with Zod
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
      setIsSubmitted(true)
    } catch {
      setErrors({ submit: 'Er is iets misgegaan. Probeer het opnieuw.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-16 max-w-lg text-center shadow-xl">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white"
            style={{ background: `linear-gradient(135deg, ${NAM_TEAL} 0%, #0a5c5f 100%)` }}
          >
            ✓
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Aanvraag ontvangen!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Bedankt voor uw interesse in Nam Construction. We nemen binnen 24 uur contact met u op om uw project te bespreken.
          </p>
          {referenceNumber && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              <strong style={{ color: NAM_TEAL }}>Referentienummer:</strong> {referenceNumber}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: NAM_TEAL }}
            >
              NAM
            </div>
            <span className="font-semibold text-gray-900">Offerte aanvragen</span>
          </div>
          <a
            href="tel:+32493812789"
            className="text-sm font-medium"
            style={{ color: NAM_TEAL }}
          >
            +32 493 81 27 89
          </a>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white px-6 py-6 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-3">
            {['Project', 'Details', 'Contact', 'Bevestig'].map((label, idx) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm"
                style={{
                  color: step > idx ? NAM_TEAL : step === idx + 1 ? '#1a1a1a' : '#999',
                  fontWeight: step === idx + 1 ? 600 : 400
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: step > idx ? NAM_TEAL : step === idx + 1 ? '#1a1a1a' : '#e5e5e5',
                    color: step >= idx + 1 ? 'white' : '#999'
                  }}
                >
                  {step > idx ? '✓' : idx + 1}
                </div>
                {/* Fixed: Use CSS media queries instead of window.innerWidth */}
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                background: `linear-gradient(90deg, ${NAM_TEAL} 0%, ${NAM_GOLD} 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto p-6 pb-12">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">

          {/* Step 1: Project Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Wat wilt u laten renoveren?
              </h2>
              <p className="text-gray-600 mb-8">
                Selecteer alle onderdelen die van toepassing zijn
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {serviceTypes.map(service => {
                  const isSelected = formData.serviceTypeIds.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className="p-5 rounded-xl border-2 text-center transition-all"
                      style={{
                        borderColor: isSelected ? NAM_TEAL : '#e5e5e5',
                        background: isSelected ? `${NAM_TEAL}10` : 'white'
                      }}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: isSelected ? NAM_TEAL : '#1a1a1a' }}
                      >
                        {service.name}
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.serviceTypeIds && (
                <p className="text-red-600 text-sm mb-6">{errors.serviceTypeIds}</p>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Type woning
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map(type => {
                  const isSelected = formData.propertyTypeId === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => updateField('propertyTypeId', type.id)}
                      className="p-4 rounded-xl border-2 text-sm font-medium transition-all"
                      style={{
                        borderColor: isSelected ? NAM_TEAL : '#e5e5e5',
                        background: isSelected ? `${NAM_TEAL}10` : 'white',
                        color: isSelected ? NAM_TEAL : '#1a1a1a'
                      }}
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Vertel ons meer over uw project
              </h2>
              <p className="text-gray-600 mb-8">
                Hoe meer details, hoe beter we kunnen inschatten
              </p>

              <div className="mb-6">
                <label className="block font-medium text-gray-900 mb-2">
                  Omschrijf uw project *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Bijv. 'Volledige renovatie van badkamer (6m²), inclusief nieuwe tegels, inloopdouche en dubbele lavabo. Huidige staat is origineel uit 1985.'"
                  rows={5}
                  className="w-full p-4 rounded-xl border-2 text-base resize-y transition-colors"
                  style={{ borderColor: errors.description ? '#dc2626' : '#e5e5e5' }}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-2">{errors.description}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block font-medium text-gray-900 mb-2">
                  Gewenste startdatum (optioneel)
                </label>
                <input
                  type="text"
                  value={formData.preferredStart}
                  onChange={(e) => updateField('preferredStart', e.target.value)}
                  placeholder="Bijv. 'Maart 2026' of 'Zo snel mogelijk'"
                  className="w-full p-4 rounded-xl border-2 text-base"
                  style={{ borderColor: '#e5e5e5' }}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-900 mb-3">
                  Budget-indicatie (optioneel)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {budgetRanges.map(range => {
                    const isSelected = formData.budgetRange === range.id
                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => updateField('budgetRange', range.id)}
                        className="p-3 rounded-xl border-2 text-sm font-medium transition-all"
                        style={{
                          borderColor: isSelected ? NAM_TEAL : '#e5e5e5',
                          background: isSelected ? `${NAM_TEAL}10` : 'white',
                          color: isSelected ? NAM_TEAL : '#1a1a1a'
                        }}
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Uw contactgegevens
              </h2>
              <p className="text-gray-600 mb-8">
                Hoe kunnen we u bereiken?
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Volledige naam *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jan Janssens"
                    className="w-full p-4 rounded-xl border-2 text-base"
                    style={{ borderColor: errors.fullName ? '#dc2626' : '#e5e5e5' }}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="jan@voorbeeld.be"
                    className="w-full p-4 rounded-xl border-2 text-base"
                    style={{ borderColor: errors.email ? '#dc2626' : '#e5e5e5' }}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="0493 12 34 56"
                    className="w-full p-4 rounded-xl border-2 text-base"
                    style={{ borderColor: errors.phone ? '#dc2626' : '#e5e5e5' }}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-2">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="9000"
                    className="w-full p-4 rounded-xl border-2 text-base"
                    style={{ borderColor: errors.postalCode ? '#dc2626' : '#e5e5e5' }}
                  />
                  {errors.postalCode && (
                    <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary & Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Controleer uw aanvraag
              </h2>
              <p className="text-gray-600 mb-8">
                Klopt alles? Dan versturen we uw aanvraag.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="mb-5">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Type renovatie
                  </div>
                  <div className="font-medium text-gray-900">
                    {formData.serviceTypeIds.map(id =>
                      serviceTypes.find(s => s.id === id)?.name
                    ).join(', ')}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Woning
                  </div>
                  <div className="font-medium text-gray-900">
                    {propertyTypes.find(p => p.id === formData.propertyTypeId)?.name}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Omschrijving
                  </div>
                  <div className="font-medium text-gray-900 leading-relaxed">
                    {formData.description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Naam</div>
                    <div className="font-medium text-gray-900">{formData.fullName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">E-mail</div>
                    <div className="font-medium text-gray-900">{formData.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Telefoon</div>
                    <div className="font-medium text-gray-900">{formData.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Postcode</div>
                    <div className="font-medium text-gray-900">{formData.postalCode}</div>
                  </div>
                </div>
              </div>

              <label
                className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 transition-colors"
                style={{
                  borderColor: errors.gdprConsent ? '#dc2626' : '#e5e5e5',
                  background: formData.gdprConsent ? `${NAM_TEAL}05` : 'white'
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded"
                  style={{ accentColor: NAM_TEAL }}
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  Ik ga akkoord met de{' '}
                  <a href="/privacy" style={{ color: NAM_TEAL }}>privacyverklaring</a>
                  {' '}en geef toestemming om mijn gegevens te verwerken voor het opstellen van een offerte.
                </span>
              </label>
              {errors.gdprConsent && (
                <p className="text-red-600 text-sm mt-2">{errors.gdprConsent}</p>
              )}
              {errors.submit && (
                <p className="text-red-600 text-sm mt-4 p-3 bg-red-50 rounded-lg">{errors.submit}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-7 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-600 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                ← Vorige
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3.5 rounded-xl text-white text-base font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${NAM_TEAL} 0%, #0a5c5f 100%)`,
                  boxShadow: `0 4px 14px ${NAM_TEAL}40`
                }}
              >
                Volgende →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl text-white text-base font-semibold transition-all disabled:opacity-70"
                style={{
                  background: `linear-gradient(135deg, ${NAM_GOLD} 0%, #a88620 100%)`,
                  boxShadow: `0 4px 14px ${NAM_GOLD}40`,
                  cursor: isSubmitting ? 'wait' : 'pointer'
                }}
              >
                {isSubmitting ? 'Versturen...' : 'Verstuur aanvraag →'}
              </button>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          {[
            { icon: '🔒', text: 'Gegevens beveiligd' },
            { icon: '⏱️', text: 'Reactie binnen 24u' },
            { icon: '✓', text: 'Vrijblijvend & gratis' }
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-gray-600 text-sm">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
