"use client";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const PRECEDENCE = { "^": 4, "%": 4, "*": 3, "/": 3, "+": 2, "-": 2 };
const isOperator = (token) => token in PRECEDENCE;

// Run the real conversion so the diagrams can never drift from the steps
// described above them.
const buildTrace = (tokens) => {
  const stack = [];
  const output = [];
  const trace = [];
  const snapshot = (index, action) =>
    trace.push({ index, action, stack: [...stack], output: [...output] });

  tokens.forEach((token, index) => {
    if (token === "(") {
      stack.push(token);
      snapshot(index, "'(' is pushed onto the stack");
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
      snapshot(index, "Pop operators to the output until '(' is found");
    } else if (isOperator(token)) {
      const popped = [];
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        PRECEDENCE[stack[stack.length - 1]] >= PRECEDENCE[token]
      ) {
        popped.push(stack[stack.length - 1]);
        output.push(stack.pop());
      }
      stack.push(token);
      snapshot(
        index,
        popped.length
          ? `Pop ${popped.join(", ")} first, then push '${token}'`
          : `Push '${token}' onto the stack`
      );
    } else {
      output.push(token);
      snapshot(index, `'${token}' is an operand, so it goes straight to the output`);
    }
  });

  while (stack.length) output.push(stack.pop());
  snapshot(-1, "Scan finished — pop everything left on the stack");

  return trace;
};

const TraceStepDiagram = ({ tokens, step, keyPrefix }) => {
  const padX = 8;
  const tokenW = 22;
  const tokenGap = 2;
  const width = 290;

  const exprY = 18;
  const exprH = 22;

  const maxDepth = 3;
  const stackBoxW = 46;
  const stackBoxH = 20;
  const stackX = 8;
  const stackBottom = 150;
  const stackTop = stackBottom - maxDepth * stackBoxH;

  const outX = 84;
  const outY = 66;
  const height = 170;

  const tokenX = (idx) => padX + idx * (tokenW + tokenGap);
  const stackBoxY = (idx) => stackBottom - (idx + 1) * stackBoxH;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="infix to postfix conversion step"
    >
      {/* The expression being scanned, with the current token picked out */}
      {tokens.map((token, idx) => {
        const isCurrent = idx === step.index;
        const isDone = step.index === -1 || idx < step.index;
        return (
          <g key={`${keyPrefix}-tok-${idx}`}>
            <rect
              x={tokenX(idx)}
              y={exprY}
              width={tokenW}
              height={exprH}
              rx="5"
              fill={isCurrent ? "#f59e0b" : "#3b82f6"}
              opacity={isCurrent ? "0.9" : isDone ? "0.12" : "0.25"}
              stroke={isCurrent ? "#f59e0b" : "#3b82f6"}
              strokeWidth={isCurrent ? "2" : "1"}
            />
            <text
              x={tokenX(idx) + tokenW / 2}
              y={exprY + exprH / 2 + 4}
              textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100"
              fontSize="12"
              fontWeight="700"
              opacity={isDone && !isCurrent ? "0.45" : "1"}
            >
              {token}
            </text>
          </g>
        );
      })}

      <text
        x={stackX}
        y={60}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        stack
      </text>

      <path
        d={`M ${stackX} ${stackTop} L ${stackX} ${stackBottom} L ${stackX + stackBoxW} ${stackBottom} L ${stackX + stackBoxW} ${stackTop}`}
        fill="none"
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="1.5"
      />

      {step.stack.length === 0 && (
        <text
          x={stackX + stackBoxW / 2}
          y={stackBottom - 7}
          textAnchor="middle"
          className="fill-gray-400 dark:fill-gray-500"
          fontSize="9"
          fontFamily="monospace"
        >
          empty
        </text>
      )}

      {step.stack.map((value, idx) => (
        <g key={`${keyPrefix}-stk-${idx}`}>
          <rect
            x={stackX + 3}
            y={stackBoxY(idx)}
            width={stackBoxW - 6}
            height={stackBoxH - 3}
            rx="5"
            fill="#3b82f6"
            opacity={idx === step.stack.length - 1 ? "0.9" : "0.25"}
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <text
            x={stackX + stackBoxW / 2}
            y={stackBoxY(idx) + (stackBoxH - 3) / 2 + 4}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="11"
            fontWeight="700"
          >
            {value}
          </text>
        </g>
      ))}

      <text
        x={outX}
        y={60}
        className="fill-gray-400 dark:fill-gray-500"
        fontSize="9"
        fontFamily="monospace"
      >
        output
      </text>

      {step.output.length === 0 && (
        <text
          x={outX}
          y={outY + 15}
          className="fill-gray-400 dark:fill-gray-500"
          fontSize="9"
          fontFamily="monospace"
        >
          (empty)
        </text>
      )}

      {step.output.map((value, idx) => (
        <g key={`${keyPrefix}-out-${idx}`}>
          <rect
            x={outX + idx * (tokenW + tokenGap)}
            y={outY}
            width={tokenW}
            height={exprH}
            rx="5"
            fill="#10b981"
            opacity={idx === step.output.length - 1 ? "0.9" : "0.3"}
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <text
            x={outX + idx * (tokenW + tokenGap) + tokenW / 2}
            y={outY + exprH / 2 + 4}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="12"
            fontWeight="700"
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Content = () => {
  const { theme } = useTheme();

  const paragraph = [
    `In postfix notation, also known as Reverse Polish Notation, you write the operator right after its two operands instead of between them.`,
    `So the everyday expression 3 + 4 becomes 3 4 + once converted. There's no ambiguity about order of operations here: the position of each operator in the string already tells you exactly when to apply it, so parentheses become unnecessary.`,
    `Note: Higher precedence means the operation will happen first. When operators have equal precedence, they are evaluated left-to-right (except for exponentiation which is right-to-left).`,
  ];

  const steps = [
    { points : "Initialize an empty stack and an empty output string." },
    { points : "Scan the infix expression from left to right." },
    { points : "If the element is an operand, add it to the output." },
    { points : "If the element is a '(', push it onto the stack." },
    { points : `If the element is a ')', pop from the stack and add to output until '(' is encountered.` },
    { points : "If the element is an operator, pop from the stack all operators with higher or equal precedence, then push the current operator." },
    { points : "After scanning, pop all remaining operators from the stack." },
  ];

  const exampleTokens = ["(", "A", "+", "B", ")", "*", "(", "C", "-", "D", ")"];
  const trace = buildTrace(exampleTokens);
  const finalOutput = trace[trace.length - 1].output.join(" ");

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Postfix Notation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Postfix Notation?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {paragraph.map((text, idx) => (
              <p
                key={idx}
                className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* Infix to Postfix Conversion Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Infix to Postfix Conversion Steps
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {steps.map((item, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300 pl-2">
                  {item.points}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How Does It Work? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Take <span className="font-mono">(A + B) * (C - D)</span>. The
                amber token is the one being scanned, the stack holds operators
                waiting for their operands, and the output grows left to right:
              </p>

              <div className="grid gap-6 sm:grid-cols-2 not-prose">
                {trace.map((step, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">
                        {idx + 1}.{" "}
                        {step.index === -1
                          ? "End of scan"
                          : `Scan '${exampleTokens[step.index]}'`}
                      </span>{" "}
                      — {step.action}
                    </p>
                    <TraceStepDiagram
                      keyPrefix={`postfix-step${idx}`}
                      tokens={exampleTokens}
                      step={step}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                  Token being scanned
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
                  On the stack / not yet scanned
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
                  Written to the output
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                Final postfix:{" "}
                <span className="font-mono font-semibold">{finalOutput}</span>.
                Notice the operands never touch the stack — only operators wait
                there, and each one is released the moment an operator of equal
                or higher precedence arrives, or its bracket closes.
              </p>
            </div>
          </div>
        </section>

        {/* Operator Precedence Table */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Operator Precedence Table
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {/* table-fixed + smaller type on phones so the table shrinks to fit
                instead of scrolling sideways */}
            <table className="w-full table-fixed border-collapse border border-blue-700 text-xs sm:text-base">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <th className="w-1/4 border border-blue-700 px-1.5 py-2 sm:px-4 font-semibold">
                    Operator
                  </th>
                  <th className="w-1/2 border border-blue-700 px-1.5 py-2 sm:px-4 font-semibold">
                    Meaning
                  </th>
                  <th className="w-1/4 border border-blue-700 px-1.5 py-2 sm:px-4 font-semibold">
                    Precedence
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    ( )
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Parentheses
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Highest
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    ^ %
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Exponentiation / Modulus
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    2
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    * /
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Multiplication / Division
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    3
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    + -
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Addition / Subtraction
                  </td>
                  <td className="border border-blue-700 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    4 (Lowest)
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {paragraph[2]}
            </p>
          </div>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
      <DailyDSAEmbed mobile theme={theme} />
    </main>
  );
  };
  
  export default Content;