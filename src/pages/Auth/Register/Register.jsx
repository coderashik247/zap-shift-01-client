import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
    })
    .catch(error => {
      console.error(error);
    })
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <h2 className="text-3xl text-center text-secondary pt-4">Create an Account</h2>
        <p className="text-center">Please Register</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-error">Email is required</p>
          )}
          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password "
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-error">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error">Password must be at least 6 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-error">
              Password must contain uppercase, lowercase, number and special
              character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-secondary font-bold mt-4">Register</button>
        </fieldset>
        <p className="flex justify-start items-center gap-2">Already have an account?<Link to="/login" className="font-bold text-lg text-primary underline"> Login</Link></p>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Register;
