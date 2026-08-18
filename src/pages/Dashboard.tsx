import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle2, 
  Package, 
  Plus, 
  ChevronRight,
  RefreshCw,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    clients,
    inventory,
    projects,
    salesData,
    saleRecords,
    totalClientsCount,
    totalInventoryCount,
    activeProjectsCount,
    currentMonthSales,
    salesGrowthPercent,
    lowStockItems,
    updateStock,
  } = useData();

  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);

  // Targets and calculations
  const monthlyTarget = 800000;
  const progressPercent = Math.min(100, Math.round((currentMonthSales / monthlyTarget) * 100));
  const maxSaleAmount = Math.max(...salesData.map((d) => d.amount), 1);

  // Best month
  const bestMonthObj = salesData.reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev), salesData[0]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-700/40">
        {/* Background glow effects */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} className="text-indigo-300 animate-pulse" /> Panel de Control Comercial
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bienvenido de nuevo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">{user?.name || 'Geovany'}</span>
            </h1>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Monitoreo en tiempo real de métricas comerciales, niveles de inventario y estado de proyectos activos.
            </p>
          </div>

          {/* Quick Stats Summary Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 text-center min-w-[130px]">
              <p className="text-xs text-indigo-200 font-medium">Meta Mensual</p>
              <p className="text-lg font-bold text-white mt-0.5">{progressPercent}%</p>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <Link
              to="/inventario"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              <Plus size={16} />
              <span>Gestionar Stock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Clientes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clientes registrados</span>
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalClientsCount}</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              <ArrowUpRight size={12} /> +12%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Base de datos de clientes activos</p>
        </div>

        {/* Card 2: Inventario */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Equipos en Inventario</span>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{totalInventoryCount}</h3>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${
              lowStockItems.length > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {lowStockItems.length > 0 ? `${lowStockItems.length} por reabastecer` : 'Stock saludable'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Productos registrados en sistema</p>
        </div>

        {/* Card 3: Proyectos */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Proyectos Activos</span>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{activeProjectsCount}</h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-200">
              {projects.length} totales
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Proyectos en ejecución y contrato</p>
        </div>

        {/* Card 4: Ventas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ventas del mes</span>
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-indigo-600/30">
              <DollarSign size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              RD$ {currentMonthSales.toLocaleString('es-DO')}
            </h3>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              <ArrowUpRight size={12} /> +{salesGrowthPercent}%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Facturación acumulada este mes</p>
        </div>

      </div>

      {/* Main Content Grid: Charts & Stock Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Sales Chart (8 Cols) */}
        <div className="xl:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">Resumen de Ventas</h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Tendencia de facturación mensual en pesos dominicanos (RD$)</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Meta:</span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                  RD$ {monthlyTarget.toLocaleString('es-DO')}
                </span>
              </div>
            </div>

            {/* Interactive SVG / Bar Visualizer Chart */}
            <div className="mt-6">
              <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 relative border-b border-slate-200">
                {/* Horizontal Guidelines */}
                <div className="absolute top-4 left-0 w-full border-b border-dashed border-slate-200 text-[10px] text-slate-400 font-medium pl-1">
                  RD$ {maxSaleAmount.toLocaleString('es-DO')} (Máx)
                </div>
                <div className="absolute top-1/2 left-0 w-full border-b border-dashed border-slate-100 text-[10px] text-slate-400 font-medium pl-1">
                  RD$ {Math.round(maxSaleAmount / 2).toLocaleString('es-DO')}
                </div>

                {/* Bars */}
                {salesData.map((item, idx) => {
                  const heightPercent = Math.max(12, Math.round((item.amount / maxSaleAmount) * 100));
                  const isHovered = activeHoverBar === idx;
                  const isCurrentMonth = idx === salesData.length - 1;

                  return (
                    <div
                      key={item.month}
                      onMouseEnter={() => setActiveHoverBar(idx)}
                      onMouseLeave={() => setActiveHoverBar(null)}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative z-10"
                    >
                      {/* Hover Tooltip Popup */}
                      {isHovered && (
                        <div className="absolute -top-12 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap z-30 animate-fade-in pointer-events-none">
                          <p>{item.month}: RD$ {item.amount.toLocaleString('es-DO')}</p>
                        </div>
                      )}

                      {/* Bar Container */}
                      <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end transition-all">
                        <div
                          className={`w-full rounded-t-xl transition-all duration-500 relative ${
                            isCurrentMonth
                              ? 'bg-gradient-to-t from-indigo-700 to-indigo-500 shadow-md shadow-indigo-500/40'
                              : 'bg-gradient-to-t from-slate-700 to-indigo-600 opacity-80 hover:opacity-100'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          {/* Top accent bar */}
                          <div className="w-full h-1 bg-white/40 rounded-t-xl" />
                        </div>
                      </div>

                      {/* Month Label */}
                      <span className={`text-xs font-semibold ${isCurrentMonth ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/60">
              <p className="text-xs text-slate-500 font-medium">Meta del Mes</p>
              <p className="text-sm font-extrabold text-slate-900 mt-1">RD$ {monthlyTarget.toLocaleString('es-DO')}</p>
            </div>

            <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200/60">
              <p className="text-xs text-emerald-700 font-medium">Avance de Ventas</p>
              <p className="text-sm font-extrabold text-emerald-800 mt-1">{progressPercent}% completado</p>
            </div>

            <div className="bg-indigo-50/70 rounded-2xl p-3.5 border border-indigo-200/60">
              <p className="text-xs text-indigo-700 font-medium">Mejor Mes</p>
              <p className="text-sm font-extrabold text-indigo-900 mt-1">
                {bestMonthObj.month} (RD$ {bestMonthObj.amount.toLocaleString('es-DO')})
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts (4 Cols) */}
        <div className="xl:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" />
                <h2 className="text-lg font-bold text-slate-900">Alerta de Stock Bajo</h2>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                {lowStockItems.length} alertas
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-3 mb-4">
              Productos con unidades bajo el stock mínimo recomendado:
            </p>

            {/* List of Low Stock Items */}
            <div className="space-y-3">
              {lowStockItems.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Stock en niveles óptimos</p>
                  <p className="text-xs text-slate-400 mt-1">No hay productos en alerta actualmente.</p>
                </div>
              ) : (
                lowStockItems.map((item) => {
                  const isZero = item.stock === 0;
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-4 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{item.category} • {item.price}</p>
                        </div>
                        {isZero ? (
                          <span className="shrink-0 text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-lg border border-red-200">
                            SIN STOCK
                          </span>
                        ) : (
                          <span className="shrink-0 text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
                            STOCK BAJO
                          </span>
                        )}
                      </div>

                      {/* Stock progress bar & quick restock button */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                            <span>Disponible: {item.stock}</span>
                            <span>Mínimo: {item.minStock || 5}</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isZero ? 'bg-red-500' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, (item.stock / (item.minStock || 5)) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => updateStock(item.id, item.stock + 5)}
                          className="shrink-0 text-xs font-bold bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs"
                          title="Sumar +5 unidades al stock"
                        >
                          <RefreshCw size={12} /> +5 Stock
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <Link
            to="/inventario"
            className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Ver Inventario Completo</span>
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Últimas Transacciones Comercial</h3>
            <p className="text-xs text-slate-500">Historial reciente de operaciones en el sistema</p>
          </div>
          <Link
            to="/comercial"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Ver reporte comercial</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Folio Venta</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Producto / Servicio</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Monto</th>
                <th className="py-3 px-4 rounded-r-xl text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {saleRecords.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{sale.id}</td>
                  <td className="py-3.5 px-4 text-slate-900 font-semibold">{sale.client}</td>
                  <td className="py-3.5 px-4 text-slate-600">{sale.product}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{sale.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">RD$ {sale.amount.toLocaleString('es-DO')}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                      sale.status === 'Completado' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
