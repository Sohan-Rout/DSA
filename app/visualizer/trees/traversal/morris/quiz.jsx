"use client";
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaArrowRight, FaArrowLeft, FaInfoCircle, FaRedo, FaTrophy, FaStar, FaAward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MorrisQuiz = () => {
  const questions = [
    {
      question: "What is the main advantage of Morris traversal over recursive or queue-based traversals?",
      options: [
        "It visits nodes in a different order",
        "It achieves O(1) extra space by not using a call stack or queue",
        "It's always faster in time complexity",
        "It doesn't need to visit every node"
      ],
      correctAnswer: 1,
      explanation: "Morris traversal trades the O(h) recursion stack (or O(w) queue) for O(1) space by temporarily threading the tree's own null pointers instead."
    },
    {
      question: "What does Morris traversal use to remember 'where to come back to', instead of a stack or queue?",
      options: [
        "A hash map of visited nodes",
        "Temporary threads: a node's in-order predecessor's null right pointer is pointed back at that node",
        "An array storing all node addresses",
        "It doesn't need to remember anything"
      ],
      correctAnswer: 1,
      explanation: "The predecessor's normally-unused right pointer is temporarily repurposed to point back to the node whose left subtree it belongs to."
    },
    {
      question: "What is a node's 'in-order predecessor' in the context of Morris traversal?",
      options: [
        "Its parent node",
        "The rightmost node in its left subtree",
        "The leftmost node in its right subtree",
        "The node visited immediately before it in pre-order"
      ],
      correctAnswer: 1,
      explanation: "Following left once and then right as far as possible lands on the rightmost node of the left subtree, exactly the node that would be visited right before the current one in in-order."
    },
    {
      question: "What happens to the tree's structure after a full Morris traversal completes?",
      options: [
        "It becomes a linked list",
        "All threads are removed and the tree is restored to its exact original structure",
        "The tree is left permanently modified with threads still in place",
        "Half of the nodes are deleted"
      ],
      correctAnswer: 1,
      explanation: "Every thread that gets created is later detected and removed in a subsequent step, so once traversal finishes the tree looks exactly as it did before, with no side effects remaining."
    },
    {
      question: "What is the time complexity of Morris traversal, despite doing extra work to create and remove threads?",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "Each edge is traversed at most twice (once while threading, once while removing the thread), which is still a constant amount of extra work per node, so the total stays O(n)."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showIntro, setShowIntro] = useState(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        setQuizCompleted(true);
        setShowResult(true);
      }, 2000);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(answers[currentQuestion - 1]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setAnswers(Array(questions.length).fill(null));
    setShowIntro(true);
  };

  const calculateWeakAreas = () => {
    const weakAreas = [];
    if (answers[0] !== questions[0].correctAnswer) {
      weakAreas.push("why Morris traversal is used (O(1) space)");
    }
    if (answers[1] !== questions[1].correctAnswer) {
      weakAreas.push("how threading replaces a stack/queue");
    }
    if (answers[2] !== questions[2].correctAnswer) {
      weakAreas.push("finding the in-order predecessor");
    }
    if (answers[3] !== questions[3].correctAnswer) {
      weakAreas.push("that the tree is fully restored afterward");
    }
    if (answers[4] !== questions[4].correctAnswer) {
      weakAreas.push("why the time complexity stays O(n)");
    }

    return weakAreas.length > 0
      ? `Focus on improving: ${weakAreas.join(', ')}. Review the corresponding sections above.`
      : "Perfect! You've mastered Morris traversal!";
  };

  const startQuiz = () => {
    setShowIntro(false);
  };

  const getStarRating = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 5;
    if (percentage >= 70) return 4;
    if (percentage >= 50) return 3;
    if (percentage >= 30) return 2;
    return 1;
  };

  return (
    <section className="max-w-4xl mx-auto shadow-lg rounded-xl bg-white dark:bg-neutral-950 mt-8 mb-8 p-6 border border-gray-200 dark:border-gray-700">
          {showIntro ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 dark:bg-neutral-900 p-4 rounded-full">
                  <FaAward className="text-4xl text-blue-500 dark:text-blue-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-gray-100">
                Morris Traversal Quiz
              </h2>
              <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg mb-6 text-left shadow-inner">
                <h3 className="font-bold mb-2 flex items-center text-blue-600 dark:text-blue-400">
                  <FaInfoCircle className="mr-2" /> How it works:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <FaCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>+1 point for each correct answer</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>0 points for wrong answers</span>
                  </li>
                  <li className="flex items-start">
                    <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>-0.5 point penalty for viewing explanations</span>
                  </li>
                  <li className="flex items-start">
                    <FaTrophy className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Earn stars based on your final score (max 5 stars)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={startQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg flex items-center mx-auto"
              >
                Start Quiz <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          ) : showSuccessAnimation ? (
            <div className="flex flex-col items-center justify-center h-64">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="mb-4"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <FaCheck className="text-4xl text-green-500 animate-bounce" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 border-4 border-green-300 rounded-full"
                  />
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Quiz Completed!
              </motion.p>
            </div>
          ) : !showResult ? (
            <div className="quiz-container">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                    Score: {score.toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6 dark:text-white p-4">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center">
                        <span className={`font-medium mr-3 w-6 h-6 flex items-center justify-center rounded-full ${
                          selectedAnswer === index
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:from-blue-600 hover:to-purple-600 transition-all flex items-center shadow-md hover:shadow-lg"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'} <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="result-container"
            >
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {score.toFixed(1)}/{questions.length}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-2xl mx-1 ${
                          i < getStarRating()
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600 fill-current'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  {score === questions.length ? "Perfect Score!" :
                   score >= questions.length * 0.8 ? "Excellent Work!" :
                   score >= questions.length * 0.6 ? "Good Job!" :
                   score >= questions.length * 0.4 ? "Keep Practicing!" : "Let's Review Again!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You scored {((score / questions.length) * 100).toFixed(0)}% correct
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-6 shadow-inner">
                <h4 className="font-bold mb-3 flex items-center text-blue-600 dark:text-blue-400">
                  <FaInfoCircle className="mr-2" /> Performance Analysis
                </h4>
                <p className="text-sm">{calculateWeakAreas()}</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">Question Breakdown:</h4>
                {questions.map((q, index) => (
                  <div key={index} className="border-b pb-3 border-gray-200 dark:border-gray-700 last:border-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{q.question}</p>
                    <div className={`flex items-start mt-1 ${
                      answers[index] === q.correctAnswer
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {answers[index] === q.correctAnswer ? (
                        <FaCheck className="mt-1 mr-2 flex-shrink-0" />
                      ) : (
                        <FaTimes className="mt-1 mr-2 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">Your answer: {answers[index] !== null ? q.options[answers[index]] : "Not answered"}</p>
                        {answers[index] !== q.correctAnswer && (
                          <p className="text-sm">Correct answer: {q.options[q.correctAnswer]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <FaRedo className="mr-2" /> Take Quiz Again
              </button>
            </motion.div>
          )}
        </section>
  );
};

export default MorrisQuiz;
