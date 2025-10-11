// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title BookTraceabilitySimple
 * @dev Simplified version for Passet Hub deployment limits
 */
contract BookTraceabilitySimple {
    struct Book {
        string bookId;
        string title;
        address currentOwner;
        uint256 registrationTime;
    }

    struct Transfer {
        address from;
        address to;
        uint256 timestamp;
    }

    mapping(string => Book) public books;
    mapping(string => Transfer[]) public transferHistory;
    mapping(address => string[]) private booksByOwner;
    uint256 public totalBooks;

    event BookRegistered(
        string indexed bookId,
        string title,
        address indexed owner,
        uint256 timestamp
    );

    event BookTransferred(
        string indexed bookId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    function registerBook(
        string memory _bookId,
        string memory _title
    ) external {
        require(bytes(books[_bookId].bookId).length == 0, "Book exists");

        books[_bookId] = Book({
            bookId: _bookId,
            title: _title,
            currentOwner: msg.sender,
            registrationTime: block.timestamp
        });

        booksByOwner[msg.sender].push(_bookId);
        totalBooks++;

        emit BookRegistered(_bookId, _title, msg.sender, block.timestamp);
    }

    function transferOwnership(
        string memory _bookId,
        address _newOwner
    ) external {
        Book storage book = books[_bookId];
        require(bytes(book.bookId).length > 0, "Book not found");
        require(book.currentOwner == msg.sender, "Not owner");
        require(_newOwner != msg.sender, "Cannot transfer to self");

        transferHistory[_bookId].push(Transfer({
            from: msg.sender,
            to: _newOwner,
            timestamp: block.timestamp
        }));

        // Update ownership
        book.currentOwner = _newOwner;

        // Update mappings (simplified - doesn't remove from old owner)
        booksByOwner[_newOwner].push(_bookId);

        emit BookTransferred(_bookId, msg.sender, _newOwner, block.timestamp);
    }

    function getBook(string memory _bookId) external view returns (Book memory) {
        return books[_bookId];
    }

    function getTransferHistory(string memory _bookId) external view returns (Transfer[] memory) {
        return transferHistory[_bookId];
    }

    function verifyOwnership(string memory _bookId, address _address) external view returns (bool) {
        return books[_bookId].currentOwner == _address;
    }

    function getBooksByOwner(address _owner) external view returns (string[] memory) {
        return booksByOwner[_owner];
    }
}
