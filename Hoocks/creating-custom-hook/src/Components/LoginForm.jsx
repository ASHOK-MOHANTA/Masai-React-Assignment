import React from "react";
import useForm from "../Hooks/useForm";

const LoginForm = () => {
  const { value, handelChanges, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Submited Value:", value);
    resetForm();
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        type="email"
        name="email"
        value={value.email}
        placeholder="email"
        onChange={handelChanges}
      />
      <input
        type="password"
        name="password"
        value={value.password}
        onChange={handelChanges}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
