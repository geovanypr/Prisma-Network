import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  X,
  UserCheck,
  UserX,
  Shield
} from 'lucide-react';

export const Usuarios: React.FC = () => {
  const { admins, addAdminUser, toggleAdminStatus } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Administrador de Ventas');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addAdminUser({
      name,
      email,
      password: '123',
      role,
      status: 'activo',
      avatar: name.charAt(0).toUpperCase(),
    });

    setName('');
    setEmail('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} /> Equipo de Trabajo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Administradores del Sistema</h1>
          <p className="text-slate-300 text-sm mt-1">
            Gestión de usuarios con acceso administrativo, roles de permisos y estados de cuenta.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <UserPlus size={18} />
          <span>+ Agregar Administrador</span>
        </button>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((u) => {
          const isActive = u.status === 'activo';
          return (
            <div
              key={u.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-600/30">
                    {u.avatar}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {isActive ? 'Activo' : 'Pendiente'}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-900">{u.name}</h3>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5 flex items-center gap-1">
                    <Shield size={12} /> {u.role}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                    <Mail size={12} className="text-slate-400" /> {u.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">ID: ADM-00{u.id}</span>
                <button
                  onClick={() => toggleAdminStatus(u.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    isActive
                      ? 'text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                  }`}
                >
                  {isActive ? 'Desactivar' : 'Activar Usuario'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Agregar Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Nuevo Administrador</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carlos Eduardo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="carlos@prisma.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Rol de Permisos
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Administrador Principal">Administrador Principal</option>
                  <option value="Administrador de Ventas">Administrador de Ventas</option>
                  <option value="Gestor de Inventario">Gestor de Inventario</option>
                  <option value="Analista de Sistemas">Analista de Sistemas</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 text-sm hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-sm shadow-md shadow-indigo-600/30"
                >
                  Guardar Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
