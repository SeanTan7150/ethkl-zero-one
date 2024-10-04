import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const handleVerify = async (proof) => {
  const res = await fetch("http://localhost:5001/api/auth/verify", {
    // Change the URL to point to your backend
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proof),
  });

  if (!res.ok) {
    throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
  }
};

const onSuccess = () => {
  // TODO: Change the verify status to true
  console.log("Verification successful");

  //   window.alert(
  //     `Successfully verified with World ID!
  // Your nullifier hash is: ` + result.nullifier_hash
  //   );
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
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
      )}
      {}
    </IDKitWidget>
  );
}
