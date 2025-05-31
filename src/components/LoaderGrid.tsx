
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Copy, Heart, Download, Eye, Palette, Zap, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoaderComponent from '@/components/LoaderComponent';

interface LoaderGridProps {
  searchTerm: string;
  selectedCategory: string;
  viewMode: string;
}

const LoaderGrid: React.FC<LoaderGridProps> = ({ searchTerm, selectedCategory, viewMode }) => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const loadersPerPage = 24;

  // Generate a comprehensive list of loaders
  const allLoaders = useMemo(() => {
    const loaderTypes = [
      // Spinners (150)
      ...Array.from({ length: 150 }, (_, i) => ({
        id: i + 1,
        name: `Spinner ${i + 1}`,
        category: 'spinners',
        type: ['Pure CSS', 'CSS + JS', 'SVG'][i % 3],
        variant: ['classic', 'modern', 'elegant', 'futuristic'][i % 4],
        downloads: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 200) + 10,
        colors: ['gradient', 'solid', 'rainbow'][i % 3]
      })),
      
      // Pulses (120)
      ...Array.from({ length: 120 }, (_, i) => ({
        id: i + 151,
        name: `Pulse ${i + 1}`,
        category: 'pulses',
        type: ['Pure CSS', 'CSS + JS'][i % 2],
        variant: ['circle', 'square', 'heart', 'star'][i % 4],
        downloads: Math.floor(Math.random() * 3000) + 150,
        likes: Math.floor(Math.random() * 150) + 5,
        colors: ['blue', 'purple', 'pink', 'green'][i % 4]
      })),
      
      // Waves (80)
      ...Array.from({ length: 80 }, (_, i) => ({
        id: i + 271,
        name: `Wave ${i + 1}`,
        category: 'waves',
        type: ['Pure CSS', 'CSS + JS', 'Canvas'][i % 3],
        variant: ['sine', 'triangle', 'square', 'sawtooth'][i % 4],
        downloads: Math.floor(Math.random() * 2500) + 200,
        likes: Math.floor(Math.random() * 180) + 8,
        colors: ['ocean', 'sunset', 'neon', 'pastel'][i % 4]
      })),
      
      // Bars (90)
      ...Array.from({ length: 90 }, (_, i) => ({
        id: i + 351,
        name: `Bar ${i + 1}`,
        category: 'bars',
        type: ['Pure CSS', 'SVG'][i % 2],
        variant: ['vertical', 'horizontal', 'circular', 'diagonal'][i % 4],
        downloads: Math.floor(Math.random() * 2000) + 300,
        likes: Math.floor(Math.random() * 120) + 12,
        colors: ['monochrome', 'gradient', 'rainbow'][i % 3]
      })),
      
      // Dots (100)
      ...Array.from({ length: 100 }, (_, i) => ({
        id: i + 441,
        name: `Dots ${i + 1}`,
        category: 'dots',
        type: ['Pure CSS', 'CSS + JS'][i % 2],
        variant: ['bounce', 'fade', 'scale', 'rotate'][i % 4],
        downloads: Math.floor(Math.random() * 4000) + 250,
        likes: Math.floor(Math.random() * 190) + 15,
        colors: ['solid', 'gradient', 'themed'][i % 3]
      })),
      
      // Flowers (60)
      ...Array.from({ length: 60 }, (_, i) => ({
        id: i + 541,
        name: `Flower ${i + 1}`,
        category: 'flowers',
        type: ['CSS + JS', 'SVG', 'Canvas'][i % 3],
        variant: ['bloom', 'petals', 'garden', 'lotus'][i % 4],
        downloads: Math.floor(Math.random() * 1800) + 180,
        likes: Math.floor(Math.random() * 160) + 20,
        colors: ['natural', 'vibrant', 'pastel', 'dark'][i % 4]
      })),
      
      // Morphing (70)
      ...Array.from({ length: 70 }, (_, i) => ({
        id: i + 601,
        name: `Morph ${i + 1}`,
        category: 'morphing',
        type: ['CSS + JS', 'SVG', 'Canvas'][i % 3],
        variant: ['shape', 'liquid', 'elastic', 'transform'][i % 4],
        downloads: Math.floor(Math.random() * 2200) + 120,
        likes: Math.floor(Math.random() * 140) + 18,
        colors: ['fluid', 'electric', 'organic'][i % 3]
      })),
      
      // Gradients (110)
      ...Array.from({ length: 110 }, (_, i) => ({
        id: i + 671,
        name: `Gradient ${i + 1}`,
        category: 'gradient',
        type: ['Pure CSS', 'CSS + JS'][i % 2],
        variant: ['linear', 'radial', 'conic', 'mesh'][i % 4],
        downloads: Math.floor(Math.random() * 3500) + 400,
        likes: Math.floor(Math.random() * 220) + 25,
        colors: ['sunset', 'ocean', 'forest', 'cosmic'][i % 4]
      })),
      
      // Hearts (40)
      ...Array.from({ length: 40 }, (_, i) => ({
        id: i + 781,
        name: `Heart ${i + 1}`,
        category: 'hearts',
        type: ['Pure CSS', 'SVG'][i % 2],
        variant: ['beat', 'pulse', 'love', 'romantic'][i % 4],
        downloads: Math.floor(Math.random() * 1500) + 90,
        likes: Math.floor(Math.random() * 300) + 50,
        colors: ['red', 'pink', 'rainbow', 'white'][i % 4]
      })),
      
      // Geometric (85)
      ...Array.from({ length: 85 }, (_, i) => ({
        id: i + 821,
        name: `Geometric ${i + 1}`,
        category: 'geometric',
        type: ['Pure CSS', 'SVG', 'Canvas'][i % 3],
        variant: ['polygon', 'sacred', 'minimal', 'complex'][i % 4],
        downloads: Math.floor(Math.random() * 2800) + 160,
        likes: Math.floor(Math.random() * 170) + 12,
        colors: ['monochrome', 'dual', 'gradient'][i % 3]
      })),
      
      // Stars (45)
      ...Array.from({ length: 45 }, (_, i) => ({
        id: i + 906,
        name: `Star ${i + 1}`,
        category: 'stars',
        type: ['Pure CSS', 'SVG'][i % 2],
        variant: ['twinkle', 'shooting', 'constellation', 'galaxy'][i % 4],
        downloads: Math.floor(Math.random() * 1200) + 110,
        likes: Math.floor(Math.random() * 130) + 22,
        colors: ['gold', 'silver', 'cosmic', 'bright'][i % 4]
      })),
      
      // Polygons (35)
      ...Array.from({ length: 35 }, (_, i) => ({
        id: i + 951,
        name: `Polygon ${i + 1}`,
        category: 'polygons',
        type: ['SVG', 'Canvas'][i % 2],
        variant: ['hexagon', 'triangle', 'pentagon', 'octagon'][i % 4],
        downloads: Math.floor(Math.random() * 1000) + 80,
        likes: Math.floor(Math.random() * 100) + 8,
        colors: ['geometric', 'gradient', 'solid'][i % 3]
      })),
      
      // Diamonds (25)
      ...Array.from({ length: 25 }, (_, i) => ({
        id: i + 986,
        name: `Diamond ${i + 1}`,
        category: 'diamonds',
        type: ['Pure CSS', 'SVG'][i % 2],
        variant: ['sparkle', 'crystal', 'gem', 'brilliant'][i % 4],
        downloads: Math.floor(Math.random() * 800) + 60,
        likes: Math.floor(Math.random() * 90) + 15,
        colors: ['crystal', 'rainbow', 'white', 'blue'][i % 4]
      }))
    ];
    
    return loaderTypes;
  }, []);

  // Filter loaders based on search and category
  const filteredLoaders = useMemo(() => {
    let filtered = allLoaders;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(loader => loader.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(loader =>
        loader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loader.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loader.variant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allLoaders, selectedCategory, searchTerm]);

  // Paginate loaders
  const paginatedLoaders = useMemo(() => {
    const startIndex = (currentPage - 1) * loadersPerPage;
    return filteredLoaders.slice(startIndex, startIndex + loadersPerPage);
  }, [filteredLoaders, currentPage, loadersPerPage]);

  const totalPages = Math.ceil(filteredLoaders.length / loadersPerPage);

  const copyCode = (loader: any) => {
    const code = `/* ${loader.name} Loader */
.loader-${loader.id} {
  /* Loader styles will be generated based on type and variant */
  animation: loader-${loader.id} 1s infinite;
}

@keyframes loader-${loader.id} {
  /* Animation keyframes */
}`;
    
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `${loader.name} code has been copied to your clipboard.`,
    });
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedCategory === 'all' ? 'All Loaders' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Loaders`}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Showing {filteredLoaders.length} loaders
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Loader Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {paginatedLoaders.map((loader) => (
            <Card key={loader.id} className="group hover:shadow-xl transition-all duration-300 border hover:border-purple-200 dark:hover:border-purple-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                    {loader.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {loader.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{loader.variant}</span>
                  <span>•</span>
                  <span>{loader.colors}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Loader Preview */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 flex items-center justify-center min-h-[100px]">
                  <LoaderComponent 
                    type={loader.category}
                    variant={loader.variant}
                    id={loader.id}
                  />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      {loader.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {loader.likes}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyCode(loader)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="sm"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Load More Button for Mobile */}
        <div className="text-center mt-8 md:hidden">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage >= totalPages}
          >
            Load More Loaders
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoaderGrid;
