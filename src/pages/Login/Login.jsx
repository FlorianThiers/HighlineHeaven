import React, { useState } from "react";
import style from "./Login.module.css";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = ({ authService, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    authService.login(username, password).then(() => {
      setIsLoading(false);
      // setNavigate(true);
      navigate(-1); // Go back
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authService.register(username, password).then(() => {
      setIsLoading(false);
      // setNavigate(true);
      navigate(-1); // Go back
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!username || !password) {
        setHovered(true);
    }
};

const handleMouseLeave = () => {
    if (username && password) {
        setHovered(false);
    }
};

// if (navigate) {
//   return <Navigate to="/" />;
// }


  if (isLoading) return <Loading />;
  else
    return (
      <div className={style.loginContainer}>

        {/* {error ? <span className={style.error}>{error}</span> : null} */}
{console.log(username, password, hovered)}

        <h2>Login</h2>
        <form className={style.loginForm}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            Show Password
          </label>

        
          <button
            className={`${style.form_button} ${
              (username == "" || password == "") && hovered ? style.invisible_button : ""
            }`}
            onClick={(e) => handleLogin(e)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Login
          </button>
          
          <button
            className={`${style.register} ${style.form_button}`}
            onClick={(e) => handleRegister(e)}
          >
            Register
          </button>
        </form>
      </div>
    );
};

export default Login;
