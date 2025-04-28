const content = () => {
  return (
    <main>
      <section className="border border-blue-700 rounded-lg bg-blue-600/25 mt-8 mb-8">
        <div className="mt-4 mb-4 ml-4 mr-4">
          <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
            Peek Operation
          </h1>
          <div className="ml-4 dark:text-gray-300 text-black">
            Returns the <span className="font-semibold">topmost</span> element
            from the stack{" "}
            <span className="dark:text-amber-500 text-red-600">
              without removing it
            </span>
            .
            <br />
            <br />
            <span className="dark:text-amber-500 text-red-600">
              Example:
            </span>{" "}
            Peeking at a stack
            <ol className="list-decimal ml-8 pl-3">
              <li>
                Current stack:{" "}
                <span className="dark:text-amber-500 text-red-600">
                  [7, 3, 5]
                </span>
              </li>
              <li>
                Peek → returns 7:{" "}
                <span className="dark:text-amber-500 text-red-600">
                  [7, 3, 5]
                </span>{" "}
                (stack remains unchanged)
              </li>
              <li>
                After pop:{" "}
                <span className="dark:text-amber-500 text-red-600">[3, 5]</span>
              </li>
              <li>
                Peek → returns 3:{" "}
                <span className="dark:text-amber-500 text-red-600">[3, 5]</span>
              </li>
            </ol>
            <br />
            <ul className="list-disc ml-6">
              <li>
                Time Complexity:{" "}
                <span className="dark:text-amber-500 text-red-600">O(1)</span>
              </li>
              <li>
                Space Complexity:{" "}
                <span className="dark:text-amber-500 text-red-600">O(1)</span>
              </li>
              <li>
                Also known as <span className="italic">top</span> operation in
                some implementations
              </li>
            </ul>
            <br />
            <p>
              The peek operation is useful when you need to inspect the top
              element before deciding whether to pop it or push another element
              onto the stack.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default content;
