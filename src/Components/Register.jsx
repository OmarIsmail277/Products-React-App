import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const password = watch("password");

  const onSubmit = (data) => {
    // Simulate registration process
    console.log("Registration data:", data);
    
    // Show success message
    setIsSuccess(true);
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ 
        maxWidth: 350, 
        margin: "40px auto", 
        textAlign: "center",
        padding: "20px"
      }}>
        <div style={{ 
          fontSize: "48px", 
          marginBottom: "16px" 
        }}>
          ✅
        </div>
        <h2 style={{ color: "var(--success)", marginBottom: "8px" }}>
          Successfully Registered!
        </h2>
        <p style={{ color: "var(--gray)" }}>
          Redirecting to login page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 350, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Register</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          className="input"
          style={{ width: "100%" }}
        />
        {errors.email && <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
          className="input"
          style={{ width: "100%" }}
        />
        {errors.password && <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: value => value === password || "Passwords do not match"
          })}
          className="input"
          style={{ width: "100%" }}
        />
        {errors.confirmPassword && <p style={{ color: "red", margin: 0 }}>{errors.confirmPassword.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 8 }}>Register</button>
    </form>
  );
}

export default Register; 