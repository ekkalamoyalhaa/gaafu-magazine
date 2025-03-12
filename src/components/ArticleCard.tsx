
import { Link } from 'react-router-dom';
import { Article, categoryColors, categoryLabels } from '@/lib/types';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const {
    id,
    title,
    excerpt,
    coverImage,
    author,
    publishedAt,
    category
  } = article;

  return (
    <div 
      className={`group overflow-hidden rounded-xl card-shadow transition-all duration-500 ${
        featured ? 'md:flex animate-fade-in' : 'h-full animate-slide-in'
      }`}
    >
      {/* Image Container */}
      <div 
        className={`relative overflow-hidden ${
          featured ? 'md:w-1/2 aspect-video md:aspect-auto rounded-t-xl md:rounded-r-none md:rounded-l-xl' : 'aspect-video rounded-t-xl'
        }`}
      >
        <Link to={`/article/${id}`}>
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div 
          className={`absolute top-3 right-3 ${categoryColors[category]} 
            category-label opacity-90 backdrop-blur-sm`}
        >
          {categoryLabels[category]}
        </div>
      </div>
      
      {/* Content */}
      <div 
        className={`p-5 md:p-6 bg-gaafu-background ${
          featured ? 'md:w-1/2 flex flex-col justify-center md:rounded-l-none md:rounded-r-xl' : 'rounded-b-xl'
        }`}
      >
        <Link to={`/article/${id}`}>
          <h3 
            className={`font-bold text-gaafu-foreground group-hover:text-gaafu-teal transition-colors ${
              featured ? 'text-xl md:text-2xl mb-3' : 'text-lg mb-2'
            }`}
          >
            {title}
          </h3>
        </Link>
        
        <p className="text-gaafu-foreground/80 mb-4 line-clamp-2">{excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gaafu-foreground/60">
          <span>{author}</span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 ml-1" />
            <span className="mr-1">{publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
