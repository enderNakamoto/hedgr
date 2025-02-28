// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MarketController.sol";
import "../src/MarketFactory.sol";
import "../src/vaults/RiskVault.sol";
import "../src/vaults/HedgeVault.sol";
import "./mocks/MockToken.sol";

contract MarketControllerTest is Test {
    // Test contracts
    MarketFactory public factory;
    MarketController public controller;
    MockToken public mockToken;
    
    // Test addresses
    address public owner;
    address public user1;
    address public user2;
    
    // Test values
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18;
    uint256 public eventStartTime;
    uint256 public eventEndTime;
    uint256 public triggerPrice;
    
    // Error signatures
    bytes4 public constant INVALID_TIME_PARAMS_SELECTOR = bytes4(keccak256("InvalidTimeParameters()"));
    
    function setUp() public {
        // Setup accounts
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        // Deploy contracts
        mockToken = new MockToken();
        controller = new MarketController();
        factory = new MarketFactory(address(controller), address(mockToken));
        
        // Initialize controller
        controller.setMarketFactory(address(factory));
        
        // Setup test parameters
        eventStartTime = block.timestamp + 1 days;
        eventEndTime = eventStartTime + 7 days;
        triggerPrice = 1000 * 10**18; // Some arbitrary trigger price
        
        // Fund test users
        mockToken.transfer(user1, 10000 * 10**18);
        mockToken.transfer(user2, 10000 * 10**18);
    }
    
    function test_Initialization() public {
        // Check initial state
        assertEq(controller.owner(), owner);
        assertEq(address(controller.getMarketFactory()), address(factory));
    }
    
    function test_CreateMarket() public {
        // Create a new market
        (uint256 marketId, address riskVault, address hedgeVault) = controller.createMarket(
            eventStartTime, 
            eventEndTime, 
            triggerPrice
        );
        
        // Check market creation
        assertEq(marketId, 1); // First market should have ID 1
        
        // Get market details
        (uint256 startTime, uint256 endTime) = controller.getMarketTiming(marketId);
        uint256 price = controller.getMarketTriggerPrice(marketId);
        
        // Verify market details
        assertEq(startTime, eventStartTime);
        assertEq(endTime, eventEndTime);
        assertEq(price, triggerPrice);
        
        // Check market state
        assertEq(uint256(controller.getMarketState(marketId)), uint256(IMarketController.MarketState.Open));
    }
    
    function test_CreateMarketWithInvalidDates() public {
        // Make a simpler test that avoids underflow issues
        vm.expectRevert(abi.encodeWithSignature("InvalidTimeParameters()"));
        controller.createMarket(eventEndTime, eventStartTime, triggerPrice); // end time before start time
        
        // Test past start time
        vm.expectRevert(abi.encodeWithSignature("InvalidTimeParameters()"));
        controller.createMarket(block.timestamp - 1, eventEndTime, triggerPrice); // start time in the past
    }
    
    function test_CreateMarketWithInvalidPrice() public {
        // Try to create market with zero trigger price
        vm.expectRevert(abi.encodeWithSignature("InvalidTriggerPrice()"));
        controller.createMarket(eventStartTime, eventEndTime, 0);
    }
    
    function test_MarketLockAndMaturity() public {
        // Create a new market
        (uint256 marketId, , ) = controller.createMarket(
            eventStartTime, 
            eventEndTime, 
            triggerPrice
        );
        
        // Move to event start time
        vm.warp(eventStartTime);
        
        // Lock the market (market needs to be locked before it can mature)
        controller.lockMarket(marketId);
        
        // Warp to after event end time
        vm.warp(eventEndTime + 1);
        
        // Anyone can call mature market after end time
        vm.prank(user1);
        controller.matureMarket(marketId);
        
        // Check market state after maturity
        assertEq(uint256(controller.getMarketState(marketId)), uint256(IMarketController.MarketState.Matured));
    }
    
    function test_PriceTrigger() public {
        // Create a new market
        (uint256 marketId, , ) = controller.createMarket(
            eventStartTime, 
            eventEndTime, 
            triggerPrice
        );
        
        // Move to event start time
        vm.warp(eventStartTime);
        
        // Lock the market (market needs to be locked before it can be liquidated)
        controller.lockMarket(marketId);
        
        // Process oracle data with price below trigger (which should cause liquidation)
        uint256 belowTriggerPrice = triggerPrice - 100;
        controller.processOracleData(marketId, belowTriggerPrice, block.timestamp);
        
        // Check market state after trigger
        // Price below trigger should result in Liquidated state
        assertEq(uint256(controller.getMarketState(marketId)), uint256(IMarketController.MarketState.Liquidated));
    }
} 