CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth TEXT,
    nationality TEXT
);
CREATE TABLE books(
    book_id INT PRIMARY KEY,
    title TEXT NOT Null,
    year_published INT,
    author_id INT,
    ISBN INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

CREATE TABLE Quotes(
    quote_id INT PRIMARY KEY,
    quote_text TEXT NOT NULL,
    book_id INT,
    author_id INT,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

INSERT INTO authors (author_id, name, date_of_birth, nationality) VALUES
(1, 'Mark Twain', '1835-11-30', 'American'),
(2, 'Jane Austen', '1775-12-16', 'British'),
(3, 'George Orwell', '1903-06-25', 'British'),
(4, 'J.K. Rowling', '1965-07-31', 'British'),
(5, 'J.R.R Tolkien', '1892-01-03', 'British');

INSERT INTO books (book_id, title, year_published, author_id, ISBN) VALUES
(1, 'The Adventures of Tom Sawyer', 1876, 1, 9780143039563),
(2, 'Pride and Prejudice', 1813, 2, 9780141439518),
(3, '1984', 1949, 3, 9780451524935),
(4,'animal farm', 1945, 3, 9780451526342),
(5, 'Harry Potter and the Philosopher''s Stone', 1997, 4, 9780747532699),
(6, 'harry potter and the chamber of secrets', 1998, 4, 9780747538493),
(7, 'The Hobbit', 1937, 5, 9780547928227),
(8, 'The Lord of the Rings: The Fellowship of the Ring', 1954, 5, 9780547928210),
(9, 'The Lord of the Rings: The Two Towers', 1954, 5, 9780547928203),
(10, 'The Lord of the Rings: The Return of the King', 1955, 5, 9780547928197);

INSERT INTO Quotes (quote_id, quote_text, book_id, author_id) VALUES
(1, 'The secret of getting ahead is getting started.', 1, 1),
(2, 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.', 2, 2),
(3, 'War is peace. Freedom is slavery. Ignorance is strength.', 3, 3),
(4, 'It does not do to dwell on dreams and forget to live.', 4, 4),
(5, 'In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.', 5, 5),
(6, 'It is our choices, Harry, that show what we truly are, far more than our abilities.', 5, 4),
(7, 'All we have to decide is what to do with the time that is given us.', 6, 5),
(8, 'Not all those who wander are lost.', 7, 5),
(9, 'Even the smallest person can change the course of the future.', 8, 5),
(10, 'There is some good in this world, and it’s worth fighting for.', 9, 5),
(11, 'The world is indeed full of peril, and in it there are many dark places; but still there is much that is fair, and though in all lands love is now mingled with grief, it grows perhaps the greater.', 10, 5),
(12, 'The wand chooses the wizard, Mr. Potter.',5, 4),
(13, 'Fear of a name increases fear of the thing itself.',6, 4),
(14, 'When in doubt, go to the library.',6, 4),
(15, 'In a hole in the ground there lived a hobbit.',7, 5),
(16, 'May the wind under your wings bear you where the sun sails and the moon walks.', 7, 5),
(17, 'I wish it need not have happened in my time.',8, 5),
(18, 'All animals are equal, but some animals are more equal than others.', 4, 3),
(19, 'Four legs good, two legs bad.',4, 3),
(20, 'Big Brother is watching you.',3, 3);



-- query to list all books and their number of quotes
SELECT b.title, COUNT(q.quote_id) AS number_of_quotes
FROM books b
LEFT JOIN Quotes q ON b.book_id = q.book_id
GROUP BY b.title;

--list all authors and the number of quotes for each
SELECT a.name, COUNT(q.quote_id) AS number_of_quotes
FROM authors a
LEFT JOIN Quotes q ON a.author_id = q.author_id
GROUP BY a.name;

-- list all quotes from a specific book
SELECT q.quote_text
FROM Quotes q
JOIN books b ON q.book_id = b.book_id
WHERE b.title = '1984';

-- list all quotes by a specific author
SELECT q.quote_text
FROM Quotes q
JOIN authors a ON q.author_id = a.author_id
WHERE a.name = 'George Orwell';

