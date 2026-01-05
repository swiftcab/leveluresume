
import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) window.scrollTo(0, 0);
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 animate-soft-fade-up">
        <button 
          onClick={() => setSelectedPost(null)}
          className="text-zinc-500 hover:text-white mb-16 flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
          Back to Case Studies
        </button>
        
        <article className="animate-soft-fade-up">
          <header className="mb-24 text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 border border-indigo-400/30 px-3 py-1 rounded-full">{selectedPost.category}</span>
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{selectedPost.date}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic mb-12 leading-[1.1] text-white">
              {selectedPost.title}
            </h1>
            <p className="text-2xl text-zinc-400 font-light leading-relaxed italic max-w-3xl mx-auto">
              "{selectedPost.excerpt}"
            </p>
          </header>
          
          <div className="blog-content mb-24">
            <div dangerouslySetInnerHTML={{ 
              __html: selectedPost.content
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/### (.*)/g, '<h3>$1</h3>')
                .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            }} />
          </div>

          {/* Single High-Conversion CTA Bridge */}
          <div className="cta-bridge">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 block">Ready for your pivot?</span>
            <h4>Don't let legacy dates define your future.</h4>
            <p>Our 2026 Forensic Audit has helped over 45,000 leaders bypass the algorithm and land tier-1 interviews. Get your results in seconds.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-12 py-5 bg-white text-black text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all shadow-2xl"
            >
              Analyze My Resume Now
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-32 px-6">
      <div className="text-center mb-32 animate-soft-fade-up">
        <h2 className="text-xs font-bold mb-6 tracking-[0.4em] uppercase text-indigo-400">Strategy Hub 2026</h2>
        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">Executive Intelligence <br/>& Market Forensics.</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed text-lg">
          Master the structure of professional perception. We deep dive into ageism, 2026 neural ATS architecture, and high-stakes narrative design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {BLOG_POSTS.map((post, i) => (
          <div 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer bg-zinc-950 border border-zinc-900 rounded-[48px] p-12 hover:border-indigo-500/30 transition-all duration-500 animate-soft-fade-up"
            style={{animationDelay: `${i * 0.1}s`}}
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                {post.category}
              </span>
              <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
            </div>
            <h3 className="text-3xl font-serif italic mb-8 group-hover:text-indigo-300 transition-colors leading-tight">{post.title}</h3>
            <p className="text-zinc-500 text-base leading-relaxed line-clamp-3 mb-12 font-light">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              Read Strategic Report
              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2}/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
