import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState();
  axios.defaults.withCredentials = true; 
  const handleSubmit = () => {
    axios
      .post(`https://mern-deploy-server-red.vercel.app/add`, { task: task })
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
