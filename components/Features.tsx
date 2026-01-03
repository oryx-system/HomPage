
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="glass-card p-12 rounded-[48px] flex flex-col group">
            <div className="mb-10 p-5 bg-slate-900 rounded-3xl w-fit group-hover:bg-blue-600 transition-colors shadow-2xl">
              <div className="text-white">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-black mb-6 text-slate-900 tracking-tight">{feature.title}</h3>
            <p className="text-slate-500 text-md leading-relaxed font-medium mb-12 flex-1">
              {feature.description}
            </p>
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Compliant Module</span>
               <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
