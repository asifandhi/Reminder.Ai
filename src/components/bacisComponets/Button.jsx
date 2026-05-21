import React from 'react'
import { useSelector } from 'react-redux'
import theme from "../../theme.js"

function Button({
    children,
  type = "button",
  className = "",
  variant = "primary", 
  disabled = false,
  ...props
}) 

{
    const mode = useSelector((state)=> state.theme.mode )
    const t = theme[mode];

    const base = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer";


    const variants = {
        primary: `text-white`,
        ghost: `bg-transparent border`,
        danger: `bg-red-500 hover:bg-red-600 text-white`,

    }
    let customStyle = {};

  if (variant === "primary") {
    customStyle = { backgroundColor: t.primary };
  } 
  else if (variant === "ghost") {
    customStyle = { borderColor: t.border, color: t.text };
  } 
  else {
    customStyle = {};   }
  return (
        <button
        type={type}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`}
        style={customStyle}
        {...props}

        >
            {children}

        </button>
  )
}

export default Button
