'use client';
import AdminComponent from '../components/admin';
import { AdminProvider } from '../context/admin';

export default function Page() {
  return (
    <AdminProvider>
      <AdminComponent />
    </AdminProvider>
  );
}
