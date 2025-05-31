
import React from 'react';

interface LoaderComponentProps {
  type: string;
  variant: string;
  id: number;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ type, variant, id }) => {
  const getRandomColor = () => {
    const colors = [
      'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-cyan-500'
    ];
    return colors[id % colors.length];
  };

  const getGradientClass = () => {
    const gradients = [
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-green-500 to-emerald-500',
      'bg-gradient-to-r from-yellow-500 to-orange-500',
      'bg-gradient-to-r from-red-500 to-pink-500',
      'bg-gradient-to-r from-indigo-500 to-purple-500'
    ];
    return gradients[id % gradients.length];
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'modern':
        return (
          <div className={`w-8 h-8 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin`}></div>
        );
      case 'elegant':
        return (
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 ${getGradientClass()} rounded-full animate-spin`}></div>
            <div className="absolute inset-1 bg-white dark:bg-slate-800 rounded-full"></div>
          </div>
        );
      case 'futuristic':
        return (
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 border-2 border-transparent ${getGradientClass()} rounded-full animate-spin`}></div>
            <div className={`absolute inset-2 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-spin`} style={{ animationDirection: 'reverse' }}></div>
          </div>
        );
      default:
        return (
          <div className={`w-8 h-8 border-4 border-gray-200 ${getRandomColor().replace('bg-', 'border-t-')} rounded-full animate-spin`}></div>
        );
    }
  };

  const renderPulse = () => {
    switch (variant) {
      case 'circle':
        return <div className={`w-8 h-8 ${getRandomColor()} rounded-full animate-pulse`}></div>;
      case 'square':
        return <div className={`w-8 h-8 ${getRandomColor()} rounded-lg animate-pulse`}></div>;
      case 'heart':
        return (
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className={`w-6 h-6 ${getRandomColor()} rounded-full animate-pulse transform rotate-45 relative`}>
              <div className={`absolute -top-3 left-0 w-6 h-6 ${getRandomColor()} rounded-full`}></div>
              <div className={`absolute top-0 -left-3 w-6 h-6 ${getRandomColor()} rounded-full`}></div>
            </div>
          </div>
        );
      case 'star':
        return (
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 ${getRandomColor()} animate-pulse`} style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>
        );
      default:
        return <div className={`w-8 h-8 ${getRandomColor()} rounded-full animate-pulse`}></div>;
    }
  };

  const renderWave = () => {
    const barCount = variant === 'triangle' ? 3 : variant === 'square' ? 4 : 5;
    return (
      <div className="flex items-end space-x-1">
        {[...Array(barCount)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 ${getRandomColor()} rounded-full animate-pulse`}
            style={{
              height: `${16 + (i % 2) * 8}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    );
  };

  const renderBars = () => {
    switch (variant) {
      case 'horizontal':
        return (
          <div className="space-y-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-1 ${getRandomColor()} rounded-full animate-pulse`}
                style={{
                  width: `${20 + i * 8}px`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        );
      case 'circular':
        return (
          <div className="relative w-8 h-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-3 ${getRandomColor()} rounded-full animate-pulse`}
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-12px)`,
                  transformOrigin: 'center 12px',
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        );
      case 'diagonal':
        return (
          <div className="relative w-8 h-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-6 ${getRandomColor()} rounded-full animate-pulse`}
                style={{
                  transform: `rotate(${45 + i * 90}deg)`,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center',
                  marginLeft: '-2px',
                  marginTop: '-12px',
                  animationDelay: `${i * 0.15}s`
                }}
              ></div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex items-end space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 ${getRandomColor()} rounded-full animate-pulse`}
                style={{
                  height: `${12 + i * 4}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        );
    }
  };

  const renderDots = () => {
    switch (variant) {
      case 'bounce':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${getRandomColor()} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        );
      case 'fade':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${getRandomColor()} rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        );
      case 'scale':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${getRandomColor()} rounded-full animate-ping`}
                style={{ animationDelay: `${i * 0.25}s` }}
              ></div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${getRandomColor()} rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        );
    }
  };

  const renderFlower = () => {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-4 ${getGradientClass()} rounded-full animate-pulse`}
            style={{
              transform: `rotate(${i * 45}deg) translateY(-10px)`,
              transformOrigin: 'center 10px',
              animationDelay: `${i * 0.15}s`
            }}
          ></div>
        ))}
        <div className={`absolute w-2 h-2 ${getRandomColor()} rounded-full animate-ping`}></div>
      </div>
    );
  };

  const renderMorphing = () => {
    return (
      <div className={`w-8 h-8 ${getGradientClass()} rounded-full animate-ping`}></div>
    );
  };

  const renderGradient = () => {
    switch (variant) {
      case 'radial':
        return <div className={`w-8 h-8 bg-gradient-radial from-purple-500 to-pink-500 rounded-full animate-spin`}></div>;
      case 'conic':
        return <div className={`w-8 h-8 bg-gradient-conic from-purple-500 via-pink-500 to-purple-500 rounded-full animate-spin`}></div>;
      default:
        return <div className={`w-8 h-8 ${getGradientClass()} rounded-full animate-spin`}></div>;
    }
  };

  const renderHeart = () => {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse transform rotate-45 relative">
          <div className="absolute -top-3 left-0 w-6 h-6 bg-red-500 rounded-full"></div>
          <div className="absolute top-0 -left-3 w-6 h-6 bg-red-500 rounded-full"></div>
        </div>
      </div>
    );
  };

  const renderGeometric = () => {
    switch (variant) {
      case 'polygon':
        return <div className={`w-8 h-8 ${getRandomColor()} animate-spin`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>;
      case 'sacred':
        return (
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 ${getRandomColor()} rounded-full animate-spin`}></div>
            <div className={`absolute inset-1 ${getRandomColor().replace(getRandomColor().split('-')[1], 'white')} rounded-full`}></div>
            <div className={`absolute inset-2 ${getRandomColor()} rounded-full animate-pulse`}></div>
          </div>
        );
      default:
        return <div className={`w-8 h-8 ${getRandomColor()} animate-spin`} style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>;
    }
  };

  const renderStar = () => {
    return (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 text-yellow-400 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
          <div className="w-full h-full bg-current"></div>
        </div>
      </div>
    );
  };

  const renderPolygon = () => {
    return <div className={`w-8 h-8 ${getRandomColor()} animate-spin`} style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>;
  };

  const renderDiamond = () => {
    return <div className={`w-8 h-8 ${getGradientClass()} animate-ping transform rotate-45`}></div>;
  };

  switch (type) {
    case 'spinners':
      return renderSpinner();
    case 'pulses':
      return renderPulse();
    case 'waves':
      return renderWave();
    case 'bars':
      return renderBars();
    case 'dots':
      return renderDots();
    case 'flowers':
      return renderFlower();
    case 'morphing':
      return renderMorphing();
    case 'gradient':
      return renderGradient();
    case 'hearts':
      return renderHeart();
    case 'geometric':
      return renderGeometric();
    case 'stars':
      return renderStar();
    case 'polygons':
      return renderPolygon();
    case 'diamonds':
      return renderDiamond();
    default:
      return <div className={`w-8 h-8 ${getRandomColor()} rounded-full animate-pulse`}></div>;
  }
};

export default LoaderComponent;
