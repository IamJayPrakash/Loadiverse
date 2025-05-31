
export interface LoaderMetadata {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  tags: string[];
  description: string;
  htmlCode: string;
  cssCode: string;
  jsCode?: string;
  complexity: 'simple' | 'medium' | 'complex';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speed: 'slow' | 'normal' | 'fast';
  colors: string[];
  responsive: boolean;
  browserSupport: string[];
  createdAt: string;
  downloads: number;
  likes: number;
}

export interface LoaderCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  subcategories?: string[];
}
