import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reminders.css";

function Reminders() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([
    { id: 1, title: "Drink Water Reminder", time: "Every 30 minutes", enabled: true },
    { id: 2, title: "Sleep Reminder", time: "At 10 PM", enabled: false },
    { id: 3, title: "Study Reminder", time: "Every 1 hour", enabled: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const startAddReminder = () => {
    setShowForm(true);
    setEditingId(null);
    setTitle("");
    setTime("");
  };

  const startEditReminder = (reminder) => {
    setShowForm(true);
    setEditingId(reminder.id);
    setTitle(reminder.title);
    setTime(reminder.time);
  };

  const saveReminder = (e) => {
    e.preventDefault();

    if (!title.trim() || !time.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === editingId
            ? { ...reminder, title, time }
            : reminder
        )
      );
      alert("Reminder updated successfully");
    } else {
      const newReminder = {
        id: Date.now(),
        title,
        time,
        enabled: true,
      };
      setReminders((prev) => [...prev, newReminder]);
      alert("Reminder added successfully");
    }

    setShowForm(false);
    setEditingId(null);
    setTitle("");
    setTime("");
  };

  return (
    <div className="reminders-page">
      <div className="reminders-card">
        <div className="reminder-top">
          <div>
            <h1>🔔 Reminder System</h1>
            <p>Manage your daily reminders</p>
          </div>

          <button className="add-reminder-btn" onClick={startAddReminder}>
            + Add Reminder
          </button>
        </div>

        {showForm && (
          <form className="reminder-form" onSubmit={saveReminder}>
            <input
              type="text"
              placeholder="Reminder title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Time / Interval (example: Every 2 hours or At 9 PM)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <div className="form-buttons">
              <button type="submit" className="save-reminder-btn">
                {editingId ? "Update Reminder" : "Save Reminder"}
              </button>

              <button
                type="button"
                className="cancel-reminder-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setTitle("");
                  setTime("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="reminders-list">
          {reminders.map((reminder) => (
            <div className="reminder-item" key={reminder.id}>
              <div className="reminder-left">
                <h3>{reminder.title}</h3>
                <p>{reminder.time}</p>
              </div>

              <div className="reminder-actions">
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  onChange={() => toggleReminder(reminder.id)}
                />

                <button
                  className="edit-reminder-btn"
                  onClick={() => startEditReminder(reminder)}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-reminder-btn"
                  onClick={() => deleteReminder(reminder.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="back-reminder-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Reminders;