// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title BookTraceability
 * @dev Smart contract for tracking book ownership and history on Polkadot
 * LATIN HACK 2025 - BookMatch Platform
 */
contract BookTraceability is Ownable, Pausable {

    // Struct to store book information
    struct Book {
        string bookId;          // Unique book identifier
        string isbn;            // ISBN number (optional)
        string title;           // Book title
        string author;          // Book author
        address currentOwner;   // Current owner address
        uint256 registeredAt;   // Registration timestamp
        uint256 lastUpdated;    // Last update timestamp
        bool exists;            // Flag to check if book exists
        string metadata;        // Additional metadata (JSON string)
    }

    // Struct to store ownership transfer history
    struct Transfer {
        address from;           // Previous owner
        address to;             // New owner
        uint256 timestamp;      // Transfer timestamp
        string notes;           // Optional transfer notes
    }

    // Mapping from bookId hash to Book struct
    mapping(bytes32 => Book) private books;

    // Mapping from bookId hash to transfer history
    mapping(bytes32 => Transfer[]) private transferHistory;

    // Mapping from owner address to their book IDs
    mapping(address => bytes32[]) private ownerBooks;

    // Array of all registered book IDs
    bytes32[] private allBookIds;

    // Events
    event BookRegistered(
        bytes32 indexed bookIdHash,
        string bookId,
        string title,
        address indexed owner,
        uint256 timestamp
    );

    event BookOwnershipTransferred(
        bytes32 indexed bookIdHash,
        string bookId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    event BookMetadataUpdated(
        bytes32 indexed bookIdHash,
        string bookId,
        address indexed updatedBy,
        uint256 timestamp
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a new book on the blockchain
     * @param _bookId Unique book identifier
     * @param _isbn ISBN number
     * @param _title Book title
     * @param _author Book author
     * @param _metadata Additional metadata (JSON string)
     */
    function registerBook(
        string memory _bookId,
        string memory _isbn,
        string memory _title,
        string memory _author,
        string memory _metadata
    ) external whenNotPaused returns (bytes32) {
        require(bytes(_bookId).length > 0, "Book ID cannot be empty");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_author).length > 0, "Author cannot be empty");

        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        require(!books[bookIdHash].exists, "Book already registered");

        // Create book record
        books[bookIdHash] = Book({
            bookId: _bookId,
            isbn: _isbn,
            title: _title,
            author: _author,
            currentOwner: msg.sender,
            registeredAt: block.timestamp,
            lastUpdated: block.timestamp,
            exists: true,
            metadata: _metadata
        });

        // Add to owner's books
        ownerBooks[msg.sender].push(bookIdHash);

        // Add to all books
        allBookIds.push(bookIdHash);

        // Record initial ownership
        transferHistory[bookIdHash].push(Transfer({
            from: address(0),
            to: msg.sender,
            timestamp: block.timestamp,
            notes: "Initial registration"
        }));

        emit BookRegistered(bookIdHash, _bookId, _title, msg.sender, block.timestamp);

        return bookIdHash;
    }

    /**
     * @dev Transfer book ownership to another address
     * @param _bookId Book identifier
     * @param _newOwner New owner address
     * @param _notes Optional transfer notes
     */
    function transferOwnership(
        string memory _bookId,
        address _newOwner,
        string memory _notes
    ) external whenNotPaused {
        require(_newOwner != address(0), "Invalid new owner address");

        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        require(books[bookIdHash].exists, "Book not found");
        require(books[bookIdHash].currentOwner == msg.sender, "Not the current owner");
        require(_newOwner != msg.sender, "Cannot transfer to yourself");

        address previousOwner = books[bookIdHash].currentOwner;

        // Update book owner
        books[bookIdHash].currentOwner = _newOwner;
        books[bookIdHash].lastUpdated = block.timestamp;

        // Add to new owner's books
        ownerBooks[_newOwner].push(bookIdHash);

        // Remove from previous owner's books
        _removeBookFromOwner(previousOwner, bookIdHash);

        // Record transfer in history
        transferHistory[bookIdHash].push(Transfer({
            from: previousOwner,
            to: _newOwner,
            timestamp: block.timestamp,
            notes: _notes
        }));

        emit BookOwnershipTransferred(bookIdHash, _bookId, previousOwner, _newOwner, block.timestamp);
    }

    /**
     * @dev Update book metadata
     * @param _bookId Book identifier
     * @param _metadata New metadata (JSON string)
     */
    function updateMetadata(
        string memory _bookId,
        string memory _metadata
    ) external whenNotPaused {
        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        require(books[bookIdHash].exists, "Book not found");
        require(books[bookIdHash].currentOwner == msg.sender, "Not the current owner");

        books[bookIdHash].metadata = _metadata;
        books[bookIdHash].lastUpdated = block.timestamp;

        emit BookMetadataUpdated(bookIdHash, _bookId, msg.sender, block.timestamp);
    }

    /**
     * @dev Get book information
     * @param _bookId Book identifier
     */
    function getBook(string memory _bookId) external view returns (
        string memory bookId,
        string memory isbn,
        string memory title,
        string memory author,
        address currentOwner,
        uint256 registeredAt,
        uint256 lastUpdated,
        string memory metadata
    ) {
        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        require(books[bookIdHash].exists, "Book not found");

        Book memory book = books[bookIdHash];
        return (
            book.bookId,
            book.isbn,
            book.title,
            book.author,
            book.currentOwner,
            book.registeredAt,
            book.lastUpdated,
            book.metadata
        );
    }

    /**
     * @dev Get transfer history for a book
     * @param _bookId Book identifier
     */
    function getTransferHistory(string memory _bookId) external view returns (Transfer[] memory) {
        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        require(books[bookIdHash].exists, "Book not found");

        return transferHistory[bookIdHash];
    }

    /**
     * @dev Verify book ownership
     * @param _bookId Book identifier
     * @param _address Address to verify
     */
    function verifyOwnership(string memory _bookId, address _address) external view returns (bool) {
        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        if (!books[bookIdHash].exists) {
            return false;
        }
        return books[bookIdHash].currentOwner == _address;
    }

    /**
     * @dev Get all books owned by an address
     * @param _owner Owner address
     */
    function getBooksByOwner(address _owner) external view returns (bytes32[] memory) {
        return ownerBooks[_owner];
    }

    /**
     * @dev Get total number of registered books
     */
    function getTotalBooks() external view returns (uint256) {
        return allBookIds.length;
    }

    /**
     * @dev Get book by index (for pagination)
     * @param _index Index in the books array
     */
    function getBookByIndex(uint256 _index) external view returns (
        string memory bookId,
        string memory title,
        string memory author,
        address currentOwner
    ) {
        require(_index < allBookIds.length, "Index out of bounds");

        bytes32 bookIdHash = allBookIds[_index];
        Book memory book = books[bookIdHash];

        return (book.bookId, book.title, book.author, book.currentOwner);
    }

    /**
     * @dev Check if a book is registered
     * @param _bookId Book identifier
     */
    function isBookRegistered(string memory _bookId) external view returns (bool) {
        bytes32 bookIdHash = keccak256(abi.encodePacked(_bookId));
        return books[bookIdHash].exists;
    }

    /**
     * @dev Pause contract (owner only)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract (owner only)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Internal function to remove a book from owner's list
     */
    function _removeBookFromOwner(address _owner, bytes32 _bookIdHash) private {
        bytes32[] storage ownerBooksList = ownerBooks[_owner];
        for (uint256 i = 0; i < ownerBooksList.length; i++) {
            if (ownerBooksList[i] == _bookIdHash) {
                // Move the last element to the position being deleted
                ownerBooksList[i] = ownerBooksList[ownerBooksList.length - 1];
                // Remove the last element
                ownerBooksList.pop();
                break;
            }
        }
    }
}
