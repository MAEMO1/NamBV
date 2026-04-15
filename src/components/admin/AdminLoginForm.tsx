'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Banner } from './ui/Banner';
import { Button } from './ui/Button';
import { LabeledInput } from './ui/Input';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
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
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
      <LabeledInput
        label="E-mail"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={setEmail}
        placeholder="naam@voorbeeld.be"
      />

      <LabeledInput
        label="Wachtwoord"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={setPassword}
      />

      {state.error ? <Banner variant="danger">{state.error}</Banner> : null}

      <Button type="submit" disabled={state.loading} className="w-full">
        {state.loading ? 'Bezig...' : 'Inloggen'}
      </Button>
    </form>
  );
}
