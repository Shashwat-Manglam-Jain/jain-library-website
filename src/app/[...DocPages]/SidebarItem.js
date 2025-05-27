"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import QuotesPage from './QuotesPage';
import { Noto_Sans_Devanagari, Roboto, Open_Sans, Lora, Merriweather, Poppins } from 'next/font/google';

// Define fonts
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '700'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const SidebarItem = ({ item, onSelect, level = 0, isSelected, isExpanded, setExpandedItems, expandedItems, selected }) => {
  const handleClick = useCallback(() => {
    onSelect(item);
    if (item.children?.length) {
      setExpandedItems(prev => ({ ...prev, [item.title]: !prev[item.title] }));
    }
  }, [item, onSelect, setExpandedItems]);

  return (
    <div className="mb-2">
      <button
        onClick={handleClick}
        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
          isSelected
            ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg'
            : 'bg-gray-800/80 text-gray-100 hover:bg-gray-700 hover:text-white hover:shadow-md'
        } flex items-center justify-between focus:ring-2 focus:ring-blue-400 break-words`}
        style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
        aria-label={`Select ${item.title}`}
      >
        <span className="flex items-center gap-3 text-sm sm:text-base break-words">
          {item.children?.length > 0 && (
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.title}
        </span>
      </button>
      {isExpanded &&
        item.children?.map((child, idx) => (
          <SidebarItem
            key={child.title || idx}
            item={child}
            onSelect={onSelect}
            level={level + 1}
            isSelected={selected?.title === child.title}
            isExpanded={!!expandedItems[child.title]}
            setExpandedItems={setExpandedItems}
            expandedItems={expandedItems}
            selected={selected}
          />
        ))}
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center min-h-[50vh] px-4">
    <svg className="w-14 h-14 mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728" />
    </svg>
    <h2 className="text-2xl font-semibold text-red-500">Something went wrong</h2>
    <p className="text-base text-red-300 mt-3">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      aria-label="Retry loading the page"
    >
      Retry
    </button>
  </div>
);

const cleanText = (text) =>
  (text || '')
    .replace(/[\u200B\uFEFF\u00A0]/g, '')
    .replace(/[ \t]+(?=\n)|(?<=\n)[ \t]+/g, '')
    .replace(/ +/g, ' ')
    .replace(/\n+/g, '\n\n')
    .replace(/([।|॥])(?!\n)/g, '$1\n')
    .trim();

const Page = () => {
  const [data, setData] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(384);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [currentFont, setCurrentFont] = useState('devanagari');
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
const mainPage=pathname==='/'
  // Font options
  const fonts = {
    devanagari: devanagari.className,
    roboto: roboto.className,
    openSans: openSans.className,
    lora: lora.className,
    merriweather: merriweather.className,
    poppins: poppins.className,
  };
  const fontNames = Object.keys(fonts);

  // Fetch data with localStorage caching
  const fetchData = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const cachedData = localStorage.getItem('kevalGyanData');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          if (Array.isArray(parsedData)) {
            setData(parsedData);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Invalid cached data:', e);
        }
      }
    }

    setLoading(true);
    try {
      const res = await fetch('https://jain-website-backend.vercel.app/', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const result = await res.json();
      if (!Array.isArray(result)) throw new Error('Invalid data format');
      setData(result);
      if (typeof window !== 'undefined') {
        localStorage.setItem('kevalGyanData', JSON.stringify(result));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Utility to find item by path
  const findItem = useCallback((items, path) => {
    if (!path.length) return null;
    const [head, ...tail] = path;
    const match = items.find((i) => i.title?.toLowerCase() === head.toLowerCase());
    return tail.length ? findItem(match?.children || [], tail) : match;
  }, []);

  // Utility to find path to item
  const findPathToItem = useCallback((items, target, path = []) => {
    for (const item of items) {
      if (item.title === target.title) return [...path, item.title];
      if (item.children) {
        const subPath = findPathToItem(item.children, target, [...path, item.title]);
        if (subPath) return subPath;
      }
    }
    return null;
  }, []);

  // Utility to expand items
  const expandItems = useCallback((items, path, expanded = {}) => {
    const [head, ...tail] = path;
    const match = items.find((i) => i.title?.toLowerCase() === head.toLowerCase());
    if (match?.children?.length) expanded[match.title] = true;
    return tail.length ? expandItems(match?.children || [], tail, expanded) : expanded;
  }, []);

  // Initialize selected state based on pathname
  const selected = useMemo(() => {
    if (!data.length || !pathname) return null;
    const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent);
    if (!segments.length) return null;
    return findItem(data, segments) || null;
  }, [pathname, data, findItem]);

  // Sync expandedItems when selected changes
  useEffect(() => {
    if (selected && pathname) {
      const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent);
      setExpandedItems(expandItems(data, segments));
    }
  }, [selected, pathname, data, expandItems]);

  // Handle sidebar item selection
  const handleSelect = useCallback(
    (item) => {
      if (!item) return;
      const path = findPathToItem(data, item);
      if (path) {
        const newPath = `/${path.map(encodeURIComponent).join('/')}`;
        setIsNavigating(true);
        router.prefetch(newPath);
        router.push(newPath, { scroll: false });
        if (item.children?.length) {
          setExpandedItems((prev) => ({ ...prev, [item.title]: true }));
        }
        if (isMobile) setIsSidebarOpen(false);
        setTimeout(() => setIsNavigating(false), 100);
      }
    },
    [data, router, findPathToItem, isMobile],
  );

  // Handle sidebar resizing
  const handleResize = useCallback(
    (e) => {
      if (isResizing && typeof window !== 'undefined') {
        const minWidth = isMobile ? 150 : window.innerWidth < 1024 ? 200 : 300;
        const maxWidth = isMobile ? 300 : window.innerWidth < 1024 ? 400 : 500;
        const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
        setSidebarWidth(newWidth);
        document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
      }
    },
    [isResizing, isMobile],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', () => setIsResizing(false));
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', () => setIsResizing(false));
    };
  }, [handleResize]);

  // Handle responsive sidebar
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateSidebar = () => {
      const width = window.innerWidth < 640 ? 200 : window.innerWidth < 1024 ? 256 : 384;
      setSidebarWidth(width);
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
      setIsMobile(window.innerWidth < 640);
      setIsSidebarOpen(window.innerWidth >= 640);
    };
    updateSidebar();
    window.addEventListener('resize', updateSidebar);
    return () => window.removeEventListener('resize', updateSidebar);
  }, []);

  // Text size controls
  const increaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.min(prev + 0.2, 1.6));
  };
  const decreaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.max(prev - 0.2, 0.6));
  };

  // Font change
  const changeFont = () => {
    const currentIndex = fontNames.indexOf(currentFont);
    const nextIndex = (currentIndex + 1) % fontNames.length;
    setCurrentFont(fontNames[nextIndex]);
  };

  // Custom Markdown components
  const customComponents = useMemo(
    () => ({
      h1: ({ children }) => (
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold my-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text break-words ${fonts[currentFont]} transition-all duration-200`}
          style={{ fontSize: `${fontSizeMultiplier * 100}%` }}
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 my-5 border-b border-blue-500/30 pb-2 break-words ${fonts[currentFont]} transition-all duration-200`}
          style={{ fontSize: `${fontSizeMultiplier * 100}%` }}
        >
          {children}
        </h2>
      ),
      p: ({ children }) => (
        <p
          className={`text-gray-200 leading-relaxed my-5 text-base sm:text-lg md:text-xl break-words ${fonts[currentFont]} transition-all duration-200`}
          style={{ fontSize: `${fontSizeMultiplier * 100}%` }}
        >
          {children}
        </p>
      ),
      strong: ({ children }) => (
        <strong className={`font-bold text-gray-100 ${fonts[currentFont]} transition-all duration-200`} style={{ fontSize: `${fontSizeMultiplier * 100}%` }}>
          {children}
        </strong>
      ),
      code: ({ children }) => (
        <div className="relative group">
          <code
            className={`block bg-gray-800/60 p-4 rounded-lg text-gray-200 border-l-4 border-blue-500/40 text-sm sm:text-base break-words overflow-x-auto ${fonts[currentFont]} transition-all duration-200`}
            style={{ fontSize: `${fontSizeMultiplier * 100}%` }}
          >
            {children}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(String(children))}
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-700/80 text-white hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Copy code"
          >
            📋
          </button>
        </div>
      ),
    }),
    [fontSizeMultiplier, currentFont, fonts],
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900/95 to-black/95 text-white">
 <Head>
  <title>{selected ? `${selected.title} | Keval Gyan` : 'Keval Gyan - Jain Scriptures & Bhakti'}</title>
  
  <meta
    name="description"
    content={
      selected
        ? cleanText(selected.body).slice(0, 160)
        : 'Explore Jain scriptures like भकतामर स्तोत्र, मंगलाष्टक, सम्हधि भक्ति, बारह भावना and more on Keval Gyan.'
    }
  />

  <meta
    name="keywords"
    content={`श्री-मंगलाष्टक-स्तोत्र, भगवान-महावीर-आरती, जैन धर्म निर्वाण कांड, Bhaktamar Stotra Hindi, Bhaktamar Stotra Sanskrit, भक्तामर महिमा, Samadhi Bhakti, SAMADHI BHAVNA, Samadhi Maran Path, बारह भावना, Alochana Path, Shri Parasnath Stotra, Tattvartha Sutra, Mangal Gaan, Chah Dhala, Jain Bhakti, Jain Stotra, Jain Dharma, Jain Path, Keval Gyan`}
  />

  <meta name="author" content="Keval Gyan" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charSet="UTF-8" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:title" content={selected ? `${selected.title} | Keval Gyan` : 'Keval Gyan - Jain Bhakti'} />
  <meta
    property="og:description"
    content={
      selected
        ? cleanText(selected.body).slice(0, 160)
        : 'Explore Jain texts like भकतामर स्तोत्र, समाधि भावना, बारह भावना, और भी बहुत कुछ।'
    }
  />
  <meta property="og:image" content={selected?.image || '/KshatriyakundMahavirSwami.jpeg'} />
  <meta property="og:url" content={`https://kevalgyan.vercel.app/${selected?.slug || ''}`} />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={selected ? `${selected.title} | Keval Gyan` : 'Keval Gyan'} />
  <meta
    name="twitter:description"
    content={
      selected
        ? cleanText(selected.body).slice(0, 160)
        : 'Bhaktamar Stotra, Samadhi Bhavna, Mangalashtak & other Jain scriptures.'
    }
  />
  <meta name="twitter:image" content={selected?.image || '/KshatriyakundMahavirSwami.jpeg'} />

  {/* Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": selected?.title || "Keval Gyan",
        "description":
          selected?.body
            ? cleanText(selected.body).slice(0, 160)
            : "Explore Jain bhakti, stotras, and sacred teachings.",
        "image": selected?.image || "/KshatriyakundMahavirSwami.jpeg",
        "author": {
          "@type": "Organization",
          "name": "Keval Gyan"
        },
        "keywords": [
          "श्री-मंगलाष्टक-स्तोत्र",
          "भगवान-महावीर-आरती",
          "जैन धर्म निर्वाण कांड",
          "Bhaktamar Stotra Hindi",
          "Bhaktamar Stotra Sanskrit",
          "भक्तामर महिमा",
          "Samadhi Bhakti",
          "SAMADHI BHAVNA",
          "Samadhi Maran Path",
          "बारह भावना",
          "Alochana Path",
          "Shri Parasnath Stotra",
          "Tattvartha Sutra",
          "Mangal Gaan",
          "Chah Dhala"
        ],
        "publisher": {
          "@type": "Organization",
          "name": "Keval Gyan",
          "logo": {
            "@type": "ImageObject",
            "url": "/favicon.png"
          }
        },
        "datePublished": selected?.createdAt || "2024-01-01"
      })
    }}
  />
</Head>

      {/* Inline CSS for layout and no page scrollbar */}
      <style jsx global>{`
        html, body {
          overflow: hidden;
          margin: 0;
          height: 100%;
        }
        :root {
          --sidebar-width: 384px;
        }
        aside {
          height: 100vh;
          width: var(--sidebar-width);
          transition: width 0.3s ease, transform 0.3s ease;
        }
        main {
          height: 100vh;
          overflow-y: auto;
          flex: 1;
        }
        @media (max-width: 639px) {
          aside {
            width: 80vw;
            max-width: 300px;
            transform: ${isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)'};
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          aside {
            width: 256px;
          }
        }
        @media (min-width: 1024px) {
          aside {
            width: var(--sidebar-width);
          }
        }
        .toolbar {
          position: fixed;
          bottom: 2.5rem;
          right: 2.5rem;
          z-index: 10;
          display: flex;
          gap: 0.75rem;
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(12px);
          padding: 0.75rem;
          border-radius: 1rem;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .toolbar button {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #1f2937, #374151);
          color: white;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
          font-size: 1.25rem;
        }
        .toolbar button:hover {
          background: linear-gradient(145deg, #3b82f6, #60a5fa);
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
        }
        .toolbar button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #3b82f6;
        }
        .toolbar .tooltip {
          position: absolute;
          bottom: 3.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(31, 41, 55, 0.95);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .toolbar button:hover .tooltip {
          opacity: 1;
        }
        @media (max-width: 639px) {
          .toolbar {
            bottom: 1.5rem;
            right: 1.5rem;
            padding: 0.5rem;
            gap: 0.5rem;
          }
          .toolbar button {
            width: 2.25rem;
            height: 2.25rem;
            font-size: 1rem;
          }
          .toolbar .tooltip {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>

      <button
        onClick={() => setIsSidebarOpen((p) => !p)}
        className="sm:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-gray-800/80 hover:bg-blue-600 text-white shadow-md"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <aside
        className="fixed sm:sticky top-0 left-0 h-screen overflow-y-auto z-20 p-4 sm:p-6 bg-gray-900/95 border-r border-gray-800/40 transition-all duration-300 max-w-[80vw] sm:max-w-none"
        aria-hidden={isMobile && !isSidebarOpen}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text break-words">
            Jai Jinendra
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="sm:hidden p-2 rounded-lg bg-gray-700/80 hover:bg-blue-600 text-white"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        {data.length ? (
          data.map((item, i) => (
            <SidebarItem
              key={item.title || i}
              item={item}
              onSelect={handleSelect}
              isSelected={selected?.title === item.title}
              isExpanded={!!expandedItems[item.title]}
              setExpandedItems={setExpandedItems}
              expandedItems={expandedItems}
              selected={selected}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No items</p>
        )}
      </aside>

      <div
        className="hidden sm:block w-2 bg-gray-800/50 hover:bg-blue-400 cursor-col-resize transition-colors duration-200"
        onMouseDown={() => setIsResizing(true)}
        aria-hidden="true"
      />

      <main className="flex-1  max-w-full overflow-y-auto">
   {!mainPage && (
  <div className="toolbar">
    <button onClick={decreaseFontSize} className="relative" aria-label="Decrease font size">
      <span>−</span>
      <span className="tooltip">Smaller</span>
    </button>
    <button onClick={increaseFontSize} className="relative" aria-label="Increase font size">
      <span>+</span>
      <span className="tooltip">Larger</span>
    </button>
    <button onClick={changeFont} className="relative" aria-label="Change font">
      <span>🖌️</span>
      <span className="tooltip">
        {fontNames[(fontNames.indexOf(currentFont) + 1) % fontNames.length]}
      </span>
    </button>
  </div>
)}

        {loading || isNavigating ? (
          <div className="px-4 py-10 animate-pulse space-y-8 max-w-3xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-800/60 p-6 rounded-xl shadow-lg space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-2/3" />
                <div className="h-4 bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : selected ? (
            <div className="mx-auto max-w-3xl bg-gradient-to-br from-gray-900/80 to-black/60 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 overflow-x-hidden text-center">
    
    <div className="flex justify-center">
      <img
        src={selected.image}
        alt={selected.title}
        className="h-96 w-96 rounded-2xl"
      />
    </div>
    
    <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 break-words">
      {selected.title}
    </h1>
    
    <div className="prose prose-invert max-w-full mx-auto mt-4">
      <ReactMarkdown
        components={customComponents}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {cleanText(selected.body)}
      </ReactMarkdown>
    </div>
    
  </div>
        ) : (
          <QuotesPage />
        )}
      </main>
    </div>
  );
};

export default Page;