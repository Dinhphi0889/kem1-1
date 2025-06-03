import React, { useState, useEffect } from "react";
import Axios from "axios";

const LOCAL_STORAGE_KEY = "todoList";

const Form = () => {
  const [todos, setTodos] = useState([]);
  const [listAdd, setListAdd] = useState([]);
  const [listComplete, setListComplete] = useState([]);
  const [listReject, setListReject] = useState([]);
  const [input, setInput] = useState("");
  const [dataListToDoList, setDataListToDoList] = useState([]);

  // Fetch initial data from API
  const getData = async () => {
    try {
      const response = await Axios.get(
        "https://svcy.myclass.vn/api/ToDoList/GetAllTask"
      );

      setDataListToDoList(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [])

  // Load from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save to localStorage every time todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (value) => {
    
    setListAdd([...listAdd, value]);
  };

  const handleDelete = (task) => {
    console.log(task)
    setListAdd(listAdd.includes(task)
      ? listAdd.filter((item) => item !== task)
      : [...listAdd, task]);
  };
  console.log(listAdd)

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: "completed" } : todo
      )
    );
  };

  const handleReject = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: "rejected" } : todo
      )
    );
  };

  // const renderButtons = (todo) => {
  //   switch (todo.status) {
  //     case "active":
  //       return (
  //         <>
  //           <button
  //             className="btn btn-success btn-sm me-2"
  //             onClick={() => handleComplete(todo.id)}
  //           >
  //             Complete
  //           </button>
  //           <button
  //             className="btn btn-danger btn-sm"
  //             onClick={() => handleDelete(todo.id)}
  //           >
  //             Delete
  //           </button>
  //         </>
  //       );
  //     case "completed":
  //       return (
  //         <>
  //           <button
  //             className="btn btn-warning btn-sm me-2"
  //             onClick={() => handleReject(todo.id)}
  //           >
  //             Reject
  //           </button>
  //           <button
  //             className="btn btn-danger btn-sm"
  //             onClick={() => handleDelete(todo.id)}
  //           >
  //             Delete
  //           </button>
  //         </>
  //       );
  //     case "rejected":
  //       return (
  //         <>
  //           <button
  //             className="btn btn-success btn-sm me-2"
  //             onClick={() => handleComplete(todo.id)}
  //           >
  //             Complete
  //           </button>
  //           <button
  //             className="btn btn-danger btn-sm"
  //             onClick={() => handleDelete(todo.id)}
  //           >
  //             Delete
  //           </button>
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="container bg-navbar mt-5 py-3">
      <h1>ToDoList</h1>

      <div className="input-group my-4 gap-2">
        <input
          type="text"
          className="form-control rounded-end"
          placeholder="Enter new todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="btn btn-primary rounded" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="container">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`input-group d-flex justify-content-end align-items-center rounded mb-2 ${todo.status === "completed"
              ? "bg-info"
              : todo.status === "rejected"
                ? "bg-secondary"
                : "bg-white"
              }`}
          >
            <input
              type="text"
              className={`form-control ${todo.status ? "text-decoration-line-through bg-light" : ""
                }`}
              value={todo.taskName}
              disabled
            />
            <div className="input-button me-2">
              <button onClick={() => { handleAdd(todo) }}>Add</button>
              <button>Complete</button>
              <button onClick={() => { handleDelete(todo) }}>Delete</button>
              <button>Reject</button>
            </div>
          </div>
        ))}
      </div>
      <h1>List add</h1>
      {listAdd.map((todo, index) => (
        <div key={index}>
          {todo.taskName} - <span>{JSON.stringify(todo.status)}</span>
        </div>
      ))}
    </div>
  );
};

export default Form;
