import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { trackFormStart, trackFormSubmit } from '../utils/tracking';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Track form start on first interaction
    if (!hasStartedForm && value.length > 0) {
      trackFormStart('contact_form');
      setHasStartedForm(true);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit('contact_form', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setHasStartedForm(false);
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or want to learn more about tea? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-4 mt-1" style={{ color: 'rgb(67, 112, 87)' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'rgb(47, 82, 73)' }}>Address</h3>
                  <p className="text-gray-600">
                    123 Tea Street<br />
                    Brew City, BC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-4 mt-1" style={{ color: 'rgb(67, 112, 87)' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'rgb(47, 82, 73)' }}>Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM PST</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-4 mt-1" style={{ color: 'rgb(67, 112, 87)' }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'rgb(47, 82, 73)' }}>Email</h3>
                  <p className="text-gray-600">hello@teavault.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: 'rgb(227, 222, 97)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgb(47, 82, 73)' }}>
                Business Hours
              </h3>
              <div className="space-y-2 text-sm" style={{ color: 'rgb(67, 112, 87)' }}>
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: 'rgb(47, 82, 73)' }}>
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors"
                  style={{ '--tw-ring-color': 'rgb(151, 176, 103)' } as React.CSSProperties}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors"
                  style={{ '--tw-ring-color': 'rgb(151, 176, 103)' } as React.CSSProperties}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors"
                  style={{ '--tw-ring-color': 'rgb(151, 176, 103)' } as React.CSSProperties}
                >
                  <option value="">Select a subject</option>
                  <option value="product_inquiry">Product Inquiry</option>
                  <option value="order_support">Order Support</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'rgb(47, 82, 73)' }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-colors resize-vertical"
                  style={{ '--tw-ring-color': 'rgb(151, 176, 103)' } as React.CSSProperties}
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 px-6 text-white font-semibold rounded-md transition-colors duration-300 hover:opacity-90 text-lg"
                style={{ backgroundColor: 'rgb(151, 176, 103)' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'rgb(47, 82, 73)' }}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                How do I brew the perfect cup of tea?
              </h3>
              <p className="text-gray-600 mb-4">
                Each tea has specific brewing instructions. Check the product details for water temperature, 
                steeping time, and tea-to-water ratio. Generally, use 1 teaspoon per cup and follow the 
                recommended brewing time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                Do you offer wholesale pricing?
              </h3>
              <p className="text-gray-600 mb-4">
                Yes! We offer wholesale pricing for cafes, restaurants, and retailers. Contact us with 
                "Wholesale Inquiry" as the subject for more information about our wholesale program.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                What is your return policy?
              </h3>
              <p className="text-gray-600 mb-4">
                We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your 
                purchase, contact us for a full refund or exchange.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(47, 82, 73)' }}>
                How should I store my tea?
              </h3>
              <p className="text-gray-600 mb-4">
                Store tea in a cool, dry place away from light, air, and strong odors. Use airtight 
                containers and avoid storing in the refrigerator or freezer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;