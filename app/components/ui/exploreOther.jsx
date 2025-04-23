const ExploreOther = ({ title, links, columns = "4" }) => {
  // Map the columns prop to Tailwind grid classes
  const gridColumns = {
    "2": "sm:grid-cols-2",
    "3": "sm:grid-cols-2 lg:grid-cols-3",
    "4": "sm:grid-cols-2 lg:grid-cols-4",
  }[columns] || "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">{title}</h2>
      <div className={`grid grid-cols-1 ${gridColumns} gap-3`}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="group/item block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <span className="text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExploreOther;