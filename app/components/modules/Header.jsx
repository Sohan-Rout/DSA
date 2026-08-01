import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ArticleActions from "@/app/components/ui/ArticleActions";

export default function ModuleHeader({ category, title, paths }) {
  return (
    <>
      <div className="mt-10 sm:mt-10 mb-4">
        <Breadcrumbs paths={paths} />
      </div>
      <div className="flex items-center flex-col">
        <div className="flex">
          <p className="uppercase tracking-wide bg-green-500 dark:text-black px-4 py-1 mb-2 rounded-full">
            {category}
          </p>
        </div>
        <h1 className="text-4xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-0">
          {title}
        </h1>
        <ArticleActions />
      </div>
      <div className="bg-black border w-full border-none dark:bg-gray-600 h-0.5 rounded-xl my-10"></div>
    </>
  );
}
