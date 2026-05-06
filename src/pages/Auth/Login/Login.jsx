import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
    const {register, formState:{errors}, handleSubmit} = useForm();
    const {signInUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("in the Login Page", location);

    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user)
            navigate(location?.state || "/");
        })
        .catch(error => {
            console.error(error);
        })            
        }
    
  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
        <h2 className="text-3xl text-center text-secondary pt-4">Welcome Back</h2>
        <p className="text-center">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
            {/* Email */}
          <label className="label">Email</label>
          <input type="email" {...register("email", {required:true})} className="input w-full" placeholder="Email" />

          {errors.email?.type === "required" && <p className="text-error">Eamil is required</p>}

          {/* Password */}
          <label className="label">Password</label>
          <input type="password" {...register("password", {required:true, minLength:6 })} className="input w-full" placeholder="Password" />

          {errors.password?.type === "required" && <p className="text-error">Password is required</p>}
          {errors.password?.type === "minLength" && <p className="text-error">Password must be at least 6 character</p>}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-secondary font-bold mt-4">Login</button>
        </fieldset>
        <p className="flex justify-start items-center gap-2">Are you new to Zap Shift? <Link to="/register" state={location.state} className="font-bold text-lg text-primary underline"> Register</Link></p>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Login;
