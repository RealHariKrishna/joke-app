import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "krishna",
    password: "hari123",
  });
  let userData = localStorage.getItem("userData");

  useEffect(() => {
    if (userData !== null) {
      console.log(userData);
      navigate("/");
    }
  }, [userData, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    if (
      loginData.username === data.username &&
      loginData.password === data.password
    ) {
      setLoginData(data);
      toast.success("Login Successfull");
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/");
    } else {
      toast.error("Username or Password wrong");
    }
  };

  return (
    <div
      style={{ fontFamily: "Roboto, sans-serif" }}
      className="d-flex justify-content-center align-items-center"
    >
      <section className="container mx-auto px-3 px-md-5 py-5 py-md-10">
        <div className="w-50 mx-auto">
          <h1 className="text-2xl text-center text-dark mb-4 mb-md-8">Login</h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="mb-4 mb-md-6 flex-grow-1 w-75">
              <label htmlFor="username" className="form-label text-muted">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  minLength: {
                    value: 3,
                    message: "Username length must be at least 3 characters",
                  },
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                })}
                placeholder="Enter username"
                className={`form-control mt-2 rounded px-3 py-2 font-weight-bold ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              {errors.username?.message && (
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              )}
            </div>
            <div className="mb-4 mb-md-6 flex-grow-1 w-75">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                placeholder="Enter password"
                className={`form-control mt-2 rounded px-3 py-2 font-weight-bold ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password?.message && (
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary btn-lg btn-block w-75"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
