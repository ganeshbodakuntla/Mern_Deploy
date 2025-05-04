import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.Vite_Backend_URL}/add`, { task: task })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Create;
