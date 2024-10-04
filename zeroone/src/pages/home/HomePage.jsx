const createUser = async () => {
  // Dummy data for user creation
  const dummyData = {
    address: "0x69e75a2346ae86c1c70f91216e464811a99ed87f",
    // username: "Justin Bieber",
    // profile_pic_url:
    //   "https://variety.com/wp-content/uploads/2017/09/justin_bieber.png", // Example profile picture URL
    // bio: `Justin Bieber is a Grammy-winning Canadian singer-songwriter known for hits like "Baby" and "Sorry." Rising to fame as a teen, he connects with millions through his evolving music and philanthropic efforts.`,
  };

  try {
    const res = await fetch("http://localhost:5001/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dummyData), // Include the dummy data in the request body
    });

    if (!res.ok) {
      throw new Error("Verification failed."); // Handle failed verification
    }

    const result = await res.json(); // Parse the response to JSON
    console.log("User created successfully:", result); // Log the success message and result
  } catch (error) {
    console.error("Error creating user:", error.message); // Log any errors encountered
  }
};

export default function HomePage() {
  return (
    <div>
      <button onClick={createUser}>Create User</button>
    </div>
  );
}
