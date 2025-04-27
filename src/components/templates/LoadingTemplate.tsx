import { useState, useEffect } from 'react';

export default function LoadingTemplate() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-8 border-orange-100 flex items-center justify-center">
              <div 
                className="h-24 w-24 rounded-full absolute top-0 left-0 border-8 border-orange-500 border-t-transparent animate-spin"
                style={{ borderWidth: '8px' }}
              />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Cargando tu perfil
        </h2>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-center space-x-3 mb-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full ${progress % 3 === i ? 'bg-orange-500' : 'bg-orange-200'} transition-all duration-300`}
            />
          ))}
        </div>
        
        <p className="text-center text-gray-500 text-sm">
          Estamos preparando todo para ti...
        </p>
      </div>
    </div>
  );
}