// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "OAO/contracts/interfaces/IAIOracle.sol";
import "OAO/contracts/AIOracleCallbackReceiver.sol";

contract Prompt is AIOracleCallbackReceiver {
    struct AIRequest {
        uint256 modelId;
        address sender;
        bytes prompt;
        bytes output;
    }

    event promptRequested(
        uint256 requestId,
        uint256 modelId,
        address sender,
        string prompt
    );

    event promptUpdated(
        uint256 requestId,
        uint256 modelId,
        string prompt,
        string output,
        bytes callbackData
    );

    mapping(uint256 => mapping(string => string)) public prompts;
    mapping(uint256 => AIRequest) public requests;
    mapping(uint256 => uint64) public callbackGasLimit;

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {
        aiOracle = _aiOracle;
    }

    function setCallbackGasLimit(
        uint256 modelId,
        uint64 gasLimit
    ) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }

    function aiOracleCallback(
        uint256 requestId,
        bytes calldata output,
        bytes calldata callbackData
    ) external override onlyAIOracleCallback {
        AIRequest storage request = requests[requestId];
        require(request.sender != address(0), "Request does not exist");
        request.output = output;
        prompts[request.modelId][string(request.prompt)] = string(output);
        emit promptUpdated(
            requestId,
            request.modelId,
            string(request.prompt),
            string(output),
            callbackData
        );
    }

    function interactWithOAO(
        uint256 modelId,
        string calldata prompt
    ) external payable {
        uint256 requestId = aiOracle.requestCallback{value: msg.value}(
            modelId,
            bytes(prompt),
            address(this),
            callbackGasLimit[modelId],
            ""
        );

        AIRequest storage request = requests[requestId];
        request.modelId = modelId;
        request.sender = msg.sender;
        request.prompt = bytes(prompt);
        emit promptRequested(requestId, modelId, msg.sender, prompt);
    }
}
