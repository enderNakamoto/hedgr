// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MarketFactory.sol";
import "../src/MarketController.sol";
import "../test/mocks/MockToken.sol"; // Only for testing

contract DeployMainnetScript is Script {
    function run() external virtual {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address assetToken = vm.envAddress("ASSET_TOKEN_ADDRESS");

        require(
            assetToken != address(0),
            "Asset token address must be provided for mainnet"
        );

        uint256 chainId = block.chainid;
        console.log("Current Chain ID:", chainId);

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Controller (no parameters needed now)
        MarketController controller = new MarketController();
        address controllerAddress = address(controller);
        console.log("Deployed Controller at:", controllerAddress);

        // Deploy MarketCreator with controller address
        MarketFactory marketCreator = new MarketFactory(
            controllerAddress,
            assetToken
        );
        address marketCreatorAddress = address(marketCreator);
        console.log("Deployed MarketCreator at:", marketCreatorAddress);

        // Set the MarketCreator in the Controller
        controller.setMarketFactory(marketCreatorAddress);
        console.log("Set MarketCreator in Controller");

        vm.stopBroadcast();

        // Output deployment information for verification
        console.log("Mainnet Deployment completed!");
        console.log("Asset Token:", assetToken);
        console.log("Controller:", controllerAddress);
        console.log("MarketCreator:", marketCreatorAddress);
    }
}
