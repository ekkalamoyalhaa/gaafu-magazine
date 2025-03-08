
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticleById } from '@/hooks/useArticles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, Share2 } from 'lucide-react';
import { categoryColors, categoryLabels } from '@/lib/types';

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const { article, isLoading, error } = useArticleById(id || '');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="w-full h-64 bg-gaafu-muted animate-pulse rounded-lg mb-6"></div>
            <div className="w-3/4 h-10 bg-gaafu-muted animate-pulse rounded mb-4"></div>
            <div className="w-full h-4 bg-gaafu-muted animate-pulse rounded mb-3"></div>
            <div className="w-full h-4 bg-gaafu-muted animate-pulse rounded mb-3"></div>
            <div className="w-2/3 h-4 bg-gaafu-muted animate-pulse rounded mb-6"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold mb-4">އާޓިކަލް ނުފެނުނު</h1>
          <p className="mb-6">އާޓިކަލް ލިބެން ނެތް ނުވަތަ ކުށެއް ދިމާވެއްޖެ</p>
          <Link to="/" className="text-gaafu-accent hover:text-gaafu-highlight">
            މައި ސަފްޙާއަށް ދާންވީތަ؟
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Category Label */}
            <div className="mb-4">
              <Link 
                to={`/category/${article.category}`}
                className={`inline-block ${categoryColors[article.category]} py-1 px-3 rounded text-sm font-medium`}
              >
                {categoryLabels[article.category]}
              </Link>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Article Meta */}
            <div className="flex items-center justify-between text-gaafu-foreground/60 mb-8 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 ml-1" />
                <span className="mr-1">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 ml-1" />
                <span className="mr-1">{article.publishedAt}</span>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full h-auto"
              />
            </div>
            
            {/* Content */}
            <div className="prose prose-lg max-w-none article-content">
              {/* Excerpt as intro paragraph */}
              <p className="font-medium text-xl">{article.excerpt}</p>
              
              {/* Main content - would be rich text from Supabase */}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            
            {/* Share */}
            <div className="mt-12 pt-6 border-t border-gaafu-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">މިމާވާދު ޝެއަރ ކުރާ:</h3>
                <div className="flex space-x-2 space-x-reverse">
                  <button 
                    className="p-2 rounded-full bg-gaafu-muted hover:bg-gaafu-accent hover:text-white transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
