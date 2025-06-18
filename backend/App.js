 import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    course: "",
    faculty: "",
    comments: "",
    rating: 1,
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [login, setLogin] = useState({ user: "", pass: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/feedback", form);
    alert("Feedback submitted");
    setForm({ studentName: "", course: "", faculty: "", comments: "", rating: 1 });
  };

  const handleLogin = () => {
    if (login.user === "admin" && login.pass === "admin123") {
      setIsAdmin(true);
      fetchFeedbacks();
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/feedback");
    setFeedbacks(res.data);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      {!isAdmin ? (
        <>
          <h2>Student Feedback Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Student Name"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            /><br /><br />
            <input
              placeholder="Course Name"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            /><br /><br />
            <input
              placeholder="Faculty Name"
              value={form.faculty}
              onChange={(e) => setForm({ ...form, faculty: e.target.value })}
            /><br /><br />
            <textarea
              placeholder="Comments"
              value={form.comments}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
            /><br /><br />
            <label>Rating (1-5): </label>
            <input
              type="number"
              min="1"
              max="5"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            /><br /><br />
            <button type="submit">Submit Feedback</button>
          </form>

          <hr />
          <h3>Admin Login</h3>
          <input
            placeholder="Username"
            value={login.user}
            onChange={(e) => setLogin({ ...login, user: e.target.value })}
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={login.pass}
            onChange={(e) => setLogin({ ...login, pass: e.target.value })}
          /><br /><br />
          <button onClick={handleLogin}>Login as Admin</button>
        </>
      ) : (
        <>
          <h2>All Feedbacks</h2>
          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Faculty</th>
                <th>Comments</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={index}>
                  <td>{fb.studentName}</td>
                  <td>{fb.course}</td>
                  <td>{fb.faculty}</td>
                  <td>{fb.comments}</td>
                  <td>{fb.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
