import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validation function
  const validateForm = (data) => {
    let newErrors = {};

    if (!data.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (data.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else {
      const password = data.password;
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password must include an uppercase letter.";
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = "Password must include a lowercase letter.";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must include a number.";
      } else if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = "Password must include a special character.";
      }
    }

    if (!data.role) {
      newErrors.role = "Role selection is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // ✅ Real-time validation
    const validationErrors = validateForm(updatedData);
    setErrors(validationErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted successfully:", formData);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });

      setTouched({});
      setLoading(false);
    }, 2000);
  };

  const isValid = Object.keys(errors).length === 0 &&
                  formData.username &&
                  formData.email &&
                  formData.password &&
                  formData.role;

  return (
    <div className="register-container">
      <form className="register-card fade-in" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>

        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              touched.username
                ? errors.username
                  ? "invalid"
                  : "valid"
                : ""
            }`}
          />
          {touched.username && errors.username && (
            <p className="error-text">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              touched.email ? (errors.email ? "invalid" : "valid") : ""
            }`}
          />
          {touched.email && errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              touched.password ? (errors.password ? "invalid" : "valid") : ""
            }`}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {touched.password && errors.password && (
            <p className="error-text">{errors.password}</p>
          )}
        </div>

        {/* Role */}
        <div className="form-group">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${
              touched.role ? (errors.role ? "invalid" : "valid") : ""
            }`}
          >
            <option value="">Select your role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
          {touched.role && errors.role && (
            <p className="error-text">{errors.role}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isValid || loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="login-link">
          Already a user? <a href="#">Log in here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;