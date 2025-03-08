
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { categoryLabels } from '@/lib/types';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl md:text-3xl font-bold text-gaafu-accent">
              gaafu<span className="text-gaafu-highlight">.mv</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Link to="/" className="px-3 py-2 text-gaafu-foreground hover:text-gaafu-accent transition-colors">
              މައި ސަފްހާ
            </Link>
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-gaafu-foreground hover:text-gaafu-accent transition-colors">
                ކެޓަގަރީތައް
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`}
                    className="block px-4 py-2 text-sm hover:bg-gaafu-accent-light text-gaafu-foreground hover:text-gaafu-accent transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/latest" className="px-3 py-2 text-gaafu-foreground hover:text-gaafu-accent transition-colors">
              އެންމެ ފަހުގެ ޚަބަރު
            </Link>
            <Link to="/about" className="px-3 py-2 text-gaafu-foreground hover:text-gaafu-accent transition-colors">
              ގާފުއާއި ބެހޭ
            </Link>
          </nav>
          
          {/* Search Button */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <button 
              className="p-2 rounded-full hover:bg-gaafu-accent-light text-gaafu-foreground hover:text-gaafu-accent transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="p-2 md:hidden rounded-full hover:bg-gaafu-accent-light text-gaafu-foreground hover:text-gaafu-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } pt-20 md:hidden`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-3 py-2 text-lg font-medium border-b border-gaafu-border"
              onClick={() => setIsMenuOpen(false)}
            >
              މައި ސަފްހާ
            </Link>
            <div>
              <h3 className="px-3 py-2 text-lg font-medium border-b border-gaafu-border">ކެޓަގަރީތައް</h3>
              <div className="mr-3 mt-2 space-y-2">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`}
                    className="block px-3 py-1 text-gaafu-foreground hover:text-gaafu-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/latest" 
              className="px-3 py-2 text-lg font-medium border-b border-gaafu-border"
              onClick={() => setIsMenuOpen(false)}
            >
              އެންމެ ފަހުގެ ޚަބަރު
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 text-lg font-medium border-b border-gaafu-border"
              onClick={() => setIsMenuOpen(false)}
            >
              ގާފުއާއި ބެހޭ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
