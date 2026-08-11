import React from 'react';

type BadgeVariant = 'activo' | 'pendiente' | 'en-proceso' | 'finalizado' | 'cancelado' | 'warning' | 'danger' | 'success' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'activo',
  children,
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    'activo': 'bg-success text-white',
    'pendiente': 'bg-warning text-white',
    'en-proceso': 'bg-info text-white',
    'finalizado': 'bg-primary text-white',
    'cancelado': 'bg-danger text-white',
    'warning': 'bg-warning text-white',
    'danger': 'bg-danger text-white',
    'success': 'bg-success text-white',
    'info': 'bg-info text-white',
  };

  return (
    <span className={`px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};
