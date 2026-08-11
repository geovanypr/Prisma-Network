import React, { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { clients } from '../data/sampleData';

type ClientStatus = 'activo' | 'pendiente';

export const Clientes: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'activo' | 'pendiente'>('todos');

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search) ||
        client.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === 'todos' || client.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-surface border border-border p-6 shadow-sm grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Clientes</h1>
          <p className="text-text-secondary mt-1">Clientes registrados y su estado para el seguimiento comercial.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-3xl bg-primary/10 px-4 py-3 text-sm text-primary">{clients.length} clientes</div>
          <Button variant="primary">+ Nuevo Cliente</Button>
        </div>
      </div>

      <Card className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1.5fr_auto] items-end">
          <Input
            label="Buscar clientes"
            placeholder="Buscar por nombre, teléfono o ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {(['todos', 'activo', 'pendiente'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === option ? 'bg-primary text-white' : 'bg-background text-text-primary hover:bg-primary-light/10'}`}
              >
                {option === 'todos' ? 'Todos' : option === 'activo' ? 'Activo' : 'Pendiente'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-sm">
          <table className="min-w-full text-left divide-y divide-border">
            <thead>
              <tr className="bg-background">
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Teléfono</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-surface">
                  <td className="px-4 py-3 text-text-primary">{client.id}</td>
                  <td className="px-4 py-3 text-text-secondary">{client.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{client.phone}</td>
                  <td className="px-4 py-3">
                    <Badge variant={client.status}>{client.status === 'activo' ? 'Activo' : 'Pendiente'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
