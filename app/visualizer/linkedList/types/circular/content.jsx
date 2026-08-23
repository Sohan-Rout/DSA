"use client";
import { useEffect, useState } from "react";
import NewsletterEmbed from "@/app/components/ui/NewsletterEmbed";
import InContentAd from "@/app/components/ads/InContentAd";

// Each node is drawn as [data | next] with the next cell holding the actual
// address it stores. The tail's next holds the head's address rather than
// null, which is the one difference that makes the list circular.
// Addresses are keyed by value so a node keeps the same one across every step.
const ADDRESSES = {
  A: "0x1A",
  B: "0x2F",
  C: "0x3C",
  X: "0x4D",
  10: "0x1A",
  20: "0x2F",
  30: "0x3C",
};

const DATA_W = 30;
const NEXT_W = 34;
const NODE_W = DATA_W + NEXT_W;
const NODE_H = 34;
const GAP = 22;
const START_X = 36;
const NODE_Y = 20;

const CircularNodeDiagram = ({ nodes, highlight, keyPrefix }) => {
  const count = Math.max(nodes.length, 1);
  const width = START_X + count * NODE_W + (count - 1) * GAP + 14;
  const height = 100;

  const nodeX = (idx) => START_X + idx * (NODE_W + GAP);
  const cy = NODE_Y + NODE_H / 2;
  const bottom = NODE_Y + NODE_H;
  const addrY = 12;
  const colorFor = (idx) => (highlight === idx ? "#10b981" : "#3b82f6");
  const addrOf = (label) => ADDRESSES[label] ?? "0x??";

  const markers = (
    <defs>
      <marker
        id={`${keyPrefix}-tip`}
        markerWidth="7"
        markerHeight="7"
        refX="6"
        refY="3.5"
        orient="auto"
      >
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
      </marker>
      <marker
        id={`${keyPrefix}-loop-tip`}
        markerWidth="7"
        markerHeight="7"
        refX="6"
        refY="3.5"
        orient="auto"
      >
        <path d="M0,0 L7,3.5 L0,7 Z" fill="#6366f1" />
      </marker>
    </defs>
  );

  if (nodes.length === 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{ width: `${width}px`, maxWidth: "100%" }}
        role="img"
        aria-label="empty circular linked list"
      >
        {markers}
        <text
          x="0"
          y={cy + 4}
          className="fill-gray-500 dark:fill-gray-400"
          fontSize="12"
          fontFamily="monospace"
        >
          head
        </text>
        <line
          x1="30"
          y1={cy}
          x2={START_X + 12}
          y2={cy}
          stroke="#94a3b8"
          strokeWidth="1.5"
          markerEnd={`url(#${keyPrefix}-tip)`}
        />
        <text
          x={START_X + 20}
          y={cy + 4}
          className="fill-gray-400 dark:fill-gray-500"
          fontSize="12"
          fontFamily="monospace"
        >
          null
        </text>
      </svg>
    );
  }

  const lastX = nodeX(nodes.length - 1);
  const loopFromX = lastX + DATA_W + NEXT_W / 2;
  const loopToX = nodeX(0) + DATA_W / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto"
      style={{ width: `${width}px`, maxWidth: "100%" }}
      role="img"
      aria-label="circular linked list diagram"
    >
      {markers}

      <text
        x="0"
        y={cy + 4}
        className="fill-gray-500 dark:fill-gray-400"
        fontSize="12"
        fontFamily="monospace"
      >
        head
      </text>
      <line
        x1="30"
        y1={cy}
        x2={nodeX(0) - 3}
        y2={cy}
        stroke="#94a3b8"
        strokeWidth="1.5"
        markerEnd={`url(#${keyPrefix}-tip)`}
      />

      {/* The wrap-around link: tail's next runs back to the head node */}
      <path
        d={`M ${loopFromX} ${bottom + 2} C ${loopFromX} ${bottom + 30}, ${loopToX} ${bottom + 30}, ${loopToX} ${bottom + 4}`}
        fill="none"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd={`url(#${keyPrefix}-loop-tip)`}
      />
      <text
        x={(loopFromX + loopToX) / 2}
        y={bottom + 40}
        textAnchor="middle"
        className="fill-indigo-500 dark:fill-indigo-400"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="700"
      >
        tail.next = head
      </text>

      {nodes.map((label, idx) => {
        const x = nodeX(idx);
        const color = colorFor(idx);
        const isLast = idx === nodes.length - 1;
        // The tail points back at the head instead of terminating in null.
        const nextLabel = isLast ? nodes[0] : nodes[idx + 1];
        return (
          <g key={`${keyPrefix}-node-${idx}`}>
            <text
              x={x + NODE_W / 2}
              y={addrY}
              textAnchor="middle"
              className="fill-gray-400 dark:fill-gray-500"
              fontSize="8"
              fontFamily="monospace"
            >
              {addrOf(label)}
            </text>

            <rect
              x={x}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={color}
              opacity={highlight === idx ? "0.9" : "0.25"}
              stroke={color}
              strokeWidth="2"
            />
            <line
              x1={x + DATA_W}
              y1={NODE_Y}
              x2={x + DATA_W}
              y2={bottom}
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <text
              x={x + DATA_W / 2}
              y={cy + 5}
              textAnchor="middle"
              className="fill-black dark:fill-white"
              fontSize="14"
              fontWeight="700"
            >
              {label}
            </text>
            <text
              x={x + DATA_W + NEXT_W / 2}
              y={cy + 3}
              textAnchor="middle"
              className="fill-black dark:fill-white"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="700"
            >
              {addrOf(nextLabel)}
            </text>

            {!isLast && (
              <line
                x1={x + NODE_W + 1}
                y1={cy}
                x2={nodeX(idx + 1) - 3}
                y2={cy}
                stroke="#94a3b8"
                strokeWidth="1.5"
                markerEnd={`url(#${keyPrefix}-tip)`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const LoopDiagram = ({ nodes, keyPrefix }) => {
  const size = 220;
  const topPadding = 24;
  const height = size + topPadding;
  const centerX = size / 2;
  const centerY = size / 2 + topPadding;
  const radius = 70;
  const nodeRadius = 26;

  const positions = nodes.map((_, i) => {
    const angle = (-90 + i * (360 / nodes.length)) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${height}`} className="w-full max-w-[220px] mx-auto">
      <defs>
        <marker
          id={`${keyPrefix}-arrow`}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#6366f1" />
        </marker>
      </defs>

      {positions.map((pos, i) => {
        const next = positions[(i + 1) % positions.length];
        const dx = next.x - pos.x;
        const dy = next.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const startX = pos.x + ux * (nodeRadius + 2);
        const startY = pos.y + uy * (nodeRadius + 2);
        const endX = next.x - ux * (nodeRadius + 6);
        const endY = next.y - uy * (nodeRadius + 6);
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const controlX = midX + (centerX - midX) * 0.35;
        const controlY = midY + (centerY - midY) * 0.35;

        return (
          <path
            key={`${keyPrefix}-edge-${i}`}
            d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            markerEnd={`url(#${keyPrefix}-arrow)`}
          />
        );
      })}

      {positions.map((pos, i) => (
        <g key={`${keyPrefix}-node-${i}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill={i === 0 ? "#10b981" : "#3b82f6"}
            opacity="0.15"
          />
          <circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill="none"
            stroke={i === 0 ? "#10b981" : "#3b82f6"}
            strokeWidth="2"
          />
          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-100"
            fontSize="13"
            fontWeight="600"
          >
            {nodes[i]}
          </text>
        </g>
      ))}

      {positions[0] && (
        <text
          x={positions[0].x}
          y={positions[0].y - nodeRadius - 8}
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="11"
          fontWeight="700"
        >
          head
        </text>
      )}
    </svg>
  );
};

const Content = () => {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    };

    updateTheme();

    window.addEventListener("storage", updateTheme);
    window.addEventListener("themeChange", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("themeChange", updateTheme);
    };
  }, []);

  const overview = [
    `Take a regular linked list and change one thing: instead of the last node pointing to null, have it point right back to the first node. That's a circular linked list, a loop with no real end.`,
    `It can be built either as a singly-linked loop (one pointer per node) or a doubly-linked loop (two pointers per node). Because the chain never terminates, it's a natural fit for anything that needs to cycle repeatedly, like round-robin scheduling or a circular buffer.`,
    `Since there's no fixed "first" or "last" node anymore, you can start traversing from anywhere in the loop and eventually visit every node, handy for problems that are inherently cyclic rather than linear.`,
  ];

  const basicOperations = [
    { name: "Insertion at Head", complexity: "O(1)", description: "Add new node at beginning, point last node to new head" },
    { name: "Insertion at Tail", complexity: "O(1)", description: "Add new node at end, point it to head (with tail pointer)" },
    { name: "Deletion at Head", complexity: "O(1)", description: "Remove first node, update last node's pointer" },
    { name: "Deletion by Value", complexity: "O(n)", description: "Traverse list to find and remove specific node" },
    { name: "Traversal", complexity: "O(n)", description: "Loop through nodes until returning to starting point" },
    { name: "Search", complexity: "O(n)", description: "Traverse list to find element" },
  ];

  const insertionSteps = [
    { step: "Create new node with data" },
    { step: "If list is empty, set head and tail to new node" },
    { step: "Make new node point to itself (circular reference)" },
    { step: "For non-empty list, set new node's next to current head" },
    { step: "Update tail's next pointer to new node" },
    { step: "Move head pointer to new node" },
  ];

  const deletionSteps = [
    { step: "Check if list is empty" },
    { step: "If single node exists, set head and tail to null" },
    { step: "For head deletion, update head to head.next" },
    { step: "Update tail's next pointer to new head" },
    { step: "For middle deletion, find node and update previous node's pointer" },
    { step: "Handle special case when deleting last node" },
  ];

  const prosCons = [
    { point: "Continuous traversal from any node", type: "pro" },
    { point: "Efficient round-robin scheduling", type: "pro" },
    { point: "No need for null checks during traversal", type: "pro" },
    { point: "Useful for circular buffer implementations", type: "pro" },
    { point: "Risk of infinite loops if not handled carefully", type: "con" },
    { point: "Slightly more complex implementation", type: "con" },
    { point: "Harder to detect list boundaries", type: "con" },
  ];

  const visualization = [
    {
      operation: "Initialization",
      note: "An empty list has nothing to loop through, so head is simply null.",
      nodes: [],
    },
    {
      operation: "insertFirst(10)",
      note: "A single node is a complete loop on its own — its next holds its own address, 0x1A.",
      nodes: [10],
      highlight: 0,
    },
    {
      operation: "insertFirst(20)",
      note: "20's next points at 10, and 10 stops pointing at itself and points back at the new head instead.",
      nodes: [20, 10],
      highlight: 0,
    },
    {
      operation: "insertFirst(30)",
      note: "Again the tail's next is retargeted at the new head. Whichever node is last always closes the loop.",
      nodes: [30, 20, 10],
      highlight: 0,
    },
    {
      operation: "deleteFirst()",
      note: "head moves to 20, and the tail's next is updated to 20's address so the loop stays intact.",
      nodes: [20, 10],
    },
    {
      operation: "delete(10)",
      note: "One node is left, so it closes the loop by pointing at itself again.",
      nodes: [20],
    },
  ];

  const applications = [
    "Operating system round-robin scheduling",
    "Multiplayer turn-based games",
    "Music/video playlists with repeat functionality",
    "Resource allocation in networking",
    "Circular buffer implementations",
    "Token ring networks",
  ];

  const comparisonTable = [
    { feature: "Structure", linear: "Linear with null termination", circular: "Circular with no null" },
    { feature: "Traversal", linear: "Stops at end", circular: "Continuous loop" },
    { feature: "Memory Overhead", linear: "Standard", circular: "Same as linear" },
    { feature: "Boundary Detection", linear: "Easy (null check)", circular: "Requires start reference" },
    { feature: "Insert/Delete at Head", linear: "O(1)", circular: "O(1)" },
    { feature: "Implementation Complexity", linear: "Simpler", circular: "More complex" },
  ];

  return (
    <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="md:col-span-3">
        <NewsletterEmbed mobile={false} theme={theme} />
      </div>
      <article className="md:col-span-9 max-w-4xl bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        {/* Overview Section */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
            Circular Linked List
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {overview.map((para, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Key Property:</strong> The last node{"\'"}s next pointer always points back to the first node, creating a continuous loop.
              </p>
            </div>
          </div>
        </section>

        {/* Basic Operations */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic Operations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Operation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Complexity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {basicOperations.map((op, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{op.name}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300">{op.complexity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{op.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Does It Work?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Each node below is drawn as its two parts: the data and a next cell.
            The grey address above each box is where that node lives in memory,
            and the next cell holds nothing but an address — the location of the
            node that follows.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Here is the only structural difference from an ordinary singly
            linked list. In a linear list the last node&apos;s next would read
            null; here it reads 0x1A, the address of the head. That single value
            is what closes the loop, and it is why traversal has no natural
            stopping point:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
            <CircularNodeDiagram nodes={["A", "B", "C"]} keyPrefix="cll-anatomy" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            Because that link always exists, the same list is often drawn as a
            ring instead — the same three nodes, just laid out so the wrap-around
            stops looking like a special case:
          </p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg">
            <LoopDiagram nodes={["A", "B", "C"]} keyPrefix="cll-ring" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            The practical consequence is that a traversal cannot stop on
            &quot;next is null&quot;, because that never happens. Instead you
            remember the node you started on and stop when you come back around
            to it — miss that and you have an infinite loop.
          </p>
        </section>

        {/* Insertion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Insertion Process</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Inserting at the head takes two pointer writes: the new node&apos;s
            next is set to the old head&apos;s address, and the tail&apos;s next
            is retargeted from the old head to the new one. Watch C&apos;s next
            cell below change from 0x1A to 0x4D — the loop has to be re-closed
            onto the new head.
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <CircularNodeDiagram nodes={["A", "B", "C"]} keyPrefix="cll-ins-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ insert X at head ↓</p>
            <CircularNodeDiagram nodes={["X", "A", "B"]} highlight={0} keyPrefix="cll-ins-after" />
          </div>
          <ol className="mt-4 space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {insertionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>
        </section>

        {/* Deletion Process */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deletion Process</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Deleting the head is the mirror image: head moves on to the next
            node, and the tail&apos;s next is retargeted onto that new head so
            the ring never breaks. Forgetting that second write is the classic
            bug — it leaves the tail pointing at a node that is no longer part
            of the list.
          </p>
          <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
            {deletionSteps.map((step, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                {step.step}
              </li>
            ))}
          </ol>

          <div className="mt-6 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg space-y-3 overflow-x-auto">
            <CircularNodeDiagram nodes={["X", "A", "B"]} highlight={0} keyPrefix="cll-del-before" />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">↓ delete X (the head) ↓</p>
            <CircularNodeDiagram nodes={["A", "B"]} keyPrefix="cll-del-after" />
          </div>
        </section>

        {/* Visualization */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Operation Walkthrough</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            A full sequence on an empty list, one operation at a time. Follow
            the last node&apos;s next cell — it is rewritten on every single
            operation, because whichever node ends up last is responsible for
            closing the loop:
          </p>
          <div className="space-y-5">
            {visualization.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-mono font-semibold">{item.operation}</span>
                  {" — "}
                  <span className="text-gray-600 dark:text-gray-400">{item.note}</span>
                </p>
                <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg overflow-x-auto">
                  <CircularNodeDiagram
                    nodes={item.nodes}
                    highlight={item.highlight}
                    keyPrefix={`cll-walk${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">Advantages</h3>
              <ul className="space-y-2">
                {prosCons.filter(item => item.type === "pro").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item.point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">Limitations</h3>
              <ul className="space-y-2">
                {prosCons.filter(item => item.type === "con").map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-red-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item.point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison with Linear Linked List */}
        <section className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comparison with Linear Linked List</h2>
          {/* table-fixed + smaller type on phones so the table shrinks to fit
              instead of scrolling sideways */}
          <table className="w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-1/3 px-1.5 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
                <th className="w-1/3 px-1.5 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Linear</th>
                <th className="w-1/3 px-1.5 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Circular</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {comparisonTable.map((row, index) => (
                <tr key={index}>
                  <td className="px-1.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">{row.feature}</td>
                  <td className="px-1.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.linear}</td>
                  <td className="px-1.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">{row.circular}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Applications */}
        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Applications</h2>
          <div className="prose dark:prose-invert max-w-none">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5 marker:text-blue-500 dark:marker:text-blue-400">
              {applications.map((app, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
                  {app}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>When to Choose:</strong> Prefer circular linked lists when you need continuous cycling through elements or when the application naturally follows a circular pattern (like round-robin scheduling).
              </p>
            </div>
          </div>
        </section>

        <InContentAd />
      </article>
      <NewsletterEmbed mobile theme={theme} />
    </main>
  );
};

export default Content;