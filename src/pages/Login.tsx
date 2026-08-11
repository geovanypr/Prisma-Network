import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_40px_120px_rgba(31,78,121,0.18)]">
        <div className="bg-primary px-8 py-8 text-white">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-light/80">Iniciar sesión</p>
          <h1 className="mt-4 text-4xl font-bold">Prisma Network</h1>
          <p className="mt-2 max-w-xs text-sm text-primary-light">Sistema de Gestión Comercial e Inventario</p>
        </div>

        <div className="bg-surface border border-border px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@prisma.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background"
            />
            {error && (
              <div className="text-danger text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" variant="primary">
              Iniciar Sesión
            </Button>
            <div className="rounded-3xl bg-primary-light/10 border border-primary-light/20 p-4 text-sm text-text-secondary">
              Accede con tu usuario de administrador registrado.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
