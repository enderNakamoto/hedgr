// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MarketFactory.sol";
import "../src/MarketController.sol";
import "./mocks/MockToken.sol";

contract MarketFactoryTest is Test {
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
        assertEq(factory.owner(), owner);
        assertEq(address(factory.getController()), address(controller));
        assertEq(address(factory.getAsset()), address(mockToken));
    }
    
    function test_CreateMarketVaults() public {
        // Create a new market
        (uint256 marketId, , ) = controller.createMarket(eventStartTime, eventEndTime, triggerPrice);
        
        // Check market creation
        assertEq(marketId, 1); // First market should have ID 1
        
        // Get market vaults
        (address riskVault, address hedgeVault) = factory.getVaults(marketId);
        
        // Verify vaults exist and are different
        assertTrue(riskVault != address(0));
        assertTrue(hedgeVault != address(0));
        assertTrue(riskVault != hedgeVault);
    }
    
    function test_GetMarketVaultsRevertsForInvalidId() public {
        // Try to get vaults for a non-existent market ID
        vm.expectRevert(abi.encodeWithSignature("VaultsNotFound()"));
        factory.getVaults(999);
    }
    
    function test_OnlyControllerCanCreateVaults() public {
        // Try to create vaults from non-controller address
        vm.startPrank(user1);
        vm.expectRevert(abi.encodeWithSignature("OnlyController()"));
        factory.createMarketVaultsByController(eventStartTime, eventEndTime, triggerPrice);
        vm.stopPrank();
    }
    
    function test_VaultCreationWithValidParams() public {
        // Create market through controller
        (uint256 marketId, , ) = controller.createMarket(
            eventStartTime, 
            eventEndTime, 
            triggerPrice
        );
        
        // Get market vaults
        (address riskVault, address hedgeVault) = factory.getVaults(marketId);
        
        // Check that vaults were correctly created
        RiskVault risk = RiskVault(riskVault);
        HedgeVault hedge = HedgeVault(hedgeVault);
        
        // Verify vault properties
        assertEq(risk.marketId(), marketId);
        assertEq(hedge.marketId(), marketId);
        assertEq(address(risk.asset()), address(mockToken));
        assertEq(address(hedge.asset()), address(mockToken));
        assertEq(risk.controller(), address(controller));
        assertEq(hedge.controller(), address(controller));
    }
} 