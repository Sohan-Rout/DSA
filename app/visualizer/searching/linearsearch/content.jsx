"use client";
import ComplexityGraph from "@/app/components/ui/graph";

const content = () => {
  const paragraphs = [
    `Linear Search is a simple method to find a particular value in a list. It checks each element one by one from the start until it finds the target value. If the value is found, it returns its position; otherwise, it says the value is not present.`,
    `Imagine you have a list of numbers: [5, 3, 8, 1, 9] and you want to find the number 8.`,
    `If the number is not in the list (e.g., searching for 10), the search ends without success.`,
    `Linear Search is easy to understand but can be slow for large lists compared to faster methods like Binary Search.`,
  ];

  const working = [
    { points : "Start from the first number (5). Is 5 equal to 8? No." },
    { points : "Move to the next number (3). Is 3 equal to 8? No." },
    { points : "Move to the next number (8). Is 8 equal to 8? Yes! Stop here. The position is 2 (or 3 if counting starts from 1)." },
  ];

  const complexity = [
    { data : "Best Case: Target is the first element → O(1)" },
    { data : "Worst Case: Target is last or not present → O(n) (checks all elements)" },
  ];

  const algorithm = [
    { points : "Start from the first element." },
    { points : "Compare the current element with the target value.",
      subpoints : [
        "If they match, return the position.",
        "If not, move to the next element.",
      ],
     },
    { points : "Repeat until the end of the list." },
    { points : 'If the element is not found, return "Not Found".' },
  ];

  return (
    <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Linear Search */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Linear Search?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraphs[0]}
        </p>
      </div>
    </section>

    {/* How Does It Work */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {paragraphs[1]}
        </p>
        
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {working.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          {paragraphs[2]}
        </p>
      </div>
    </section>

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {algorithm.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
              {item.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {item.subpoints.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Time Complexity */}
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {complexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {item.data.split(':')[0]}:
              </span>
              <span className="ml-2">{item.data.split(':')[1]}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <ComplexityGraph
            bestCase={(n) => 1}
            averageCase={(n) => n}
            worstCase={(n) => n}
            maxN={25}
          />
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraphs[3]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
  );
};

export default content;
