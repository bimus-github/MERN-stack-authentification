import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();

  useEffect(() => {
    message(error);

    clearError();
  }, [error, clearError, message]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (even) => {
    setForm({ ...form, [even.target.name]: even.target.value });
  };

  const registerHandler = async () => {
    try {
      console.log(await request("/api/auth/register", "POST", { ...form }));
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data);
      message(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>

            <div>
              <div className="input-field">
                <input
                  placeholder="Create Email"
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div>
              <div className="input-field">
                <input
                  placeholder="Create Passwor"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              disabled={loading}
              onClick={loginHandler}
            >
              Open
            </button>

            <button
              className="btn grey light-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
