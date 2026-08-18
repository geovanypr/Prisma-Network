import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  CreditCard, 
  Plus, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Building2,
  Tag
} from 'lucide-react';

export const Pagos: React.FC = () => {
  const { payments, addPayment, updatePaymentStatus, totalPendingPayments, totalCollectedPayments } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [client, setClient] = useState('Tech Solutions SRL');
  const [concept, setConcept] = useState('Servicios de Infraestructura');
  const [amount, setAmount] = useState(120000);
  const [method, setMethod] = useState<'Tarjeta' | 'Transferencia' | 'Efectivo'>('Transferencia');
  const [status, setStatus] = useState<'Pagado' | 'Pendiente' | 'Atrasado'>('Pagado');

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !concept) return;

    addPayment({
      client,
      concept,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      method,
      status,
    });

    setClient('Tech Solutions SRL');
    setConcept('Servicios de Infraestructura');
    setAmount(120000);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <CreditCard size={14} /> Cobros & Facturación
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Gestión de Pagos</h1>
          <p className="text-slate-300 text-sm mt-1">
            Control de cuentas por cobrar, pagos recibidos y vencimientos de facturas.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <Plus size={18} />
          <span>+ Registrar Pago</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cobrado Acumulado</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">RD$ {totalCollectedPayments.toLocaleString('es-DO')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Por Cobrar / Pendiente</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">RD$ {totalPendingPayments.toLocaleString('es-DO')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Recibos</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{payments.length} recibos</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Historial de Recibos y Pagos</h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Recibo ID</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Concepto</th>
                <th className="py-3.5 px-4">Método</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Monto (RD$)</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{p.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{p.client}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.concept}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-200">
                      {p.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{p.date}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    RD$ {p.amount.toLocaleString('es-DO')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <select
                      value={p.status}
                      onChange={(e) => updatePaymentStatus(p.id, e.target.value as any)}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border cursor-pointer ${
                        p.status === 'Pagado'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : p.status === 'Pendiente'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      <option value="Pagado">Pagado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Atrasado">Atrasado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Registrar Pago */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Registrar Nuevo Pago</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Tech Solutions SRL"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Concepto del Pago
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Anticipo de Proyecto ERP"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Monto (RD$)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Método
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Transferencia">Transferencia</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Efectivo">Efectivo</option>
                  </select>
                </div>
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
                  <option value="Pagado">Pagado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Atrasado">Atrasado</option>
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
                  Guardar Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
