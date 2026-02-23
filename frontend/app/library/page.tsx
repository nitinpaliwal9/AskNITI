import React from 'react';
import { BookOpen, Search, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Sample data - in a real app, you'd fetch this from your backend
const DOCUMENTS = [
  { id: 1, title: "National Food Security Act (NFSA)", category: "Ration Card", year: "2013/2024", pages: 45, status: "Verified" },
  { id: 2, title: "PDS Operational Guidelines", category: "PDS", year: "2023", pages: 112, status: "Verified" },
  { id: 3, title: "PM-Kisan Samman Nidhi Handbook", category: "Agriculture", year: "2024", pages: 30, status: "Verified" },
  { id: 4, title: "One Nation One Ration Card (ONORC) Gazette", category: "Portability", year: "2022", pages: 12, status: "Verified" },
  { id: 5, title: "Ayushman Bharat Eligibility Criteria", category: "Health", year: "2024", pages: 88, status: "Verified" },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Policy Library
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            AskNITI reads these official documents to give you verified answers. 
            No rumors, just the original Gazette and Policy PDFs.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search indexed policies (e.g. Ration Card, PM-Kisan)..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            All Categories
          </button>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 text-slate-500 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <FileText size={24} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                  <ShieldCheck size={14} /> {doc.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                {doc.title}
              </h3>
              
              <div className="space-y-2 mb-6 text-sm text-slate-500">
                <p>Category: <span className="text-slate-900 font-medium">{doc.category}</span></p>
                <p>Latest Version: <span className="text-slate-900 font-medium">{doc.year}</span></p>
                <p>Reference: <span className="text-slate-900 font-medium">{doc.pages} Pages Indexed</span></p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <Link 
                  href="/chat" 
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Ask about this →
                </Link>
                <button className="text-slate-400 hover:text-slate-600">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-blue-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Can't find a specific policy?</h2>
          <p className="text-blue-100 mb-6">We are indexing 10+ new government gazettes every week.</p>
          <Link 
            href="mailto:support@askniti.in"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
          >
            Request a Document
          </Link>
        </div>
      </main>
    </div>
  );
}