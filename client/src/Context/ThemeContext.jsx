import { createContext, useState } from "react";

export const ThemeContext = createContext()

// ThemeContext For Dark AND light theme mode

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(false)

  let toggleThemeMode = () => {
    setThemeMode(!themeMode)
  }
  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}