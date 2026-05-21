import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {toggleTheme} from "../../store/themeSlice.js"
import { logoutUser } from '../../api/auth.js'

function Header() {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const { status, userData } = useSelector((state) => state.auth);

    const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    };

    
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 shadow-xl"
      style={{ background: "rgba(12, 19, 36, 0.6)" }}
    >
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5 md:px-16 h-20">
        
        {/* Logo */}
        <Link to="/">
          <span className="text-4xl md:text-6xl font-bold tracking-tighter"
            style={{ color: "#a4e6ff" }}
          >
            ReminderAI
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: "#bbc9cf" }}
          >
            {mode === "dark" ? "☀️" : "🌙"}
          </button>

          {status ? (
            <>
              <span className="hidden md:inline text-sm font-semibold"
                style={{ color: "#bbc9cf" }}
              >
                {userData?.name}
              </span>

              <Link to="/settings">
                <button className="text-sm font-semibold px-4 py-2 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: "#bbc9cf" }}
                >
                  Settings
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#00d1ff", color: "#003543" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-sm font-semibold px-4 py-2 transition-colors hover:bg-white/10 rounded-full"
                  style={{ color: "#bbc9cf" }}
                >
                  Login
                </button>
              </Link>
              
              <Link to="/signup">
                <button className="px-6 py-2 rounded-full text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#00d1ff", color: "#003543" }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
