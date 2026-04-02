import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (

    <div className="navbar">

      <h2>HabitTracker</h2>

      <div>

        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/today")}>
          Today
        </button>

        <button onClick={() => navigate("/addhabit")}>
          Add Habit
        </button>

      </div>

    </div>

  );

}

export default Navbar;