import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  UserCheck, 
  UserX, 
  Trash2, 
  X,
  Briefcase
} from 'lucide-react';

export const Clientes: React.FC = () => {
  const { clients, addClient, updateClientStatus, deleteClient, totalClientsCount, activeClientsCount } = useData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'activo' | 'pendiente'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'activo' | 'pendiente'>('activo');

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search) ||
        (client.company && client.company.toLowerCase().includes(search.toLowerCase())) ||
        client.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === 'todos' || client.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [clients, search, filter]);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addClient({
      name,
      company: company || 'Cliente Particular',
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@ejemplo.com`,
      status,
    });

    setName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white border border-indigo-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Building2 size={14} /> Directorio de Clientes
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Gestión de Clientes</h1>
          <p className="text-slate-300 text-sm mt-1">
            Registro de clientes comerciales, empresas asociadas y estado de cuenta.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <Plus size={18} />
          <span>+ Nuevo Cliente</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Clientes</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalClientsCount} registrados</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Building2 size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clientes Activos</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{activeClientsCount} activos</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendientes de Registro</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{totalClientsCount - activeClientsCount} pendientes</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <UserX size={20} />
          </div>
        </div>
      </div>

      {/* Main Filter & Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, empresa, teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {(['todos', 'activo', 'pendiente'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                  filter === opt
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opt === 'todos' ? 'Todos' : opt}
              </button>
            ))}
          </div>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">ID Cliente</th>
                <th className="py-3.5 px-4">Nombre / Empresa</th>
                <th className="py-3.5 px-4">Contacto</th>
                <th className="py-3.5 px-4">Fecha Registro</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredClients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{c.id}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Briefcase size={12} className="text-slate-400" /> {c.company || 'Empresa Privada'}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-slate-900 font-semibold flex items-center gap-1.5 text-xs">
                      <Phone size={12} className="text-slate-400" /> {c.phone}
                    </p>
                    {c.email && (
                      <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-0.5">
                        <Mail size={12} className="text-slate-400" /> {c.email}
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{c.dateAdded || '2026-01-01'}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => updateClientStatus(c.id, c.status === 'activo' ? 'pendiente' : 'activo')}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border transition-all ${
                        c.status === 'activo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {c.status === 'activo' ? 'Activo' : 'Pendiente'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => deleteClient(c.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Eliminar cliente"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Registrar Nuevo Cliente</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Lic. Roberto Valdez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Empresa o Negocio
                </label>
                <input
                  type="text"
                  placeholder="Ej: Valdez Telecom SRL"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="809-555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Estado Inicial
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="activo">Activo</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="rvaldez@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
