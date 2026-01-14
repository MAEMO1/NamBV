'use client'

import { useState, useEffect } from 'react'
import {
  Save,
  FileText,
  Layout,
  Type,
  Image,
  Check,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'

interface ContentBlock {
  id?: string
  page: string
  section: string
  key: string
  content: string
  type: string
}

const contentStructure: Record<string, Record<string, string[]>> = {
  home: {
    hero: ['title', 'subtitle', 'cta_text'],
    features: ['title', 'description'],
    services: ['title', 'subtitle'],
    cta: ['title', 'description', 'button_text'],
  },
  about: {
    hero: ['title', 'subtitle'],
    story: ['title', 'content'],
    values: ['title', 'description'],
  },
  contact: {
    hero: ['title', 'subtitle'],
    form: ['title', 'description'],
  },
  services: {
    hero: ['title', 'subtitle'],
    intro: ['title', 'description'],
  },
}

export default function ContentManager() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activePage, setActivePage] = useState('home')
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/content?page=${activePage}`)
      if (response.ok) {
        const data = await response.json()
        setContentBlocks(data.contentBlocks || [])
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [activePage])

  const updateContent = (page: string, section: string, key: string, content: string) => {
    setContentBlocks(prev => {
      const existing = prev.find(
        b => b.page === page && b.section === section && b.key === key
      )

      if (existing) {
        return prev.map(b =>
          b.page === page && b.section === section && b.key === key
            ? { ...b, content }
            : b
        )
      }

      return [...prev, { page, section, key, content, type: 'text' }]
    })
    setSaved(false)
  }

  const getContent = (section: string, key: string): string => {
    const block = contentBlocks.find(
      b => b.page === activePage && b.section === section && b.key === key
    )
    return block?.content || ''
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const blocksToSave = contentBlocks.filter(b => b.page === activePage)

      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentBlocks: blocksToSave }),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const pages = Object.keys(contentStructure)
  const sections = contentStructure[activePage] || {}

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
    <div className="space-y-4 sm:space-y-6">
      {/* Page Tabs */}
      <div className="flex gap-2 pb-3 sm:pb-4 border-b border-gray-100 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => {
              setActivePage(page)
              setActiveSection(null)
            }}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
              activePage === page
                ? 'bg-accent-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layout className="w-4 h-4" />
            {page}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sections - Horizontal scroll on mobile, sidebar on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
              Secties
            </h3>
            <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide -mx-1 px-1 lg:mx-0 lg:px-0 pb-1 lg:pb-0">
              {Object.keys(sections).map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg capitalize transition-colors whitespace-nowrap flex-shrink-0 lg:flex-shrink lg:w-full ${
                    activeSection === section
                      ? 'bg-accent-50 text-accent-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 bg-gray-50 lg:bg-transparent'
                  }`}
                >
                  {section.replace('_', ' ')}
                  <ChevronRight className="w-4 h-4 hidden lg:block" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
            {activeSection ? (
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 capitalize">
                    {activeSection.replace('_', ' ')}
                  </h3>
                  <button
                    onClick={fetchContent}
                    className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    title="Vernieuwen"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {sections[activeSection]?.map(key => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {key.replace('_', ' ')}
                    </label>
                    {key.includes('content') || key.includes('description') ? (
                      <textarea
                        value={getContent(activeSection, key)}
                        onChange={e =>
                          updateContent(activePage, activeSection, key, e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none resize-none transition-colors"
                        rows={4}
                        placeholder={`Voer ${key.replace('_', ' ')} in...`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={getContent(activeSection, key)}
                        onChange={e =>
                          updateContent(activePage, activeSection, key, e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                        placeholder={`Voer ${key.replace('_', ' ')} in...`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Selecteer een sectie om te bewerken</p>
              </div>
            )}
          </div>
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

      {/* Help text */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <p>
          <strong>Tip:</strong> Wijzigingen worden pas zichtbaar op de website na opslaan.
        </p>
      </div>
    </div>
  )
}
