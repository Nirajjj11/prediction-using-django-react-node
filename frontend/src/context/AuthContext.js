import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);

      useEffect(() => {
            const stored = localStorage.getItem("user");
            console.log("INIT USER:", stored);
            if (stored) setUser(JSON.parse(stored));
      }, []);

      const login = (data) => {
            console.log("LOGIN DATA:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
      };

      const logout = () => {
            console.log("LOGOUT");
            localStorage.clear();
            setUser(null);
      };

      return (
            <AuthContext.Provider value={{ user, login, logout }}>
                  {children}
            </AuthContext.Provider>
      );
};