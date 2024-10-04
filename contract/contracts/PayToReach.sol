// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

contract PayToReach {
    struct Interaction {
        address fan; // Fan's address
        address artist; // Artist's address
        uint256 remainingMessages; // Remaining messages in the fan's quota
        uint256 amountPaid; // Amount paid by the fan (e.g., 0.001 ETH)
        uint256 timestamp; // Timestamp of the last message sent
        uint8 status; // 0 = pending, 1 = complete
    }

    // Mapping to track interactions between fans and artists
    mapping(address => mapping(address => Interaction)) public interactions;

    // Event to log when messages are purchased
    event MessagesPurchased(
        address indexed fan,
        address indexed artist,
        uint256 amountPaid,
        uint256 messagesBought,
        uint256 timestamp
    );

    // Event to log when a message is sent
    event MessageSent(
        address indexed fan,
        address indexed artist,
        uint256 remainingMessages
    );

    // Event to log when a refund is issued
    event RefundIssued(address indexed fan, uint256 amountRefunded);

    // Event to log when payment is sent to the artist
    event PaymentReleased(address indexed artist, uint256 amountReleased);

    // Number of days after which a refund can be issued if no reply
    uint256 public refundPeriod = 7 days;

    // Set a price for a message package (e.g., 5 messages for 0.001 ETH)
    uint256 public messagePrice = 0.001 ether;
    uint256 public messagesPerPayment = 5;

    // Function for fans to pay for messages
    function buyMessages(address _artist) external payable {
        require(msg.value == messagePrice, "Incorrect payment amount");
        require(
            interactions[msg.sender][_artist].status == 0,
            "Interaction already in progress"
        );

        // Record the interaction
        interactions[msg.sender][_artist] = Interaction({
            fan: msg.sender,
            artist: _artist,
            remainingMessages: messagesPerPayment,
            amountPaid: msg.value,
            timestamp: block.timestamp,
            status: 0
        });

        emit MessagesPurchased(
            msg.sender,
            _artist,
            msg.value,
            messagesPerPayment,
            block.timestamp
        );
    }

    // Function to send a message
    function sendMessage(address _artist) external {
        Interaction storage interaction = interactions[msg.sender][_artist];
        require(interaction.remainingMessages > 0, "No remaining messages");
        require(interaction.status == 0, "Interaction already completed");

        // Update remaining messages and timestamp
        interaction.remainingMessages -= 1;
        interaction.timestamp = block.timestamp;

        emit MessageSent(msg.sender, _artist, interaction.remainingMessages);
    }

    // Function to confirm that the artist has replied
    function artistReply(address _fan) external {
        Interaction storage interaction = interactions[_fan][msg.sender];
        require(
            interaction.artist == msg.sender,
            "Only the artist can confirm"
        );
        require(interaction.status == 0, "Interaction already completed");

        // Transfer the payment to the artist
        uint256 amountPaid = interaction.amountPaid;
        interaction.status = 1;
        payable(msg.sender).transfer(amountPaid);

        emit PaymentReleased(msg.sender, amountPaid);
    }

    // Function to check if the refund period has passed and issue a refund
    function requestRefund(address _artist) external {
        Interaction storage interaction = interactions[msg.sender][_artist];
        require(interaction.status == 0, "Interaction already completed");
        require(
            block.timestamp >= interaction.timestamp + refundPeriod,
            "Refund period has not passed"
        );

        // Issue a refund to the fan
        uint256 amountPaid = interaction.amountPaid;
        interaction.status = 1;
        payable(msg.sender).transfer(amountPaid);

        emit RefundIssued(msg.sender, amountPaid);
    }

    // Helper function to check remaining messages for an interaction
    function getRemainingMessages(
        address _fan,
        address _artist
    ) external view returns (uint256) {
        return interactions[_fan][_artist].remainingMessages;
    }

    // Function to adjust the message price and refund period (for contract owner)
    function setParameters(
        uint256 _messagePrice,
        uint256 _refundPeriod
    ) external {
        messagePrice = _messagePrice;
        refundPeriod = _refundPeriod;
    }
}
