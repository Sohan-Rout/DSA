"use client";
import { useState, useEffect } from 'react';

export default function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Check user's preferred color scheme
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(mediaQuery.matches);
        
        const handler = (e) => setDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email.includes('@') || !email.includes('.')) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    message: "Interested in CodePlayground waitlist" // Hidden message for your filtering
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.error || 'Submission failed');
            }
            
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to submit. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center transition-colors duration-300 dark:bg-gradient-to-br dark:from-zinc-950 dark:to-black dark:text-gray-100 bg-gradient-to-br from-blue-50 to-blue-100 text-black">
            <div className="flex flex-col items-center justify-center max-w-4xl px-4">
                <header className="text-center py-12 w-full">
                    <h1 className="text-4xl md:text-4xl font-semibold mb-2 drop-shadow-lg dark:text-white text-black">Code Playground</h1>
                    <p className="text-lg md:text-xl font-medium dark:text-gray-200 text-gray-500">Join our waitlist to get early access</p>
                </header>

                <main className="flex flex-col justify-center items-center max-w-4xl px-4 pb-12">
                    {!submitted ? (
                        <div className="backdrop-blur-sm text-center rounded-2xl p-8 space-y-6 border dark:bg-gray-900/80 dark:border-blue-900 dark:shadow-xl dark:shadow-indigo-900/20 bg-white/90 border-blue-100 shadow-xl">
                            <h2 className="text-xl font-medium dark:text-indigo-200 text-gray-800">Get notified when we launch</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="text-left block mb-2 font-medium dark:text-gray-200 text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-4 py-3 rounded-lg focus:outline-none dark:bg-gray-700 border dark:border-gray-600 dark:focus:border-blue-400 dark:text-white border-blue-200 focus:border-blue-500"/>
                                    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3 font-normal text-white rounded-lg transition flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 } ${isLoading ? 'opacity-80' : ''}`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Joining...
                                        </>
                                    ) : 'Join Waitlist'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="backdrop-blur-sm rounded-2xl p-8 text-center border dark:bg-gray-800/80 dark:border-blue-900 dark:shadow-xl dark:shadow-indigo-900/20 bg-white/90 border-indigo-100 shadow-xl">
                            <div className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 dark:text-green-400 text-green-600">You're on the list!</h2>
                            <p className="mt-4 dark:text-blue-200 text-blue-800">
                                We'll email you at <strong className="font-semibold">{email}</strong> when we launch.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}