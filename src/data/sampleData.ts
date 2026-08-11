export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'activo' | 'pendiente';
  avatar: string;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  status: 'activo' | 'pendiente';
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'Activo' | 'Finalizado' | 'En proceso';
};

export type SalesPoint = {
  month: string;
  amount: number;
};

export const admins: User[] = [
  { id: '1', name: 'Geovany Pérez', email: 'geovany@prisma.com', role: 'Administrador', status: 'activo', avatar: 'G' },
  { id: '2', name: 'María González', email: 'maria@prisma.com', role: 'Administrador', status: 'activo', avatar: 'M' },
  { id: '3', name: 'Carlos Rodríguez', email: 'carlos@prisma.com', role: 'Administrador', status: 'activo', avatar: 'C' },
  { id: '4', name: 'Ana Martínez', email: 'ana@prisma.com', role: 'Administrador', status: 'pendiente', avatar: 'A' },
  { id: '5', name: 'Roberto Sánchez', email: 'roberto@prisma.com', role: 'Administrador', status: 'activo', avatar: 'R' },
];

export const clients: Client[] = [
  { id: 'CL-001', name: 'María González', phone: '809-555-0101', status: 'activo' },
  { id: 'CL-002', name: 'Carlos Ramírez', phone: '829-555-0144', status: 'activo' },
  { id: 'CL-003', name: 'Ana Torres', phone: '849-555-0123', status: 'pendiente' },
  { id: 'CL-004', name: 'Juan Pérez', phone: '809-555-0199', status: 'activo' },
  { id: 'CL-005', name: 'Yolanda Méndez', phone: '829-555-0188', status: 'pendiente' },
];

export const inventoryItems: InventoryItem[] = [
  { id: 'IT-001', name: 'Laptop Dell Inspiron', category: 'Laptops', stock: 3, price: 'RD$ 28,500' },
  { id: 'IT-002', name: 'Mouse Logitech G', category: 'Accesorios', stock: 8, price: 'RD$ 650' },
  { id: 'IT-003', name: 'Teclado Mecánico', category: 'Accesorios', stock: 0, price: 'RD$ 1,800' },
  { id: 'IT-004', name: 'Monitor 24"', category: 'Pantallas', stock: 5, price: 'RD$ 12,400' },
  { id: 'IT-005', name: 'Headset Logitech', category: 'Accesorios', stock: 12, price: 'RD$ 3,250' },
];

export const projects: Project[] = [
  { id: 'PR-001', name: 'Implementación Redes', client: 'Tech Solutions SRL', status: 'Activo' },
  { id: 'PR-002', name: 'Renovación de Equipos', client: 'María González', status: 'En proceso' },
  { id: 'PR-003', name: 'Proyecto Web', client: 'Ana Torres', status: 'Finalizado' },
];

export const salesData: SalesPoint[] = [
  { month: 'Ene', amount: 360000 },
  { month: 'Feb', amount: 410000 },
  { month: 'Mar', amount: 480000 },
  { month: 'Abr', amount: 350000 },
  { month: 'May', amount: 520000 },
  { month: 'Jun', amount: 650000 },
  { month: 'Jul', amount: 760000 },
];
