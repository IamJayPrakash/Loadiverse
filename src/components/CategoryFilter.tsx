
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loaderCategories } from '@/data/loaders';
import { 
  RotateCw, 
  Circle, 
  Waves, 
  BarChart3, 
  MoreHorizontal, 
  Flower, 
  Zap, 
  Palette,
  Heart,
  Grid3X3
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap: Record<string, any> = {
  'Grid': Grid3X3,
  'RotateCw': RotateCw,
  'MoreHorizontal': MoreHorizontal,
  'BarChart3': BarChart3,
  'Circle': Circle,
  'Flower': Flower,
  'Heart': Heart,
  'Waves': Waves,
  'Palette': Palette,
  'Zap': Zap
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {loaderCategories.map((category) => {
            const Icon = iconMap[category.icon] || Grid3X3;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center p-4 h-auto space-y-2 transition-all duration-200 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg scale-105' 
                    : 'hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
              >
                <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {category.name}
                </span>
                <Badge 
                  variant={isSelected ? "secondary" : "outline"} 
                  className={`text-xs ${
                    isSelected 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
