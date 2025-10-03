import React, { useState } from 'react';
import { FaCheck, FaTimes, FaArrowRight, FaArrowLeft, FaInfoCircle, FaRedo, FaTrophy, FaStar, FaAward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const QueueQuiz = () => {
const questions = [
    {
        question: "What is the fundamental difference between a priority queue and a standard queue?",
        options: [
            "Priority queues use LIFO ordering",
            "Elements are processed based on priority rather than insertion order",
            "Priority queues can only store numeric values",
            "Standard queues are always faster"
        ],
        correctAnswer: 1,
        explanation: "Priority queues process elements by their priority value rather than following strict FIFO order like standard queues."
    },
    {
        question: "Which operation in a max-priority queue returns the highest priority element without removing it?",
        options: [
            "extractMax()",
            "insert()",
            "peek()",
            "remove()"
        ],
        correctAnswer: 2,
        explanation: "peek() allows viewing the highest priority element while leaving it in the queue."
    },
    {
        question: "What is the time complexity of insert() and extractMax() operations in a binary heap implementation?",
        options: [
            "O(1) for both",
            "O(log n) for both",
            "O(n) for insert, O(1) for extractMax",
            "O(1) for insert, O(n) for extractMax"
        ],
        correctAnswer: 1,
        explanation: "Binary heap implementations provide O(log n) time for both insertion and extraction operations."
    },
    {
        question: "Which data structure is MOST commonly used to implement a priority queue?",
        options: [
            "Linked List",
            "Hash Table",
            "Binary Heap",
            "Graph"
        ],
        correctAnswer: 2,
        explanation: "Binary heaps are the most common implementation due to their balance of efficiency and simplicity."
    },
    {
        question: "In Dijkstra's algorithm, why is a priority queue used?",
        options: [
            "To store visited nodes in FIFO order",
            "To always process the node with the current shortest path estimate",
            "To sort all nodes alphabetically",
            "To implement depth-first search"
        ],
        correctAnswer: 1,
        explanation: "The priority queue ensures the node with the smallest current distance estimate is processed next, which is crucial for Dijkstra's algorithm."
    },
    {
        question: "What would be the state of a max-priority queue after these operations: insert(A,3), insert(B,5), insert(C,1), extractMax()?",
        options: [
            "[A:3, C:1]",
            "[B:5, A:3, C:1]",
            "[A:3, B:5]",
            "[C:1, A:3]"
        ],
        correctAnswer: 0,
        explanation: "Insertions would store [B:5, A:3, C:1], then extractMax() removes B:5, leaving [A:3, C:1]."
    },
    {
        question: "Which of these is NOT a typical application of priority queues?",
        options: [
            "Operating system process scheduling",
            "Undo functionality in text editors",
            "Huffman coding compression",
            "A* pathfinding algorithm"
        ],
        correctAnswer: 1,
        explanation: "Undo functionality typically uses a stack (LIFO) rather than a priority queue."
    },
    {
        question: "What is the key characteristic of a min-priority queue versus a max-priority queue?",
        options: [
            "It processes elements alphabetically",
            "It always returns the element with the smallest priority value",
            "It uses FIFO ordering for equal priorities",
            "It can only store integer priorities"
        ],
        correctAnswer: 1,
        explanation: "A min-priority queue processes elements in ascending priority order, opposite of a max-priority queue."
    },
    {
        question: "What happens when you insert elements with equal priorities into a priority queue?",
        options: [
            "They are processed in FIFO order",
            "They are processed in LIFO order",
            "The order is implementation-defined",
            "An error occurs"
        ],
        correctAnswer: 2,
        explanation: "Priority queues typically make no guarantees about the order of processing for equal-priority elements."
    },
    {
        question: "Which operation would you use to change an existing element's priority in the queue?",
        options: [
            "updatePriority() or changePriority()",
            "extractMin()",
            "peek()",
            "isEmpty()"
        ],
        correctAnswer: 0,
        explanation: "Many priority queue implementations provide an updatePriority() or changePriority() method for this purpose."
    },
    {
        question: "What is the space complexity of a priority queue implemented with a binary heap?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],
        correctAnswer: 2,
        explanation: "Like most dynamic data structures, a heap-based priority queue requires O(n) space to store n elements."
    },
    {
        question: "Which priority queue variation allows efficient retrieval of both minimum and maximum priority elements?",
        options: [
            "Indexed priority queue",
            "Double-ended priority queue",
            "Bounded priority queue",
            "Stable priority queue"
        ],
        correctAnswer: 1,
        explanation: "Double-ended priority queues support efficient extraction from both ends of the priority spectrum."
    }
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [penaltyApplied, setPenaltyApplied] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    if (showExplanation && !penaltyApplied) {
      setScore(prevScore => Math.max(0, prevScore - 0.5));
      setPenaltyApplied(true);
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setShowExplanation(false);
    setPenaltyApplied(false);
    
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
    setShowExplanation(false);
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
    setShowExplanation(false);
    setShowIntro(true);
    setPenaltyApplied(false);
  };

  const calculateWeakAreas = () => {
    const weakAreas = [];
    if (answers[0] !== questions[0].correctAnswer) {
      weakAreas.push("understanding the basic principle of Selection Sort");
    }
    if (answers[1] !== questions[1].correctAnswer) {
      weakAreas.push("time complexity analysis");
    }
    if (answers[2] !== questions[2].correctAnswer) {
      weakAreas.push("counting swaps in Selection Sort");
    }
    if (answers[3] !== questions[3].correctAnswer) {
      weakAreas.push("comparison with other simple sorts");
    }
    if (answers[4] !== questions[4].correctAnswer) {
      weakAreas.push("space complexity");
    }
    if (answers[5] !== questions[5].correctAnswer) {
      weakAreas.push("stability characteristics");
    }
    if (answers[6] !== questions[6].correctAnswer) {
      weakAreas.push("practical applications");
    }
    
    return weakAreas.length > 0 
      ? `Focus on improving: ${weakAreas.join(', ')}. Review the corresponding sections above.`
      : "Perfect! You've mastered all Selection Sort concepts!";
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
    <section className="max-w-2xl mx-auto shadow-lg rounded-xl bg-white dark:bg-gray-800 mt-8 mb-8 p-6 border border-gray-200 dark:border-gray-700">
      {showIntro ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
              <FaAward className="text-4xl text-blue-500 dark:text-blue-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-gray-100">
            Queue Quiz Challenge
          </h2>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-6 text-left shadow-inner">
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
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
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
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
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
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center">
                    <span
                      className={`font-medium mr-3 w-6 h-6 flex items-center justify-center rounded-full ${
                        selectedAnswer === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className="mb-6">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-sm flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-2"
                >
                  <FaInfoCircle className="mr-1" />
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </button>
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm overflow-hidden"
                    >
                      {questions[currentQuestion].explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
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
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}{" "}
              <FaArrowRight className="ml-2" />
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
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600 fill-current"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 dark:text-white">
              {score === questions.length
                ? "Perfect Score!"
                : score >= questions.length * 0.8
                ? "Excellent Work!"
                : score >= questions.length * 0.6
                ? "Good Job!"
                : score >= questions.length * 0.4
                ? "Keep Practicing!"
                : "Let's Review Again!"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You scored {((score / questions.length) * 100).toFixed(0)}%
              correct
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-6 shadow-inner">
            <h4 className="font-bold mb-3 flex items-center text-blue-600 dark:text-blue-400">
              <FaInfoCircle className="mr-2" /> Performance Analysis
            </h4>
            <p className="text-sm">{calculateWeakAreas()}</p>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-bold text-gray-700 dark:text-gray-300">
              Question Breakdown:
            </h4>
            {questions.map((q, index) => (
              <div
                key={index}
                className="border-b pb-3 border-gray-200 dark:border-gray-700 last:border-0"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {q.question}
                </p>
                <div
                  className={`flex items-start mt-1 ${
                    answers[index] === q.correctAnswer
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {answers[index] === q.correctAnswer ? (
                    <FaCheck className="mt-1 mr-2 flex-shrink-0" />
                  ) : (
                    <FaTimes className="mt-1 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">
                      Your answer:{" "}
                      {answers[index] !== null
                        ? q.options[answers[index]]
                        : "Not answered"}
                    </p>
                    {answers[index] !== q.correctAnswer && (
                      <p className="text-sm">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
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

export default QueueQuiz;