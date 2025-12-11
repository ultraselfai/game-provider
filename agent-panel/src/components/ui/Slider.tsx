'use client';

import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  color?: 'blue' | 'green' | 'emerald' | 'red' | 'orange' | 'yellow' | 'purple';
  className?: string;
  disabled?: boolean;
}

const colorMap = {
  blue: {
    track: 'bg-blue-500',
    thumb: 'border-blue-500 bg-blue-500',
  },
  green: {
    track: 'bg-green-500',
    thumb: 'border-green-500 bg-green-500',
  },
  emerald: {
    track: 'bg-emerald-500',
    thumb: 'border-emerald-500 bg-emerald-500',
  },
  red: {
    track: 'bg-red-500',
    thumb: 'border-red-500 bg-red-500',
  },
  orange: {
    track: 'bg-orange-500',
    thumb: 'border-orange-500 bg-orange-500',
  },
  yellow: {
    track: 'bg-yellow-500',
    thumb: 'border-yellow-500 bg-yellow-500',
  },
  purple: {
    track: 'bg-purple-500',
    thumb: 'border-purple-500 bg-purple-500',
  },
};

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  color = 'blue',
  className = '',
  disabled = false,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const colors = colorMap[color];

  return (
    <div className={`relative w-full h-2 ${className}`}>
      {/* Track de fundo */}
      <div className="absolute inset-0 bg-slate-600/50 rounded-full" />
      
      {/* Track preenchido (a cor que vai do início até a bolinha) */}
      <div
        className={`absolute top-0 left-0 h-full ${colors.track} rounded-full transition-all duration-75`}
        style={{ width: `${percentage}%` }}
      />
      
      {/* Input range invisível por cima para capturar interação */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        style={{ margin: 0 }}
      />
      
      {/* Bolinha/Thumb customizada */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colors.thumb} shadow-lg border-2 border-white pointer-events-none transition-all duration-75`}
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  );
}

export default Slider;
