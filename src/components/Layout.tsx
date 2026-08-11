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
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-primary text-white transition-all duration-300 z-30 shadow-[0_0_30px_rgba(0,0,0,0.2)] ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            {sidebarOpen ? (
              <div>
                <h1 className="text-xl font-bold tracking-wide">PRISMA NETWORK</h1>
                <p className="text-xs text-white/70 mt-1">Sistema de Gestión Comercial e Inventario</p>
              </div>
            ) : (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">P</div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-primary-light/15 rounded-lg transition-colors"
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
                    ? 'bg-primary-light text-white'
                    : 'text-white/70 hover:bg-primary-light/15 hover:text-white'
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
        <header className="bg-surface/95 backdrop-blur-xl border-b border-border sticky top-0 z-20 shadow-sm">
          <div className="flex flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  type="text"
                  placeholder="Buscar productos, categorías, marcas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:flex flex-col text-right">
                <p className="font-medium text-text-primary">{user?.name}</p>
                <p className="text-sm text-text-secondary">{user?.role}</p>
              </div>
              <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                {user?.avatar}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-text-secondary hover:text-danger hover:bg-background transition"
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
