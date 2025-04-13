import Animation from "@/app/visualizer/stack/isempty/animation";

export const metadata = {
  title: 'Stack Visualizer | Learn Stack with Animation',
  description: 'Visualize how Stack works in DSA using interactive animation. Great for beginners and interview prep.',
  keywords: ['Stack DSA', 'Stack Visualizer', 'Learn Stack', 'DSA Animation'],
  robots: "index, follow",
};

export default function Page() {
  return(
    <Animation />
  );
};