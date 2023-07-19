// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
// @dev the ERC-165 identifier for this interface is `TODO`
interface IERC1155BoundedAccount {
    /// @dev Token bound accounts MUST implement a `receive` function.
    ///
    /// Token bound accounts MAY perform arbitrary logic to restrict conditions
    /// under which Ether can be received.
    receive() external payable;

    /// @dev Executes `call` on address `to`, with value `value` and calldata
    /// `data`.
    ///
    /// MUST revert and bubble up errors if call fails.
    ///
    /// By default, token bound accounts MUST allow the owner(s) of the ERC-1155 token
    /// which owns the account to execute arbitrary calls using `executeCall`.
    ///
    /// Token bound accounts MAY implement additional authorization mechanisms
    /// which limit the ability of the ERC-1155 token holders to execute calls.
    ///
    /// Token bound accounts MAY implement additional execution functions which
    /// grant execution permissions to other non-owner accounts.
    ///
    /// @return The result of the call
    function executeCall(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bytes memory);

    /// @dev Returns identifier of the ERC-1155 token which owns the
    /// account
    ///
    /// The return value of this function MUST be constant - it MUST NOT change
    /// over time.
    ///
    /// @return chainId The EIP-155 ID of the chain the ERC-1155 token exists on
    /// @return tokenContract The contract address of the ERC-1155 token
    /// @return tokenId The ID of the ERC-1155 token
    function token()
        external
        view
        returns (
            uint256 chainId,
            address tokenContract,
            uint256 tokenId
        );

    function isValidSigner(address signer) external view returns (bool);

    /// @dev Returns a nonce value that is updated on every successful transaction
    ///
    /// @return The current account nonce
    function nonce() external view returns (uint256);
}
