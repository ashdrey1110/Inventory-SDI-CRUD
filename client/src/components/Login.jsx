import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "./Nav";
import { useAuth } from "./Auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormInfo) => ({
      ...prevFormInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (createAccount) {
      const { firstName, lastName, username, password } = formData;

      const userData = {
        firstName,
        lastName,
        username,
        password,
      };

      try {
        const res = await fetch("http://localhost:8081/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await res.json();
        if (res.ok) {
          setCreateAccount(false);
          navigate(`/login`);
        } else {
          console.error("error:", data.error);
        }
      } catch (error) {
        console.error("Failed to create account", error);
      }
    } else {
      const { username, password } = formData;

      try {
        const res = await fetch("http://localhost:8081/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
          login(data.user);
          navigate("/myinventory");
        } else {
          console.error("error:", data.error);
        }
      } catch (error) {
        console.error("Failed to login:", error);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <Form onSubmit={handleSubmit}>
          {!createAccount && <div className="login-title">Sign In</div>}
          {createAccount && (
            <div className="create-account-title">Create Account</div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {createAccount && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            {createAccount ? "Create Account" : "Login"}
          </Button>

          <Button
            variant="link"
            onClick={() => setCreateAccount(!createAccount)}
          >
            {createAccount
              ? "Already have an account? Login"
              : "Don't have an account? Create one"}
          </Button>
        </Form>
      </div>
    </>
  );
}
