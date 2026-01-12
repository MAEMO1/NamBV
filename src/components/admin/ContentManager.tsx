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

// Default content structure for reference
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'html':
        return <FileText className="w-4 h-4" />
      case 'image':
        return <Image className="w-4 h-4" />
      default:
        return <Type className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-noir-50 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Tabs */}
      <div className="flex gap-2 border-b border-noir-100 pb-4">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => {
              setActivePage(page)
              setActiveSection(null)
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors capitalize ${
              activePage === page
                ? 'bg-accent-600 text-white'
                : 'text-noir-600 hover:bg-noir-50'
            }`}
          >
            <Layout className="w-4 h-4" />
            {page}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sections Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-noir-100 p-4">
            <h3 className="text-xs text-noir-500 uppercase tracking-wider mb-4 font-medium">
              Secties
            </h3>
            <div className="space-y-1">
              {Object.keys(sections).map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors capitalize ${
                    activeSection === section
                      ? 'bg-accent-50 text-accent-700 font-medium'
                      : 'text-noir-600 hover:bg-noir-50'
                  }`}
                >
                  {section.replace('_', ' ')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-noir-100 p-6">
            {activeSection ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-medium text-noir-900 capitalize">
                    {activeSection.replace('_', ' ')}
                  </h3>
                  <button
                    onClick={fetchContent}
                    className="p-2 text-noir-400 hover:text-noir-600 transition-colors"
                    title="Vernieuwen"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {sections[activeSection]?.map(key => (
                  <div key={key}>
                    <label className="block text-xs text-noir-500 uppercase tracking-wider mb-2 font-medium">
                      {key.replace('_', ' ')}
                    </label>
                    {key.includes('content') || key.includes('description') ? (
                      <textarea
                        value={getContent(activeSection, key)}
                        onChange={e =>
                          updateContent(activePage, activeSection, key, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-noir-200 focus:border-accent-500 focus:outline-none resize-none"
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
                        className="w-full px-4 py-3 border border-noir-200 focus:border-accent-500 focus:outline-none"
                        placeholder={`Voer ${key.replace('_', ' ')} in...`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-noir-400">
                <Layout className="w-12 h-12 mx-auto mb-4 text-noir-300" />
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
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
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
              {saving ? 'Opslaan...' : 'Wijzigingen opslaan'}
            </>
          )}
        </button>
      </div>

      {/* Help text */}
      <div className="bg-ivory-100 p-4 text-sm text-noir-600">
        <p>
          <strong>Tip:</strong> Wijzigingen worden pas zichtbaar op de website na
          opslaan. Gebruik de &quot;Vernieuwen&quot; knop om de nieuwste content te laden.
        </p>
      </div>
    </div>
  )
}
