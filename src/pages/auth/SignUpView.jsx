import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { LoaderCircle, Eye, EyeOff, Lock, User } from "lucide-react";


const SignUpView = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username harus diisi")
    if (!formData.password) return toast.error("Password harus diisi")
    if (formData.password.length < 6) return toast.error("Password paling tidak memiliki 6 karakter")

    return true
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signUp(formData)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-base rounded-lg">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">Buat Akun</h1>
          <p className="text-base-content/60">Selamat datang, jadilah master Snake</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="username">
              <span className="text-base-content/60 label-text">Username:</span>
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/60 z-10" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="w-full input input-bordered pl-10"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="text-base-content/60 label-text">Password:</span>
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/60 z-10" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full input input-bordered pl-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="absolute inset-y-0 right-0 flex pr-3 items-center z-10" onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <EyeOff className="size-5 text-base-content/60" />
                ) : (
                  <Eye className="size-5 text-base-content/60" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? <LoaderCircle className="animate-spin" /> : "Daftar"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Sudah punya akun?
            <Link to="/signin" className="link link-primary pl-2">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpView