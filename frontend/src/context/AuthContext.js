// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  console.log (localStorage.getItem('access_token'))
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch authenticated user on component mount
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await fetch(
          `${api}/authenticated_user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      } finally {
        // Set userDataLoaded to true once the operation is complete
        setUserDataLoaded(true);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  const login = (formData) => {

    fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    .then(response=>response.json()) 
      .then(response=>{
      console.log (response)
      
      
      
      if (response.access_token) {
        navigate("/")
        localStorage.setItem("access_token", response.access_token);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.error || "Something went wrong!",
        });
      }
})
  }
  const logout = async () => {
    try {
      const response = await fetch(`${api}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("access_token");
        Swal.fire({
          icon: "success",
          title: "Logout Successful!",
          text: "Hope to see you again!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const response = await fetch(`${api}/users/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Corrected syntax
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, ...updatedData }));
      }
  
      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };