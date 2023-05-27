import { useEffect, useState } from "react";
import pflText from "../Assets/pflt.png";
import Spinner from "react-bootstrap/Spinner";
import "./points.css";
import logo1 from "../Assets/FALCONS.png";
import logo2 from "../Assets/PANTHERS.png";
import logo3 from "../Assets/PHOENIX.png";
import logo4 from "../Assets/SEAHAWKS.png";

export default function Points() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGreenColor, setIsGreenColor] = useState(false); // Controlling the color

  useEffect(() => {
    const storedTeamData = localStorage.getItem("teamData");
    if (storedTeamData) {
      const parsedTeamData = JSON.parse(storedTeamData);
      const sortedTeamData = parsedTeamData.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        } else {
          return b.gf - b.ga - (a.gf - a.ga);
        }
      });

      setTimeout(() => {
        setTeamData(sortedTeamData);
        setLoading(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    setIsGreenColor(false); // Set isGreenColor to true when the useState is true
  }, [isGreenColor]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <>
          <img
            src={pflText}
            alt="Logo"
            style={{
              display: "block",
              margin: "auto",
              width: "300px",
              marginTop: "90px",
            }}
          />
          <div style={{ marginTop: "50px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
              <div className="main-table">
                <p className="card-header pos">Pos</p>
                <p className="card-header name">Club Name</p>
                <p className="card-header">MP</p>
                <p className="card-header">W</p>
                <p className="card-header">D</p>
                <p className="card-header">L</p>
                <p className="card-header">GF</p>
                <p className="card-header">GA</p>
                <p className="card-header">+/-</p>
                <p className="card-header">Points</p>
              </div>
            </div>
            {teamData.map((team, index) => (
              <div
                style={{ display: "flex", justifyContent: "center" }}
                key={index}
              >
                <div className={`table ${isGreenColor && index < 2 ? "green-row" : ""}`}>
                  <p className="card-header pos">{index + 1}</p>
                  <p className="card-header name">
                    <img
                      src={getLogoByTeam(team.clubName)}
                      style={{
                        width: "44px",
                        marginRight: "10px",
                        backgroundColor: team.color,
                        borderRadius: "50px",
                        padding: "5px",
                      }}
                      alt="Logo"
                    />
                    {team.clubName}
                  </p>
                  <p className="card-header">{team.mp}</p>
                  <p className="card-header">{team.win}</p>
                  <p className="card-header">{team.draw}</p>
                  <p className="card-header">{team.lose}</p>
                  <p className="card-header">{team.gf}</p>
                  <p className="card-header">{team.ga}</p>
                  <p className="card-header">{team.gf - team.ga}</p>
                  <p className="card-header">{team.points}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getLogoByTeam(clubName) {
  switch (clubName) {
    case "FALCONS":
      return logo1;
    case "PANTHERS":
      return logo2;
    case "PHOENIX":
      return logo3;
    case "SEAHAWKS":
      return logo4;
    default:
      return null;
  }
}
