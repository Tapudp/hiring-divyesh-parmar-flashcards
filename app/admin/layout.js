export default function AdminLayout({ children }) {
  return (
    <div className='grid gap-2 grid-cols-12 p-2'>
      <div />
      {children}
      <div />
    </div>
  );
}
