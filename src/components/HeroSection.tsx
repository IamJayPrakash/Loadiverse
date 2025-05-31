
import React from 'react';
import { ArrowRight, Sparkles, Zap, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-slate-900 dark:to-pink-900/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              New: 50+ Glassmorphic Loaders Added
            </span>
            <Badge variant="secondary" className="text-xs">Latest</Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              1000+ Beautiful
            </span>
            <br />
            <span className="text-slate-900 dark:text-white">
              CSS & JS Loaders
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate collection of modern, responsive, and production-ready loaders. 
            Copy, customize, and deploy in seconds.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Zero Dependencies</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full">
              <Code2 className="h-4 w-4" />
              <span className="text-sm font-medium">Production Ready</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Customizable</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
              Explore Loaders
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Documentation
            </Button>
          </div>

          {/* Demo Loaders Preview */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {/* Spinner */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Spinner</span>
            </div>

            {/* Pulse */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Pulse</span>
            </div>

            {/* Dots */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Dots</span>
            </div>

            {/* Wave */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="flex space-x-1 items-end">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-green-500 rounded-full animate-pulse"
                      style={{
                        height: '20px',
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Wave</span>
            </div>

            {/* Flower */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="relative w-8 h-8">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-500 rounded-full animate-ping"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-12px)`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Flower</span>
            </div>

            {/* Gradient */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Gradient</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
