// resources/js/Pages/auth/login.jsx
import React from 'react';
import { Head, Link, router } from '@inertiajs/react'; // Import router

export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Langsung arahkan ke /chat tanpa proses POST ke server
        router.visit('/chat');
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-poppins px-6">
            <Head title="Sign In - Nowledge" />

            {/* Background Radial "Biru Berawan" sesuai identitas Nowledge AI */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[#BBDEFB]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0)_75%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-200/50"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl animate-in fade-in duration-700">
                <Link 
                    href="/" 
                    className="absolute -bottom-16 left-0 px-8 py-2.5 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl text-slate-600 text-sm font-semibold hover:bg-white transition-all shadow-sm"
                >
                    Back
                </Link>

                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row p-12 md:p-16 gap-12 md:gap-20">
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-l from-[#000814] via-blue-700 to-blue-500 bg-clip-text text-transparent mb-6">
                            Nowledge AI
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Gunakan akun akademik Anda untuk mendapatkan fitur verifikasi sumber yang lebih mendalam.
                        </p>
                    </div>

                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Login with Email Institution (.edu / .ac.id)"
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm font-medium font-poppins"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="At least 8 Characters"
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm font-medium font-poppins"
                                    required
                                />
                                <div className="flex justify-end mt-2">
                                    <Link href="/forgot-password" intrinsic className="text-blue-600 text-xs font-bold hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Don't you have an Account? {' '}
                            <Link href="/register" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}