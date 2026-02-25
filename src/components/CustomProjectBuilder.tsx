import React, { useState } from 'react';
import { X, Calculator, Camera, Mic, Zap, Plane, Video, CheckCircle } from 'lucide-react';
import { CustomProjectRequest } from '../types';

interface CustomProjectBuilderProps {
  onSubmit: (request: Omit<CustomProjectRequest, 'id' | 'status' | 'createdAt'>) => void;
  onClose: () => void;
}

export const CustomProjectBuilder: React.FC<CustomProjectBuilderProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDuration: 1,
    qualityLevel: 'standard' as const,
    soundEquipment: false,
    stabilizers: false,
    lighting: false,
    drones: false,
    additionalCameras: 0,
    services: [] as string[],
    message: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const serviceOptions = [
    'Video Production',
    'Photography',
    'Live Streaming',
    'Post-Production',
    'Content Distribution',
    'Training & Workshops',
    'Brand Strategy',
    'Event Coverage'
  ];

  const calculateEstimatedPrice = () => {
    let basePrice = 1500; // Base price
    
    // Duration multiplier
    basePrice += formData.projectDuration * 800;
    
    // Quality level
    const qualityMultipliers = {
      standard: 1,
      premium: 1.5,
      cinematic: 2.2
    };
    basePrice *= qualityMultipliers[formData.qualityLevel];
    
    // Equipment costs
    if (formData.soundEquipment) basePrice += 300;
    if (formData.stabilizers) basePrice += 400;
    if (formData.lighting) basePrice += 600;
    if (formData.drones) basePrice += 800;
    basePrice += formData.additionalCameras * 500;
    
    // Service multiplier
    basePrice += formData.services.length * 200;
    
    return Math.round(basePrice);
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      estimatedPrice: calculateEstimatedPrice(),
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-playfair font-light text-gray-900">Custom Project Builder</h2>
            <p className="text-gray-600 font-inter text-sm">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-light text-gray-900 mb-6">Basic Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-inter"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Specifications */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-light text-gray-900 mb-6">Project Specifications</h3>
              
              {/* Project Duration */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-4">
                  Project Duration: {formData.projectDuration} day{formData.projectDuration !== 1 ? 's' : ''}
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={formData.projectDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDuration: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>30 days</span>
                </div>
              </div>

              {/* Quality Level */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-4">
                  Quality Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: 'standard', label: 'Standard', desc: 'Good quality for social media' },
                    { key: 'premium', label: 'Premium', desc: 'High quality for commercial use' },
                    { key: 'cinematic', label: 'Cinematic', desc: 'Ultra-high quality for broadcast' }
                  ].map(({ key, label, desc }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, qualityLevel: key as any }))}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        formData.qualityLevel === key
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-inter font-medium text-gray-900">{label}</div>
                      <div className="text-xs text-gray-600 mt-1">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Cameras */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-4">
                  Additional Cameras: {formData.additionalCameras}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.additionalCameras}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalCameras: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Equipment & Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-light text-gray-900 mb-6">Equipment & Services</h3>
              
              {/* Equipment */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-4">
                  Required Equipment
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'soundEquipment', label: 'Professional Audio', icon: Mic, price: '+$300' },
                    { key: 'stabilizers', label: 'Camera Stabilizers', icon: Video, price: '+$400' },
                    { key: 'lighting', label: 'Professional Lighting', icon: Zap, price: '+$600' },
                    { key: 'drones', label: 'Drone Footage', icon: Plane, price: '+$800' }
                  ].map(({ key, label, icon: Icon, price }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className={`p-4 border rounded-lg text-left transition-colors flex items-center gap-3 ${
                        formData[key as keyof typeof formData]
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div className="flex-1">
                        <div className="font-inter font-medium text-gray-900">{label}</div>
                        <div className="text-xs text-gray-600">{price}</div>
                      </div>
                      {formData[key as keyof typeof formData] && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-4">
                  Services Required
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`p-3 border rounded-lg text-left transition-colors flex items-center justify-between ${
                        formData.services.includes(service)
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-inter text-gray-900">{service}</span>
                      {formData.services.includes(service) && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-light text-gray-900 mb-6">Project Details</h3>
              
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none font-inter"
                  placeholder="Tell us more about your project vision, timeline, and any specific requirements..."
                />
              </div>

              {/* Price Estimate */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-6 w-6 text-gray-600" />
                  <h4 className="text-lg font-playfair font-light text-gray-900">Estimated Price</h4>
                </div>
                <div className="text-3xl font-playfair font-light text-gray-900 mb-2">
                  ${calculateEstimatedPrice().toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 font-inter">
                  This is a preliminary estimate. Final pricing will be provided after consultation.
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
          >
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 font-inter"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 font-inter"
            >
              Submit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};