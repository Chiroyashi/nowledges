import React from 'react';
import { Head } from '@inertiajs/react'; // Use if using Laravel Inertia

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-poppins">
            {/* 1. Cloudy Blue Radial Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[#BBDEFB]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0)_75%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-200/50"></div>
            </div>

            {/* Laravel Inertia Head for SEO */}
            <Head title="Nowledge - Knowledge Access" />

            {/* 3. Main Content Area */}
            <main className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-700">
                {/* Sub-header */}
                <span className="text-4xl p-6 pt-2 font-bold bg-gradient-to-l from-[#000814] via-blue-700 to-blue-500 bg-clip-text text-transparent">
                    Nowledge
                </span>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
                    Access Knowledge <br />
                    Without Journal <br />
                    Predator Bias.
                </h1>

                {/* Description */}
                <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
                    Nowledge curates millions of indexed scientific literatures (Scopus, Sinta, WoS)
                    to deliver AI-generated answers that are academically accountable.
                </p>

                {/* Call to Action Button */}
                <button 
                    onClick={() => window.location.href = '/login'}
                    className="group relative px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95"
                >
                    <span className="relative z-10">Start</span>
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
            </main>

            {/* 4. Footer Decor (Optional)
            <footer className="absolute bottom-8 text-slate-400 text-xs z-10">
                © 2026 Nowledge. Yupito Project.
            </footer> */}
        </div>
    );
}
