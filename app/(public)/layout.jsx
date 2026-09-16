import Navbar from '@/components/Navbar';
import MarqueeTicker from '@/components/MarqueeTicker';
import Footer from '@/components/Footer';
import * as db from '@/lib/db';

export default function PublicLayout({ children }) {
  const announcements = db.getAnnouncements().filter(a => a.active);

  return (
    <>
      <Navbar />
      <MarqueeTicker initialAnnouncements={announcements} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
