// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "./interfaces/IERC1155BoundedAccount.sol";
import "./callback/TokenCallbackHandler.sol";


contract ERC1155BoundedAccount is TokenCallbackHandler, IERC1271, IERC1155BoundedAccount {
    uint256 private _nonce;
    receive() external payable {}

    function executeCall(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bytes memory result) {
        require(isValidSigner(msg.sender), "Not token owner");
        
        _nonce++;
        
        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function token()
        external
        view
        returns (
            uint256,
            address,
            uint256
        )
    {
        bytes memory footer = new bytes(0x60);

        assembly {
            // copy 0x60 bytes from end of footer
            extcodecopy(address(), add(footer, 0x20), 0x4d, 0x60)
        }

        return abi.decode(footer, (uint256, address, uint256));
    }


    function isValidSigner(address signer) public view returns (bool) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = this
            .token();
        if (chainId != block.chainid) return false;

        return IERC1155(tokenContract).balanceOf(signer, tokenId) > 0;
    }
    
    function recoverSigner(
        bytes32 _hash,
        bytes memory _signature
    ) internal pure returns (address signer) {
        require(_signature.length == 65, "Invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly { 
            r := mload(add(_signature, 32))//bytes32(_signature[0:32]);
            s := mload(add(_signature, 64))//bytes32(_signature[32:64]);
            v := byte(0, mload(add(_signature, 96)))//uint8(_signature[64]);
        }
        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for s in (281): 0 < s < secp256k1n ÷ 2 + 1, and for v in (282): v ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //
        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        // these malleable signatures as well.
        //
        // Source OpenZeppelin
        // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/cryptography/ECDSA.sol

        if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
          revert("SignatureValidator#recoverSigner: invalid signature 's' value");
        }

        if (v != 27 && v != 28) {
          revert("SignatureValidator#recoverSigner: invalid signature 'v' value");
        }

        // Recover ECDSA signer
        signer = ecrecover(_hash, v, r, s);
        
        // Prevent signer from being 0x0
        require(
          signer != address(0x0),
          "Invalid signer"
        );

        return signer;        
    }

    function supportsInterface(bytes4 interfaceId) public view override(TokenCallbackHandler) returns (bool) {
        return (super.supportsInterface(interfaceId) ||
                  interfaceId == type(IERC1155BoundedAccount).interfaceId
        );
    }

    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        returns (bytes4 magicValue)
    {
        bool isValid = isValidSigner(recoverSigner(hash, signature));

        if (isValid) {
            return IERC1271.isValidSignature.selector;
        }

        return "";
    }
    
    function nonce() public view returns (uint256) {
        return _nonce;
    }
}
