import React from "react";

function HabitCard({ habit, onComplete }) {

  return (
    <div className="habit-card">

      <h3>{habit.name}</h3>

      <p>Streak: {habit.streak}</p>

      <button onClick={() => onComplete(habit.id)}>
        Complete
      </button>

    </div>
  );

}

export default HabitCard;