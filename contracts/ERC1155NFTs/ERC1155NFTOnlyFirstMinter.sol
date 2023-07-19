// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// Only First Minter · the first minter of an ERC1155 token ID 
// becomes the owner of the ID, the only one allowed to mint this ID and
// allowed to burn any token with this ID
contract ERC1155OnlyFirstMinter is ERC1155, ERC1155Burnable, ERC1155Supply {
    mapping(uint256 => address) public firstMinterOf; // ownerOf() maybe a better name
    
    constructor() ERC1155("") {}
    
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        require(totalSupply(id) == 0 || msg.sender == firstMinterOf[id], "Forbidden");
        firstMinterOf[id] = msg.sender;
        _mint(account, id, amount, data);
    }
    
    function burn(address account, uint256 id, uint256 value)
        public override
    {
        require(msg.sender == firstMinterOf[id] || account == msg.sender || isApprovedForAll(account, msg.sender), "Forbidden");
        _burn(account, id, value);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
