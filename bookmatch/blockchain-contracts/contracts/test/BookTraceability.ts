import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("BookTraceability", function () {
  // Fixture to deploy the contract
  async function deployBookTraceabilityFixture() {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();

    const BookTraceability = await hre.ethers.getContractFactory("BookTraceability");
    const bookTraceability = await BookTraceability.deploy();

    return { bookTraceability, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { bookTraceability, owner } = await loadFixture(deployBookTraceabilityFixture);
      expect(await bookTraceability.owner()).to.equal(owner.address);
    });

    it("Should start with zero books", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);
      expect(await bookTraceability.getTotalBooks()).to.equal(0);
    });
  });

  describe("Book Registration", function () {
    it("Should register a new book successfully", async function () {
      const { bookTraceability, owner } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      const isbn = "978-1234567890";
      const title = "The Great Gatsby";
      const author = "F. Scott Fitzgerald";
      const metadata = JSON.stringify({ condition: "good", edition: "first" });

      await expect(
        bookTraceability.registerBook(bookId, isbn, title, author, metadata)
      )
        .to.emit(bookTraceability, "BookRegistered");

      expect(await bookTraceability.getTotalBooks()).to.equal(1);
    });

    it("Should fail to register book with empty fields", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      await expect(
        bookTraceability.registerBook("", "isbn", "title", "author", "metadata")
      ).to.be.revertedWith("Book ID cannot be empty");

      await expect(
        bookTraceability.registerBook("book-001", "isbn", "", "author", "metadata")
      ).to.be.revertedWith("Title cannot be empty");

      await expect(
        bookTraceability.registerBook("book-001", "isbn", "title", "", "metadata")
      ).to.be.revertedWith("Author cannot be empty");
    });

    it("Should fail to register duplicate book", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata")
      ).to.be.revertedWith("Book already registered");
    });
  });

  describe("Book Information Retrieval", function () {
    it("Should retrieve book information correctly", async function () {
      const { bookTraceability, owner } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      const isbn = "978-1234567890";
      const title = "1984";
      const author = "George Orwell";
      const metadata = JSON.stringify({ year: 1949 });

      await bookTraceability.registerBook(bookId, isbn, title, author, metadata);

      const bookInfo = await bookTraceability.getBook(bookId);

      expect(bookInfo[0]).to.equal(bookId); // bookId
      expect(bookInfo[1]).to.equal(isbn); // isbn
      expect(bookInfo[2]).to.equal(title); // title
      expect(bookInfo[3]).to.equal(author); // author
      expect(bookInfo[4]).to.equal(owner.address); // currentOwner
      expect(bookInfo[7]).to.equal(metadata); // metadata
    });

    it("Should check if book is registered", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      expect(await bookTraceability.isBookRegistered(bookId)).to.be.false;

      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      expect(await bookTraceability.isBookRegistered(bookId)).to.be.true;
    });
  });

  describe("Ownership Transfer", function () {
    it("Should transfer ownership successfully", async function () {
      const { bookTraceability, owner, addr1 } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.transferOwnership(bookId, addr1.address, "Sold to new owner")
      )
        .to.emit(bookTraceability, "BookOwnershipTransferred");

      // Verify new ownership
      const bookInfo = await bookTraceability.getBook(bookId);
      expect(bookInfo[4]).to.equal(addr1.address);

      expect(await bookTraceability.verifyOwnership(bookId, addr1.address)).to.be.true;
      expect(await bookTraceability.verifyOwnership(bookId, owner.address)).to.be.false;
    });

    it("Should fail to transfer if not owner", async function () {
      const { bookTraceability, addr1, addr2 } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.connect(addr1).transferOwnership(bookId, addr2.address, "notes")
      ).to.be.revertedWith("Not the current owner");
    });

    it("Should fail to transfer to zero address", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.transferOwnership(bookId, hre.ethers.ZeroAddress, "notes")
      ).to.be.revertedWith("Invalid new owner address");
    });

    it("Should fail to transfer to yourself", async function () {
      const { bookTraceability, owner } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.transferOwnership(bookId, owner.address, "notes")
      ).to.be.revertedWith("Cannot transfer to yourself");
    });
  });

  describe("Transfer History", function () {
    it("Should track transfer history correctly", async function () {
      const { bookTraceability, owner, addr1, addr2 } = await loadFixture(
        deployBookTraceabilityFixture
      );

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      // First transfer
      await bookTraceability.transferOwnership(bookId, addr1.address, "First sale");

      // Second transfer
      await bookTraceability
        .connect(addr1)
        .transferOwnership(bookId, addr2.address, "Second sale");

      const history = await bookTraceability.getTransferHistory(bookId);

      expect(history.length).to.equal(3); // Initial + 2 transfers

      // Check initial registration
      expect(history[0].from).to.equal(hre.ethers.ZeroAddress);
      expect(history[0].to).to.equal(owner.address);
      expect(history[0].notes).to.equal("Initial registration");

      // Check first transfer
      expect(history[1].from).to.equal(owner.address);
      expect(history[1].to).to.equal(addr1.address);
      expect(history[1].notes).to.equal("First sale");

      // Check second transfer
      expect(history[2].from).to.equal(addr1.address);
      expect(history[2].to).to.equal(addr2.address);
      expect(history[2].notes).to.equal("Second sale");
    });
  });

  describe("Metadata Updates", function () {
    it("Should update metadata successfully", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      const initialMetadata = JSON.stringify({ condition: "good" });
      const updatedMetadata = JSON.stringify({ condition: "excellent", notes: "restored" });

      await bookTraceability.registerBook(bookId, "isbn", "title", "author", initialMetadata);

      await expect(bookTraceability.updateMetadata(bookId, updatedMetadata))
        .to.emit(bookTraceability, "BookMetadataUpdated");

      const bookInfo = await bookTraceability.getBook(bookId);
      expect(bookInfo[7]).to.equal(updatedMetadata);
    });

    it("Should fail to update metadata if not owner", async function () {
      const { bookTraceability, addr1 } = await loadFixture(deployBookTraceabilityFixture);

      const bookId = "book-001";
      await bookTraceability.registerBook(bookId, "isbn", "title", "author", "metadata");

      await expect(
        bookTraceability.connect(addr1).updateMetadata(bookId, "new metadata")
      ).to.be.revertedWith("Not the current owner");
    });
  });

  describe("Owner Functions", function () {
    it("Should get books by owner", async function () {
      const { bookTraceability, owner, addr1 } = await loadFixture(deployBookTraceabilityFixture);

      await bookTraceability.registerBook("book-001", "isbn1", "title1", "author1", "meta1");
      await bookTraceability.registerBook("book-002", "isbn2", "title2", "author2", "meta2");
      await bookTraceability
        .connect(addr1)
        .registerBook("book-003", "isbn3", "title3", "author3", "meta3");

      const ownerBooks = await bookTraceability.getBooksByOwner(owner.address);
      expect(ownerBooks.length).to.equal(2);

      const addr1Books = await bookTraceability.getBooksByOwner(addr1.address);
      expect(addr1Books.length).to.equal(1);
    });

    it("Should get book by index", async function () {
      const { bookTraceability } = await loadFixture(deployBookTraceabilityFixture);

      await bookTraceability.registerBook("book-001", "isbn", "Title 1", "Author 1", "meta");
      await bookTraceability.registerBook("book-002", "isbn", "Title 2", "Author 2", "meta");

      const book0 = await bookTraceability.getBookByIndex(0);
      expect(book0[0]).to.equal("book-001");
      expect(book0[1]).to.equal("Title 1");

      const book1 = await bookTraceability.getBookByIndex(1);
      expect(book1[0]).to.equal("book-002");
      expect(book1[1]).to.equal("Title 2");
    });
  });

  describe("Pausable Functionality", function () {
    it("Should pause and unpause contract", async function () {
      const { bookTraceability, owner } = await loadFixture(deployBookTraceabilityFixture);

      await bookTraceability.pause();

      await expect(
        bookTraceability.registerBook("book-001", "isbn", "title", "author", "metadata")
      ).to.be.revertedWithCustomError(bookTraceability, "EnforcedPause");

      await bookTraceability.unpause();

      await expect(
        bookTraceability.registerBook("book-001", "isbn", "title", "author", "metadata")
      ).to.not.be.reverted;
    });

    it("Should only allow owner to pause", async function () {
      const { bookTraceability, addr1 } = await loadFixture(deployBookTraceabilityFixture);

      await expect(bookTraceability.connect(addr1).pause()).to.be.revertedWithCustomError(
        bookTraceability,
        "OwnableUnauthorizedAccount"
      );
    });
  });
});
