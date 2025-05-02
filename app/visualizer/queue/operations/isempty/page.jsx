import Animation from "@/app/visualizer/queue/operations/isempty/animation";

export const metadata = {
  title: 'Queue Visualizer | Understand Queue Easily',
  description: 'Interactive queue visualization for learning DSA. Try enqueue, dequeue and understand queue operations in real-time.',
  keywords: ['Queue DSA', 'Queue Visualizer', 'Learn Queue', 'DSA Tools'],
  robots: "index, follow",
};

export default function Page() {
  return (
    <Animation />
  );
};