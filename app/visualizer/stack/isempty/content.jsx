const content = () => {
    return (
      <main>
        <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is the isEmpty Operation in Stack?
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              The <span className="dark:text-amber-500 text-red-600">isEmpty</span> operation checks whether a stack contains any elements or not. It's a fundamental operation that helps prevent errors when trying to perform operations like <span className="dark:text-amber-500 text-red-600">pop()</span> or <span className="dark:text-amber-500 text-red-600">peek()</span> on an empty stack.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work?
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider a stack represented as an array: 
              <span className="dark:text-amber-500 text-red-600">[]</span> (empty) or 
              <span className="dark:text-amber-500 text-red-600">[5, 3, 8]</span> (with elements).
              <br />
              <ol className="list-decimal ml-8 pl-3">
                <li>
                  For an empty stack <span className="dark:text-amber-500 text-red-600">[]</span>, 
                  <span className="dark:text-amber-500 text-red-600">isEmpty()</span> returns 
                  <span className="dark:text-amber-500 text-red-600">true</span>
                </li>
                <li>
                  For a non-empty stack <span className="dark:text-amber-500 text-red-600">[5, 3, 8]</span>, 
                  <span className="dark:text-amber-500 text-red-600">isEmpty()</span> returns 
                  <span className="dark:text-amber-500 text-red-600">false</span>
                </li>
              </ol>
              <br />
              The operation simply checks if the stack's size/length is zero.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Implementation
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Check the current size/length of the stack</li>
                <li>
                  Return the result:
                  <ul className="list-disc ml-6">
                    <li><span className="dark:text-amber-500 text-red-600">true</span> if size equals 0</li>
                    <li><span className="dark:text-amber-500 text-red-600">false</span> otherwise</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-8 pl-2">
                <li>
                  <span className="dark:text-amber-500 text-red-600">O(1)</span> constant time complexity
                </li>
                <li>
                  The operation only needs to check one value (size/length) regardless of stack size
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Practical Usage
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>Prevent stack underflow errors before pop() operations</li>
                <li>Check if there are elements to process</li>
                <li>Validate stack state in algorithms</li>
                <li>Terminate processing loops when stack becomes empty</li>
              </ol>
              <br />
              <p>
                Example: Before popping an element, always check:
                <br />
                <span className="dark:text-amber-500 text-red-600">if (!stack.isEmpty()) element = stack.pop();</span>
              </p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              The isEmpty operation is a simple but crucial part of stack implementation, ensuring safe stack manipulation and preventing runtime errors.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;