import React from "react";

const UserCard = ({ name, email, city, phone, website, company }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{name}</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: "1rem",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  name: {
    marginBottom: "0.5rem",
    color: "#007BFF",
  },
};

export default UserCard;
