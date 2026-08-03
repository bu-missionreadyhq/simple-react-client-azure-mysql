// Import required modules
import { useEffect, useState } from "react";
import axios from "axios";

// Get the API_HOST from the .env file using Vite https://vite.dev/guide/env-and-mode#env-variables
const API_HOST = import.meta.env.VITE_API_HOST;
console.log("API_HOST:", API_HOST);

// Define the App component
const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch Oceania countries
  const fetchOceaniaCountries = async () => {
    try {
      const response = await axios.get(`${API_HOST}/oceania`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Oceania countries:", error.message);
      throw new Error("Failed to fetch Oceania countries");
    }
  };

  // Function to display Oceania countries
  useEffect(() => {
    const displayOceaniaCountries = async () => {
      try {
        const fetchedCountries = await fetchOceaniaCountries();
        if (fetchedCountries && fetchedCountries.length > 0) {
          setCountries(fetchedCountries);
        } else {
          setError("No countries found for Oceania.");
        }
      } catch (error) {
        console.log("Error displaying Oceania countries:", error);
        setError("Failed to display Oceania countries.");
      }
    };

    displayOceaniaCountries();
  }, []);

  return (
   <div
  style={{
    backgroundColor: "#014025",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
  }}
>
  <h1
    style={{
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "2rem",
      letterSpacing: "1px",
    }}
  >
    🌏 Oceania Countries
  </h1>

  {error && (
    <p
      style={{
        color: "#ffb3b3",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      {error}
    </p>
  )}

  <ul
    style={{
      listStyle: "none",
      padding: 0,
      margin: "0 auto",
      maxWidth: "700px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    {countries.map((country, index) => (
      <li
        key={index}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#02663d",
          padding: "18px 24px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          transition: "0.3s ease",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {country.Name}
        </span>

        <span
          style={{
            backgroundColor: "#ffffff22",
            padding: "8px 14px",
            borderRadius: "20px",
            fontWeight: "bold",
            color: "#d7ffd9",
          }}
        >
          {country.LifeExpectancy} yrs
        </span>
      </li>
    ))}
  </ul>
</div>
  );
};

// Export the App component
export default App;
