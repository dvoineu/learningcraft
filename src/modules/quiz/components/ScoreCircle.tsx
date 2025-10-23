'use client';

import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  total: number;
}

export function ScoreCircle({ score, total }: ScoreCircleProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = Math.round((score / total) * 100);
  const circumference = 2 * Math.PI * 80; // radius = 80
  const offset = circumference - (animatedPercentage / 100) * circumference;

  // Animate percentage
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Determine color based on score
  const getColor = () => {
    if (percentage >= 90) return 'text-emerald-400';
    if (percentage >= 70) return 'text-blue-400';
    if (percentage >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getStrokeColor = () => {
    if (percentage >= 90) return '#34d399';
    if (percentage >= 70) return '#60a5fa';
    if (percentage >= 50) return '#fbbf24';
    return '#f87171';
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-48 w-48 -rotate-90 transform">
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-white/10"
        />
        {/* Progress circle */}
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke={getStrokeColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-5xl font-bold ${getColor()}`}>
          {score}/{total}
        </div>
        <div className={`text-2xl font-semibold ${getColor()}`}>
          {animatedPercentage}%
        </div>
      </div>
    </div>
  );
}
