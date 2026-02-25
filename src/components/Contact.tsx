import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ContactFormData } from '../types';
import { useNotification } from '../hooks/useNotification';
import { CustomProjectBuilder } from './CustomProjectBuilder';

interface ContactProps {
  onContactSubmit?: (message: Omit<any, 'id' | 'status' | 'createdAt'>) => void;
  onCustomRequestSubmit?: (request: Omit<any, 'id' | 'status' | 'createdAt'>) => void;
}

export const Contact: React.FC<ContactProps> = ({ onContactSubmit, onCustomRequestSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    projectType: 'photography',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate email sending with validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Submit to admin dashboard instead of email
      if (onContactSubmit) {
        onContactSubmit(formData);
      }
      
      showSuccess(
        "Thank you for reaching out! Your message has been sent to our team. We'll get back to you within 24 hours.",
        "Message Sent Successfully!"
      );
      
      setFormData({ name: '', email: '', message: '', projectType: 'photography' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showError(
        errorMessage.includes('fill in') || errorMessage.includes('valid email') 
          ? errorMessage 
          : 'Unable to send your message. Please try again or contact us directly at hello@adverx.com',
        'Message Failed to Send'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCustomRequestSubmit = (request: any) => {
    if (onCustomRequestSubmit) {
      onCustomRequestSubmit(request);
    }
    setShowCustomBuilder(false);
    showSuccess(
      "Your custom project request has been submitted! Our team will review it and send you a detailed quote within 24 hours.",
      "Custom Request Submitted!"
    );
  };

  const handleEmailClick = (email: string) => {
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@adverx.com',
      onClick: () => handleEmailClick('hello@adverx.com'),
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      onClick: () => window.open('tel:+15551234567', '_blank'),
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Los Angeles, CA',
      onClick: () => {},
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Ready to bring your vision to life? Let's discuss your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                >
                  <option value="photography">Photography</option>
                  <option value="videography">Videography</option>
                  <option value="both">Both</option>
                  <option value="training">Training</option>
                  <option value="distribution">Distribution</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none font-inter"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gray-900 text-white font-inter font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map(({ icon: Icon, label, value, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center p-6 bg-white border border-gray-200 hover:border-gray-300 transition-colors hover-lift"
              >
                <Icon className="h-6 w-6 text-gray-900 mr-4" />
                <div>
                  <div className="text-sm text-gray-600 font-inter">{label}</div>
                  <div className="text-lg font-inter font-medium text-gray-900">{value}</div>
                </div>
              </button>
            ))}
            
            {/* Custom Project Builder CTA */}
            <div className="bg-gray-50 p-6 border border-gray-200 rounded">
              <h4 className="text-lg font-playfair font-medium text-gray-900 mb-2">
                Need a Custom Quote?
              </h4>
              <p className="text-gray-600 font-inter text-sm mb-4">
                Use our project builder to get an accurate estimate based on your specific requirements.
              </p>
              <button
                onClick={() => setShowCustomBuilder(true)}
                className="w-full px-6 py-3 bg-gray-900 text-white font-inter font-medium rounded hover:bg-gray-800 transition-colors"
              >
                Build Custom Project
              </button>
            </div>
          </div>
        </div>
        
        {/* Custom Project Builder Modal */}
        {showCustomBuilder && (
          <CustomProjectBuilder
            onSubmit={handleCustomRequestSubmit}
            onClose={() => setShowCustomBuilder(false)}
          />
        )}
      </div>
    </section>
  );
};