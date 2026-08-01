const PolicyContent = ({ intro, sections, lastUpdated }) => {
  return (
    <article className="max-w-3xl mx-auto bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <p className="mb-6 text-gray-600 dark:text-gray-300">{intro}</p>

      <ul className="space-y-6">
        {sections.map((item, index) => (
          <li key={index}>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="flex">
                <span className="w-6 h-6 font-poppins font-semibold bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  {item.id}
                </span>
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  {item.title}
                </h2>
              </div>
              {item.data && (
                <p className="text-gray-600 dark:text-gray-300 pl-9">
                  {item.data}
                </p>
              )}
              {item.points && (
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-9 mt-2">
                  {item.points.map((subitem, subindex) => (
                    <li key={subindex} className="list-disc text-blue-500">
                      <span className="text-gray-600 dark:text-gray-300">
                        {subitem}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {item.contact && (
                <span className="font-medium pl-9 text-blue-600 dark:text-blue-400">
                  {item.contact}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated}
        </p>
      </div>
    </article>
  );
};

export default PolicyContent;
