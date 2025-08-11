'use client';

import { useState } from 'react';

export default function TransitionDemo() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = () => {
    setIsTransitioning(true);
    
    // Reset after transition completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={triggerTransition}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        disabled={isTransitioning}
      >
        {isTransitioning ? 'Loading...' : 'Test Transition'}
      </button>
      
      {/* Manual transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999]">
          <div className="loading-overlay-demo">
            <div className="loading-content-demo">
              <div className="logo-container-demo">
                <div className="pulse-rings-demo">
                  <div className="ring-demo ring-1-demo"></div>
                  <div className="ring-demo ring-2-demo"></div>
                  <div className="ring-demo ring-3-demo"></div>
                </div>
                <div className="logo-center-demo">
                  <div className="logo-heart-demo">💓</div>
                </div>
              </div>
              
              <div className="loading-text-demo">
                <h2 className="brand-name-demo">
                  Pulse<span className="brand-accent-demo">Link</span>
                </h2>
                <div className="loading-dots-demo">
                  <span className="dot-demo dot-1-demo"></span>
                  <span className="dot-demo dot-2-demo"></span>
                  <span className="dot-demo dot-3-demo"></span>
                </div>
                <p className="loading-message-demo">Connecting lives, saving futures...</p>
              </div>
            </div>
            
            <div className="progress-container-demo">
              <div className="progress-bar-demo"></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .loading-overlay-demo {
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
          animation: fadeInDemo 0.3s ease-out;
        }

        .loading-content-demo {
          text-align: center;
          animation: slideUpDemo 0.6s ease-out 0.2s both;
        }

        .logo-container-demo {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
        }

        .pulse-rings-demo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring-demo {
          position: absolute;
          border: 3px solid;
          border-radius: 50%;
          opacity: 0;
          animation: pulseRingDemo 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .ring-1-demo {
          width: 60px;
          height: 60px;
          border-color: #3b82f6;
          animation-delay: 0s;
        }

        .ring-2-demo {
          width: 80px;
          height: 80px;
          border-color: #8b5cf6;
          animation-delay: 0.4s;
        }

        .ring-3-demo {
          width: 100px;
          height: 100px;
          border-color: #06b6d4;
          animation-delay: 0.8s;
        }

        .logo-center-demo {
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
          animation: logoFloatDemo 3s ease-in-out infinite;
        }

        .logo-heart-demo {
          font-size: 20px;
          animation: heartBeatDemo 1.5s ease-in-out infinite;
        }

        .brand-name-demo {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .brand-accent-demo {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loading-dots-demo {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .dot-demo {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          animation: dotBounceDemo 1.4s ease-in-out infinite both;
        }

        .dot-1-demo { animation-delay: -0.32s; }
        .dot-2-demo { animation-delay: -0.16s; }
        .dot-3-demo { animation-delay: 0s; }

        .loading-message-demo {
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 400;
        }

        .progress-container-demo {
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

        .progress-bar-demo {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          border-radius: 2px;
          animation: progressDemo 1.8s ease-out 0.4s both;
        }

        @keyframes fadeInDemo {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpDemo {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseRingDemo {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes logoFloatDemo {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }

        @keyframes heartBeatDemo {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes dotBounceDemo {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes progressDemo {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
