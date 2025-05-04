import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodo] = useState([]);
  useEffect(() => {
    axios
      .get(`https://mern-deploy-server-red.vercel.app/get`)
      .then((result) => setTodo(result.data))
      .catch((err) => console.log(err));
  }, []);
  const HandleEdit = (id) => {
    axios
      .put(`https://mern-deploy-server-red.vercel.app/${id}`)
      .then(() => {
        setTodo((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: true } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };
  const DeleteRecord = (id) => {
    axios
      .delete(`https://mern-deploy-server-red.vercel.app/delete/${id}`)
      .then(() => {
        setTodo((prev) => prev.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No record found</h2>
        </div>
      ) :""
      
      //   (
      //   todos.map((todo) => (
      //     <div className="task">
      //       <div className="checkbox" onClick={() => HandleEdit(todo._id)}>
      //         {todo.done ? (
      //           <BsFillCheckCircleFill className="icon" />
      //         ) : (
      //           <BsCircleFill className="icon" />
      //         )}

      //         <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
      //       </div>
      //       <div>
      //         <BsFillTrashFill
      //           className="icon"
      //           onClick={() => DeleteRecord(todo._id)}
      //         />
      //       </div>
      //     </div>
      //   )
      //   )
      // )
      }
    </div>
  );
}

export default Home;
