import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      
      const loginCheck = await API.post('/user/login', {
        emailId: formData.email,
        password: formData.password,
      });

      if (loginCheck.data.status == 'Success') {
        console.log('Login Successful');
        localStorage.setItem('token', loginCheck.data.accessToken);
        navigate('/dashboard');
      }
      
      setFailedLogin(true);
    } catch (error) {
      console.log('User Login Failed');
      setFailedLogin(true);
    }
    setIsLoading(false);
    console.log("Login user:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col justify-center items-center px-4 py-12 antialiased select-none">
      
      <motion.div 
        key={location.pathname} // Handles soft navigation between routes
        variants={containerVariants}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"} // Handles hard refreshes natively
        className="w-full flex flex-col items-center"
      >
        
        {/* Brand Header */}
        <motion.div variants={itemVariants} className="mb-10 text-center flex flex-col items-center gap-2">
          <span className="object-center text-2xl font-bold tracking-[0.18em] uppercase text-white/90">
            Llum<span className="text-center text-white/40 font-medium">io</span>
          </span>
          <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">
            Unified AI Engine
          </p>
        </motion.div>

        {/* Main Authentication Card */}
        <motion.div variants={itemVariants} className="w-full max-w-sm bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-sm font-medium text-white/80 text-center mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-medium text-white/40 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/5 text-white placeholder-white/20 rounded-lg py-2.5 px-4 text-sm outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium text-white/40 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 text-white placeholder-white/20 rounded-lg py-2.5 pl-4 pr-10 text-sm outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all duration-200"
                />
                
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2.5 px-4 rounded-lg bg-white hover:bg-white/90 text-sm text-[#0A0A0A] font-semibold transition-colors flex items-center justify-between group"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#0A0A0A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </>
              ) : (
                <>
                  Login
                  <span className="text-xs opacity-60 group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>
          <div className = "w-full items-center text-center">
            {failedLogin ? (
              <p className="mt-5 text-[12px] font-semibold opacity-75">
                Invalid Email or Password!
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="pt-6 mt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/40">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;