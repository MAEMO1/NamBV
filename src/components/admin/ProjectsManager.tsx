'use client'

import { useState, useEffect } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  X,
  Save,
  ImageIcon,
  GripVertical,
} from 'lucide-react'

interface ProjectImage {
  id?: string
  url: string
  alt?: string
  caption?: string
  isBefore?: boolean
  isAfter?: boolean
}

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  shortDescription?: string
  category: string
  location: string
  year: number
  featured: boolean
  isPublished: boolean
  mainImage?: string
  sortOrder: number
  images: ProjectImage[]
  createdAt: string
}

const categories = [
  'Totaalrenovatie',
  'Renovatie',
  'Afwerking',
  'Badkamerrenovatie',
  'Keukenrenovatie',
  'Dakwerken',
  'Elektriciteit',
  'Sanitair',
]

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/projects?all=true')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreate = () => {
    setEditingProject({
      title: '',
      category: categories[0],
      location: '',
      year: new Date().getFullYear(),
      featured: false,
      isPublished: true,
      images: [],
    })
    setIsCreating(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsCreating(false)
  }

  const handleSave = async () => {
    if (!editingProject) return

    try {
      const url = isCreating
        ? '/api/admin/projects'
        : `/api/admin/projects/${editingProject.id}`

      const method = isCreating ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      })

      if (response.ok) {
        setEditingProject(null)
        fetchProjects()
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit project wilt verwijderen?')) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleTogglePublished = async (project: Project) => {
    try {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !project.isPublished }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    try {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  if (loading && projects.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-50 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          {projects.length} project{projects.length !== 1 ? 'en' : ''}
        </p>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nieuw project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:border-gray-200 transition-colors"
          >
            <GripVertical className="w-5 h-5 text-gray-300 cursor-grab" />

            {/* Thumbnail */}
            <div className="w-20 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {project.mainImage ? (
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 truncate">{project.title}</h3>
                {project.featured && (
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                )}
                {!project.isPublished && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">Verborgen</span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {project.category} • {project.location} • {project.year}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleToggleFeatured(project)}
                className={`p-2 rounded-lg transition-colors ${
                  project.featured ? 'text-amber-500' : 'text-gray-300 hover:text-amber-500 hover:bg-amber-50'
                }`}
                title={project.featured ? 'Verwijder uitgelicht' : 'Markeer als uitgelicht'}
              >
                {project.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleTogglePublished(project)}
                className={`p-2 rounded-lg transition-colors ${
                  project.isPublished ? 'text-green-500' : 'text-gray-300 hover:text-green-500 hover:bg-green-50'
                }`}
                title={project.isPublished ? 'Verberg project' : 'Publiceer project'}
              >
                {project.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleEdit(project)}
                className="p-2 rounded-lg text-gray-400 hover:text-accent-600 hover:bg-accent-50 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Nog geen projecten toegevoegd</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Voeg eerste project toe
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-xl">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-lg font-semibold text-gray-900">
                {isCreating ? 'Nieuw project' : 'Project bewerken'}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                  placeholder="Bijv. Herenhuis Centrum"
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Categorie *
                  </label>
                  <select
                    value={editingProject.category || ''}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none bg-white transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Locatie *
                  </label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={e => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                    placeholder="Bijv. Gent"
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Jaar *
                </label>
                <input
                  type="number"
                  value={editingProject.year || new Date().getFullYear()}
                  onChange={e => setEditingProject({ ...editingProject, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Korte beschrijving
                </label>
                <input
                  type="text"
                  value={editingProject.shortDescription || ''}
                  onChange={e => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                  placeholder="Korte samenvatting voor overzichtspagina"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Uitgebreide beschrijving
                </label>
                <textarea
                  value={editingProject.description || ''}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none resize-none transition-colors"
                  rows={4}
                  placeholder="Gedetailleerde beschrijving van het project"
                />
              </div>

              {/* Main Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Hoofdafbeelding URL
                </label>
                <input
                  type="url"
                  value={editingProject.mainImage || ''}
                  onChange={e => setEditingProject({ ...editingProject, mainImage: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-colors"
                  placeholder="https://..."
                />
                {editingProject.mainImage && (
                  <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={editingProject.mainImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 accent-accent-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Uitgelicht op homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished !== false}
                    onChange={e => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-accent-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Gepubliceerd</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-xl">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-accent-600 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
