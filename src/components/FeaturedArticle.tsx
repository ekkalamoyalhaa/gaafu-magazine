
import { Link } from 'react-router-dom';
import { Article, categoryColors, categoryLabels } from '@/lib/types';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const { id, title, excerpt, coverImage, category } = article;

  return (
    <div className="relative h-[65vh] min-h-[450px] max-h-[600px] overflow-hidden rounded-2xl shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        {/* Gradient overlay removed as requested */}
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end justify-center p-6 md:p-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div 
              className={`inline-block mb-5 ${categoryColors[category]} 
                py-1.5 px-4 rounded-full text-sm font-medium shadow-sm`}
            >
              {categoryLabels[category]}
            </div>
            
            <Link to={`/article/${id}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gaafu-background mb-5 hover:text-gaafu-lime transition-colors font-dhivehi">
                {title}
              </h1>
            </Link>
            
            <p className="text-gaafu-background/90 text-lg md:text-xl mb-6 line-clamp-2">
              {excerpt}
            </p>
            
            <Link 
              to={`/article/${id}`}
              className="inline-block py-3 px-7 bg-gaafu-lime text-gaafu-teal rounded-full font-medium hover:bg-gaafu-background transition-colors shadow-md hover:shadow-lg"
            >
              އިތުރަށް ކިޔާ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
