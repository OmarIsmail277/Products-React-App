import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();

  const onSubmit = (data) => {
    // Simulate login process
    console.log("Login data:", data);
    
    // Extract username from email (everything before @)
    const username = data.email.split('@')[0];
    
    // Login the user with username
    login({ username, email: data.email });
    
    // Show success message
    setIsSuccess(true);
    
    // Redirect to homepage after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
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
          🎉
        </div>
        <h2 style={{ color: "var(--success)", marginBottom: "8px" }}>
          Successfully Logged In!
        </h2>
        <p style={{ color: "var(--gray)" }}>
          Redirecting to homepage...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 350, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
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
          {...register("password", { required: "Password is required" })}
          className="input"
          style={{ width: "100%" }}
        />
        {errors.password && <p style={{ color: "red", margin: 0 }}>{errors.password.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 8 }}>Login</button>
    </form>
  );
}

export default Login; 