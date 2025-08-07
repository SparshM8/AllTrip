"use client";

import { Star, Users, SlidersHorizontal, LifeBuoy } from "lucide-react";
import featuresData from "@/data/features.json";

// Icon mapping for dynamic icon selection
const iconMap: { [key: string]: React.ElementType } = {
  Star,
  Users,
  SlidersHorizontal,
  LifeBuoy,
};

const features = featuresData.map((feature) => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}));

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-20 md:py-28 overflow-hidden bg-white"
      style={{
        backgroundImage: 'url(/why-choose-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-16 rounded-xl p-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-wide">
            WHY CHOOSE US?
          </h2>
          <p className="text-lg md:text-xl text-black-600 mt-4 max-w-2xl mx-auto">
            Experiences you'll cherish forever
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card text-center p-8 rounded-xl shadow-xl transition-shadow duration-300 bg-white/60 backdrop-blur-md border border-white/50"
              >
                <div className="card-icon flex justify-center items-center mb-5">
                  <Icon className="w-16 h-16 text-gray-800" strokeWidth={1.5} />
                </div>
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="card-text text-gray-700 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional overlay for top-level blur */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />
    </section>
  );
}
