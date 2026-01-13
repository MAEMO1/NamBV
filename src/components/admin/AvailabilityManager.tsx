'use client'

import { useState, useEffect } from 'react'
import {
  Save,
  Check,
  Plus,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  X,
} from 'lucide-react'

interface DayAvailability {
  dayOfWeek: number
  timeSlots: string[]
  isActive: boolean
}

interface BlockedDate {
  id?: string
  date: string
  blockedTimes: string[]
  reason: string | null
}

const dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']

const allTimeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
]

export default function AvailabilityManager() {
  const [availability, setAvailability] = useState<DayAvailability[]>([])
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [newBlockedReason, setNewBlockedReason] = useState('')
  const [addingBlocked, setAddingBlocked] = useState(false)

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/availability')
      if (response.ok) {
        const data = await response.json()
        setAvailability(data.availability)
        setBlockedDates(data.blockedDates || [])
      } else {
        setError('Kon beschikbaarheid niet laden')
      }
    } catch (err) {
      console.error('Error fetching availability:', err)
      setError('Kon beschikbaarheid niet laden')
    } finally {
      setLoading(false)
    }
  }

  const handleDayToggle = (dayOfWeek: number) => {
    setAvailability(prev =>
      prev.map(day =>
        day.dayOfWeek === dayOfWeek
          ? { ...day, isActive: !day.isActive }
          : day
      )
    )
    setSaved(false)
  }

  const handleSlotToggle = (dayOfWeek: number, timeSlot: string) => {
    setAvailability(prev =>
      prev.map(day => {
        if (day.dayOfWeek !== dayOfWeek) return day
        const hasSlot = day.timeSlots.includes(timeSlot)
        return {
          ...day,
          timeSlots: hasSlot
            ? day.timeSlots.filter(s => s !== timeSlot)
            : [...day.timeSlots, timeSlot].sort()
        }
      })
    )
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability })
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError('Kon beschikbaarheid niet opslaan')
      }
    } catch (err) {
      console.error('Error saving availability:', err)
      setError('Kon beschikbaarheid niet opslaan')
    } finally {
      setSaving(false)
    }
  }

  const handleAddBlockedDate = async () => {
    if (!newBlockedDate) return

    setAddingBlocked(true)
    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newBlockedDate,
          blockedTimes: [],
          reason: newBlockedReason || null
        })
      })

      if (response.ok) {
        const data = await response.json()
        setBlockedDates(prev => [...prev, data.blockedDate])
        setNewBlockedDate('')
        setNewBlockedReason('')
      } else {
        setError('Kon datum niet blokkeren')
      }
    } catch (err) {
      console.error('Error adding blocked date:', err)
      setError('Kon datum niet blokkeren')
    } finally {
      setAddingBlocked(false)
    }
  }

  const handleRemoveBlockedDate = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/availability?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBlockedDates(prev => prev.filter(d => d.id !== id))
      } else {
        setError('Kon geblokkeerde datum niet verwijderen')
      }
    } catch (err) {
      console.error('Error removing blocked date:', err)
      setError('Kon geblokkeerde datum niet verwijderen')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Weekschema
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Selecteer de dagen en tijden waarop adviesgesprekken kunnen worden ingepland.
        </p>

        <div className="space-y-3">
          {availability.map(day => (
            <div
              key={day.dayOfWeek}
              className={`rounded-xl border p-4 transition-colors ${
                day.isActive ? 'border-accent-200 bg-accent-50/30' : 'border-gray-100 bg-gray-50/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day.isActive}
                    onChange={() => handleDayToggle(day.dayOfWeek)}
                    className="w-5 h-5 accent-accent-600 rounded"
                  />
                  <span className={`font-medium ${day.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {dayNames[day.dayOfWeek]}
                  </span>
                </label>
                {day.isActive && (
                  <span className="text-xs text-accent-600 font-medium">
                    {day.timeSlots.length} tijdsloten
                  </span>
                )}
              </div>

              {day.isActive && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                  {allTimeSlots.map(time => {
                    const isSelected = day.timeSlots.includes(time)
                    return (
                      <button
                        key={time}
                        onClick={() => handleSlotToggle(day.dayOfWeek, time)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-accent-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-accent-300'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-accent-600 text-white hover:bg-accent-700'
            } disabled:opacity-50`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Opgeslagen
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {saving ? 'Opslaan...' : 'Opslaan'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Geblokkeerde dagen
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Voeg specifieke dagen toe waarop geen afspraken kunnen worden ingepland.
        </p>

        {/* Add Blocked Date Form */}
        <div className="flex flex-wrap gap-3 mb-5 p-4 bg-gray-50 rounded-xl">
          <input
            type="date"
            value={newBlockedDate}
            onChange={e => setNewBlockedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
          />
          <input
            type="text"
            value={newBlockedReason}
            onChange={e => setNewBlockedReason(e.target.value)}
            placeholder="Reden (optioneel)"
            className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
          />
          <button
            onClick={handleAddBlockedDate}
            disabled={!newBlockedDate || addingBlocked}
            className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {addingBlocked ? 'Toevoegen...' : 'Toevoegen'}
          </button>
        </div>

        {/* Blocked Dates List */}
        {blockedDates.length > 0 ? (
          <div className="space-y-2">
            {blockedDates.map(blocked => (
              <div
                key={blocked.id || blocked.date}
                className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      {new Date(blocked.date).toLocaleDateString('nl-BE', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {blocked.reason && (
                    <span className="text-sm text-red-600">{blocked.reason}</span>
                  )}
                </div>
                <button
                  onClick={() => blocked.id && handleRemoveBlockedDate(blocked.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                  title="Verwijderen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-400">
            Geen geblokkeerde dagen
          </p>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <p>
          <strong>Tip:</strong> Het weekschema bepaalt de standaard beschikbaarheid.
          Geblokkeerde dagen worden altijd gerespecteerd.
        </p>
      </div>
    </div>
  )
}
