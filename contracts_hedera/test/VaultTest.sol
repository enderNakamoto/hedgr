// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MarketController.sol";
import "../src/MarketFactory.sol";
import "../src/vaults/RiskVault.sol";
import "../src/vaults/HedgeVault.sol";
import "./mocks/MockToken.sol";

contract VaultTest is Test {
    // Test contracts
    MarketFactory public factory;
    MarketController public controller;
    MockToken public mockToken;
    RiskVault public riskVault;
    HedgeVault public hedgeVault;
    
    // Test addresses
    address public owner;
    address public user1;
    address public user2;
    
    // Test values
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18;
    uint256 public constant USER_DEPOSIT = 1000 * 10**18;
    uint256 public marketId;
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
        triggerPrice = 1000 * 10**18;
        
        // Fund test users
        vm.startPrank(owner);
        mockToken.transfer(user1, 10000 * 10**18);
        mockToken.transfer(user2, 10000 * 10**18);
        vm.stopPrank();
        
        // Create market and get vault addresses
        (marketId, , ) = controller.createMarket(eventStartTime, eventEndTime, triggerPrice);
        (address risk, address hedge) = factory.getVaults(marketId);
        riskVault = RiskVault(risk);
        hedgeVault = HedgeVault(hedge);
    }
    
    function test_VaultInitialization() public {
        // Check vault initialization
        assertEq(riskVault.controller(), address(controller));
        assertEq(hedgeVault.controller(), address(controller));
        assertEq(riskVault.marketId(), marketId);
        assertEq(hedgeVault.marketId(), marketId);
        assertEq(address(riskVault.asset()), address(mockToken));
        assertEq(address(hedgeVault.asset()), address(mockToken));
        
        // Check counterpart vaults are set correctly
        assertEq(riskVault.getCounterpartVault(), address(hedgeVault));
        assertEq(hedgeVault.getCounterpartVault(), address(riskVault));
    }
    
    function test_VaultDeposit() public {
        // Prepare for deposit
        vm.startPrank(user1);
        mockToken.approve(address(riskVault), USER_DEPOSIT);
        
        // Deposit into risk vault
        uint256 shares = riskVault.deposit(USER_DEPOSIT, user1);
        vm.stopPrank();
        
        // Check balances
        assertEq(riskVault.balanceOf(user1), shares);
        assertEq(riskVault.totalAssets(), USER_DEPOSIT);
        assertEq(mockToken.balanceOf(address(riskVault)), USER_DEPOSIT);
        
        // Deposit into hedge vault
        vm.startPrank(user2);
        mockToken.approve(address(hedgeVault), USER_DEPOSIT);
        uint256 hedgeShares = hedgeVault.deposit(USER_DEPOSIT, user2);
        vm.stopPrank();
        
        // Check balances
        assertEq(hedgeVault.balanceOf(user2), hedgeShares);
        assertEq(hedgeVault.totalAssets(), USER_DEPOSIT);
        assertEq(mockToken.balanceOf(address(hedgeVault)), USER_DEPOSIT);
    }
    
    function test_VaultWithdraw() public {
        // Deposit first
        vm.startPrank(user1);
        mockToken.approve(address(riskVault), USER_DEPOSIT);
        uint256 shares = riskVault.deposit(USER_DEPOSIT, user1);
        
        // Withdraw half
        uint256 halfAssets = USER_DEPOSIT / 2;
        uint256 burnedShares = riskVault.withdraw(halfAssets, user1, user1);
        vm.stopPrank();
        
        // Check balances after withdrawal
        assertEq(riskVault.balanceOf(user1), shares - burnedShares);
        assertEq(riskVault.totalAssets(), halfAssets);
        assertEq(mockToken.balanceOf(address(riskVault)), halfAssets);
        assertEq(mockToken.balanceOf(user1), 10000 * 10**18 - halfAssets);
    }
    
    function test_VaultTransferAssets() public {
        // Deposit into risk vault
        vm.startPrank(user1);
        mockToken.approve(address(riskVault), USER_DEPOSIT);
        riskVault.deposit(USER_DEPOSIT, user1);
        vm.stopPrank();
        
        // Only controller should be able to transfer assets
        vm.startPrank(user1);
        vm.expectRevert(abi.encodeWithSignature("OnlyController()"));
        riskVault.transferAssets(user2, USER_DEPOSIT / 2);
        vm.stopPrank();
        
        // Controller can transfer assets
        vm.prank(address(controller));
        riskVault.transferAssets(user2, USER_DEPOSIT / 2);
        
        // Check balances after transfer
        assertEq(mockToken.balanceOf(user2), 10000 * 10**18 + USER_DEPOSIT / 2);
        assertEq(riskVault.totalAssets(), USER_DEPOSIT / 2);
    }
    
    function test_VaultApproveAssets() public {
        // Deposit into hedge vault
        vm.startPrank(user2);
        mockToken.approve(address(hedgeVault), USER_DEPOSIT);
        hedgeVault.deposit(USER_DEPOSIT, user2);
        vm.stopPrank();
        
        // Only factory should be able to approve assets
        vm.startPrank(user2);
        vm.expectRevert(abi.encodeWithSignature("OnlyFactory()"));
        hedgeVault.approveAssets(user1, USER_DEPOSIT);
        vm.stopPrank();
        
        // Factory can approve assets
        vm.prank(address(factory));
        hedgeVault.approveAssets(user1, USER_DEPOSIT);
        
        // Check approval
        assertEq(mockToken.allowance(address(hedgeVault), user1), USER_DEPOSIT);
    }
} 