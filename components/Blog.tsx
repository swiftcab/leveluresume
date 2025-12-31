
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4">
        <button 
          onClick={() => setSelectedPost(null)}
          className="text-zinc-500 hover:text-white mb-8 flex items-center gap-2"
        >
          ← Back to Articles
        </button>
        <article className="prose prose-invert lg:prose-xl">
          <header className="mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">{selectedPost.category}</span>
            <h1 className="text-5xl font-bold mt-4 mb-6 leading-tight">{selectedPost.title}</h1>
            <div className="text-zinc-400 text-sm italic">{selectedPost.date}</div>
          </header>
          <div className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
            {selectedPost.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">The Modern Career Playbook</h2>
        <p className="text-zinc-400">Deep dives into ageism, technology, and branding for the experienced professional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post) => (
          <div 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer bg-zinc-950 border border-zinc-900 rounded-2xl p-8 hover:border-zinc-700 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-800">
                {post.category}
              </span>
              <span className="text-zinc-600 text-xs">{post.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{post.title}</h3>
            <p className="text-zinc-500 text-sm line-clamp-3 mb-6">{post.excerpt}</p>
            <span className="text-sm font-semibold border-b border-transparent group-hover:border-white transition-all pb-1">Read Article</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
