
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  const [isError, setIsError] = useState(false);

  // 로고 이미지가 없거나 로딩에 실패했을 때만 텍스트 로고를 보여줍니다.
  if (isError) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm">
          O
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900">
          Oryx <span className="text-blue-600 font-medium">DataSafe</span>
        </span>
      </div>
    );
  }

  return (
    <img 
      src="logo.png" 
      alt="Oryx DataSafe Logo" 
      className={`${className} object-contain`}
      style={{ display: 'block' }}
      onError={() => setIsError(true)}
    />
  );
};

export default Logo;
