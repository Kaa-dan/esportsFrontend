import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import Imag from "../../../../assets/user/login/Login.mp4";

const wrapperStyle = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
};

const linkStyle = {
  fontWeight: "bold",
  fontSize: "2rem",
  color: "rgba(180, 80, 220, 1)",

  textDecoration: "none",
  transition: "color 0.3s, text-decoration 0.3s", // Smooth
};

const linkHoverStyle = {
  color: "white",
  // Tomato color on hover
  // textDecoration: "underline",
};
const HomePage = () => {
  return (
    <div style={{ color: "white", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: "black",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "4rem",
            }}
          >
            {/* <div style={{ flexShrink: 0 }}>
              <Link
                to="/"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Pro palayers Syndicate
              </Link>
            </div> */}
            <div style={wrapperStyle}>
              <Link
                to="/"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.textDecoration = linkHoverStyle.textDecoration;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.textDecoration = linkStyle.textDecoration;
                }}
              >
                ProGamers
              </Link>
            </div>
            <div style={{ display: "flex" }}>
              {/* <Link
                to="/auth/login"
                style={{
                  color: "#CBD5E0",
                  padding: "0.75rem",
                  textDecoration: "none",
                }}
              >
                Fans
              </Link> */}
              {/* <Link
                to="/auth/login"
                style={{
                  color: "#CBD5E0",
                  padding: "0.75rem",
                  textDecoration: "none",
                }}
              >
                Players
              </Link> */}
              <Link
                to="/auth/login"
                style={{
                  color: "rgba(180, 80, 220, 1)",
                  padding: "0.75rem",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.textDecoration = linkHoverStyle.textDecoration;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.textDecoration = linkStyle.textDecoration;
                }}
              >
                Login/Register
              </Link>
              {/* Add more links for other sections as needed */}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundSize: "cover",
            height: "90vh",
            width: "100vw",
            position: "relative",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={Imag} type="video/mp4" />
          </video>
        </div>
        {/* Main Content */}
        <div
          style={{
            position: "absolute",
            left:0,
            width: "100vw",
            height: "90vh",
            display: "flex",
          
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Welcome to ProGamers 
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
            Manage your teams, players, matches, and more!
          </p>

          {/* Features Section */}
          <section style={{ marginBottom: "2rem" }}>
          
            <ul
              style={{
                fontSize: "1.25rem",
                listStyleType: "disc",
                marginLeft: "2rem",
              }}
            >
              <li>Manage multiple esports teams</li>
              <li>Add, edit, and remove players</li>
              <li>Schedule matches and tournaments</li>
              <li>Track team and player statistics</li>
              {/* Add more features as needed */}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
