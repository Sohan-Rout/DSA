'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbarinner';
import Footer from '@/app/components/footer';
import Content from '@/app/visualizer/stack/isfull/content';
import CodeBlock from '@/app/visualizer/stack/isfull/codeBlock';
import ExploreOther from '@/app/components/ui/exploreOther';
import PushPop from '@/app/components/ui/PushPop';

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [operation, setOperation] = useState(null);
    const [message, setMessage] = useState('Stack is empty');
    const [isAnimating, setIsAnimating] = useState(false);
    const [stackLimit] = useState(5); // Set stack capacity
    const [isFull, setIsFull] = useState(false);

    // Check if stack is full
    const checkIfFull = () => {
        setIsAnimating(true);
        setOperation('Checking if stack is full...');
        
        setTimeout(() => {
            const fullStatus = stack.length >= stackLimit;
            setIsFull(fullStatus);
            setOperation(null);
            setMessage(fullStatus ? 'Stack is FULL!' : 'Stack is NOT full');
            setIsAnimating(false);
        }, 1000);
    };

    // Reset stack
    const reset = () => {
        setStack([]);
        setMessage('Stack is empty');
        setOperation(null);
        setIsFull(false);
    };

    // Effect to update isFull status when stack changes
    useEffect(() => {
        setIsFull(stack.length >= stackLimit);
    }, [stack, stackLimit]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
            <Navbar />
            <main className="container mx-auto px-6 py-16">
                <h1 className="text-4xl mt-10 md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    <span className="text-blue-600">Stack</span> Visualizer
                </h1>
                <Content />
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
                    Visualize the LIFO (Last In, First Out) principle
                </p>

                <div className="max-w-md mx-auto">
                    {/* Use the PushPop component */}
                    <PushPop 
                        stack={stack}
                        setStack={setStack}
                        isAnimating={isAnimating}
                        setIsAnimating={setIsAnimating}
                        setMessage={setMessage}
                        setOperation={setOperation}
                        stackLimit={stackLimit}
                    />

                    {/* Is Full Check Button */}
                    <button
                        onClick={checkIfFull}
                        disabled={isAnimating}
                        className="w-full mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Check If Full
                    </button>

                    {/* Stack Visualization */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Stack Visualization</h2>
                        
                        {/* Operation Status */}
                        {operation && (
                            <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                {operation}
                            </div>
                        )}

                        {/* Message Display */}
                        {message && (
                            <div className={`mb-4 p-3 rounded-lg ${
                                message.includes('pushed') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                                message.includes('popped') ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
                                message.includes('Peek') ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                                message.includes('FULL') ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}>
                                {message}
                            </div>
                        )}

                        {/* Stack capacity indicator */}
                        <div className="mb-4 text-center text-sm">
                            Capacity: {stack.length}/{stackLimit}
                        </div>

                        {/* Vertical Stack */}
                        <div className="flex flex-col items-center min-h-[300px]">
                            {/* Top indicator */}
                            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                {stack.length > 0 ? '↑ Top' : ''}
                            </div>

                            {/* Stack elements with full state animation */}
                            <div className="w-32 relative">
                                {stack.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        Stack is empty
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {stack.map((item, index) => (
                                            <div 
                                                key={index}
                                                className={`p-3 border-2 rounded text-center font-medium transition-all duration-300 ${
                                                    index === 0 ? 
                                                        'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 
                                                        'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                                } ${
                                                    isAnimating && index === 0 && operation?.includes('Peek') ? 'animate-pulse' : 
                                                    isAnimating && index === 0 ? 'animate-bounce' : ''
                                                } ${
                                                    isFull && isAnimating && operation?.includes('full') ? 'border-red-500 dark:border-red-500 animate-pulse' : ''
                                                }`}
                                            >
                                                {item}
                                                {index === 0 && (
                                                    <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                                        (Top)
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Bottom indicator */}
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {stack.length > 0 ? '↓ Bottom' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <CodeBlock/>
                <ExploreOther
                    title="Explore other operations"
                    links={[
                        { text: "Peek", url: "/visualizer/stack/peek" },
                        { text: "Is Empty", url: "/visualizer/stack/isempty" },
                        { text: "Push Pop", url: "/visualizer/stack/push-pop" },
                    ]}
                />
            </main>
            <div className="bg-gray-700 z-10 h-[1px]"></div>
            <Footer />
        </div>
    );
};

export default StackVisualizer;