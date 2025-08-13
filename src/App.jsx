import "./App.css";
import { useReducer, useRef } from "react";

// useReducer

// 1.1. Init state
const initState = { job: "", jobs: [] };
// 2. Action
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

// 3. Reducer
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case DELETE_JOB:
      newState = {
        ...state,
        jobs: state.jobs.filter((_, index) => index !== action.payload),
      };
      break;

    default:
      throw new Error("Invalid action type");
  }
  return newState;
};

// 4. Dispatch

function App() {
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

export default App;
