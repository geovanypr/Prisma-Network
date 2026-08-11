import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Users, Building2, Briefcase, DollarSign } from 'lucide-react';
import { clients, inventoryItems, projects, salesData } from '../data/sampleData';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const totalClients = clients.length;
  const totalInventory = inventoryItems.length;
  const totalProjects = projects.filter((project) => project.status === 'Activo').length;
  const totalSales = salesData.reduce((sum, point) => sum + point.amount, 0);
  const targetSales = 1500000;
  const salesProgress = Math.min(100, Math.round((totalSales / targetSales) * 100));
  const chartMax = Math.max(...salesData.map((item) => item.amount));
  const lowStockItems = inventoryItems.filter((item) => item.stock <= 5);

  const kpis = [
    { name: 'Clientes registrados', value: totalClients.toString(), icon: Users, color: 'bg-primary' },
    { name: 'Equipos en Inventario', value: totalInventory.toString(), icon: Building2, color: 'bg-success' },
    { name: 'Proyectos activos', value: totalProjects.toString(), icon: Briefcase, color: 'bg-warning' },
    { name: 'Ventas del mes', value: `RD$ ${totalSales.toLocaleString('es-DO')}`, icon: DollarSign, color: 'bg-info' },
  ];

  return (
    <div className="space-y-6">
      <div className="welcome-banner mb-8">
        <p className="welcome-label mb-2">Inicio</p>
        <h1 className="welcome-title text-3xl mb-2">Bienvenido, {user?.name || 'Geovany'}</h1>
        <p className="welcome-subtitle mb-8">Sistema de Gestión Comercial e Inventario</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="welcome-stat-box">
            <p className="welcome-stat-label">Ventas del mes</p>
            <p className="welcome-stat-value">RD$ {totalSales.toLocaleString('es-DO')}</p>
          </div>
          <div className="welcome-stat-box">
            <p className="welcome-stat-label">Proyectos activos</p>
            <p className="welcome-stat-value">{totalProjects}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.name} className="stat-card p-6 flex justify-between items-center">
              <div>
                <p className="stat-card-label mb-1">{kpi.name}</p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>{kpi.value}</h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${kpi.color} text-white`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
        <Card title="Resumen de ventas" className="bg-surface">
          <div className="space-y-5">
            <div className="rounded-3xl bg-primary-light/10 p-4">
              <p className="text-sm text-text-secondary">Tendencia mensual</p>
              <div className="flex items-end gap-3 h-48 mt-5">
                {salesData.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col-reverse items-center gap-3">
                    <div className="w-full bg-background rounded-[26px] overflow-hidden h-full flex items-end shadow-inner">
                      <div
                        className="w-full bg-primary rounded-t-[26px] transition-all"
                        style={{ height: `${(item.amount / chartMax) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-text-secondary">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-primary/10 p-4">
                <p className="text-sm text-text-secondary">Meta del mes</p>
                <p className="mt-2 text-text-primary font-semibold">RD$ {targetSales.toLocaleString('es-DO')}</p>
              </div>
              <div className="rounded-3xl bg-success/10 p-4">
                <p className="text-sm text-text-secondary">Avance</p>
                <p className="mt-2 text-text-primary font-semibold">{salesProgress}%</p>
              </div>
              <div className="rounded-3xl bg-info/10 p-4">
                <p className="text-sm text-text-secondary">Mejor mes</p>
                <p className="mt-2 text-text-primary font-semibold">{salesData.reduce((prev, current) => (current.amount > prev.amount ? current : prev)).month}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Stock bajo" className="bg-surface">
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-3xl bg-background p-4 border border-border shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-text-primary font-semibold">{item.name}</p>
                    <p className="text-sm text-text-secondary">{item.category}</p>
                  </div>
                  <Badge variant={item.stock === 0 ? 'danger' : 'warning'}>
                    {item.stock === 0 ? 'Sin stock' : 'Stock bajo'}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary">Inventario actual: {item.stock}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
