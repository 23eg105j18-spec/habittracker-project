import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function EditHabit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [goalDays, setGoalDays] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await API.get(`/habits/${id}`);
        console.log("Habit data:", res.data);

        setTitle(res.data.title || "");
        setGoalDays(res.data.goalDays || "");
      } catch (err) {
        console.log("Error fetching habit:", err);
        alert("Failed to load habit");
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  const updateHabit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/habits/${id}`, {
        title: title,
        goalDays: Number(goalDays),
      });

      alert("Habit updated successfully");
      navigate("/today");
    } catch (err) {
      console.log("Update error:", err);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Habit</h2>

        <form onSubmit={updateHabit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Habit title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Goal days"
            value={goalDays}
            onChange={(e) => setGoalDays(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Update Habit
          </button>
        </form>

        <button style={styles.backButton} onClick={() => navigate("/today")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default EditHabit;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef3fb",
  },
  card: {
    width: "380px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1d3557",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(to right, #5b6bd5, #7d3cff)",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  backButton: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#dfe7fd",
    color: "#1d3557",
    cursor: "pointer",
  },
};