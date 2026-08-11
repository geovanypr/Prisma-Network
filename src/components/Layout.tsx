import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X, LogOut, Home, Users, Building2, Package, Briefcase, DollarSign, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Inicio', path: '/dashboard', icon: Home },
  { name: 'Usuarios', path: '/usuarios', icon: Users },
  { name: 'Clientes', path: '/clientes', icon: Building2 },
  { name: 'Inventario', path: '/inventario', icon: Package },
  { name: 'Proyectos', path: '/proyectos', icon: Briefcase },
  { name: 'Comercial', path: '/comercial', icon: DollarSign },
  { name: 'Pagos', path: '/pagos', icon: DollarSign },
  { name: 'Reportes', path: '/reportes', icon: BarChart3 },
  { name: 'Configuración', path: '/configuracion', icon: Settings },
];

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen dashboard-container">
      {/* Sidebar */}
      <aside
        className={`sidebar fixed left-0 top-0 h-full transition-all duration-300 z-30 shadow-[0_0_30px_rgba(0,0,0,0.2)] ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            {sidebarOpen ? (
              <div>
                <h1 className="sidebar-title text-xl tracking-wide">PRISMA NETWORK</h1>
                <p className="text-xs sidebar-item-inactive mt-1">Sistema de Gestión Comercial</p>
              </div>
            ) : (
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: 'var(--prisma-primary)' }}
              >
                P
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'sidebar-item-active'
                    : 'sidebar-item-inactive hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Navbar */}
        <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <div className="flex flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar productos, categorías, marcas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:flex flex-col text-right">
                <p className="font-medium text-slate-800">{user?.name}</p>
                <p className="text-sm text-slate-500">{user?.role}</p>
              </div>
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold shadow-sm"
                style={{ backgroundColor: 'var(--prisma-primary)' }}
              >
                {user?.avatar || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-slate-100 transition"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};