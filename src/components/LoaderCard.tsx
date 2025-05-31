
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Heart, Download, Eye, Settings, Code, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LoaderMetadata } from '@/types/loader';

interface LoaderCardProps {
  loader: LoaderMetadata;
  viewMode?: 'grid' | 'list';
}

const LoaderCard: React.FC<LoaderCardProps> = ({ loader, viewMode = 'grid' }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const copyCode = () => {
    const fullCode = `<!-- ${loader.name} -->
<!-- HTML -->
${loader.htmlCode}

<!-- CSS -->
<style>
${loader.cssCode}
</style>

${loader.jsCode ? `<!-- JavaScript -->
<script>
${loader.jsCode}
</script>` : ''}`;

    navigator.clipboard.writeText(fullCode);
    toast({
      title: "Code copied!",
      description: `${loader.name} code has been copied to your clipboard.`,
    });
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  // Create a safe HTML string for the loader preview
  const createLoaderHTML = () => {
    return {
      __html: `
        <style>
          ${loader.cssCode}
          ${!isPlaying ? '.loader-preview * { animation-play-state: paused !important; }' : ''}
        </style>
        ${loader.htmlCode}
      `
    };
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeLabel = (size: string) => {
    const sizeMap = { xs: 'XS', sm: 'SM', md: 'MD', lg: 'LG', xl: 'XL' };
    return sizeMap[size as keyof typeof sizeMap] || size.toUpperCase();
  };

  if (viewMode === 'list') {
    return (
      <Card className="w-full hover:shadow-lg transition-all duration-300 border hover:border-purple-200 dark:hover:border-purple-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            {/* Loader Preview */}
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center">
              <div 
                className="loader-preview"
                dangerouslySetInnerHTML={createLoaderHTML()}
              />
            </div>

            {/* Loader Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {loader.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {loader.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {loader.category}
                  </Badge>
                  <Badge className={`text-xs ${getComplexityColor(loader.complexity)}`}>
                    {loader.complexity}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {loader.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">
                  {getSizeLabel(loader.size)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {loader.speed}
                </Badge>
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {loader.downloads.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    {loader.likes}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={toggleAnimation}>
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowCode(!showCode)}>
                    <Code className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={copyCode}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="sm"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          {showCode && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg overflow-hidden">
              <pre className="text-green-400 text-xs overflow-x-auto">
                <code>{loader.cssCode}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-purple-200 dark:hover:border-purple-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">
            {loader.name}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={toggleAnimation}>
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline">{loader.category}</Badge>
          <Badge className={getComplexityColor(loader.complexity)}>
            {loader.complexity}
          </Badge>
          <Badge variant="secondary">{getSizeLabel(loader.size)}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Loader Preview */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 flex items-center justify-center min-h-[120px]">
          <div 
            className="loader-preview"
            dangerouslySetInnerHTML={createLoaderHTML()}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {loader.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
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
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={copyCode}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="sm"
          >
            <Copy className="h-3 w-3 mr-2" />
            Copy Code
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-3 w-3" />
          </Button>
        </div>

        {/* Code Preview */}
        {showCode && (
          <div className="p-3 bg-slate-900 rounded-lg overflow-hidden">
            <pre className="text-green-400 text-xs overflow-x-auto">
              <code>{loader.cssCode.slice(0, 200)}...</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoaderCard;
