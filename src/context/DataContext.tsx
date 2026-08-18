import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  User,
  Client,
  InventoryItem,
  Project,
  SalesPoint,
  Payment,
  SaleRecord,
  initialAdmins,
  initialClients,
  initialInventory,
  initialProjects,
  initialSalesPoints,
  initialPayments,
  initialSaleRecords,
} from '../data/sampleData';

interface DataContextType {
  // Lists
  clients: Client[];
  inventory: InventoryItem[];
  projects: Project[];
  salesData: SalesPoint[];
  payments: Payment[];
  saleRecords: SaleRecord[];
  admins: User[];
  
  // Search & Filter
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Actions
  addClient: (c: Omit<Client, 'id'>) => void;
  updateClientStatus: (id: string, status: 'activo' | 'pendiente') => void;
  deleteClient: (id: string) => void;

  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateStock: (id: string, newStock: number) => void;
  deleteInventoryItem: (id: string) => void;

  addProject: (p: Omit<Project, 'id'>) => void;
  updateProjectStatus: (id: string, status: 'Activo' | 'Finalizado' | 'En proceso') => void;
  deleteProject: (id: string) => void;

  addPayment: (p: Omit<Payment, 'id'>) => void;
  updatePaymentStatus: (id: string, status: 'Pagado' | 'Pendiente' | 'Atrasado') => void;

  addSaleRecord: (s: Omit<SaleRecord, 'id'>) => void;

  addAdminUser: (u: Omit<User, 'id'>) => void;
  toggleAdminStatus: (id: string) => void;

  // Computed dynamic stats
  totalClientsCount: number;
  activeClientsCount: number;
  totalInventoryCount: number;
  lowStockItemsCount: number;
  lowStockItems: InventoryItem[];
  totalInventoryValue: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
  currentMonthSales: number;
  salesGrowthPercent: number;
  totalPendingPayments: number;
  totalCollectedPayments: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [salesData, setSalesData] = useState<SalesPoint[]>(initialSalesPoints);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [saleRecords, setSaleRecords] = useState<SaleRecord[]>(initialSaleRecords);
  const [admins, setAdmins] = useState<User[]>(initialAdmins);
  const [globalSearch, setGlobalSearch] = useState('');

  // Actions
  const addClient = (c: Omit<Client, 'id'>) => {
    const newId = `CL-${String(clients.length + 1).padStart(3, '0')}`;
    setClients((prev) => [{ ...c, id: newId, dateAdded: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const updateClientStatus = (id: string, status: 'activo' | 'pendiente') => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newId = `IT-${String(inventory.length + 1).padStart(3, '0')}`;
    setInventory((prev) => [{ ...item, id: newId }, ...prev]);
  };

  const updateStock = (id: string, newStock: number) => {
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, newStock) } : item)));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const addProject = (p: Omit<Project, 'id'>) => {
    const newId = `PR-${String(projects.length + 1).padStart(3, '0')}`;
    setProjects((prev) => [{ ...p, id: newId, startDate: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const updateProjectStatus = (id: string, status: 'Activo' | 'Finalizado' | 'En proceso') => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, completionRate: status === 'Finalizado' ? 100 : p.completionRate } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addPayment = (p: Omit<Payment, 'id'>) => {
    const newId = `PAY-${String(payments.length + 101)}`;
    setPayments((prev) => [{ ...p, id: newId }, ...prev]);
  };

  const updatePaymentStatus = (id: string, status: 'Pagado' | 'Pendiente' | 'Atrasado') => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const addSaleRecord = (s: Omit<SaleRecord, 'id'>) => {
    const newId = `VEN-${String(saleRecords.length + 501)}`;
    setSaleRecords((prev) => [{ ...s, id: newId }, ...prev]);

    // Also update monthly sales data
    setSalesData((prev) => {
      const lastIdx = prev.length - 1;
      const updated = [...prev];
      updated[lastIdx] = { ...updated[lastIdx], amount: updated[lastIdx].amount + s.amount };
      return updated;
    });
  };

  const addAdminUser = (u: Omit<User, 'id'>) => {
    const newId = String(admins.length + 1);
    setAdmins((prev) => [...prev, { ...u, id: newId }]);
  };

  const toggleAdminStatus = (id: string) => {
    setAdmins((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'activo' ? 'pendiente' : 'activo' } : u))
    );
  };

  // Dynamic Metrics Computations
  const totalClientsCount = clients.length;
  const activeClientsCount = clients.filter((c) => c.status === 'activo').length;
  
  const totalInventoryCount = inventory.length;
  const lowStockItems = useMemo(() => inventory.filter((item) => item.stock <= (item.minStock || 5)), [inventory]);
  const lowStockItemsCount = lowStockItems.length;
  
  const totalInventoryValue = useMemo(() => {
    return inventory.reduce((sum, item) => sum + item.priceNumber * item.stock, 0);
  }, [inventory]);

  const activeProjectsCount = projects.filter((p) => p.status === 'Activo' || p.status === 'En proceso').length;
  const completedProjectsCount = projects.filter((p) => p.status === 'Finalizado').length;

  const currentMonthSales = useMemo(() => {
    if (salesData.length === 0) return 0;
    return salesData[salesData.length - 1].amount;
  }, [salesData]);

  const salesGrowthPercent = useMemo(() => {
    if (salesData.length < 2) return 12;
    const current = salesData[salesData.length - 1].amount;
    const prev = salesData[salesData.length - 2].amount;
    return Math.round(((current - prev) / prev) * 100);
  }, [salesData]);

  const totalPendingPayments = useMemo(() => {
    return payments
      .filter((p) => p.status === 'Pendiente' || p.status === 'Atrasado')
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  const totalCollectedPayments = useMemo(() => {
    return payments
      .filter((p) => p.status === 'Pagado')
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  return (
    <DataContext.Provider
      value={{
        clients,
        inventory,
        projects,
        salesData,
        payments,
        saleRecords,
        admins,
        globalSearch,
        setGlobalSearch,
        addClient,
        updateClientStatus,
        deleteClient,
        addInventoryItem,
        updateStock,
        deleteInventoryItem,
        addProject,
        updateProjectStatus,
        deleteProject,
        addPayment,
        updatePaymentStatus,
        addSaleRecord,
        addAdminUser,
        toggleAdminStatus,
        totalClientsCount,
        activeClientsCount,
        totalInventoryCount,
        lowStockItemsCount,
        lowStockItems,
        totalInventoryValue,
        activeProjectsCount,
        completedProjectsCount,
        currentMonthSales,
        salesGrowthPercent,
        totalPendingPayments,
        totalCollectedPayments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
