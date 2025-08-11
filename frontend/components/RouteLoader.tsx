'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
      </div>
      
      {/* Loading Bar Animation */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 animate-loading-bar"></div>
    </div>
  );
}
