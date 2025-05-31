
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allLoaders } from '@/data/loaders';

const LoaderShowcase = () => {
  const { toast } = useToast();

  // Get featured loaders (top rated ones)
  const featuredLoaders = allLoaders
    .filter(loader => loader.likes > 100)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 6);

  const copyCode = (loader: any) => {
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

  // Create safe HTML for loader preview
  const createLoaderHTML = (loader: any) => {
    return {
      __html: `
        <style>
          ${loader.cssCode}
        </style>
        ${loader.htmlCode}
      `
    };
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
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        loader.complexity === 'simple' ? 'bg-green-100 text-green-800' :
                        loader.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {loader.complexity}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {loader.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Loader Preview */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 flex items-center justify-center min-h-[120px]">
                  <div dangerouslySetInnerHTML={createLoaderHTML(loader)} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {loader.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
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
                    onClick={() => copyCode(loader)}
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
