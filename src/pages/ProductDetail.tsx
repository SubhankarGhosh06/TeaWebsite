import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { trackAddToCart, trackNavigation } from '../utils/tracking';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: 'Organic Green Tea',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      description: 'Premium organic green tea with a delicate flavor profile. Sourced from high-altitude gardens in China, this tea offers a perfect balance of freshness and complexity.',
      details: [
        'Origin: Fujian Province, China',
        'Caffeine Level: Medium',
        'Brewing Time: 2-3 minutes',
        'Water Temperature: 175°F (80°C)',
        'Organic Certified',
        'Fair Trade'
      ]
    },
    {
      id: 2,
      name: 'Herbal Wellness Blend',
      price: 32.99,
      image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      description: 'A soothing blend of herbs for relaxation and wellness. This caffeine-free blend combines chamomile, lavender, and lemon balm for the perfect evening tea.',
      details: [
        'Caffeine Free',
        'Ingredients: Chamomile, Lavender, Lemon Balm',
        'Brewing Time: 5-7 minutes',
        'Water Temperature: 212°F (100°C)',
        'Perfect for evening',
        'Naturally calming'
      ]
    },
    {
      id: 3,
      name: 'Mountain Fresh Leaves',
      price: 28.99,
      image: 'https://images.pexels.com/photos/1638281/pexels-photo-1638281.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      description: 'Fresh mountain tea leaves with an invigorating taste. Harvested from pristine mountain slopes, this tea delivers a crisp and refreshing experience.',
      details: [
        'Origin: Himalayan Mountains',
        'Caffeine Level: High',
        'Brewing Time: 3-4 minutes',
        'Water Temperature: 195°F (90°C)',
        'Hand-picked leaves',
        'Single estate'
      ]
    }
  ];

  const product = products.find(p => p.id === parseInt(id || '1'));

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    trackAddToCart(productWithQuantity);
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          onClick={() => trackNavigation('Products', 'back_button')}
          className="inline-flex items-center mb-8 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <span className="ml-2 text-lg text-gray-600">{product.rating} out of 5</span>
            </div>

            <p className="text-3xl font-bold mb-6" style={{ color: 'rgb(67, 112, 87)' }}>
              ${product.price}
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-3 font-medium" style={{ color: 'rgb(47, 82, 73)' }}>
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center py-4 px-6 text-white font-semibold rounded-md transition-colors duration-300 hover:opacity-90 text-lg"
              style={{ backgroundColor: 'rgb(151, 176, 103)' }}
            >
              <ShoppingCart className="mr-2 h-6 w-6" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'rgb(47, 82, 73)' }}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                    {relatedProduct.name}
                  </h3>
                  <p className="text-lg font-bold" style={{ color: 'rgb(67, 112, 87)' }}>
                    ${relatedProduct.price}
                  </p>
                  <Link
                    to={`/products/${relatedProduct.id}`}
                    onClick={() => trackNavigation('Product Detail', 'related_products')}
                    className="mt-3 block text-center py-2 px-4 rounded-md text-white font-medium transition-colors duration-300 hover:opacity-90"
                    style={{ backgroundColor: 'rgb(151, 176, 103)' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;