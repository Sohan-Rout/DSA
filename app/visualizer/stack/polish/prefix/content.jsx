"use client";
import { useTheme } from "@/app/contexts/ThemeContext";
import DailyDSAEmbed from "@/app/components/ui/DailyDSAEmbed";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

const PRECEDENCE = { "^": 4, "%": 4, "*": 3, "/": 3, "+": 2, "-": 2 };
const isOperator = (token) => token in PRECEDENCE;

const TOKEN_W = 22;
const TOKEN_GAP = 2;
const TOKEN_H = 22;
const WIDTH = 290;

const rowStartX = (count) =>
  (WIDTH - (count * (TOKEN_W + TOKEN_GAP) - TOKEN_GAP)) / 2;

// Step 1 of the algorithm: reverse, and flip each bracket so the nesting
// still reads correctly in the new direction.
const reverseAndSwap = (tokens) =>
  [...tokens]
    .reverse()
    .map((token) => (token === "(" ? ")" : token === ")" ? "(" : token));

// Converting the reversed expression uses a strict > comparison rather than
// >=, which is what keeps left-associative operators correct once the result
// is reversed back at the end.
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
        PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[token]
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

// The whole reverse → convert → reverse pipeline as one picture.
const PipelineDiagram = ({ rows, keyPrefix }) => {
  const labelH = 12;
  const arrowGap = 20;
  const rowHeight = labelH + TOKEN_H;
  const padTop = 8;
  const height =
    padTop + rows.length * rowHeight + (rows.length - 1) * arrowGap + 8;

  const rowY = (idx) => padTop + idx * (rowHeight + arrowGap);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="mx-auto"
      style={{ width: `${WIDTH}px`, maxWidth: "100%" }}
      role="img"
      aria-label="infix to prefix conversion pipeline"
    >
      <defs>
        {/* orient="auto" rotates the marker onto the path direction, so the
            arrowhead must be drawn pointing along +x, not downward. */}
        <marker
          id={`${keyPrefix}-down`}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      {rows.map((row, rowIndex) => {
        const startX = rowStartX(row.tokens.length);
        const y = rowY(rowIndex) + labelH;
        return (
          <g key={`${keyPrefix}-row-${rowIndex}`}>
            <text
              x={WIDTH / 2}
              y={rowY(rowIndex) + 8}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="9"
              fontFamily="monospace"
            >
              {row.label}
            </text>

            {row.tokens.map((token, idx) => {
              const changed = row.changedAt?.includes(idx);
              const color = changed ? "#f59e0b" : row.accent;
              return (
                <g key={`${keyPrefix}-row-${rowIndex}-t-${idx}`}>
                  <rect
                    x={startX + idx * (TOKEN_W + TOKEN_GAP)}
                    y={y}
                    width={TOKEN_W}
                    height={TOKEN_H}
                    rx="5"
                    fill={color}
                    opacity={changed ? "0.9" : row.opacity}
                    stroke={color}
                    strokeWidth={changed ? "2" : "1"}
                  />
                  <text
                    x={startX + idx * (TOKEN_W + TOKEN_GAP) + TOKEN_W / 2}
                    y={y + TOKEN_H / 2 + 4}
                    textAnchor="middle"
                    className="fill-gray-800 dark:fill-gray-100"
                    fontSize="12"
                    fontWeight="700"
                  >
                    {token}
                  </text>
                </g>
              );
            })}

            {rowIndex < rows.length - 1 && (
              <line
                x1={WIDTH / 2}
                y1={y + TOKEN_H + 4}
                x2={WIDTH / 2}
                y2={y + TOKEN_H + arrowGap - 4}
                stroke="#94a3b8"
                strokeWidth="1.5"
                markerEnd={`url(#${keyPrefix}-down)`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const TraceStepDiagram = ({ tokens, step, keyPrefix }) => {
  const padX = 8;
  const exprY = 18;

  const maxDepth = 3;
  const stackBoxW = 46;
  const stackBoxH = 20;
  const stackX = 8;
  const stackBottom = 150;
  const stackTop = stackBottom - maxDepth * stackBoxH;

  const outX = 84;
  const outY = 66;
  const height = 170;

  const tokenX = (idx) => padX + idx * (TOKEN_W + TOKEN_GAP);
  const stackBoxY = (idx) => stackBottom - (idx + 1) * stackBoxH;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="mx-auto"
      style={{ width: `${WIDTH}px`, maxWidth: "100%" }}
      role="img"
      aria-label="conversion step"
    >
      {tokens.map((token, idx) => {
        const isCurrent = idx === step.index;
        const isDone = step.index === -1 || idx < step.index;
        return (
          <g key={`${keyPrefix}-tok-${idx}`}>
            <rect
              x={tokenX(idx)}
              y={exprY}
              width={TOKEN_W}
              height={TOKEN_H}
              rx="5"
              fill={isCurrent ? "#f59e0b" : "#3b82f6"}
              opacity={isCurrent ? "0.9" : isDone ? "0.12" : "0.25"}
              stroke={isCurrent ? "#f59e0b" : "#3b82f6"}
              strokeWidth={isCurrent ? "2" : "1"}
            />
            <text
              x={tokenX(idx) + TOKEN_W / 2}
              y={exprY + TOKEN_H / 2 + 4}
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
            x={outX + idx * (TOKEN_W + TOKEN_GAP)}
            y={outY}
            width={TOKEN_W}
            height={TOKEN_H}
            rx="5"
            fill="#10b981"
            opacity={idx === step.output.length - 1 ? "0.9" : "0.3"}
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <text
            x={outX + idx * (TOKEN_W + TOKEN_GAP) + TOKEN_W / 2}
            y={outY + TOKEN_H / 2 + 4}
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
    `Prefix notation, also called Polish notation, puts the operator in front of its operands instead of between them.`,
    `That means the familiar 3 + 4 turns into + 3 4 once written in prefix form. Since the operator always leads, there's no need for parentheses to sort out which operation happens first.`,
    `Note: Higher precedence means the operation will happen first. Exponentiation (^) is evaluated right-to-left, while others are left-to-right.`,
  ];

  const steps = [
    { points : "Reverse the infix expression, while keeping the positions of parentheses correct." },
    { points : "Replace ( with ) and vice-versa." },
    { points : "Convert the reversed expression to postfix using a stack." },
    { points : "Finally, reverse the postfix expression to get the prefix expression." },
  ];

  const infixTokens = ["(", "A", "+", "B", ")", "*", "(", "C", "-", "D", ")"];
  const reversedTokens = reverseAndSwap(infixTokens);
  const trace = buildTrace(reversedTokens);
  const postfixTokens = trace[trace.length - 1].output;
  const prefixTokens = [...postfixTokens].reverse();

  const pipelineRows = [
    {
      label: "1. infix (the input)",
      tokens: infixTokens,
      accent: "#3b82f6",
      opacity: "0.3",
    },
    {
      label: "2. reversed, brackets swapped",
      tokens: reversedTokens,
      accent: "#3b82f6",
      opacity: "0.3",
      // Flag the brackets so it's obvious they flipped, not just moved
      changedAt: reversedTokens
        .map((token, idx) => (token === "(" || token === ")" ? idx : null))
        .filter((idx) => idx !== null),
    },
    {
      label: "3. converted to postfix with a stack",
      tokens: postfixTokens,
      accent: "#10b981",
      opacity: "0.35",
    },
    {
      label: "4. reversed again → prefix",
      tokens: prefixTokens,
      accent: "#10b981",
      opacity: "0.9",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
        <DailyDSAEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* What is Prefix Notation? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            What is Prefix Notation?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {paragraph[0]}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {paragraph[1]}
            </p>
          </div>
        </section>

        {/* Infix to Prefix Conversion Steps */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Infix to Prefix Conversion Steps
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
              {steps.map((item, index) => (
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

        {/* How Does It Work? */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            How Does It Work?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mt-2 mb-4 leading-relaxed">
                Take <span className="font-mono">(A + B) * (C - D)</span>. The
                whole pipeline runs top to bottom — the amber brackets in row 2
                are the ones that had to be flipped when the expression was
                reversed:
              </p>

              <div className="not-prose">
                <PipelineDiagram keyPrefix="prefix-pipeline" rows={pipelineRows} />
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-6 mb-4 leading-relaxed">
                Step 3 is the only part that needs a stack. Here it is one token
                at a time, scanning the reversed expression{" "}
                <span className="font-mono">{reversedTokens.join(" ")}</span>:
              </p>

              <div className="grid gap-6 sm:grid-cols-2 not-prose">
                {trace.map((step, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">
                        {index + 1}.{" "}
                        {step.index === -1
                          ? "End of scan"
                          : `Scan '${reversedTokens[step.index]}'`}
                      </span>{" "}
                      — {step.action}
                    </p>
                    <TraceStepDiagram
                      keyPrefix={`prefix-step${index}`}
                      tokens={reversedTokens}
                      step={step}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
                  Token being scanned / bracket flipped
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
                That leaves the postfix form{" "}
                <span className="font-mono">{postfixTokens.join(" ")}</span>,
                and reversing it once more gives the prefix answer{" "}
                <span className="font-mono font-semibold">
                  {prefixTokens.join(" ")}
                </span>
                .
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
            <table className="w-full table-fixed border-collapse border border-blue-500 text-xs sm:text-base">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <th className="w-1/4 border border-blue-500 px-1.5 py-2 sm:px-4 font-semibold">
                    Operator
                  </th>
                  <th className="w-1/2 border border-blue-500 px-1.5 py-2 sm:px-4 font-semibold">
                    Meaning
                  </th>
                  <th className="w-1/4 border border-blue-500 px-1.5 py-2 sm:px-4 font-semibold">
                    Precedence
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    ( )
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Parentheses
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Highest
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    ^ %
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Exponentiation / Modulus
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    2
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    * /
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Multiplication / Division
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    3
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/20">
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    + -
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
                    Addition / Subtraction
                  </td>
                  <td className="border border-blue-500 px-1.5 py-2 sm:px-4 text-gray-700 dark:text-gray-300">
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