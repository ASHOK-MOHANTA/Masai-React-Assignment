import React from "react";
import useForm from "../Hooks/useForm";
const RegisterForm = () => {
  const { value, handelChanges, resetForm } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefalut();
    console.log("Register Form Submited", value);
    resetForm();
  };
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        name="name"
        value={value.username}
        placeholder="Enter Username"
        onChange={handelChanges}
      />
      <input
        type="email"
        name="email"
        value={value.email}
        placeholder="Enter Email"
        onChange={handelChanges}
      />
      <input
        type="password"
        name="password"
        value={value.password}
        placeholder="Enter Password"
        onChange={handelChanges}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
