// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MarketFactory.sol";
import "../src/MarketController.sol";
import "../test/mocks/MockToken.sol"; // Only for testing, use real asset on production

contract DeployScript is Script {
    function run() external virtual {
        // Get private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address assetToken = vm.envAddress("ASSET_TOKEN_ADDRESS");

        uint256 chainId = block.chainid;
        console.log("Current Chain ID:", chainId);

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // If no asset token address is provided, deploy a mock token (for testing only)
        if (assetToken == address(0)) {
            MockToken mockToken = new MockToken();
            assetToken = address(mockToken);
            console.log("Deployed MockToken at:", assetToken);
        } else {
            console.log("Using existing asset token at:", assetToken);
        }

        // Deploy the Controller (no parameters needed now)
        MarketController controller = new MarketController();
        address controllerAddress = address(controller);
        console.log("Deployed Controller at:", controllerAddress);

        // Then deploy MarketFactory with controller address
        MarketFactory marketFactory = new MarketFactory(
            controllerAddress,
            assetToken
        );
        address marketCreatorAddress = address(marketFactory);
        console.log("Deployed MarketFactory at:", marketCreatorAddress);

        // Set the MarketCreator in the Controller
        controller.setMarketFactory(marketCreatorAddress);
        console.log("Set MarketFactory in Controller");

        vm.stopBroadcast();

        // Output deployment information for verification
        console.log("Deployment completed!");
        console.log("Asset Token:", assetToken);
        console.log("Controller:", controllerAddress);
        console.log("MarketCreator:", marketCreatorAddress);
    }
}
