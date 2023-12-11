import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../axios/axios";

const LoginFormWrapper = styled.div`
  width: 430px;
  height: 450px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Form = styled.form`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  animation: slideIn 1s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 15px;
  border: 1px solid;
  font-size: 14px;
  font-size: 18px;
  width:90%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007200;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #007200;
  }
  font-size: 18px;
  width:95%;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  axios
    .get("admin/isLogined")
    .then((e) => navigate("/"))
    .catch((err) => {
      console.log(err);
    });

  const handleSubmit = (event) => {
    axios
      .post("admin/login", {
        login: username,
        password,
      })
      .then(({ data }) => setMessage(data))
      .catch(({ response }) => setMessage(response.data));
  };

  if (message.token) {
    navigate("/");
    localStorage.setItem("token", message.token);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginFormWrapper>
        <h2 style={{ textAlign: "center" }}>Մուտք</h2>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Մուտքանուն</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />

          <Label htmlFor="password">Գաղտնաբառ</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {console.log(message.success)}
        {message.success==false && <center><b style={{color:"red",letterSpacing:2+"px"}}>Սխալ մուտքանուն կամ գաղտնաբառ</b></center>}
        </Form>
        <SubmitButton type="submit" onClick={() => handleSubmit()}>
          Մուտք
        </SubmitButton>
      </LoginFormWrapper>
    </div>
  );
};

export default LoginForm;
