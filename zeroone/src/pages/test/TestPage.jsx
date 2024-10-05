import { useState } from "react";
import { useContractContext } from "../../context";

export default function TestPage() {
  const [artistName, setArtistName] = useState("");
  const [price1, setPrice1] = useState(0);
  const [price3, setPrice3] = useState(0);
  const [price5, setPrice5] = useState(0);

  const [newPrice1, setNewPrice1] = useState(0);
  const [newPrice3, setNewPrice3] = useState(0);
  const [newPrice5, setNewPrice5] = useState(0);

  const [buyCreditArtistAddress, setBuyCreditArtistAddress] = useState("");
  const [buyCreditCreditAmount, setBuyCreditCreditAmount] = useState(1);
  const [buyCreditCreditType, setBuyCreditCreditType] = useState("fast");
  const [buyCreditCreditSend, setBuyCreditCreditSend] = useState(0);

  const [claimRewardP2RID, setClaimRewardP2RID] = useState("0");
  const [claimRewardNumberOfClaims, setClaimRewardNumberOfClaims] = useState(0);

  const [refundCreditP2RID, setRefundCreditP2RID] = useState("0");
  const [refundCreditNumberOfRefunds, setRefundCreditNumberOfRefunds] =
    useState(0);

  const {
    registerNewArtist,
    artistSetPrice,
    buyCredit,
    claimRewards,
    refundCredits,
  } = useContractContext();

  const handleRegisterNewArtist = async (event) => {
    event.preventDefault();
    try {
      const confirmed = confirm(`Register as ${artistName}???`);
      if (!confirmed) {
        return;
      }

      await registerNewArtist(artistName, price1, price3, price5);
      console.log("Register new artist success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleArtistSetPrice = async (event) => {
    event.preventDefault();
    try {
      await artistSetPrice(newPrice1, newPrice3, newPrice5);
      console.log("Price updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyCredit = async (event) => {
    event.preventDefault();
    const confirmed = confirm(
      `Buy credit details confirm:\nArtist: ${buyCreditArtistAddress}\nAmount: ${buyCreditCreditAmount}\nType: ${buyCreditCreditType}`
    );
    if (!confirmed) {
      return;
    }
    try {
      await buyCredit(
        buyCreditArtistAddress,
        buyCreditCreditAmount,
        buyCreditCreditType,
        buyCreditCreditSend
      );
      console.log("Credit purchased successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClaimRewards = async (event) => {
    event.preventDefault();
    try {
      await claimRewards(claimRewardP2RID, claimRewardNumberOfClaims);
      console.log("Reward claimed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefundCredits = async (event) => {
    event.preventDefault();
    try {
      await refundCredits(refundCreditP2RID, refundCreditNumberOfRefunds);
      console.log("Credit refunded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>Register New Artist</div>
      <form autoComplete="off">
        <label>Artist name: </label>
        <input
          type="text"
          placeholder="sean"
          onChange={(e) => {
            setArtistName(e.target.value);
          }}
          value={artistName}
          required
        />
        <br />
        <label>Price for 1 credit: </label>
        <input
          type="number"
          placeholder="1"
          onChange={(e) => {
            setPrice1(e.target.value);
          }}
          value={price1}
          required
        />
        <br />
        <label>Price for 3 credits: </label>
        <input
          type="number"
          placeholder="2"
          onChange={(e) => {
            setPrice3(e.target.value);
          }}
          value={price3}
          required
        />
        <br />
        <label>Price for 5 credits: </label>
        <input
          type="number"
          placeholder="3"
          onChange={(e) => {
            setPrice5(e.target.value);
          }}
          value={price5}
          required
        />
        <br />
        <button type="submit" onClick={handleRegisterNewArtist}>
          Register
        </button>
      </form>

      <hr />

      <div>Artist Set Price</div>
      <form autoComplete="off">
        <label>Price for 1 credit: </label>
        <input
          type="number"
          placeholder="1"
          onChange={(e) => {
            setNewPrice1(e.target.value);
          }}
          value={newPrice1}
          required
        />
        <br />
        <label>Price for 3 credits: </label>
        <input
          type="number"
          placeholder="2"
          onChange={(e) => {
            setNewPrice3(e.target.value);
          }}
          value={newPrice3}
          required
        />
        <br />
        <label>Price for 5 credits: </label>
        <input
          type="number"
          placeholder="3"
          onChange={(e) => {
            setNewPrice5(e.target.value);
          }}
          value={newPrice5}
          required
        />
        <br />
        <button type="submit" onClick={handleArtistSetPrice}>
          Update
        </button>
      </form>

      <hr />

      <div>Fan Buy Credit</div>
      <form autoComplete="off">
        <label>Artist address: </label>
        <input
          type="text"
          placeholder="0xartist"
          onChange={(e) => {
            setBuyCreditArtistAddress(e.target.value);
          }}
          value={buyCreditArtistAddress}
          required
        />
        <br />
        <label>Credit Bundle: </label>
        <select
          onChange={(e) => {
            setBuyCreditCreditAmount(e.target.value);
          }}
        >
          <option value={1}>1 Credit</option>
          <option value={3}>3 Credits</option>
          <option value={5}>5 Credits</option>
        </select>
        <br />
        <label>Credit Type: </label>
        <select
          onChange={(e) => {
            setBuyCreditCreditType(e.target.value);
          }}
        >
          <option value="fast">Fast - 1 day reach</option>
          <option value="average">Average - 3 days reach</option>
          <option value="slow">Slow - 5 days reach</option>
        </select>
        <br />
        <label>ETH to be sent: </label>
        <input
          type="number"
          placeholder="0"
          onChange={(e) => {
            setBuyCreditCreditSend(e.target.value);
          }}
          value={buyCreditCreditSend}
          required
        />
        <br />
        <button type="submit" onClick={handleBuyCredit}>
          Buy Credit
        </button>
      </form>

      <hr />

      <div>Artist Claim Reward</div>
      <form autoComplete="off">
        <label>P2R ID: </label>
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setClaimRewardP2RID(e.target.value);
          }}
          value={claimRewardP2RID}
          required
        />
        <br />
        <label>Number of claims: </label>
        <input
          type="number"
          placeholder="0"
          onChange={(e) => {
            setClaimRewardNumberOfClaims(e.target.value);
          }}
          value={claimRewardNumberOfClaims}
          required
        />
        <br />
        <button type="submit" onClick={handleClaimRewards}>
          Claim
        </button>
      </form>

      <hr />

      <div>Fan Refund Credit</div>
      <form autoComplete="off">
        <label>P2R ID: </label>
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setRefundCreditP2RID(e.target.value);
          }}
          value={refundCreditP2RID}
          required
        />
        <br />
        <label>Number of refunds: </label>
        <input
          type="number"
          placeholder="0"
          onChange={(e) => {
            setRefundCreditNumberOfRefunds(e.target.value);
          }}
          value={refundCreditNumberOfRefunds}
          required
        />
        <br />
        <button type="submit" onClick={handleRefundCredits}>
          Refund
        </button>
      </form>

      <hr />
    </>
  );
}
