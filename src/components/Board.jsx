import { FiPlus } from "react-icons/fi";

function Board() {
  const columns = [
    {
      id: "todo",
      title: "To do",
    },
    {
      id: "progress",
      title: "In progress",
    },
    {
      id: "completed",
      title: "Completed",
    },
  ];

  return (
    <div className="h-full overflow-hidden bg-teal-50">
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex min-w-max gap-[18px] p-4 sm:p-6 lg:px-7 lg:pb-7 lg:pt-6">
          {columns.map((column) => (
            <section
              key={column.id}
              className="w-[300px] shrink-0 rounded-[20px] border border-teal-100 bg-white/60 p-3.5 sm:w-[320px] lg:w-[calc((100vw-110px)/3)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
                  <h2 className="text-sm font-semibold text-teal-900">
                    {column.title}
                  </h2>
                </div>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-dashed border-teal-300 bg-teal-50 py-3 text-sm font-medium text-teal-700 cursor-pointer">
                <FiPlus size={16} />
                Add task
              </button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
