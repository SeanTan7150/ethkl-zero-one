import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const handleVerify = async (proof) => {
  const res = await fetch("http://localhost:5001/api/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proof),
  });

  if (!res.ok) {
    throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
  }

  return res.json(); // Return the response for further processing
};

const onSuccess = async () => {
  const loggedInAddress = sessionStorage.getItem("loggedInAddress") ?? "";

  try {
    const res = await fetch(
      `http://localhost:5001/api/user/updateUser/${loggedInAddress}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ worldcoin_status: true }), // Update worldCoinStatus to true
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update user profile.");
    }

    const updatedUser = await res.json();
    console.log("User profile updated:", updatedUser);

    // Refresh the page
    window.location.reload();
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export default function VerifyButton() {
  return (
    <IDKitWidget
      app_id={import.meta.env.VITE_REACT_APP_APP_ID} // obtained from the Developer Portal
      action={import.meta.env.VITE_REACT_APP_ACTION_ID} // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Orb}
    >
      {({ open }) => (
        <button style={{ fontSize: "12px" }} onClick={open}>
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
}
