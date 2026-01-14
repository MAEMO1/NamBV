import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | NAM Construction',
  description: 'Algemene voorwaarden van NAM Construction voor onze diensten en werkzaamheden.',
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n')
  let html = ''
  let inList = false

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('# ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h1 class="text-2xl font-display font-semibold text-noir-900 mt-12 mb-6 first:mt-0">${trimmedLine.slice(2)}</h1>`
    } else if (trimmedLine.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h2 class="text-xl font-semibold text-noir-900 mt-10 mb-4">${trimmedLine.slice(3)}</h2>`
    } else if (trimmedLine.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h3 class="text-lg font-semibold text-noir-900 mt-8 mb-3">${trimmedLine.slice(4)}</h3>`
    } else if (trimmedLine.startsWith('- ')) {
      if (!inList) { html += '<ul class="list-disc pl-6 mb-4 text-noir-600">'; inList = true }
      html += `<li class="mb-2">${formatInline(trimmedLine.slice(2))}</li>`
    } else if (trimmedLine === '') {
      if (inList) { html += '</ul>'; inList = false }
    } else {
      if (inList) { html += '</ul>'; inList = false }
      html += `<p class="text-noir-600 mb-4 leading-relaxed">${formatInline(trimmedLine)}</p>`
    }
  }

  if (inList) html += '</ul>'
  return `<div class="prose-custom">${html}</div>`
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

async function getTermsContent() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/legal?type=terms`, {
      next: { revalidate: 60 } // Revalidate every minute
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()
    return data.content
  } catch {
    // Fallback content
    return `# Algemene Voorwaarden

**NAM BV - BTW BE0792.212.559**

Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en werkzaamheden van NAM BV.

Voor vragen kunt u contact opnemen via info@namconstruction.be`
  }
}

export default async function TermsPage() {
  const content = await getTermsContent()
  const htmlContent = markdownToHtml(content)

  return (
    <main className="min-h-screen bg-ivory-50">
      {/* Header */}
      <div className="bg-noir-950 text-white py-20">
        <div className="container-wide">
          <h1 className="text-display-lg font-display">Algemene Voorwaarden</h1>
          <p className="text-noir-400 mt-4">
            Voorwaarden voor onze diensten en werkzaamheden
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-16 md:py-24">
        <div className="max-w-3xl">
          <div
            className="bg-white rounded-2xl shadow-soft p-8 md:p-12"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </main>
  )
}
