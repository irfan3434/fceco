import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fceco.vercel.app"),
  title: "FC ECO",
  description: "IT + AI + Environmental consultancy for sustainable cities.",
  openGraph: {
    title: "FC ECO",
    description: "IT + AI + Environmental consultancy for sustainable cities.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fceco.vercel.app",
    siteName: "FC ECO",
    images: ["/assets/fcecologo1.webp"], // put an OG image in /public/assets
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
