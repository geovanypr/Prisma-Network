import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  TrendingUp, 
  DollarSign, 
  Plus, 
  ShoppingBag, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';

export const Comercial: React.FC = () => {
  const { saleRecords, addSaleRecord, currentMonthSales, salesGrowthPercent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [client, setClient] = useState('Tech Solutions SRL');
  const [product, setProduct] = useState('Laptop Dell Inspiron 15');
  const [amount, setAmount] = useState(28500);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !product) return;

    addSaleRecord({
      client,
      product,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      status: 'Completado',
    });

    setClient('Tech Solutions SRL');
    setProduct('Laptop Dell Inspiron 15');
    setAmount(28500);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp size={14} /> Módulo Comercial
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Gestión de Ventas & Facturación</h1>
          <p className="text-slate-300 text-sm mt-1">
            Registro de operaciones comerciales, emisión de ordenes y métricas de desempeño.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-sm"
        >
          <Plus size={18} />
          <span>+ Registrar Venta</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ventas Acumuladas</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">RD$ {currentMonthSales.toLocaleString('es-DO')}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Crecimiento Comercial</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">+{salesGrowthPercent}% vs mes ant.</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transacciones</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{saleRecords.length} operaciones</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShoppingBag size={20} />
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Registro de Ordenes Comerciales</h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Folio Venta</th>
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Producto / Servicio</th>
                <th className="py-3.5 px-4">Fecha</th>
                <th className="py-3.5 px-4">Monto (RD$)</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {saleRecords.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{sale.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{sale.client}</td>
                  <td className="py-3.5 px-4 text-slate-600">{sale.product}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{sale.date}</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    RD$ {sale.amount.toLocaleString('es-DO')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Registrar Venta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Registrar Venta Comercial</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSale} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Grupo Caribe"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Producto o Servicio
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Monitor LED 24 (x2)"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Monto Total (RD$)
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
                  Guardar Venta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
