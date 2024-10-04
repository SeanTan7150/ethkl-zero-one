import React from "react";

export default function HomePage() {
  const [allArtists, setAllArtists] = React.useState([]);

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

  return <div>{allArtists.length !== 0 ? "Artist" : "No"}</div>;
}
