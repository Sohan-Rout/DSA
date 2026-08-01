"use client";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `The simplest way to build a queue is to back it with an array and track a front index and a rear index. As long as those two indices are updated correctly on every enqueue and dequeue, the array behaves like a proper FIFO queue.`,
    `The catch with a plain array is wasted space at the front once you've dequeued a few elements — the circular-array trick fixes that by letting the rear index wrap back around to index 0 once it hits the end.`,
    `Queues are widely used in scenarios like printer job scheduling, call center systems, and network packet handling where order preservation is crucial.`,
  ];

  const implementationSteps = [
    {
      points:
        "Initialize an array of fixed size (for static implementation) or dynamic array",
    },
    {
      points:
        "Initialize two pointers: front (for dequeue) and rear (for enqueue), both set to -1 initially",
    },
    {
      points:
        "Implement boundary checks for overflow (full queue) and underflow (empty queue) conditions",
    },
    {
      points:
        "For circular queue implementation, use modulo arithmetic for pointer updates",
    },
  ];

  const enqueueAlgorithm = [
    {
      points:
        "Check if queue is full (if (rear == capacity - 1) for linear array)",
    },
    { points: "For empty queue, set both front and rear to 0" },
    { points: "For circular queue: rear = (rear + 1) % capacity" },
    { points: "Insert new element at items[rear]" },
    { points: "Increment size counter" },
  ];

  const dequeueAlgorithm = [
    { points: "Check if queue is empty (front == -1)" },
    { points: "Store the front element to return later" },
    { points: "If only one element (front == rear), reset pointers to -1" },
    { points: "For circular queue: front = (front + 1) % capacity" },
    { points: "Decrement size counter" },
    { points: "Return the stored element" },
  ];

  const complexity = [
    {
      points:
        "Enqueue Operation: O(1) - Amortized constant time for dynamic arrays",
    },
    {
      points:
        "Dequeue Operation: O(1) - No shifting needed with pointer approach",
    },
    { points: "Peek Operation: O(1) - Direct access via front pointer" },
    { points: "Space Usage: O(n) - Linear space for storing elements" },
  ];

  const prosCons = [
    {
      points:
        "Pros: Simple implementation, cache-friendly (array elements contiguous in memory)",
    },
    { points: "Pros: Efficient O(1) operations with pointer tracking" },
    { points: "Cons: Fixed size limitation in static array implementation" },
    {
      points:
        "Cons: Wasted space in linear array implementation without circular approach",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 md:gap-4">

      <DailyDSAEmbed mobile={false} theme={theme} />
      <article className="col-span-4 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Queue Array Implementation Overview */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Queue Implementation Using Array
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Implementation Steps
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {implementationSteps.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Enqueue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Enqueue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {enqueueAlgorithm.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Dequeue Algorithm */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Dequeue Algorithm
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {dequeueAlgorithm.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Time Complexity */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Time & Space Complexity
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {complexity.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {item.points.split(":")[0]}:
                  </span>
                  <span className="ml-2">{item.points.split(":")[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          <InContentAd />
        </section>

        {/* Pros and Cons */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Pros and Cons
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {prosCons.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 pl-2"
                >
                  {item.points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Additional Info */}
        <section className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <div className="px-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Practical Considerations
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph[1]}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                {paragraph[2]}
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Mobile iframe at bottom */}
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
};

export default content;
