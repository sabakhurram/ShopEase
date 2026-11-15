
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="register-success-page">
        <div className="register-success-card">
          <CheckCircle2 size={48} />
          <h1>Account Created!</h1>
          <p>
            Your ShopEase account has been created successfully.
            You can now sign in and start exploring our collection.
          </p>
          <button onClick={() => navigate("/login")}>
            Continue to Login <ArrowRight size={17} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="register-page">
      <section className="register-visual">
        <div className="register-visual-overlay" />

        <Link to="/" className="register-brand">
          ShopEase<span>.</span>
        </Link>

        <div className="register-visual-content">
          <p className="register-visual-eyebrow">
            A MORE CONSIDERED WAY TO SHOP
          </p>
          <h1>
            Discover your
            <br />
            everyday <em>essentials.</em>
          </h1>
          <p className="register-visual-description">
            Thoughtfully selected pieces, timeless designs,
            and little details that make everyday living special.
          </p>
        </div>

        <p className="register-visual-footer">
          CURATED FOR THE WAY YOU LIVE.
        </p>
      </section>

      <section className="register-form-section">
        <div className="register-form-container">
          <Link to="/" className="register-mobile-brand">
            ShopEase<span>.</span>
          </Link>

          <div className="register-heading">
            <p className="register-eyebrow">JOIN THE COLLECTION</p>
            <h2>Create your account</h2>
            <p>
              Sign up to enjoy a more personal shopping experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-field">
              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Email Address</label>
              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Password</label>
              <div className="register-password-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <small>Use at least 6 characters.</small>
            </div>

            <div className="register-field">
              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>
              <div className="register-password-wrapper">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-submit-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="register-login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="register-terms">
            By creating an account, you agree to our terms of service
            and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
