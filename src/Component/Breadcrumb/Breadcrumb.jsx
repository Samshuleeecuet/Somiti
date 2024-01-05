
const Breadcrumb = ({ pageName }) => {
  return (
    <div className="p-10 mt-14 font-NovaSquare lg:mt-10 w-full gap-3">
      <h2 className="text-title-md2 text-2xl font-bold text-green-700 dark:text-white">
        {pageName}
      </h2>
    </div>
  );
};

export default Breadcrumb;
