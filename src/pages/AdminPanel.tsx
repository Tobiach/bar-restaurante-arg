import { useState, useEffect } from 'react';
import { AdminRol } from '../types/admin.types';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';

export default function AdminPanel() {
  const [rol,    setRol]    = useState<AdminRol | null>(null);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const savedRol    = sessionStorage.getItem('admin-rol') as AdminRol | null;
    const savedNombre = sessionStorage.getItem('admin-nombre') ?? '';
    if (savedRol) { setRol(savedRol); setNombre(savedNombre); }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('admin-rol');
    sessionStorage.removeItem('admin-nombre');
    setRol(null);
    setNombre('');
  };

  if (!rol) {
    return <AdminLogin onAuth={(r, n) => { setRol(r); setNombre(n); }} />;
  }

  return <AdminLayout rol={rol} nombre={nombre} onLogout={logout} />;
}
