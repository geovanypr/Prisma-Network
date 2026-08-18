import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Bell, 
  Save, 
  CheckCircle2, 
  Key, 
  Globe 
} from 'lucide-react';

export const Configuracion: React.FC = () => {
  const { user } = useAuth();
  
  const [userName, setUserName] = useState(user?.name || 'Geovany');
  const [userRole, setUserRole] = useState(user?.role || 'Administrador');
  const [email, setEmail] = useState(user?.email || 'geovany@prisma.com');
  const [notifications, setNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Settings size={14} /> Preferencias del Sistema
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Configuración de Cuenta</h1>
          <p className="text-slate-300 text-sm mt-1">
            Gestión de perfil administrativo, alertas de inventario y parámetros de seguridad.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm font-semibold animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>¡Cambios guardados con éxito! Se han actualizado las preferencias.</span>
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <User size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Perfil de Administrador</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Rol
              </label>
              <input
                type="text"
                readOnly
                value={userRole}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Zona Horaria
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-700 font-medium">
                <Globe size={16} className="text-slate-400" />
                <span>America/Santo_Domingo (GMT-4)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & System Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Bell size={20} className="text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Notificaciones & Alertas</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-900">Alertas de Stock Bajo</p>
                <p className="text-xs text-slate-500">Notificar en pantalla cuando un producto alcance su nivel mínimo.</p>
              </div>
              <input
                type="checkbox"
                checked={stockAlerts}
                onChange={(e) => setStockAlerts(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-900">Resumen Semanal por Correo</p>
                <p className="text-xs text-slate-500">Enviar reporte consolidado de facturación y proyectos los lunes.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <Save size={18} />
            <span>Guardar Preferencias</span>
          </button>
        </div>

      </form>
    </div>
  );
};
