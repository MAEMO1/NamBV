'use client'

import { useEffect, useState, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { Shield, FileText, ChevronRight, ArrowUp, Printer } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Section {
  id: string
  title: string
  number: string
}

interface LegalPageLayoutProps {
  title: string
  subtitle: string
  lastUpdated: string
  content: string
  icon: 'privacy' | 'terms'
}

// Enhanced markdown parser that extracts sections
function parseMarkdown(markdown: string): { html: string; sections: Section[] } {
  const lines = markdown.split('\n')
  let html = ''
  let inList = false
  const sections: Section[] = []
  let sectionCount = 0

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('# ')) {
      // Main title - skip it, we render our own header
      continue
    } else if (trimmedLine.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      sectionCount++
      const title = trimmedLine.slice(3)
      const id = `section-${sectionCount}`
      const number = sectionCount.toString().padStart(2, '0')
      sections.push({ id, title, number })

      html += `
        <section id="${id}" class="legal-section scroll-mt-32 mb-16 group">
          <div class="flex items-start gap-6 mb-6">
            <span class="legal-section-number flex-shrink-0 w-14 h-14 flex items-center justify-center bg-accent-600/5 text-accent-600 font-display text-xl border border-accent-600/10 transition-all duration-500 group-hover:bg-accent-600 group-hover:text-white group-hover:border-accent-600">${number}</span>
            <h2 class="text-2xl md:text-3xl font-display text-noir-900 pt-2 leading-tight">${title}</h2>
          </div>
          <div class="legal-section-content pl-0 md:pl-20">
      `
    } else if (trimmedLine.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h3 class="text-lg font-semibold text-noir-800 mt-8 mb-4 flex items-center gap-3">
        <span class="w-8 h-px bg-accent-500"></span>
        ${trimmedLine.slice(4)}
      </h3>`
    } else if (trimmedLine.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="space-y-3 my-6">';
        inList = true
      }
      html += `<li class="flex items-start gap-3 text-noir-600 leading-relaxed">
        <span class="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2.5 flex-shrink-0"></span>
        <span>${formatInline(trimmedLine.slice(2))}</span>
      </li>`
    } else if (trimmedLine === '') {
      if (inList) { html += '</ul>'; inList = false }
    } else {
      if (inList) { html += '</ul>'; inList = false }
      // Check if this closes a section (next line would be a new ## or end)
      html += `<p class="text-noir-600 leading-relaxed mb-4">${formatInline(trimmedLine)}</p>`
    }
  }

  if (inList) html += '</ul>'

  // Close any open sections
  if (sectionCount > 0) {
    html += '</div></section>'
  }

  return { html, sections }
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-noir-800">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/([\w.-]+@[\w.-]+\.\w+)/g, '<a href="mailto:$1" class="text-accent-600 hover:text-accent-700 underline underline-offset-2 transition-colors">$1</a>')
    .replace(/(\+32\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2})/g, '<a href="tel:$1" class="text-accent-600 hover:text-accent-700 underline underline-offset-2 transition-colors">$1</a>')
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  content,
  icon
}: LegalPageLayoutProps) {
  const t = useTranslations('legalLayout')
  const [activeSection, setActiveSection] = useState<string>('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const { html, sections } = parseMarkdown(content)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      // Find active section
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrint = () => {
    window.print()
  }

  const Icon = icon === 'privacy' ? Shield : FileText

  return (
    <main className="min-h-screen bg-ivory-100 print:bg-white">
      {/* Architectural Header */}
      <header className="relative bg-noir-950 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Diagonal Accent Line */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-600/10 transform skew-x-12 translate-x-20 print:hidden" />

        <div className="container-wide relative">
          <div className="py-20 md:py-28 lg:py-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-noir-400 mb-8 animate-fade-in print:hidden">
              <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{title}</span>
            </nav>

            <div className="flex items-start gap-8">
              {/* Icon */}
              <div className="hidden md:flex w-20 h-20 lg:w-24 lg:h-24 bg-accent-600/20 items-center justify-center animate-scale-in print:hidden">
                <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-accent-400" strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h1 className="text-display-lg lg:text-display-xl font-display mb-4 animate-fade-up"
                    style={{ animationDelay: '0.1s' }}>
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-noir-400 max-w-2xl animate-fade-up"
                   style={{ animationDelay: '0.2s' }}>
                  {subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mt-8 text-sm animate-fade-up"
                     style={{ animationDelay: '0.3s' }}>
                  <span className="flex items-center gap-2 text-noir-500">
                    <span className="w-2 h-2 bg-accent-500 rounded-full" />
                    {t('lastUpdatedLabel')}: {lastUpdated}
                  </span>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 text-noir-500 hover:text-white transition-colors print:hidden"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t('print')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="h-1 bg-gradient-to-r from-accent-600 via-accent-500 to-transparent" />
      </header>

      {/* Content Area */}
      <div className="container-wide py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Sticky Table of Contents */}
          <aside className="lg:w-72 flex-shrink-0 print:hidden">
            <div className="lg:sticky lg:top-28">
              <div className="bg-white/80 backdrop-blur-sm border border-noir-100 p-6 animate-fade-in">
                <h3 className="text-xs font-semibold text-noir-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-6 h-px bg-accent-500" />
                  {t('tableOfContents')}
                </h3>

                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 flex items-center gap-3 group border-l-2 ${
                        activeSection === section.id
                          ? 'border-accent-600 bg-accent-50/50 text-accent-700'
                          : 'border-transparent hover:border-noir-200 hover:bg-noir-50 text-noir-600'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className={`font-mono text-xs ${
                        activeSection === section.id ? 'text-accent-600' : 'text-noir-400'
                      }`}>
                        {section.number}
                      </span>
                      <span className="leading-snug">{section.title}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t border-noir-100">
                  <h4 className="text-xs font-semibold text-noir-500 uppercase tracking-wider mb-4">
                    {t('related')}
                  </h4>
                  <div className="space-y-2">
                    {icon === 'privacy' ? (
                      <Link
                        href="/algemene-voorwaarden"
                        className="flex items-center gap-2 text-sm text-noir-600 hover:text-accent-600 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        {t('termsLinkText')}
                      </Link>
                    ) : (
                      <Link
                        href="/privacy"
                        className="flex items-center gap-2 text-sm text-noir-600 hover:text-accent-600 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        {t('privacyLinkText')}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div
              ref={contentRef}
              className="bg-white border border-noir-100 p-8 md:p-12 lg:p-16 animate-fade-up print:border-none print:p-0"
              style={{ animationDelay: '0.2s' }}
            >
              {/* Decorative Corner */}
              <div className="absolute -top-px -left-px w-16 h-16 border-t-2 border-l-2 border-accent-500 print:hidden" />

              <div
                className="legal-content prose-custom"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-noir-100 print:mt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-sm text-noir-500">
                    <p>NAM BV - BTW BE0792.212.559</p>
                    <p className="mt-1">Zwijnaardsesteenweg 683, 9000 Gent</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm print:hidden">
                    <a
                      href="mailto:info@namconstruction.be"
                      className="text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      info@namconstruction.be
                    </a>
                    <span className="text-noir-300">|</span>
                    <a
                      href="tel:+32493812789"
                      className="text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      +32 493 81 27 89
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-noir-900 text-white flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-accent-600 print:hidden ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label={t('backToTop')}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .legal-section-number {
            background: #f5f5f4 !important;
            color: #1c1917 !important;
            border: 1px solid #e7e5e4 !important;
          }

          .legal-section {
            page-break-inside: avoid;
          }

          header {
            background: white !important;
            color: black !important;
          }

          header h1 {
            color: #1c1917 !important;
          }

          header p {
            color: #57534e !important;
          }
        }

        .legal-content .legal-section:first-child {
          margin-top: 0;
        }

        .legal-content .legal-section:last-child .legal-section-content {
          margin-bottom: 0;
        }
      `}</style>
    </main>
  )
}
