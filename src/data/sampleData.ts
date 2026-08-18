export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: 'activo' | 'pendiente';
  avatar: string;
};

export type Client = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  company?: string;
  status: 'activo' | 'pendiente';
  dateAdded?: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  priceNumber: number;
  price: string;
  minStock?: number;
  supplier?: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'Activo' | 'Finalizado' | 'En proceso';
  budget?: number;
  startDate?: string;
  completionRate?: number;
};

export type SalesPoint = {
  month: string;
  amount: number;
  target?: number;
};

export type Payment = {
  id: string;
  client: string;
  concept: string;
  amount: number;
  date: string;
  status: 'Pagado' | 'Pendiente' | 'Atrasado';
  method: 'Tarjeta' | 'Transferencia' | 'Efectivo';
};

export type SaleRecord = {
  id: string;
  client: string;
  product: string;
  amount: number;
  date: string;
  status: 'Completado' | 'Procesando' | 'Cancelado';
};

export const initialAdmins: User[] = [
  { id: '1', name: 'Geovany', email: 'geovany@prisma.com', password: '123', role: 'Administrador Principal', status: 'activo', avatar: 'G' },
  { id: '2', name: 'Juanluis', email: 'juanluis@prisma.com', password: '123', role: 'Administrador de Ventas', status: 'activo', avatar: 'J' },
  { id: '3', name: 'OliverR', email: 'oliverr@prisma.com', password: '123', role: 'Gestor de Inventario', status: 'activo', avatar: 'O' },
  { id: '4', name: 'OliverF', email: 'oliverf@prisma.com', password: '123', role: 'Analista de Sistemas', status: 'activo', avatar: 'O' },
  { id: '5', name: 'Yatsee', email: 'yatsee@prisma.com', password: '123', role: 'Soporte Comercial', status: 'activo', avatar: 'Y' },
];

export const admins: User[] = initialAdmins;

export const initialClients: Client[] = [
  { id: 'CL-001', name: 'María González', email: 'maria@empresa.com', phone: '809-555-0101', company: 'Soluciones González', status: 'activo', dateAdded: '2026-01-15' },
  { id: 'CL-002', name: 'Carlos Ramírez', email: 'carlos@techsrl.com', phone: '829-555-0144', company: 'Tech Solutions SRL', status: 'activo', dateAdded: '2026-02-10' },
  { id: 'CL-003', name: 'Ana Torres', email: 'ana@innovacion.com', phone: '849-555-0123', company: 'Innovación Digital', status: 'pendiente', dateAdded: '2026-03-01' },
  { id: 'CL-004', name: 'Geovany Corporación', email: 'contacto@geovanycorp.com', phone: '809-555-0199', company: 'Geovany Corp', status: 'activo', dateAdded: '2026-03-12' },
  { id: 'CL-005', name: 'Yolanda Méndez', email: 'ymendez@logistica.com', phone: '829-555-0188', company: 'Méndez Logística', status: 'pendiente', dateAdded: '2026-04-05' },
  { id: 'CL-006', name: 'Grupo Empresarial Caribe', email: 'ventas@caribe.com', phone: '809-555-0250', company: 'Grupo Caribe', status: 'activo', dateAdded: '2026-05-20' },
];

export const initialInventory: InventoryItem[] = [
  { id: 'IT-001', name: 'Laptop Dell Inspiron 15', category: 'Laptops', stock: 3, priceNumber: 28500, price: 'RD$ 28,500', minStock: 5, supplier: 'Dell Caribe' },
  { id: 'IT-002', name: 'Mouse Logitech Wireless G', category: 'Accesorios', stock: 18, priceNumber: 650, price: 'RD$ 650', minStock: 10, supplier: 'Logitech LATAM' },
  { id: 'IT-003', name: 'Teclado Mecánico RGB', category: 'Accesorios', stock: 0, priceNumber: 1800, price: 'RD$ 1,800', minStock: 5, supplier: 'Redragon' },
  { id: 'IT-004', name: 'Monitor LED 24" Full HD', category: 'Pantallas', stock: 5, priceNumber: 12400, price: 'RD$ 12,400', minStock: 6, supplier: 'Samsung' },
  { id: 'IT-005', name: 'Headset Stereo Logitech', category: 'Accesorios', stock: 12, priceNumber: 3250, price: 'RD$ 3,250', minStock: 4, supplier: 'Logitech LATAM' },
  { id: 'IT-006', name: 'Servidor Rack 1U PowerEdge', category: 'Redes & Servidores', stock: 2, priceNumber: 145000, price: 'RD$ 145,000', minStock: 2, supplier: 'Dell Enterprise' },
  { id: 'IT-007', name: 'Switch Administrable 24 Ports', category: 'Redes & Servidores', stock: 7, priceNumber: 18900, price: 'RD$ 18,900', minStock: 3, supplier: 'Cisco Systems' },
];

export const initialProjects: Project[] = [
  { id: 'PR-001', name: 'Implementación de Redes Cisco', client: 'Tech Solutions SRL', status: 'Activo', budget: 450000, startDate: '2026-02-01', completionRate: 65 },
  { id: 'PR-002', name: 'Renovación de Equipos Laptops', client: 'María González', status: 'En proceso', budget: 280000, startDate: '2026-03-10', completionRate: 40 },
  { id: 'PR-003', name: 'Desarrollo Sistema ERP Web', client: 'Ana Torres', status: 'Finalizado', budget: 620000, startDate: '2025-11-15', completionRate: 100 },
  { id: 'PR-004', name: 'Infraestructura de Servidores Cloud', client: 'Grupo Caribe', status: 'Activo', budget: 890000, startDate: '2026-04-01', completionRate: 25 },
];

export const initialSalesPoints: SalesPoint[] = [
  { month: 'Ene', amount: 360000, target: 400000 },
  { month: 'Feb', amount: 410000, target: 400000 },
  { month: 'Mar', amount: 480000, target: 450000 },
  { month: 'Abr', amount: 350000, target: 450000 },
  { month: 'May', amount: 520000, target: 500000 },
  { month: 'Jun', amount: 650000, target: 600000 },
  { month: 'Jul', amount: 760000, target: 700000 },
  { month: 'Ago', amount: 820000, target: 750000 },
];

export const initialPayments: Payment[] = [
  { id: 'PAY-101', client: 'Tech Solutions SRL', concept: 'Anticipo Proyecto Redes', amount: 225000, date: '2026-08-01', status: 'Pagado', method: 'Transferencia' },
  { id: 'PAY-102', client: 'María González', concept: 'Compra Laptops Dell', amount: 85500, date: '2026-08-05', status: 'Pagado', method: 'Tarjeta' },
  { id: 'PAY-103', client: 'Ana Torres', concept: 'Pago Final ERP Web', amount: 180000, date: '2026-08-10', status: 'Pendiente', method: 'Transferencia' },
  { id: 'PAY-104', client: 'Geovany Corp', concept: 'Mantenimiento Servidores', amount: 45000, date: '2026-07-28', status: 'Pagado', method: 'Efectivo' },
  { id: 'PAY-105', client: 'Méndez Logística', concept: 'Licencias de Software', amount: 32000, date: '2026-07-15', status: 'Atrasado', method: 'Transferencia' },
];

export const initialSaleRecords: SaleRecord[] = [
  { id: 'VEN-501', client: 'Tech Solutions SRL', product: 'Switch Administrable 24 Ports', amount: 56700, date: '2026-08-14', status: 'Completado' },
  { id: 'VEN-502', client: 'María González', product: 'Laptop Dell Inspiron 15 (x2)', amount: 57000, date: '2026-08-12', status: 'Completado' },
  { id: 'VEN-503', client: 'Grupo Caribe', product: 'Servidor Rack 1U PowerEdge', amount: 145000, date: '2026-08-10', status: 'Procesando' },
  { id: 'VEN-504', client: 'Geovany Corp', product: 'Monitor LED 24" Full HD (x4)', amount: 49600, date: '2026-08-08', status: 'Completado' },
];
