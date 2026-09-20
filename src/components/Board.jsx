import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Task from "./Task";

function Board() {
  const columns = [
    {
      id: "todo",
      title: "To do",
      color: "bg-red-50",
      dot: "bg-red-400",
      text: "text-red-700",
      card: "bg-red-100",
      button: "bg-red-100 text-red-700 border-red-300",
    },
    {
      id: "progress",
      title: "In progress",
      color: "bg-blue-50",
      dot: "bg-blue-400",
      text: "text-blue-700",
      card: "bg-blue-100",
      button: "bg-blue-100 text-blue-700 border-blue-300",
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-lime-50",
      dot: "bg-lime-400",
      text: "text-lime-700",
      card: "bg-lime-100",
      button: "bg-lime-100 text-lime-700 border-lime-300",
    },
  ];

  const [tasks, setTasks] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [dragTask, setDragTask] = useState(null);
  const [dragColumn, setDragColumn] = useState(null);

  const boardRef = useRef(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanben-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("kanben-tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
    localStorage.setItem("kanben-tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (editingTask) => {
    const updatedTasks = tasks.map((task, index) =>
      index === editTask.index ? editingTask : task,
    );
    setTasks(updatedTasks);
    localStorage.setItem("kanben-tasks", JSON.stringify(updatedTasks));
    setEditTask(null);
  };

  const handlePointerDown = (e, index) => {
    if (e.target.closest("button")) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragTask(index);
  };

  const handlePointerMove = (e) => {
    if (dragTask === null) {
      return;
    }
    const board = boardRef.current;
    if (!board) {
      return;
    }
    const rect = board.getBoundingClientRect();
    const edgeSize = 70;
    const scrollSpeed = 12;
    if (e.clientX < rect.left + edgeSize) {
      board.scrollLeft -= scrollSpeed;
    }
    if (e.clientX > rect.right - edgeSize) {
      board.scrollLeft += scrollSpeed;
    }
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const column = element?.closest("[data-column-id]");
    if (column) {
      setDragColumn(column.dataset.columnId);
    }
  };

  const handlePointerUp = (e) => {
    if (dragTask === null) {
      return;
    }
    if (dragColumn !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === dragTask
          ? {
              ...task,
              columnId: dragColumn,
            }
          : task,
      );
      setTasks(updatedTasks);
      localStorage.setItem("kanben-tasks", JSON.stringify(updatedTasks));
    }
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragTask(null);
    setDragColumn(null);
  };

  return (
    <div className="h-full overflow-hidden bg-stone-50">
      <div ref={boardRef} className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex h-full min-w-max gap-4.5 p-4 sm:p-6 lg:min-w-0 lg:px-7 lg:pb-7 lg:pt-6">
          {columns.map((column) => {
            const columnTasks = tasks
              .map((task, index) => ({
                task,
                index,
              }))
              .filter(({ task }) => task.columnId === column.id);

            return (
              <section
                key={column.id}
                data-column-id={column.id}
                className={`h-full max-h-full w-75 shrink-0 overflow-y-auto rounded-[20px] border border-stone-100 ${column.color} p-3.5 sm:w-[320px] lg:w-0 lg:flex-1 lg:shrink `}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${column.dot}`}
                    />

                    <h2 className={`text-sm font-semibold ${column.text}`}>
                      {column.title}
                    </h2>

                    <span className="rounded-full bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-500">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedColumn(column)}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-dashed py-3 text-sm font-medium ${column.button}`}
                >
                  <FiPlus size={16} />
                  Add task
                </button>

                <div className="mt-3 space-y-3">
                  {columnTasks.map(({ task, index }) => (
                    <div
                      key={index}
                      onPointerDown={(e) => handlePointerDown(e, index)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className={`min-w-0 select-none touch-none cursor-grab rounded-2xl p-4 shadow-sm active:cursor-grabbing ${column.card} ${
                        dragTask === index ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="min-w-0 max-w-[70%] break-words rounded-full bg-white/60 px-2.5 py-1 text-xs">
                          {task.label}
                        </span>

                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() =>
                              setEditTask({
                                task,
                                index,
                              })
                            }
                            className="cursor-pointer rounded-lg p-1.5 text-stone-500 transition hover:bg-white/60 hover:text-stone-800"
                          >
                            <FiEdit2 size={15} />
                          </button>

                          <button
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => handleDeleteTask(index)}
                            className="cursor-pointer rounded-lg p-1.5 text-stone-500 transition hover:bg-white/60 hover:text-red-600"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <h3
                        className={`mt-3 break-words text-sm font-semibold ${column.text}`}
                      >
                        {task.title}
                      </h3>

                      <p className="mt-1 break-words text-xs text-slate-600">
                        {task.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {selectedColumn && (
        <Task
          column={selectedColumn}
          onClose={() => setSelectedColumn(null)}
          onAdd={handleAddTask}
        />
      )}

      {editTask && (
        <Task
          column={columns.find(
            (column) => column.id === editTask.task.columnId,
          )}
          task={editTask.task}
          onClose={() => setEditTask(null)}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
}

export default Board;
