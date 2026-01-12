'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Logo from '@/components/Logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Fout bij inloggen')
      }
    } catch {
      setError('Er is een fout opgetreden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory-100 relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,74,71,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,74,71,0.05),transparent_50%)]" />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-noir-200/50" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-noir-200/50" />

      {/* Decorative Circles */}
      <div
        className={`absolute top-1/4 right-1/3 w-96 h-96 border border-accent-200/30 rounded-full transition-all duration-1000 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transitionDelay: '300ms' }}
      />
      <div
        className={`absolute bottom-1/4 left-1/4 w-64 h-64 border border-accent-300/20 rounded-full transition-all duration-1000 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transitionDelay: '500ms' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <Logo variant="stacked" />
        </div>

        {/* Login Card */}
        <div
          className={`bg-white border border-noir-100 p-10 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-50 border border-accent-100 mb-6">
              <Lock className="w-6 h-6 text-accent-600" />
            </div>
            <h1 className="text-2xl font-display font-medium text-noir-900 mb-2">
              Admin Portaal
            </h1>
            <p className="text-noir-500 text-sm">
              Log in om het dashboard te beheren
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-noir-500 uppercase tracking-wider mb-3"
              >
                Wachtwoord
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Voer wachtwoord in"
                  className="w-full px-5 py-4 text-noir-800 bg-ivory-100 border border-noir-200 transition-all duration-300 focus:border-accent-500 focus:ring-0 focus:outline-none placeholder:text-noir-400 pr-12"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-noir-400 hover:text-noir-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 bg-accent-600 text-white font-medium overflow-hidden transition-all duration-500 hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <span className="absolute inset-0 bg-accent-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-wider text-sm">
                {loading ? 'Bezig met inloggen...' : 'Inloggen'}
              </span>
              {!loading && (
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className={`text-center text-noir-400 text-xs mt-8 uppercase tracking-wider transition-all duration-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Alleen voor geautoriseerd personeel
        </p>
      </div>
    </div>
  )
}
