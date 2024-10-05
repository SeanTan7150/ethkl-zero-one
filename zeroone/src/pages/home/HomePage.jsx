import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [allArtists, setAllArtists] = React.useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  React.useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/user/getArtists");
        if (!res.ok) {
          throw new Error("Failed to fetch artists");
        }
        const data = await res.json();
        setAllArtists(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtists();
  }, []);

  const handleViewProfile = (artistAddress) => {
    // Redirect to the profile page with the artist's address as a query parameter
    navigate(`/profile?address=${artistAddress}`);
  };

  return (
    <div>
      {allArtists.length !== 0 ? "Artists" : "No Artists Available"}
      {allArtists.map((artist) => (
        <div key={artist._id}>
          <h2>{artist.address}</h2>
          <button onClick={() => handleViewProfile(artist.address)}>
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}
