import React from 'react';
import { ExternalLink, Instagram, Linkedin } from 'lucide-react';
import { trackOutboundClick } from '../utils/tracking';

const About = () => {
  const handleSocialClick = (platform: string, url: string) => {
    trackOutboundClick(platform, url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
            About TeaVault
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the story behind our passion for premium tea and our commitment to quality, 
            sustainability, and the art of tea brewing.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
              Our Story
            </h2>
            <p className="text-lg mb-6" style={{ color: 'rgb(67, 112, 87)' }}>
              Founded in 2003, TeaVault began as a small family business with a simple mission: 
              to bring the finest teas from around the world directly to tea lovers everywhere. 
              What started in a small storefront has grown into a trusted source for premium, 
              ethically-sourced teas.
            </p>
            <p className="text-lg mb-6" style={{ color: 'rgb(67, 112, 87)' }}>
              We work directly with tea gardens and cooperatives in China, India, Sri Lanka, 
              and other tea-growing regions to ensure fair trade practices and the highest 
              quality standards. Every cup tells a story of tradition, craftsmanship, and 
              sustainable farming.
            </p>
            <p className="text-lg mb-8" style={{ color: 'rgb(67, 112, 87)' }}>
              Our commitment to sustainability extends beyond sourcing. We use eco-friendly 
              packaging, support reforestation projects, and contribute to education programs 
              in tea-growing communities.
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Tea plantation"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16" style={{ backgroundColor: 'rgb(227, 222, 97)' }}>
          <div className="p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'rgb(47, 82, 73)' }}>
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
                  Quality First
                </h3>
                <p style={{ color: 'rgb(67, 112, 87)' }}>
                  We source only the finest teas, carefully selected and tested to meet our 
                  rigorous quality standards.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
                  Ethical Sourcing
                </h3>
                <p style={{ color: 'rgb(67, 112, 87)' }}>
                  Fair trade practices ensure that tea farmers receive fair compensation for 
                  their exceptional work.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
                  Sustainability
                </h3>
                <p style={{ color: 'rgb(67, 112, 87)' }}>
                  Environmental responsibility guides every decision we make, from sourcing 
                  to packaging.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'rgb(47, 82, 73)' }}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sarah Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                Sarah Chen
              </h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm" style={{ color: 'rgb(67, 112, 87)' }}>
                Tea enthusiast with 25+ years of experience in sourcing and blending.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Michael Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                Michael Rodriguez
              </h3>
              <p className="text-gray-600 mb-2">Head of Sourcing</p>
              <p className="text-sm" style={{ color: 'rgb(67, 112, 87)' }}>
                Travels the world to build relationships with tea gardens and cooperatives.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Emma Thompson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                Emma Thompson
              </h3>
              <p className="text-gray-600 mb-2">Master Tea Blender</p>
              <p className="text-sm" style={{ color: 'rgb(67, 112, 87)' }}>
                Creates our signature blends with precision and artistry.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
            Connect With Us
          </h2>
          <p className="text-gray-600 mb-8">
            Follow our journey and stay updated with the latest tea trends and stories.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com/company/teavault')}
              className="flex items-center px-6 py-3 rounded-md transition-colors duration-300 hover:opacity-80"
              style={{ backgroundColor: 'rgb(47, 82, 73)', color: 'white' }}
            >
              <Linkedin className="mr-2 h-5 w-5" />
              <span>LinkedIn</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => handleSocialClick('Instagram', 'https://instagram.com/teavault')}
              className="flex items-center px-6 py-3 rounded-md transition-colors duration-300 hover:opacity-80"
              style={{ backgroundColor: 'rgb(67, 112, 87)', color: 'white' }}
            >
              <Instagram className="mr-2 h-5 w-5" />
              <span>Instagram</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;