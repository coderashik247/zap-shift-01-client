import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const {register, formState:{errors}, handleSubmit} = useForm();
    const {signInUser} = useAuth();
    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.error(error);
        })            
        }
  return (
    <div className="card bg-base-100 w-full max-w-lg ">
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
      </form>
    </div>
  );
};

export default Login;
