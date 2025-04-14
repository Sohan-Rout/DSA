import Animation from "@/app/visualizer/trees/traversing/in-order/animation";

export const metadata = {
  title: 'Tree Visualizer | Learn Tree Data Structures with Animation',
  description: 'Visualize how Tree Data Structures work in DSA with interactive animations. Perfect for beginners and interview prep.',
  keywords: ['Tree DSA', 'Tree Visualizer', 'Learn Tree', 'Binary Tree', 'DSA Animation'],
  robots: "index, follow",
};

const TreeVisualizer = () => {
  return (
    <Animation />
  );
};

export default TreeVisualizer;