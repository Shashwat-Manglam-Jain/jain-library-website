import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Example: app/books/page.tsx (Server Component)
export const metadata = {
  title: 'Jain Books & Teachings | जैन धर्म ग्रंथ और शिक्षाएँ',
  description:
    'Discover Jain books, bhakti paths, stotras like Bhaktamar, Samadhi Bhavna, Barah Bhavna, and sacred scriptures in Hindi and English. Jain Dharma knowledge hub for spirituality and moksha seekers.',
  keywords: [
    // Core Jain topics
    'Jainism', 'Jain Religion', 'Jain Dharma', 'Jain Teachings',
    'Jain Books', 'Jain Scriptures', 'Jain Texts', 'Jain Literature',

    // Specific scriptures & prayers
    'Bhaktamar Stotra', 'Samadhi Bhavna', 'Barah Bhavna',
    'Mangalashtak Stotra', 'Parasnath Stotra', 'Alochana Path',
    'Samadhi Maran Path', 'Tattvartha Sutra', 'Acharanga Sutra',
    'Mangal Gaan', 'Chah Dhala', 'Mahavir Aarti', 'Jain Aarti',

    // Hindi terms for regional SEO
    'जैन धर्म', 'भक्तामर स्तोत्र', 'समाधि भावना', 'बारह भावना',
    'मंगलाष्टक स्तोत्र', 'पारसनाथ स्तोत्र', 'तत्त्वार्थ सूत्र',
    'आलोचना पाठ', 'समाधी मरण पाठ', 'मंगल गान', 'छह ढाला',

    // Broader spiritual context
    'Keval Gyan', 'Jain Philosophy', 'Jain Deities', 'Jain Festivals',
    'Jain Mantras', 'Jain Temples', 'Jain Meditation', 'Moksha Path',
    'Jain Bhakti', 'Digambara', 'Shwetambara', 'Jain Icons', 'Mahavir Swami'
  ],
  openGraph: {
    title: 'Jain Books & Teachings | जैन धर्म ग्रंथ और शिक्षाएँ',
    description:
      'Your portal for Jain stotras, scriptures, and teachings. Explore Bhaktamar, Samadhi Bhavna, Barah Bhavna and more in Hindi and English.',
    url: 'https://yourdomain.com/books',
    siteName: 'Keval Gyan',
    images: [
      {
        url: '/KshatriyakundMahavirSwami.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mahavir Swami – Jain Dharma Symbol',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jain Books & Teachings | Keval Gyan',
    description:
      'Explore Jain teachings, Bhaktamar Stotra, Jain philosophy, and moksha path in Hindi and English. A spiritual resource for all.',
    images: ['/favicon.png'],
  },
  alternates: {
    canonical: 'https://yourdomain.com/books',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Keval Gyan', url: 'hashwatmanglamjain.netlify.app' }],
  creator: 'Keval Gyan',
  publisher: 'Keval Gyan',
  themeColor: '#1f2937', // Tailwind gray-800
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
    <link rel="icon" href="/favicon.png" type="image/png" />
        <title>Keval Gyan</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
