import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(userInput);
    setUserInput("");
  };

  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    setTodos(data);
  };

  /*
  function getTodos() {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }*/

  function addTodo() {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      task: userInput,
      done: false,
    };
    const options = {
      method: "POST",
      url: "http://localhost:4000/todos",
      headers: { "Content-Type": "application/json" },
      data: newTodo,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        getTodos();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  /*
  const deleteTodo = (id) => {
    const url = `http://localhost:4000/todos/${id}`;
    axios
      .delete(url)
      .then(function (response) {
        console.log(response);
        getTodos();
      })
      .catch(function (error) {
        console.error(error);
      });
  }; */

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {todos.map((todo) => (
          <p key={todo.id}>{todo.task}</p>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            value={userInput}
            type="text"
            placeholder="Enter task..."
            onChange={handleChange}
          />
          <button type="button" onClick={addTodo}>
            Add todos
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
