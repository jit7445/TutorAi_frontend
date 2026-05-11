import React from 'react';
import AppLogo from '@/components/slidemind_components/ui/AppLogo';
import { Sparkles, Mic2, BrainCircuit } from 'lucide-react';

const features = [
  {
    id: 'feat-upload',
    icon: <Sparkles size={16} />,
    title: 'AI-Powered Summaries',
    desc: 'Get page-by-page and full document summaries in seconds.',
  },
  {
    id: 'feat-tts',
    icon: <Mic2 size={16} />,
    title: 'Text-to-Speech Narration',
    desc: 'Convert any document into a natural audio presentation.',
  },
  {
    id: 'feat-coach',
    icon: <BrainCircuit size={16} />,
    title: 'AI Presentation Coach',
    desc: 'Practice your delivery and get scored feedback instantly.',
  },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden flex-col justify-between p-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f2e] via-[#0d0d22] to-[#090912]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <AppLogo size={40} />
          <span className="text-xl font-semibold text-white tracking-tight">PresentAI</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Turn any document<br />
            into a{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              confident pitch
            </span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
            Upload your files. Get AI summaries, narration, and coaching feedback — all in one place.
          </p>
        </div>

        <div className="space-y-4">
          {features?.map((f) => (
            <div key={f?.id} className="flex items-start gap-4 glass-card p-4 animate-slide-up">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                {f?.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{f?.title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{f?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Social proof */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500']?.map((color, i) => (
              <div
                key={`avatar-${i + 1}`}
                className={`w-7 h-7 rounded-full ${color} border-2 border-[#0f0f2e] flex items-center justify-center text-[10px] font-bold text-white`}
              >
                {['A','B','C','D']?.[i]}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 })?.map((_, i) => (
                <svg key={`star-${i + 1}`} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Trusted by 12,000+ professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
}