import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const Usuarios: React.FC = () => {
  const { admins } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Usuarios</h1>
          <p className="text-text-secondary mt-1">Gestión de los administradores del sistema.</p>
        </div>
        <Button variant="primary">Agregar administrador</Button>
      </div>

      <Card className="overflow-x-auto bg-surface">
        <div className="rounded-3xl bg-primary-light/10 p-4 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-text-secondary">Administradores activos</p>
            <p className="text-2xl font-semibold text-text-primary">{admins.length}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-2 text-sm text-primary">
            <span>Gestión del equipo</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-border">
            <thead>
              <tr className="bg-surface">
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Nombre</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Email</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Rol</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Estado</th>
                <th className="px-4 py-3 text-sm font-semibold text-text-secondary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-surface">
                  <td className="px-4 py-3 text-text-primary">{admin.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{admin.email}</td>
                  <td className="px-4 py-3 text-text-secondary">{admin.role}</td>
                  <td className="px-4 py-3">
                    <Badge variant={admin.status}>{admin.status === 'activo' ? 'Activo' : 'Pendiente'}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" className="px-3 py-1 text-sm">Editar</Button>
                      <Button variant="danger" className="px-3 py-1 text-sm">Desactivar</Button>
                    </div>
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
