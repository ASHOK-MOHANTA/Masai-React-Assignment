import React, { useState, useEffect } from "react";
import UserCard from "./components/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError("Oops! Unable to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  if (loading) return <h2 style={{ padding: "2rem" }}>Loading user profiles...</h2>;
  if (error) return <h2 style={{ padding: "2rem", color: "red" }}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1>User Profiles</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />
      <div style={styles.cardGrid}>
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            city={user.address.city}
            phone={user.phone}
            website={user.website}
            company={user.company.name}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  search: {
    padding: "0.5rem",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },
};

export default App;
