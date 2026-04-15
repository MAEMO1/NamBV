'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@namconstruction.be');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<{ loading: boolean; error: string | null }>({
    loading: false,
    error: null,
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ loading: true, error: null });

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      });
      return;
    }

    setState({ loading: false, error: null });
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-3xl border border-noir-200 bg-white p-6 shadow-soft-lg sm:p-8"
    >
      <label className="grid gap-2 text-sm text-noir-700">
        <span className="font-medium">E-mail</span>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="admin-input"
        />
      </label>

      <label className="grid gap-2 text-sm text-noir-700">
        <span className="font-medium">Wachtwoord</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="admin-input"
        />
      </label>

      {state.error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={state.loading}
        className="admin-btn-primary w-full sm:w-auto sm:justify-self-start"
      >
        {state.loading ? 'Bezig...' : 'Inloggen'}
      </button>
    </form>
  );
}
