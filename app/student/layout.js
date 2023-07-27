export default function StudentLayout({ children }) {
  return (
    <div className='grid gap-2 grid-cols-12 p-2'>
      <div className='grid col-span-1' />
      {children}
      <div className='grid col-span-1' />
    </div>
  );
}
