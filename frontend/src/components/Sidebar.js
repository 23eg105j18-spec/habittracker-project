import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  return (

    <div className="sidebar">

      <h3>Menu</h3>

      <p onClick={() => navigate("/dashboard")}>
        Dashboard
      </p>

      <p onClick={() => navigate("/today")}>
        Today's Habits
      </p>

      <p onClick={() => navigate("/addhabit")}>
        Add Habit
      </p>

      <p onClick={() => navigate("/categories")}>
        Categories
      </p>

      <p onClick={() => navigate("/rewards")}>
        Rewards
      </p>

      <p onClick={() => navigate("/progress")}>
        Progress
      </p>

    </div>

  );

}

export default Sidebar;