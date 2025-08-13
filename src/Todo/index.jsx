import { useReducer, useRef } from "react";
import { addJob, deleteJob, setJob } from "./actions";
import reducer, { initState } from "./reducer";

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;

  const inputRef = useRef();

  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Todo List
        </h1>
        <div className="flex gap-2 mb-6">
          <input
            ref={inputRef}
            value={job}
            onChange={(e) => {
              dispatch(setJob(e.target.value));
            }}
            type="text"
            placeholder="Add a new task"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Add
          </button>
        </div>
        {jobs.length > 0 ? (
          <ul className="space-y-2">
            {jobs.map((job, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 bg-opacity-50 px-4 py-3 rounded-lg"
              >
                <span className="text-white">{job}</span>
                <button
                  onClick={() => dispatch(deleteJob(index))}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Delete task"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-6">
            No tasks yet. Add a task to get started!
          </div>
        )}
      </div>
    </>
  );
}

export default TodoApp;
