import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import HomeView from "./pages/HomeView"
import Header from "./components/Header.jsx"
import SignInView from "./pages/auth/SignInView.jsx"
import SignUpView from "./pages/auth/SignUpView.jsx"
import LeaderboardView from "./pages/LeaderboardView.jsx"
import ProfileView from "./pages/ProfileView.jsx"
import Navbar from "./components/Navbar.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { LoaderCircle } from "lucide-react"
import { useThemeStore } from "./store/useThemeStore.js"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>

      <Header />

      <Routes>
        <Route path="/" element={authUser ? <HomeView /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!authUser ? <SignUpView /> : <Navigate to="/" />} />
        <Route path="/signin" element={!authUser ? <SignInView /> : <Navigate to="/" />} />
        <Route path="/leaderboard" element={<LeaderboardView />} />
        <Route path="/profile" element={authUser ? <ProfileView /> : <Navigate to="/signin" />} />
      </Routes>

      <Toaster />

      <Navbar />

    </div>
  )
}

export default App