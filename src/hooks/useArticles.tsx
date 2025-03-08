
import { useState, useEffect } from "react";
import { Article, Category, mockArticles } from "@/lib/types";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // In the future, this will fetch from Supabase
        // For now, use mock data with a delay to simulate loading
        setTimeout(() => {
          setArticles(mockArticles);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch articles'));
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}

export function useArticlesByCategory(category: Category) {
  const { articles, isLoading, error } = useArticles();
  const filteredArticles = articles.filter(article => article.category === category);
  
  return { articles: filteredArticles, isLoading, error };
}

export function useArticleById(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In the future, this will fetch from Supabase
        // For now, use mock data with a delay to simulate loading
        setTimeout(() => {
          const foundArticle = mockArticles.find(a => a.id === id) || null;
          setArticle(foundArticle);
          setIsLoading(false);
        }, 300);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch article'));
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, isLoading, error };
}

export function useFeaturedArticle() {
  const { articles, isLoading, error } = useArticles();
  const featuredArticle = articles.find(article => article.isFeatured) || null;
  
  return { article: featuredArticle, isLoading, error };
}
