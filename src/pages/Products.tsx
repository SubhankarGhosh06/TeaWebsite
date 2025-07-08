import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Star } from 'lucide-react';
import { trackDownloadStart, trackDownloadComplete, trackAddToCart, trackNavigation } from '../utils/tracking';

const Products = () => {
  const [cartItems, setCartItems] = useState(0);

  const handlePDFDownload = () => {
    trackDownloadStart('product-catalog.pdf', 'pdf');
    
    // Simulate download start
    const link = document.createElement('a');
    link.href = '/product-catalog.pdf';
    link.download = 'product-catalog.pdf';
    
    // Track download completion after a short delay
    setTimeout(() => {
      trackDownloadComplete('product-catalog.pdf', 'pdf');
    }, 1000);
    
    link.click();
  };

  const handleAddToCart = (product: any) => {
    trackAddToCart(product);
    setCartItems(prev => prev + 1);
  };

  const products = [
    {
      id: 1,
      name: 'Organic Green Tea',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      description: 'Premium organic green tea with a delicate flavor profile'
    },
    {
      id: 2,
      name: 'Herbal Wellness Blend',
      price: 32.99,
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      description: 'A soothing blend of herbs for relaxation and wellness'
    },
    {
      id: 3,
      name: 'Mountain Fresh Leaves',
      price: 28.99,
      image: 'https://images.pexels.com/photos/1638281/pexels-photo-1638281.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      description: 'Fresh mountain tea leaves with an invigorating taste'
    },
    {
      id: 4,
      name: 'Earl Grey Supreme',
      price: 26.99,
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      description: 'Classic Earl Grey with bergamot and cornflower petals'
    },
    {
      id: 5,
      name: 'Dragon Well Green',
      price: 35.99,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      description: 'Traditional Chinese green tea with a smooth finish'
    },
    {
      id: 6,
      name: 'Chamomile Dreams',
      price: 22.99,
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      description: 'Calming chamomile flowers for a peaceful evening'
    }
  ];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
            Our Premium Tea Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully selected premium teas for the perfect brewing experience
          </p>
          
          {/* PDF Download Button */}
          <button
            onClick={handlePDFDownload}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors duration-300 hover:opacity-90"
            style={{ backgroundColor: 'rgb(67, 112, 87)' }}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Product Catalog (PDF)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center mb-3">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
                <p className="text-2xl font-bold mb-4" style={{ color: 'rgb(67, 112, 87)' }}>
                  ${product.price}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 px-4 rounded-md text-white font-semibold transition-colors duration-300 hover:opacity-90"
                    style={{ backgroundColor: 'rgb(151, 176, 103)' }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${product.id}`}
                    onClick={() => trackNavigation('Product Detail', 'product_list')}
                    className="w-full block text-center py-3 px-4 rounded-md font-semibold transition-colors duration-300 hover:bg-gray-100 border"
                    style={{ color: 'rgb(47, 82, 73)', borderColor: 'rgb(47, 82, 73)' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;