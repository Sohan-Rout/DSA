const Content = () => {
  return (
    <main>
      <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            What is the "Is Full" Operation?
          </h1>
          <p className="ml-4 dark:text-gray-300 text-black">
            The{" "}
            <span className="dark:text-amber-500 text-purple-600 font-medium">
              Is Full
            </span>{" "}
            operation checks whether a stack has reached its maximum capacity.
            This is particularly relevant for{" "}
            <span className="text-purple-600 dark:text-amber-500">
              fixed-size stack implementations
            </span>{" "}
            (arrays) rather than dynamic implementations (linked lists).
          </p>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            How It Works
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Returns{" "}
                <span className="dark:text-amber-500 text-purple-600">true</span>{" "}
                if the stack cannot accept more elements
              </li>
              <li>
                Returns{" "}
                <span className="dark:text-amber-500 text-purple-600">false</span>{" "}
                if the stack can accept more elements
              </li>
              <li>
                For dynamic stacks (no fixed size), this operation typically
                always returns false
              </li>
              <li>
                Often used with <span className="font-medium">Push</span>{" "}
                operations to prevent stack overflow
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Time and Space Complexity
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black space-y-4">
            <p>
              Here’s the time and space complexity analysis for stack
              operations:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <p className="text-purple-600 dark:text-amber-500">Fixed-size Stack:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <span>
                      Time Complexity:
                    </span>{" "}
                    <span className="text-purple-600 dark:text-amber-500">O(1)</span>
                  </li>
                  <li>
                    <span>
                      Space Complexity:
                    </span>{" "}
                    <span className="text-purple-600 dark:text-amber-500">O(1)</span>
                  </li>
                </ul>
              </li>
              <li>
                <p className="text-purple-600 dark:text-amber-500">Dynamic Stack:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <span>
                      Time Complexity:
                    </span>{" "}
                    <span className="text-purple-600 dark:text-amber-500">O(1)</span>
                  </li>
                  <li>
                    <span>
                      Space Complexity:
                    </span>{" "}
                    <span className="text-purple-600 dark:text-amber-500">O(1)</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Practical Example
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <p>Consider a stack with maximum capacity of 3 elements:</p>
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center">
                <div className="w-32">Stack: [ ]</div>
                <div className="ml-4">
                  isFull() →{" "}
                  <span className="dark:text-amber-500 text-purple-600">
                    false
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32">Stack: [5, 3]</div>
                <div className="ml-4">
                  isFull() →{" "}
                  <span className="dark:text-amber-500 text-purple-600">
                    false
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-32">Stack: [7, 3, 5]</div>
                <div className="ml-4">
                  isFull() →{" "}
                  <span className="dark:text-amber-500 text-purple-600">true</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Common Use Cases
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            <ol className="list-disc ml-6 space-y-2">
              <li>Preventing stack overflow in memory-constrained systems</li>
              <li>Implementing bounded buffers or fixed-size caches</li>
              <li>Memory management in embedded systems</li>
              <li>Validating stack capacity before push operations</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 mb-4 ml-4 mr-4">
          <p className="ml-4 dark:text-gray-300 text-black">
            The <span className="font-medium">Is Full</span> operation is
            crucial when working with fixed-size stacks to prevent overflow
            errors. While not needed for dynamically-sized stacks, it's an
            essential safety check in many system-level implementations.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Content;
