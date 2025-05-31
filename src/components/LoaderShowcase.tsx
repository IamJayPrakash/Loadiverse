
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoaderShowcase = () => {
  const { toast } = useToast();

  const featuredLoaders = [
    {
      id: 1,
      name: 'Cosmic Spinner',
      category: 'Gradient',
      type: 'CSS',
      component: (
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      ),
      code: `<div class="relative w-16 h-16">
  <div class="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full animate-spin"></div>
  <div class="absolute inset-2 bg-white rounded-full"></div>
  <div class="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
</div>`,
      downloads: 1250,
      likes: 89
    },
    {
      id: 2,
      name: 'Flower Bloom',
      category: 'Flower',
      type: 'CSS + JS',
      component: (
        <div className="relative w-16 h-16 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-6 bg-gradient-to-t from-pink-500 to-yellow-400 rounded-full animate-pulse"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
                transformOrigin: 'center 20px',
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      ),
      code: `<!-- HTML -->
<div class="flower-loader">
  <div class="petal" style="--i: 0"></div>
  <div class="petal" style="--i: 1"></div>
  <!-- ... more petals -->
  <div class="center"></div>
</div>

/* CSS */
.flower-loader { position: relative; width: 64px; height: 64px; }
.petal { 
  position: absolute; 
  width: 12px; 
  height: 24px; 
  background: linear-gradient(to top, #ec4899, #fbbf24);
  border-radius: 50%;
  transform: rotate(calc(var(--i) * 45deg)) translateY(-20px);
  animation: bloom 1.6s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.2s);
}`,
      downloads: 890,
      likes: 156
    },
    {
      id: 3,
      name: 'Wave Ripple',
      category: 'Wave',
      type: 'Pure CSS',
      component: (
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-blue-500 rounded-full animate-pulse"
              style={{
                height: `${20 + Math.sin(Date.now() / 200 + i) * 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      ),
      code: `.wave-loader {
  display: flex;
  gap: 4px;
}
.wave-bar {
  width: 8px;
  height: 40px;
  background: #3b82f6;
  border-radius: 4px;
  animation: wave 1s ease-in-out infinite;
}
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}`,
      downloads: 2100,
      likes: 203
    }
  ];

  const copyCode = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `${name} code has been copied to your clipboard.`,
    });
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Loaders
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Hand-picked beautiful loaders that developers love
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLoaders.map((loader) => (
            <Card key={loader.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                    {loader.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {loader.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {loader.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Loader Preview */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 flex items-center justify-center min-h-[120px]">
                  {loader.component}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {loader.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {loader.likes}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyCode(loader.code, loader.name)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-3">
            View All Featured Loaders
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoaderShowcase;
