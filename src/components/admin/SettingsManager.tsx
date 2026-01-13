'use client'

import { useState, useEffect } from 'react'
import {
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Bell,
  Search,
  Check,
} from 'lucide-react'

interface Setting {
  key: string
  value: string
  type: string
  category: string
  description: string
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSetting = (key: string, value: string) => {
    setSettings(prev =>
      prev.map(s => (s.key === key ? { ...s, value } : s))
    )
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const getSettingsByCategory = (category: string) =>
    settings.filter(s => s.category === category)

  const renderInput = (setting: Setting) => {
    if (setting.type === 'boolean') {
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={setting.value === 'true'}
            onChange={e => updateSetting(setting.key, e.target.checked ? 'true' : 'false')}
            className="w-5 h-5 accent-accent-600 rounded"
          />
          <span className="text-sm text-gray-700">{setting.description}</span>
        </label>
      )
    }

    if (setting.type === 'number') {
      return (
        <input
          type="number"
          value={setting.value}
          onChange={e => updateSetting(setting.key, e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
        />
      )
    }

    if (setting.key.includes('description') || setting.key.includes('tagline')) {
      return (
        <textarea
          value={setting.value}
          onChange={e => updateSetting(setting.key, e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none resize-none transition-colors"
          rows={3}
        />
      )
    }

    return (
      <input
        type={setting.key.includes('email') ? 'email' : setting.key.includes('url') ? 'url' : 'text'}
        value={setting.value}
        onChange={e => updateSetting(setting.key, e.target.value)}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
      />
    )
  }

  const tabs = [
    { id: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
    { id: 'general', label: 'Algemeen', icon: <Building2 className="w-4 h-4" /> },
    { id: 'social', label: 'Social', icon: <Globe className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notificaties', icon: <Bell className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO', icon: <Search className="w-4 h-4" /> },
  ]

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 pb-4 border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-accent-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="space-y-5">
          {getSettingsByCategory(activeTab).map(setting => (
            <div key={setting.key}>
              {setting.type !== 'boolean' && (
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  {setting.description}
                </label>
              )}
              {renderInput(setting)}
            </div>
          ))}

          {getSettingsByCategory(activeTab).length === 0 && (
            <p className="text-gray-400 text-center py-8">
              Geen instellingen voor deze categorie
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
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

      {/* Help text per category */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        {activeTab === 'contact' && (
          <p>
            <strong>Contactgegevens:</strong> Deze informatie wordt getoond op de website en in automatische emails.
          </p>
        )}
        {activeTab === 'general' && (
          <p>
            <strong>Algemeen:</strong> Bedrijfsinformatie en statistieken die op de website worden getoond.
          </p>
        )}
        {activeTab === 'social' && (
          <p>
            <strong>Social Media:</strong> Links naar je social media profielen. Laat leeg om te verbergen.
          </p>
        )}
        {activeTab === 'notifications' && (
          <p>
            <strong>Notificaties:</strong> Configureer wanneer en naar wie email notificaties worden verstuurd.
          </p>
        )}
        {activeTab === 'seo' && (
          <p>
            <strong>SEO:</strong> Standaard meta tags voor zoekmachines.
          </p>
        )}
      </div>
    </div>
  )
}
