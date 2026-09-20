import { useState } from "react";

function Task({ column, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const task = {
      title: title.trim(),
      description: description.trim(),
      label: label.trim(),
      columnId: column.id,
    };
    onAdd(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-stone-900">Add task</h2>

          <p className="mt-1 text-sm text-stone-500">
            Adding task to {column.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-900">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              maxLength={50}
              required
              className="w-full rounded-xl border border-stone-100 px-3 py-2.5 text-sm outline-none focus:border-stone-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-900">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="4"
              required
              className="w-full resize-none rounded-xl border border-stone-100 px-3 py-2.5 text-sm outline-none focus:border-stone-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-900">
              Label
            </label>
            <input
              type="text"
              value={label}
              maxLength={20}
              onChange={(e) => setLabel(e.target.value)}
              required
              placeholder="e.g. Frontend"
              className="w-full rounded-xl border border-stone-100 px-3 py-2.5 text-sm outline-none focus:border-stone-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-stone-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Task;
