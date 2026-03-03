import { useEffect, useState } from "react";

interface PreloaderProps {
  isLoading: boolean;
}

function Preloader({ isLoading }: PreloaderProps) {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950/95 backdrop-blur-sm transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex items-center justify-center">
        {/* Rotating incomplete circle */}
        <div className="absolute w-24 h-24 border-4 border-transparent border-t-purple-500 border-r-purple-500 rounded-full animate-spin-scale"></div>
        
        {/* Logo container */}
        <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-purple-500/30 flex items-center justify-center p-2">
          <img src="/images/logo.png" alt="Libronet" className="w-full h-full object-contain" />
        </div>
      </div>
      
      <style>{`
        @keyframes spin-scale {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-spin-scale {
          animation: spin-scale 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Preloader;
