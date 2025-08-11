'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function EnhancedPageLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loadingState, setLoadingState] = useState('initial'); // 'initial', 'loading', 'loaded', 'new-page'
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      // Initial page load sequence
      setLoadingState('initial');
      
      const timer1 = setTimeout(() => {
        setLoadingState('loading');
      }, 100);

      const timer2 = setTimeout(() => {
        setLoadingState('loaded');
      }, 1800);

      const timer3 = setTimeout(() => {
        setLoadingState('new-page');
        setIsFirstLoad(false);
      }, 2050);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      // Route change sequence
      setLoadingState('restart');
      
      const timer1 = setTimeout(() => {
        setLoadingState('loading');
      }, 200);

      const timer2 = setTimeout(() => {
        setLoadingState('loaded');
      }, 1400);

      const timer3 = setTimeout(() => {
        setLoadingState('new-page');
      }, 1650);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [pathname, isFirstLoad]);

  return (
    <div className={`page-container ${loadingState}`}>
      {/* Loading Overlay */}
      <div className="loading-overlay">
        <div className="loading-content">
          {/* Animated PulseLink Logo */}
          <div className="logo-container">
            <div className="pulse-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <div className="logo-center">
              <div className="logo-heart">💓</div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="loading-text">
            <h2 className="brand-name">
              Pulse<span className="brand-accent">Link</span>
            </h2>
            <div className="loading-dots">
              <span className="dot dot-1"></span>
              <span className="dot dot-2"></span>
              <span className="dot dot-3"></span>
            </div>
            <p className="loading-message">Connecting lives, saving futures...</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content">
        {children}
      </div>

      <style jsx global>{`
        .page-container {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 75%, #0f172a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .loading-content {
          text-align: center;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
        }

        .pulse-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border: 3px solid;
          border-radius: 50%;
          opacity: 0;
          animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .ring-1 {
          width: 60px;
          height: 60px;
          border-color: #3b82f6;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 80px;
          height: 80px;
          border-color: #8b5cf6;
          animation-delay: 0.4s;
        }

        .ring-3 {
          width: 100px;
          height: 100px;
          border-color: #06b6d4;
          animation-delay: 0.8s;
        }

        .logo-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoFloat 3s ease-in-out infinite;
        }

        .logo-heart {
          font-size: 20px;
          animation: heartBeat 1.5s ease-in-out infinite;
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .brand-accent {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          animation: dotBounce 1.4s ease-in-out infinite both;
        }

        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; }
        .dot-3 { animation-delay: 0s; }

        .loading-message {
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 400;
        }

        .progress-container {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          border-radius: 2px;
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .page-content {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* State Classes */
        .page-container.loading .loading-overlay {
          opacity: 1;
          visibility: visible;
        }

        .page-container.loading .loading-content {
          transform: translateY(0);
          opacity: 1;
        }

        .page-container.loading .progress-bar {
          width: 100%;
        }

        .page-container.loaded .loading-overlay {
          opacity: 0;
          visibility: hidden;
          transition-delay: 0.3s;
        }

        .page-container.new-page .page-content {
          opacity: 1;
          transform: scale(1);
        }

        .page-container.restart .loading-overlay {
          opacity: 1;
          visibility: visible;
          background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
        }

        /* Animations */
        @keyframes pulseRing {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
