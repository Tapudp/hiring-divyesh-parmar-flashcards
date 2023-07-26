import Header from './components/Header';
import { CommonProvider } from './context';
import './globals.css';

export const metadata = {
  title: 'Fantastic Flashcard',
  description: 'Flashcard app to play around with words',
  icon: '/icon.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <CommonProvider>
        {/* <body className='grid gap-2 grid-rows-[80px_row-span-6] w-full bg-white p-2'> */}
        <body className='grid gap-2 grid-rows-12 w-full bg-white p-2'>
          <div className='grid row-span-2'>
            <Header />
          </div>
          <div className='grid row-span-8'>{children}</div>
        </body>
      </CommonProvider>
    </html>
  );
}
