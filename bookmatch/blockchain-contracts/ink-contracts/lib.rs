#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod book_traceability {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    /// Represents a book registered on the blockchain
    #[derive(scale::Decode, scale::Encode, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Book {
        book_id: String,
        isbn: String,
        title: String,
        author: String,
        current_owner: AccountId,
        original_owner: AccountId,
        registration_timestamp: Timestamp,
        metadata: String,
        transfer_count: u32,
    }

    /// Represents a transfer event
    #[derive(scale::Decode, scale::Encode, Clone)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Transfer {
        from: AccountId,
        to: AccountId,
        timestamp: Timestamp,
        notes: String,
    }

    /// Events emitted by the contract
    #[ink(event)]
    pub struct BookRegistered {
        #[ink(topic)]
        book_id: String,
        #[ink(topic)]
        owner: AccountId,
        title: String,
        timestamp: Timestamp,
    }

    #[ink(event)]
    pub struct BookOwnershipTransferred {
        #[ink(topic)]
        book_id: String,
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
        timestamp: Timestamp,
    }

    #[ink(event)]
    pub struct BookMetadataUpdated {
        #[ink(topic)]
        book_id: String,
        updated_by: AccountId,
        timestamp: Timestamp,
    }

    /// The main contract storage
    #[ink(storage)]
    pub struct BookTraceability {
        /// Mapping from book_id to Book struct
        books: Mapping<String, Book>,
        /// Mapping from book_id to Vec of Transfer history
        transfer_history: Mapping<String, Vec<Transfer>>,
        /// Mapping from owner to Vec of book_ids they own
        books_by_owner: Mapping<AccountId, Vec<String>>,
        /// Total number of books registered
        total_books: u32,
        /// Contract owner
        owner: AccountId,
        /// Paused state
        paused: bool,
    }

    /// Errors that can occur during contract execution
    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        BookAlreadyExists,
        BookNotFound,
        NotBookOwner,
        OnlyContractOwner,
        ContractPaused,
        InvalidTransfer,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl BookTraceability {
        /// Constructor - initializes the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                books: Mapping::new(),
                transfer_history: Mapping::new(),
                books_by_owner: Mapping::new(),
                total_books: 0,
                owner: Self::env().caller(),
                paused: false,
            }
        }

        /// Register a new book on the blockchain
        #[ink(message)]
        pub fn register_book(
            &mut self,
            book_id: String,
            isbn: String,
            title: String,
            author: String,
            metadata: String,
        ) -> Result<()> {
            if self.paused {
                return Err(Error::ContractPaused);
            }

            if self.books.contains(&book_id) {
                return Err(Error::BookAlreadyExists);
            }

            let caller = self.env().caller();
            let now = self.env().block_timestamp();

            let book = Book {
                book_id: book_id.clone(),
                isbn,
                title: title.clone(),
                author,
                current_owner: caller,
                original_owner: caller,
                registration_timestamp: now,
                metadata,
                transfer_count: 0,
            };

            self.books.insert(&book_id, &book);

            // Add to owner's book list
            let mut owner_books = self.books_by_owner.get(&caller).unwrap_or_default();
            owner_books.push(book_id.clone());
            self.books_by_owner.insert(&caller, &owner_books);

            self.total_books = self.total_books.saturating_add(1);

            // Emit event
            self.env().emit_event(BookRegistered {
                book_id,
                owner: caller,
                title,
                timestamp: now,
            });

            Ok(())
        }

        /// Transfer ownership of a book
        #[ink(message)]
        pub fn transfer_ownership(
            &mut self,
            book_id: String,
            new_owner: AccountId,
            notes: String,
        ) -> Result<()> {
            if self.paused {
                return Err(Error::ContractPaused);
            }

            let mut book = self.books.get(&book_id).ok_or(Error::BookNotFound)?;
            let caller = self.env().caller();

            if book.current_owner != caller {
                return Err(Error::NotBookOwner);
            }

            if new_owner == caller {
                return Err(Error::InvalidTransfer);
            }

            let now = self.env().block_timestamp();

            // Create transfer record
            let transfer = Transfer {
                from: caller,
                to: new_owner,
                timestamp: now,
                notes,
            };

            // Update transfer history
            let mut history = self.transfer_history.get(&book_id).unwrap_or_default();
            history.push(transfer);
            self.transfer_history.insert(&book_id, &history);

            // Remove from current owner's list
            let mut old_owner_books = self.books_by_owner.get(&caller).unwrap_or_default();
            old_owner_books.retain(|id| id != &book_id);
            self.books_by_owner.insert(&caller, &old_owner_books);

            // Add to new owner's list
            let mut new_owner_books = self.books_by_owner.get(&new_owner).unwrap_or_default();
            new_owner_books.push(book_id.clone());
            self.books_by_owner.insert(&new_owner, &new_owner_books);

            // Update book
            book.current_owner = new_owner;
            book.transfer_count = book.transfer_count.saturating_add(1);
            self.books.insert(&book_id, &book);

            // Emit event
            self.env().emit_event(BookOwnershipTransferred {
                book_id,
                from: caller,
                to: new_owner,
                timestamp: now,
            });

            Ok(())
        }

        /// Update book metadata (only current owner)
        #[ink(message)]
        pub fn update_metadata(&mut self, book_id: String, metadata: String) -> Result<()> {
            if self.paused {
                return Err(Error::ContractPaused);
            }

            let mut book = self.books.get(&book_id).ok_or(Error::BookNotFound)?;
            let caller = self.env().caller();

            if book.current_owner != caller {
                return Err(Error::NotBookOwner);
            }

            book.metadata = metadata;
            self.books.insert(&book_id, &book);

            let now = self.env().block_timestamp();

            self.env().emit_event(BookMetadataUpdated {
                book_id,
                updated_by: caller,
                timestamp: now,
            });

            Ok(())
        }

        /// Get book information
        #[ink(message)]
        pub fn get_book(&self, book_id: String) -> Option<Book> {
            self.books.get(&book_id)
        }

        /// Get transfer history for a book
        #[ink(message)]
        pub fn get_transfer_history(&self, book_id: String) -> Vec<Transfer> {
            self.transfer_history.get(&book_id).unwrap_or_default()
        }

        /// Get all books owned by an address
        #[ink(message)]
        pub fn get_books_by_owner(&self, owner: AccountId) -> Vec<String> {
            self.books_by_owner.get(&owner).unwrap_or_default()
        }

        /// Verify if an address owns a book
        #[ink(message)]
        pub fn verify_ownership(&self, book_id: String, address: AccountId) -> bool {
            self.books
                .get(&book_id)
                .map(|book| book.current_owner == address)
                .unwrap_or(false)
        }

        /// Get total number of books registered
        #[ink(message)]
        pub fn get_total_books(&self) -> u32 {
            self.total_books
        }

        /// Pause the contract (only owner)
        #[ink(message)]
        pub fn pause(&mut self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::OnlyContractOwner);
            }
            self.paused = true;
            Ok(())
        }

        /// Unpause the contract (only owner)
        #[ink(message)]
        pub fn unpause(&mut self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::OnlyContractOwner);
            }
            self.paused = false;
            Ok(())
        }

        /// Check if contract is paused
        #[ink(message)]
        pub fn is_paused(&self) -> bool {
            self.paused
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let contract = BookTraceability::new();
            assert_eq!(contract.get_total_books(), 0);
            assert!(!contract.is_paused());
        }

        #[ink::test]
        fn register_book_works() {
            let mut contract = BookTraceability::new();
            let book_id = String::from("book-123");
            let result = contract.register_book(
                book_id.clone(),
                String::from("978-1234567890"),
                String::from("Test Book"),
                String::from("Test Author"),
                String::from("{}"),
            );
            assert!(result.is_ok());
            assert_eq!(contract.get_total_books(), 1);
            let book = contract.get_book(book_id);
            assert!(book.is_some());
        }

        #[ink::test]
        fn duplicate_book_fails() {
            let mut contract = BookTraceability::new();
            let book_id = String::from("book-123");
            let _ = contract.register_book(
                book_id.clone(),
                String::from("978-1234567890"),
                String::from("Test Book"),
                String::from("Test Author"),
                String::from("{}"),
            );
            let result = contract.register_book(
                book_id,
                String::from("978-1234567890"),
                String::from("Test Book 2"),
                String::from("Test Author 2"),
                String::from("{}"),
            );
            assert!(matches!(result, Err(Error::BookAlreadyExists)));
        }
    }
}
