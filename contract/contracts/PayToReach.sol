// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

contract PayToReach {
    struct P2RRecord {
        address artist;
        address fan;
        uint totalAmountPaid;
        uint256 credit;
        string creditType; // slow, average, fast
        uint256 creditCompleted;
        uint256 timestamp;
    }

    struct Artist {
        string name;
        int priceForOneCredit;
        int priceForThreeCredits;
        int priceForFiveCredits;
    }

    mapping(uint256 => P2RRecord) public p2rRecords;

    uint256 public numberOfP2RRecords = 0;

    // Artists
    mapping(address => Artist) public artists;

    // Register new artist
    function registerNewArtist(
        string calldata _name,
        int _priceForOneCredit,
        int _priceForThreeCredits,
        int _priceForFiveCredits
    ) public {
        // Check artist existed or not
        require(
            bytes(artists[msg.sender].name).length == 0,
            "Artist is already registered"
        );

        // Add new artist to artists
        artists[msg.sender] = Artist({
            name: _name,
            priceForOneCredit: _priceForOneCredit,
            priceForThreeCredits: _priceForThreeCredits,
            priceForFiveCredits: _priceForFiveCredits
        });
    }

    // Artist set bundle price
    function artistSetPrice(
        int _priceForOneCredit,
        int _priceForThreeCredits,
        int _priceForFiveCredits
    ) public {
        // Check artist existed or not
        require(
            bytes(artists[msg.sender].name).length > 0,
            "Artist does not exist"
        );

        // Update the prices
        artists[msg.sender].priceForOneCredit = _priceForOneCredit;
        artists[msg.sender].priceForThreeCredits = _priceForThreeCredits;
        artists[msg.sender].priceForFiveCredits = _priceForFiveCredits;
    }

    // Fans buy message credit
    function buyCredit(
        address _artist,
        uint256 _creditAmount,
        string calldata _creditType
    ) public payable {
        // Check artist existed or not
        require(
            bytes(artists[_artist].name).length > 0,
            "Artist does not exist"
        );

        // Validate credit amount
        require(
            _creditAmount == 1 || _creditAmount == 3 || _creditAmount == 5,
            "Invalid credit amount"
        );

        // Retrieve artist's price based on credit amount
        uint requiredPayment;
        if (_creditAmount == 1) {
            requiredPayment = uint256(artists[_artist].priceForOneCredit);
        } else if (_creditAmount == 3) {
            requiredPayment = uint256(artists[_artist].priceForThreeCredits);
        } else {
            requiredPayment = uint256(artists[_artist].priceForFiveCredits);
        }

        // Ensure correct amount is sent
        require(msg.value >= requiredPayment, "Incorrect payment amount");

        // Insert new p2rRecords
        p2rRecords[numberOfP2RRecords] = P2RRecord({
            fan: msg.sender,
            artist: _artist,
            totalAmountPaid: requiredPayment,
            credit: _creditAmount,
            creditType: _creditType,
            creditCompleted: 0,
            timestamp: block.timestamp
        });
        numberOfP2RRecords++;
    }

    // Artist claim reward
    function claimRewards(
        uint256 _p2rRecordUID,
        uint256 _totalNumberOfClaims
    ) public {
        // Check artist existed or not
        require(
            bytes(artists[msg.sender].name).length > 0,
            "Artist does not exist"
        );

        // Ensure the record UID is valid
        require(_p2rRecordUID < numberOfP2RRecords, "Invalid record UID");

        // Ensure the record has not been collected yet
        require(
            p2rRecords[_p2rRecordUID].creditCompleted <
                p2rRecords[_p2rRecordUID].credit,
            "Funds already fully claimed for this record"
        );

        // Ensure total number of claims is valid
        require(
            _totalNumberOfClaims + p2rRecords[_p2rRecordUID].creditCompleted <=
                p2rRecords[_p2rRecordUID].credit,
            "Total number of claims exceeded"
        );

        uint amountToTransfer = (p2rRecords[_p2rRecordUID].totalAmountPaid /
            p2rRecords[_p2rRecordUID].credit) * _totalNumberOfClaims;

        // Transfer the reward to artist
        (bool success, ) = msg.sender.call{value: amountToTransfer}("");
        require(success, "Transfer failed");
        p2rRecords[_p2rRecordUID].creditCompleted += _totalNumberOfClaims;
    }

    // Fans refund credit
    function refundCredits(
        uint256 _p2rRecordUID,
        uint256 _totalNumberOfRefunds
    ) public {
        // Check fan related or not
        require(
            p2rRecords[_p2rRecordUID].fan == msg.sender,
            "Fan is restricted"
        );

        // Ensure the record UID is valid
        require(_p2rRecordUID < numberOfP2RRecords, "Invalid record UID");

        // Ensure the record has not been collected yet
        require(
            p2rRecords[_p2rRecordUID].creditCompleted <
                p2rRecords[_p2rRecordUID].credit,
            "Funds already fully claimed for this record"
        );

        // Ensure total number of refunds is valid
        require(
            _totalNumberOfRefunds + p2rRecords[_p2rRecordUID].creditCompleted <=
                p2rRecords[_p2rRecordUID].credit,
            "Total number of claims exceeded"
        );

        uint amountToTransfer = (p2rRecords[_p2rRecordUID].totalAmountPaid /
            p2rRecords[_p2rRecordUID].credit) * _totalNumberOfRefunds;

        // Transfer the reward to artist
        (bool success, ) = msg.sender.call{value: amountToTransfer}("");
        require(success, "Transfer failed");
        p2rRecords[_p2rRecordUID].creditCompleted += _totalNumberOfRefunds;
    }

    // Getter return latest P2R ID
    function getLatestP2RID() public view returns (uint256) {
        return numberOfP2RRecords;
    }

    // Getter return slow, average, and fast credit remaining between fan and artist
    function getCreditRemainings(
        address _artist
    ) public view returns (uint256, uint256, uint256) {
        uint256 slowCredits = 0;
        uint256 averageCredits = 0;
        uint256 fastCredits = 0;

        for (uint256 i = 0; i < numberOfP2RRecords; i++) {
            P2RRecord memory record = p2rRecords[i];

            if (record.artist == _artist && record.fan == msg.sender) {
                uint256 remainingCredit = record.credit -
                    record.creditCompleted;

                if (
                    keccak256(abi.encodePacked(record.creditType)) ==
                    keccak256(abi.encodePacked("slow"))
                ) {
                    slowCredits += remainingCredit;
                } else if (
                    keccak256(abi.encodePacked(record.creditType)) ==
                    keccak256(abi.encodePacked("average"))
                ) {
                    averageCredits += remainingCredit;
                } else if (
                    keccak256(abi.encodePacked(record.creditType)) ==
                    keccak256(abi.encodePacked("fast"))
                ) {
                    fastCredits += remainingCredit;
                }
            }
        }
        return (slowCredits, averageCredits, fastCredits);
    }
}
