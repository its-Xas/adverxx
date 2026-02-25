import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$2,500',
      description: 'Perfect for small projects and startups',
      features: [
        'Half-day shoot',
        'Single location',
        'Basic editing',
        '10 final images/1 minute video',
        'Web resolution delivery',
        '1 round of revisions',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$5,000',
      description: 'Ideal for established businesses',
      features: [
        'Full-day shoot',
        'Multiple locations',
        'Advanced editing & color grading',
        '30 final images/3 minute video',
        'High resolution delivery',
        'Social media optimization',
        '3 rounds of revisions',
        'Content distribution strategy',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete production solutions',
      features: [
        'Multi-day production',
        'Unlimited locations',
        'Premium post-production',
        'Unlimited deliverables',
        '4K/8K resolution options',
        'Multi-platform distribution',
        'Unlimited revisions',
        'Dedicated project manager',
        'Training & workshops included',
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Transparent pricing for every production need. All packages include professional equipment and expert team.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 bg-white border-2 transition-all hover-lift ${
                plan.highlighted
                  ? 'border-gray-900 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gray-900 text-white text-sm font-inter font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-playfair font-medium text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-playfair font-light text-gray-900 mb-2">
                  {plan.price}
                </div>
                <p className="text-gray-600 text-sm font-inter">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-inter text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 font-inter font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                }`}
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 font-inter mb-4">
            All packages can be customized to fit your specific needs.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="text-gray-900 font-inter font-medium underline hover:text-gray-700 transition-colors"
          >
            Contact us for a custom quote
          </button>
        </div>
      </div>
    </section>
  );
};