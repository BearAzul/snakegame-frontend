import { Link } from "react-router-dom"
import { User, Trophy, Moon, Sun } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore.js"
import { useThemeStore } from "../store/useThemeStore.js"

const Navbar = () => {
  const { authUser } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore();
  return (
    <nav className="sm:hidden fixed w-full bottom-0 bg-base-100 flex items-center justify-center">
      <div className="container px-6 pt-3 pb-4">
        <div className={`grid  ${authUser ? "grid-cols-3" : "grid-cols-2"} gap-2 text-center`}>
          {authUser && (
            <Link to="/profile" className={`btn btn-sm btn-neutral gap-2 transition-colors py-4`}>
              <User className="w-5 h-5 text-accent" />
            </Link>
          )}

          <Link to="leaderboard" className={`btn btn-sm btn-neutral gap-2 transition-colors py-4`}>
            <Trophy className="w-5 h-5 text-accent" />

          </Link>
          <button type="button" className="btn btn-sm btn-neutral gap-2 transition-colors py-4" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-5 h-5 text-accent" /> : <Sun className="w-5 h-5 text-accent" />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar