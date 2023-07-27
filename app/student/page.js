'use client';
import StudentComponent from '../components/student';
import { StudentProvider } from '../context/student';

export default function Page() {
  return (
    <StudentProvider>
      <StudentComponent />
    </StudentProvider>
  );
}
