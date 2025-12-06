import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  trendUp,
  color = "blue"
}) => {
  const colorClasses = {
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className={`p-5 rounded-xl border backdrop-blur-sm ${selectedColor} transition-all duration-300 hover:bg-opacity-20`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">
            {value} <span className="text-sm font-normal opacity-60">{unit}</span>
          </h3>
        </div>
        <div className={`p-2 rounded-lg bg-opacity-20 bg-white`}>
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 text-xs flex items-center ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          <span>{trendUp ? '↑' : '↓'} {trend}</span>
          <span className="opacity-50 ml-1 text-current">vs last hour</span>
        </div>
      )}
    </div>
  );
};
