const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Stack Push & Pop?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Push and Pop are the two fundamental operations in stack data structure.
              Stack follows <span className="dark:text-amber-500 text-red-600">LIFO (Last In First Out)</span> principle - 
              the last element added is the first one to be removed.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Push Operation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Adds an element to the <span className="font-semibold">top</span> of the stack.
              <br /><br />
              <span className="dark:text-amber-500 text-red-600">Example:</span> Pushing elements onto a stack
              <ol className="list-decimal ml-8 pl-3">
                <li>Start with empty stack: <span className="dark:text-amber-500 text-red-600">[ ]</span></li>
                <li>Push 5: <span className="dark:text-amber-500 text-red-600">[5]</span></li>
                <li>Push 3: <span className="dark:text-amber-500 text-red-600">[3, 5]</span></li>
                <li>Push 7: <span className="dark:text-amber-500 text-red-600">[7, 3, 5]</span></li>
              </ol>
              <br />
              <ul className="list-disc ml-6">
                <li>Time Complexity: <span className="dark:text-amber-500 text-red-600">O(1)</span></li>
                <li>Space Complexity: <span className="dark:text-amber-500 text-red-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Pop Operation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Removes and returns the <span className="font-semibold">topmost</span> element from the stack.
              <br /><br />
              <span className="dark:text-amber-500 text-red-600">Example:</span> Popping elements from a stack
              <ol className="list-decimal ml-8 pl-3">
                <li>Current stack: <span className="dark:text-amber-500 text-red-600">[7, 3, 5]</span></li>
                <li>Pop → returns 7: <span className="dark:text-amber-500 text-red-600">[3, 5]</span></li>
                <li>Pop → returns 3: <span className="dark:text-amber-500 text-red-600">[5]</span></li>
                <li>Pop → returns 5: <span className="dark:text-amber-500 text-red-600">[ ]</span></li>
              </ol>
              <br />
              <ul className="list-disc ml-6">
                <li>Time Complexity: <span className="dark:text-amber-500 text-red-600">O(1)</span></li>
                <li>Space Complexity: <span className="dark:text-amber-500 text-red-600">O(1)</span></li>
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Stack Underflow & Overflow
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-6">
                <li>
                  <span className="font-semibold dark:text-amber-500 text-red-600">Stack Underflow:</span> 
                  Trying to pop from an empty stack
                </li>
                <li>
                  <span className="font-semibold dark:text-amber-500 text-red-600">Stack Overflow:</span> 
                  Trying to push to a full stack (in fixed-size implementations)
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Real-world Applications
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-6">
                <li>Function call management in programming languages (call stack)</li>
                <li>Undo/Redo operations in text editors</li>
                <li>Back/Forward navigation in web browsers</li>
                <li>Expression evaluation and syntax parsing</li>
                <li>Memory management</li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Push and Pop operations are fundamental to stack functionality.
              While simple to implement, stacks are powerful data structures used in 
              many algorithms and system designs.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;