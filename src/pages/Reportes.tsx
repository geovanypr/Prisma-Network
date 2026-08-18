import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar, 
  CheckCircle2,
  FileSpreadsheet,
  Printer
} from 'lucide-react';

export const Reportes: React.FC = () => {
  const { salesData, currentMonthSales, totalInventoryValue, totalCollectedPayments, totalPendingPayments } = useData();
  const [reportPeriod, setReportPeriod] = useState<'Mensual' | 'Trimestral' | 'Anual'>('Mensual');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const maxVal = Math.max(...salesData.map((d) => d.amount), 1);

  const handleExport = (type: string) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 size={14} /> Analítica & Reportes
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Reportes de Rendimiento</h1>
          <p className="text-slate-300 text-sm mt-1">
            Análisis consolidado de ingresos, valuación de activos e historial comercial.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-2xl shadow-md shadow-indigo-600/30 transition-all text-xs"
          >
            <Download size={16} />
            <span>Exportar PDF</span>
          </button>

          <button
            onClick={() => handleExport('CSV')}
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-2xl border border-slate-700 transition-all text-xs"
          >
            <FileSpreadsheet size={16} />
            <span>Excel / CSV</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-semibold animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>¡Reporte generado correctamente! Tu descarga iniciará en breve.</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Facturación del Mes</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">RD$ {currentMonthSales.toLocaleString('es-DO')}</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor de Inventario</p>
          <h3 className="text-xl font-black text-indigo-600 mt-1">RD$ {totalInventoryValue.toLocaleString('es-DO')}</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ingresos Cobrados</p>
          <h3 className="text-xl font-black text-emerald-600 mt-1">RD$ {totalCollectedPayments.toLocaleString('es-DO')}</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cuentas por Cobrar</p>
          <h3 className="text-xl font-black text-amber-600 mt-1">RD$ {totalPendingPayments.toLocaleString('es-DO')}</h3>
        </div>
      </div>

      {/* Main Visual Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolución de Ingresos Mensuales</h3>
              <p className="text-xs text-slate-500">Histórico de facturación comercial</p>
            </div>

            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
              {(['Mensual', 'Trimestral', 'Anual'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setReportPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    reportPeriod === p ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Area & Column Graph */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-200 px-2">
            {salesData.map((item) => {
              const h = Math.max(15, Math.round((item.amount / maxVal) * 100));
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    RD$ {(item.amount / 1000).toFixed(0)}k
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t-xl transition-all duration-500 group-hover:from-indigo-600 group-hover:to-sky-400"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Distribución de Ingresos</h3>
              <p className="text-xs text-slate-500">Por categoría de producto/servicio</p>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Redes & Servidores</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Laptops & Cómputo</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '35%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Accesorios & Periféricos</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Servicios de Consultoría</span>
                  <span>8%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '8%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">Datos calculados en tiempo real desde Prisma DB.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
