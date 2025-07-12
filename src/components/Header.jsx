import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore.js";
import { Worm, Moon, Sun, Trophy, LogOut, User } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore.js";

const Header = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="bg-base-300 fixed top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-3 text-2xl font-semibold">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Worm className="h-5 w-5 text-accent" />
              </div>
              <h1 className="text-lg font-bold">Akim<span className="text-accent">Snake</span></h1>
            </Link>
          </div>

          <div className="items-center gap-2 hidden sm:flex mr-2">
            <button type="button" className="btn btn-sm btn-neutral" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link to="/leaderboard" className={`btn btn-sm btn-neutral gap-2 transition-colors`}>
              <Trophy className="w-4 h-4" />
              <span className="hidden lg:inline">Leaderboard</span>
            </Link>
          </div>



          {authUser && (
            <div className="flex items-center gap-2">
              <Link to="/profile" className={`btn btn-sm btn-neutral gap-2 transition-colors hidden sm:flex`}>
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">Profile</span>
              </Link>
              <button type="button" className="btn btn-sm flex gap-2 items-center btn-error" onClick={logout}>
                <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
            
          )}
        </div>
      </div>
    </header>
  )
}

export default Header