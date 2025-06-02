import { Shield, TrendingUp, Diamond } from "lucide-react";

const FEATURE_BADGES = [
  { icon: Shield, text: "Certified Authentic" },
  { icon: TrendingUp, text: "Investment Grade" },
  { icon: Diamond, text: "99.9% Pure" },
];

export const HeroSection = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 border border-yellow-400/20 rounded-3xl py-16 px-8 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            GOLDADY COLLECTION
          </h1>
          <p className="text-xl text-yellow-400/80 mb-8 italic">
            Premium Investment-Grade Precious Metals
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {FEATURE_BADGES.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 hover:bg-yellow-400/20 hover:-translate-y-1 transition-all duration-300"
              >
                <item.icon className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
