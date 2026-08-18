import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Search, 
  Menu, 
  X, 
  LogOut, 
  Home, 
  Users, 
  Building2, 
  Package, 
  Briefcase, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  Settings,
  Bell,
  Sparkles
} from 'lucide-react';

const menuItems = [
  { name: 'Inicio', path: '/dashboard', icon: Home },
  { name: 'Usuarios', path: '/usuarios', icon: Users },
  { name: 'Clientes', path: '/clientes', icon: Building2 },
  { name: 'Inventario', path: '/inventario', icon: Package },
  { name: 'Proyectos', path: '/proyectos', icon: Briefcase },
  { name: 'Comercial', path: '/comercial', icon: TrendingUp },
  { name: 'Pagos', path: '/pagos', icon: CreditCard },
  { name: 'Reportes', path: '/reportes', icon: BarChart3 },
  { name: 'Configuración', path: '/configuracion', icon: Settings },
];

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { globalSearch, setGlobalSearch, lowStockItemsCount } = useData();
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full transition-all duration-300 z-30 bg-[#0F172A] border-r border-slate-800 shadow-2xl flex flex-col justify-between ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-600/40">
                  P
                </div>
                <div>
                  <h1 className="text-white font-bold tracking-wider text-base leading-tight">PRISMA NETWORK</h1>
                  <p className="text-[11px] text-indigo-300/80 font-medium">Gestión & Inventario</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md mx-auto">
                P
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
              title={sidebarOpen ? "Colapsar menú" : "Expandir menú"}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group relative ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400 transition-colors'} />
                  {sidebarOpen && <span>{item.name}</span>}
                  
                  {/* Badge count for Inventory alert if any */}
                  {item.path === '/inventario' && lowStockItemsCount > 0 && (
                    <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-indigo-600' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {lowStockItemsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60">
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                  {user?.avatar || 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrador'}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.role || 'Admin'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-10 h-10 mx-auto flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Navbar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 shadow-xs px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar productos, clientes, folios, ordenes..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistema Online
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative"
                title="Notificaciones de sistema"
              >
                <Bell size={20} />
                {lowStockItemsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>

            {/* User Profile Chip */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'Geovany'}</p>
                <p className="text-[11px] font-medium text-indigo-600">{user?.role || 'Administrador'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {user?.avatar || 'G'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="p-6 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};