// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DecisionLogger {
    uint256 private _idCounter;

    struct Decision {
        uint256 id;
        string category;
        string reasoning;
        uint8 confidence;
        string leadData;
        address logger;
        uint256 timestamp;
    }

    mapping(uint256 => Decision) public decisions;

    event DecisionLogged(
        uint256 indexed id,
        string category,
        string reasoning,
        uint8 confidence,
        string leadData,
        address indexed logger,
        uint256 timestamp
    );

    function logDecision(
        string calldata category,
        string calldata reasoning,
        uint8 confidence,
        string calldata leadData
    ) external returns (uint256 id) {
        _idCounter++;
        id = _idCounter;

        decisions[id] = Decision({
            id: id,
            category: category,
            reasoning: reasoning,
            confidence: confidence,
            leadData: leadData,
            logger: msg.sender,
            timestamp: block.timestamp
        });

        emit DecisionLogged(
            id,
            category,
            reasoning,
            confidence,
            leadData,
            msg.sender,
            block.timestamp
        );
    }

    function getDecision(uint256 id) external view returns (Decision memory) {
        require(id > 0 && id <= _idCounter, "DecisionLogger: invalid id");
        return decisions[id];
    }

    function totalDecisions() external view returns (uint256) {
        return _idCounter;
    }
}