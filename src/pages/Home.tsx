import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { trackEvent, trackNavigation } from '../utils/tracking';

const Home = () => {
  const handleCTAClick = () => {
    trackEvent('click', {
      event_category: 'cta',
      event_label: 'hero_shop_now',
      button_text: 'Shop Now',
      button_location: 'hero_section'
    });
    trackNavigation('Products', 'cta_button');
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Green Tea',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Herbal Wellness Blend',
      price: 32.99,
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-90"
          style={{
            background: `linear-gradient(135deg, rgb(47, 82, 73) 0%, rgb(67, 112, 87) 50%, rgb(151, 176, 103) 100%)`
          }}
        />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Premium Tea Experience
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the finest collection of organic teas from around the world
          </p>
          <Link
            to="/products"
            onClick={handleCTAClick}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: 'rgb(227, 222, 97)', color: 'rgb(47, 82, 73)' }}
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              A taste of our premium collection
            </p>
            <Link
              to="/products"
              onClick={() => trackNavigation('Products', 'featured_section')}
              className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-md transition-colors duration-300 hover:opacity-90"
              style={{ backgroundColor: 'rgb(67, 112, 87)' }}
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                  <p className="text-2xl font-bold mb-4" style={{ color: 'rgb(67, 112, 87)' }}>
                    ${product.price}
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={() => trackNavigation('Product Detail', 'product_card')}
                    className="w-full block text-center py-3 px-4 rounded-md text-white font-semibold transition-colors duration-300 hover:opacity-90"
                    style={{ backgroundColor: 'rgb(151, 176, 103)' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20" style={{ backgroundColor: 'rgb(227, 222, 97)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
            Why Choose TeaVault?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto" style={{ color: 'rgb(67, 112, 87)' }}>
            For over 20 years, we've been dedicated to bringing you the finest tea experience. 
            We source our teas directly from small farms around the world, ensuring fair trade 
            practices and the highest quality standards.
          </p>
          <Link
            to="/about"
            onClick={() => trackNavigation('About', 'about_preview')}
            className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-md transition-colors duration-300 hover:opacity-90"
            style={{ backgroundColor: 'rgb(47, 82, 73)' }}
          >
            Learn More About Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;