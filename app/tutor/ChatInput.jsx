"use client";
import { useState, useCallback } from "react";

export default function ChatInput({ message, setMessage, handleSend, loading }) {
  const handleInputChange = useCallback((e) => {
    setMessage(e.target.value);
  }, [setMessage]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="rounded-xl shadow-sm p-2 sm:p-3 dark:bg-gray-800/80 dark:border-gray-700 bg-white/80 border-blue-200/70 border backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <input
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 border-0 focus:ring-2 rounded-xl p-2 sm:p-3 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500/50 bg-blue-50/50 text-blue-900 placeholder-blue-400/60 focus:ring-blue-500/50 text-sm sm:text-base"
          placeholder="Ask about DSA concepts..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:from-blue-700 hover:to-blue-800 dark:bg-gray-600/50 dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-800 dark:shadow-md dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-200 min-w-[40px] sm:min-w-[60px] flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="text-xs mt-2 px-2 text-center dark:text-gray-500 text-blue-500/60">
        Responses may occasionally contain inaccuracies. Always verify
        critical information.
      </div>
    </div>
  );
}