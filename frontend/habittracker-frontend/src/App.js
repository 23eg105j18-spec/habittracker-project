import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import TodayHabits from "./pages/TodayHabits";
import Reminders from "./pages/Reminders";
import EditHabit from "./pages/EditHabit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/today" element={<TodayHabits />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/edit/:id" element={<EditHabit />} />
      </Routes>
    </Router>
  );
}

export default App;