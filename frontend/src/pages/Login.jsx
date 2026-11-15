
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <Link to="/" className="login-brand">
          Shop<span>Ease</span>
        </Link>

        <div className="login-visual-content">
          <p className="login-visual-eyebrow">
            YOUR STYLE, YOUR SPACE
          </p>
          <h1>
            Welcome back to
            <br />
            <em>the finer things.</em>
          </h1>
          <p className="login-visual-description">
            Discover thoughtfully selected pieces designed to
            bring comfort, character, and timeless style into
            your everyday life.
          </p>
        </div>

        <p className="login-visual-footer">
          THOUGHTFULLY CURATED. BEAUTIFULLY YOURS.
        </p>
      </section>

      <section className="login-form-section">
        <div className="login-form-container">
          <Link to="/" className="login-mobile-brand">
            Shop<span>Ease</span>
          </Link>

          <div className="login-heading">
            <p className="login-eyebrow">WELCOME BACK</p>
            <h2>Sign in to your account</h2>
            <p>
              Enter your details below to access your ShopEase
              account.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>

              <div className="login-password-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="login-register-link">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>

          <p className="login-terms">
            By signing in, you agree to our Terms of Service
            and Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
