import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { trackPageView, trackNavigation } from '../utils/tracking';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    const getPageName = (path: string) => {
      switch (path) {
        case '/': return 'Home';
        case '/products': return 'Products';
        case '/about': return 'About';
        case '/contact': return 'Contact';
        default: 
          if (path.startsWith('/products/')) return 'Product Detail';
          return 'Unknown';
      }
    };

    const pageName = getPageName(location.pathname);
    trackPageView(pageName, location.pathname);
  }, [location]);

  const handleNavClick = (destination: string) => {
    trackNavigation(destination, 'header_menu');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Videos', path: '/videos' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50" style={{ borderBottom: '3px solid rgb(47, 82, 73)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link 
                  to="/" 
                  onClick={() => handleNavClick('Home')}
                  className="text-2xl font-bold" 
                  style={{ color: 'rgb(47, 82, 73)' }}
                >
                  TeaVault
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item.name)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-opacity-20 ${
                      location.pathname === item.path 
                        ? 'bg-opacity-20' 
                        : ''
                    }`}
                    style={{ 
                      color: location.pathname === item.path ? 'rgb(47, 82, 73)' : 'rgb(67, 112, 87)',
                      backgroundColor: location.pathname === item.path ? 'rgba(47, 82, 73, 0.1)' : 'transparent'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart and User Icons */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-6 w-6" style={{ color: 'rgb(47, 82, 73)' }} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="h-6 w-6" style={{ color: 'rgb(47, 82, 73)' }} />
              </button>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" style={{ color: 'rgb(47, 82, 73)' }} />
                ) : (
                  <Menu className="h-6 w-6" style={{ color: 'rgb(47, 82, 73)' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.name)}
                  className="block px-3 py-2 rounded-md text-base font-medium"
                  style={{ color: 'rgb(47, 82, 73)' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 text-white" style={{ backgroundColor: 'rgb(47, 82, 73)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">TeaVault</h3>
            <p className="text-gray-300 mb-6">Premium tea experience since 2003</p>
            <p className="text-gray-400 text-sm mt-6">
              © 2024 TeaVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;