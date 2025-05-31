
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import LoaderCard from '@/components/LoaderCard';
import { allLoaders } from '@/data/loaders';
import { LoaderMetadata } from '@/types/loader';

interface LoaderGridProps {
  searchTerm: string;
  selectedCategory: string;
  viewMode: string;
}

const LoaderGrid: React.FC<LoaderGridProps> = ({ searchTerm, selectedCategory, viewMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [complexityFilter, setComplexityFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [speedFilter, setSpeedFilter] = useState('all');
  const loadersPerPage = 24;

  // Filter and sort loaders
  const filteredAndSortedLoaders = useMemo(() => {
    let filtered = allLoaders;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(loader => loader.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(loader =>
        loader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loader.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loader.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        loader.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Additional filters
    if (complexityFilter !== 'all') {
      filtered = filtered.filter(loader => loader.complexity === complexityFilter);
    }

    if (sizeFilter !== 'all') {
      filtered = filtered.filter(loader => loader.size === sizeFilter);
    }

    if (speedFilter !== 'all') {
      filtered = filtered.filter(loader => loader.speed === speedFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'downloads':
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        case 'likes':
          aValue = a.likes;
          bValue = b.likes;
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, complexityFilter, sizeFilter, speedFilter, sortBy, sortOrder]);

  // Paginate loaders
  const paginatedLoaders = useMemo(() => {
    const startIndex = (currentPage - 1) * loadersPerPage;
    return filteredAndSortedLoaders.slice(startIndex, startIndex + loadersPerPage);
  }, [filteredAndSortedLoaders, currentPage, loadersPerPage]);

  const totalPages = Math.ceil(filteredAndSortedLoaders.length / loadersPerPage);

  const resetFilters = () => {
    setComplexityFilter('all');
    setSizeFilter('all');
    setSpeedFilter('all');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Advanced Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by name, category, or tags..."
                value={searchTerm}
                readOnly
                className="pl-10 pr-4"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="sm">SM</SelectItem>
                  <SelectItem value="md">MD</SelectItem>
                  <SelectItem value="lg">LG</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>

              <Select value={speedFilter} onValueChange={setSpeedFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Speeds</SelectItem>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="sm" onClick={resetFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-4">
            {complexityFilter !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Complexity: {complexityFilter}
              </Badge>
            )}
            {sizeFilter !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Size: {sizeFilter.toUpperCase()}
              </Badge>
            )}
            {speedFilter !== 'all' && (
              <Badge variant="secondary" className="text-xs">
                Speed: {speedFilter}
              </Badge>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {selectedCategory === 'all' ? 'All Loaders' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Loaders`}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Showing {filteredAndSortedLoaders.length} loaders
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* No Results */}
        {filteredAndSortedLoaders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No loaders found
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={resetFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Loader Grid */}
        {filteredAndSortedLoaders.length > 0 && (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {paginatedLoaders.map((loader) => (
              <LoaderCard
                key={loader.id}
                loader={loader}
                viewMode={viewMode as 'grid' | 'list'}
              />
            ))}
          </div>
        )}

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
              {[...Array(Math.min(7, totalPages))].map((_, i) => {
                let page;
                if (totalPages <= 7) {
                  page = i + 1;
                } else if (currentPage <= 4) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + i;
                } else {
                  page = currentPage - 3 + i;
                }

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

        {/* Load More for Mobile */}
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
