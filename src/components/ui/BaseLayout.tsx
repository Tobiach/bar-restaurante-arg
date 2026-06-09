import { type ReactNode } from 'react';
import { getConfig } from '../../config/active';

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function BaseLayout({ children, className = '' }: BaseLayoutProps) {
  const tc = getConfig();
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${className}`}
      style={{ background: tc.tema.primario }}
    >
      {children}
    </div>
  );
}
