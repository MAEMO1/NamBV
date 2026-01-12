'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Upload,
  Folder,
  Image as ImageIcon,
  FileText,
  Video,
  Trash2,
  X,
  Search,
  Grid,
  List,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  width?: number
  height?: number
  alt?: string
  folder: string
  tags: string[]
  createdAt: string
}

interface FolderInfo {
  name: string
  count: number
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [folders, setFolders] = useState<FolderInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [currentFolder, setCurrentFolder] = useState('/')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all')
  const [copiedUrl, setCopiedUrl] = useState(false)

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (currentFolder !== '/') params.set('folder', currentFolder)
      if (filterType !== 'all') params.set('type', filterType)

      const response = await fetch(`/api/admin/media?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
        setFolders(data.folders || [])
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }, [currentFolder, filterType])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit bestand wilt verwijderen?')) return

    try {
      const response = await fetch(`/api/admin/media?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFiles(prev => prev.filter(f => f.id !== id))
        if (selectedFile?.id === id) setSelectedFile(null)
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-accent-500" />
    if (mimeType.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />
    return <FileText className="w-8 h-8 text-noir-400" />
  }

  const filteredFiles = files.filter(file =>
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-square bg-noir-50 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-400" />
            <input
              type="text"
              placeholder="Zoeken..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-noir-200 focus:border-accent-500 focus:outline-none w-64"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as typeof filterType)}
            className="px-4 py-2 border border-noir-200 focus:border-accent-500 focus:outline-none"
          >
            <option value="all">Alle types</option>
            <option value="image">Afbeeldingen</option>
            <option value="video">Videos</option>
            <option value="document">Documenten</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode */}
          <div className="flex border border-noir-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-accent-600 text-white' : 'text-noir-600 hover:bg-noir-50'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-accent-600 text-white' : 'text-noir-600 hover:bg-noir-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Upload Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white font-medium hover:bg-accent-700 transition-colors"
            onClick={() => alert('Upload functionaliteit komt via externe storage service (bijv. Cloudinary of S3)')}
          >
            <Upload className="w-4 h-4" />
            Uploaden
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Folders Sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white border border-noir-100 p-4">
            <h3 className="text-xs text-noir-500 uppercase tracking-wider mb-4 font-medium">
              Mappen
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setCurrentFolder('/')}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                  currentFolder === '/'
                    ? 'bg-accent-50 text-accent-700 font-medium'
                    : 'text-noir-600 hover:bg-noir-50'
                }`}
              >
                <Folder className="w-4 h-4" />
                Alle bestanden
              </button>
              {folders.map(folder => (
                <button
                  key={folder.name}
                  onClick={() => setCurrentFolder(folder.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors ${
                    currentFolder === folder.name
                      ? 'bg-accent-50 text-accent-700 font-medium'
                      : 'text-noir-600 hover:bg-noir-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    {folder.name.replace('/', '')}
                  </span>
                  <span className="text-xs text-noir-400">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Files Grid/List */}
        <div className="flex-1">
          {filteredFiles.length === 0 ? (
            <div className="bg-white border border-noir-100 p-12 text-center">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-noir-300" />
              <p className="text-noir-500">Geen bestanden gevonden</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`group relative bg-white border cursor-pointer transition-all ${
                    selectedFile?.id === file.id
                      ? 'border-accent-500 ring-2 ring-accent-200'
                      : 'border-noir-100 hover:border-noir-200'
                  }`}
                >
                  <div className="aspect-square bg-noir-50 flex items-center justify-center overflow-hidden">
                    {file.mimeType.startsWith('image/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={file.url}
                        alt={file.alt || file.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(file.mimeType)
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-noir-900 truncate font-medium">
                      {file.originalName}
                    </p>
                    <p className="text-xs text-noir-400">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleDelete(file.id)
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 text-noir-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-noir-100">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-noir-100">
                    <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">
                      Bestand
                    </th>
                    <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">
                      Type
                    </th>
                    <th className="p-4 text-left text-xs text-noir-500 uppercase tracking-wider font-medium">
                      Grootte
                    </th>
                    <th className="p-4 text-right text-xs text-noir-500 uppercase tracking-wider font-medium">
                      Acties
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map(file => (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`cursor-pointer transition-colors ${
                        selectedFile?.id === file.id ? 'bg-accent-50' : 'hover:bg-noir-50'
                      }`}
                    >
                      <td className="p-4 border-b border-noir-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-noir-50 flex items-center justify-center overflow-hidden">
                            {file.mimeType.startsWith('image/') ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={file.url}
                                alt={file.alt || file.originalName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              getFileIcon(file.mimeType)
                            )}
                          </div>
                          <span className="text-sm font-medium text-noir-900">
                            {file.originalName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 border-b border-noir-100 text-sm text-noir-600">
                        {file.mimeType.split('/')[1]?.toUpperCase()}
                      </td>
                      <td className="p-4 border-b border-noir-100 text-sm text-noir-600">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="p-4 border-b border-noir-100 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            handleDelete(file.id)
                          }}
                          className="p-2 text-noir-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* File Detail Sidebar */}
      {selectedFile && (
        <>
          <div
            onClick={() => setSelectedFile(null)}
            className="fixed inset-0 bg-noir-900/30 z-40"
          />
          <div className="fixed top-0 right-0 bottom-0 w-96 bg-white shadow-soft-xl z-50 overflow-auto border-l border-noir-100">
            <div className="p-6 border-b border-noir-100 flex justify-between items-center">
              <h3 className="text-lg font-display font-medium text-noir-900">
                Bestandsdetails
              </h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 text-noir-400 hover:text-noir-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Preview */}
              <div className="aspect-video bg-noir-50 mb-6 flex items-center justify-center overflow-hidden">
                {selectedFile.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.alt || selectedFile.originalName}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  getFileIcon(selectedFile.mimeType)
                )}
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-noir-500 uppercase tracking-wider mb-1">
                    Bestandsnaam
                  </p>
                  <p className="text-sm font-medium text-noir-900">
                    {selectedFile.originalName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-noir-500 uppercase tracking-wider mb-1">
                    Type
                  </p>
                  <p className="text-sm text-noir-600">{selectedFile.mimeType}</p>
                </div>

                <div>
                  <p className="text-xs text-noir-500 uppercase tracking-wider mb-1">
                    Grootte
                  </p>
                  <p className="text-sm text-noir-600">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                {selectedFile.width && selectedFile.height && (
                  <div>
                    <p className="text-xs text-noir-500 uppercase tracking-wider mb-1">
                      Afmetingen
                    </p>
                    <p className="text-sm text-noir-600">
                      {selectedFile.width} x {selectedFile.height} px
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-noir-500 uppercase tracking-wider mb-1">
                    URL
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedFile.url}
                      readOnly
                      className="flex-1 px-3 py-2 text-xs bg-noir-50 border border-noir-200 text-noir-600"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedFile.url)}
                      className="px-3 py-2 bg-accent-600 text-white hover:bg-accent-700 transition-colors"
                    >
                      {copiedUrl ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-noir-100">
                <button
                  onClick={() => handleDelete(selectedFile.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Bestand verwijderen
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Help text */}
      <div className="bg-ivory-100 p-4 text-sm text-noir-600">
        <p>
          <strong>Tip:</strong> Klik op een bestand om details te bekijken en de URL te
          kopiëren. Upload nieuwe bestanden via de Upload knop.
        </p>
      </div>
    </div>
  )
}
