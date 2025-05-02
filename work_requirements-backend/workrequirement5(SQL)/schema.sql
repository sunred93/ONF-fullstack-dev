-- Drop tables if they exist (optional, useful for resetting)
DROP TABLE IF EXISTS book_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
-- authors table
CREATE TABLE authors (
    author_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date_of_birth DATE,
    nationality TEXT
);
-- books table 
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    isbn TEXT UNIQUE,
    description TEXT,
    publishing_year INTEGER,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);
-- quotes table
CREATE TABLE quotes (
    quote_id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote_text TEXT NOT NULL,
    book_id INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
-- genres table
CREATE TABLE genres (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre_name TEXT NOT NULL UNIQUE
);
-- book_genres linking table
CREATE TABLE book_genres (
    book_id INTEGER,
    genre_id INTEGER,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id) -- Ensures each book-genre combination is unique
);
-- Indexes for performance
CREATE INDEX idx_book_genres_book_id ON book_genres (book_id);
CREATE INDEX idx_book_genres_genre_id ON book_genres (genre_id);
CREATE INDEX idx_books_author_id ON books (author_id);
CREATE INDEX idx_quotes_book_id ON quotes (book_id);
CREATE INDEX idx_authors_name ON authors (name);
CREATE INDEX idx_books_title ON books (title);
-----------------------------------------------------------------------
-- INSERT STATEMENTS
-----------------------------------------------------------------------
-- Insert sample data into authors table
-- Note the assumed author_id generated (1, 2, 3, 4, 5)
INSERT INTO authors (name, date_of_birth, nationality)
VALUES ('Patrick Rothfuss', '1973-06-06', 'American'),
    -- author_id = 1
    ('Brandon Sanderson', '1975-12-19', 'American'),
    -- author_id = 2
    ('J.K. Rowling', '1965-07-31', 'British'),
    -- author_id = 3
    ('Lian Hearn', '1942-03-28', 'British-Australian'),
    -- author_id = 4 (Pseudonym, DOB might be approximate)
    ('Ken Follett', '1949-06-05', 'Welsh');
-- author_id = 5
-- Insert sample data into books table
-- Using the author_id from above
-- Note the assumed book_id generated (1-16)
INSERT INTO books (
        title,
        publishing_year,
        isbn,
        description,
        author_id
    )
VALUES (
        'The Name of the Wind',
        2007,
        '978-0756404741',
        'The first book in The Kingkiller Chronicle...',
        1
    ),
    -- book_id = 1
    (
        'The Wise Man''s Fear',
        2011,
        '978-0756407919',
        'The second book in The Kingkiller Chronicle...',
        1
    ),
    -- book_id = 2
    (
        'The Way of Kings',
        2010,
        '978-0765326355',
        'The first book in The Stormlight Archive...',
        2
    ),
    -- book_id = 3
    (
        'Words of Radiance',
        2014,
        '978-0765326362',
        'The second book in The Stormlight Archive...',
        2
    ),
    -- book_id = 4
    (
        'Mistborn: The Final Empire',
        2006,
        '978-0765311795',
        'The first book in the Mistborn: Era One trilogy...',
        2
    ),
    -- book_id = 5
    (
        'Oathbringer',
        2017,
        '978-0765326379',
        'The third book in The Stormlight Archive...',
        2
    ),
    -- book_id = 6
    (
        'Harry Potter and the Sorcerer''s Stone',
        1997,
        '978-0590353403',
        'The first book in the Harry Potter series...',
        3
    ),
    -- book_id = 7
    (
        'Harry Potter and the Chamber of Secrets',
        1998,
        '978-0439064873',
        'The second book in the Harry Potter series...',
        3
    ),
    -- book_id = 8
    (
        'Harry Potter and the Prisoner of Azkaban',
        1999,
        '978-0439136358',
        'The third book in the Harry Potter series...',
        3
    ),
    -- book_id = 9
    (
        'Harry Potter and the Goblet of Fire',
        2000,
        '978-0439139595',
        'The fourth book in the Harry Potter series...',
        3
    ),
    -- book_id = 10
    (
        'Across the Nightingale Floor',
        2002,
        '978-0399236419',
        'The first book in the Tales of the Otori series...',
        4
    ),
    -- book_id = 11
    (
        'Grass for His Pillow',
        2003,
        '978-0399239311',
        'The second book in the Tales of the Otori series...',
        4
    ),
    -- book_id = 12
    (
        'Brilliance of the Moon',
        2004,
        '978-0399240430',
        'The third book in the Tales of the Otori series...',
        4
    ),
    -- book_id = 13
    (
        'The Pillars of the Earth',
        1989,
        '978-0380754279',
        'The first book in the Kingsbridge series...',
        5
    ),
    -- book_id = 14
    (
        'Fall of Giants',
        2010,
        '978-0525951653',
        'The first book in The Century Trilogy...',
        5
    ),
    -- book_id = 15
    (
        'Never',
        2021,
        '978-0593134388',
        'A contemporary thriller...',
        5
    );
-- book_id = 16
-- Insert sample data into genres table
-- Note the assumed genre_id generated (1-5)
INSERT INTO genres (genre_name)
VALUES ('Fantasy'),
    -- genre_id = 1
    ('Epic Fantasy'),
    -- genre_id = 2
    ('Historical Fantasy'),
    -- genre_id = 3
    ('Historical Fiction'),
    -- genre_id = 4
    ('Thriller');
-- genre_id = 5
-- Insert links into book_genres table
-- Using assumed book_ids (1-16) and genre_ids (1-5)
INSERT INTO book_genres (book_id, genre_id)
VALUES (1, 1),
    -- The Name of the Wind -> Fantasy
    (2, 1),
    -- The Wise Man's Fear -> Fantasy
    (3, 2),
    -- The Way of Kings -> Epic Fantasy
    (4, 2),
    -- Words of Radiance -> Epic Fantasy
    (5, 1),
    -- Mistborn: The Final Empire -> Fantasy
    (6, 2),
    -- Oathbringer -> Epic Fantasy
    (7, 1),
    -- Harry Potter 1 -> Fantasy
    (8, 1),
    -- Harry Potter 2 -> Fantasy
    (9, 1),
    -- Harry Potter 3 -> Fantasy
    (10, 1),
    -- Harry Potter 4 -> Fantasy
    (11, 3),
    -- Across the Nightingale Floor -> Historical Fantasy
    (12, 3),
    -- Grass for His Pillow -> Historical Fantasy
    (13, 3),
    -- Brilliance of the Moon -> Historical Fantasy
    (14, 4),
    -- The Pillars of the Earth -> Historical Fiction
    (15, 4),
    -- Fall of Giants -> Historical Fiction
    (16, 5);
-- Never -> Thriller
-- Insert Quotes (linked to correct book_ids)
INSERT INTO quotes (quote_text, book_id)
VALUES -- Patrick Rothfuss Quotes
    (
        'There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man.',
        1
    ),
    -- Name of the Wind
    (
        'Words are pale shadows of forgotten names. As names have power, words have power. Words can light fires in the minds of men. Words can wring tears from the hardest hearts.',
        1
    ),
    -- Name of the Wind
    (
        'It''s the questions we can''t answer that teach us the most. They teach us how to think.',
        2
    ),
    -- Wise Man's Fear (Corrected from previous input)
    (
        'My name is Kvothe. As you may have heard of me.',
        1
    ),
    -- Name of the Wind
    -- Brandon Sanderson Quotes
    (
        'Life before death. Strength before weakness. Journey before destination.',
        3
    ),
    -- Way of Kings
    (
        'Hope is the first step on the road to disappointment.',
        5
    ),
    -- Mistborn 
    (
        'The most important step a man can take. It''s not the first one, is it? It''s the next one. Always the next step.',
        6
    ),
    -- Oathbringer 
    (
        'Sometimes a hypocrite is nothing more than a man who is in the process of changing.',
        4
    ),
    -- Words of Radiance
    -- J.K. Rowling Quotes
    (
        'It is our choices, Harry, that show what we truly are, far more than our abilities.',
        8
    ),
    -- Chamber of Secrets 
    (
        'Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.',
        9
    ),
    -- Prisoner of Azkaban 
    (
        'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.',
        7
    ),
    -- Sorcerer's Stone 
    (
        'Numbing the pain for a while will make it worse when you finally feel it.',
        10
    ),
    -- Goblet of Fire 
    -- Lian Hearn Quotes
    (
        'But just as the river is always at the door, so is the world always outside. And it is in the world that we have to live.',
        11
    ),
    -- Across the Nightingale Floor 
    (
        'When illusions are shattered by truth, talent is set free.',
        11
    ),
    -- Across the Nightingale Floor 
    (
        'Death comes suddenly and life is fragile and brief. No one can alter this either by prayers or spells.',
        12
    ),
    -- Grass for His Pillow 
    (
        'The moon sees all the secrets that the day tries to hide.',
        13
    ),
    -- Brilliance of the Moon 
    -- Ken Follett Quotes
    (
        'The most expensive part of building is the mistakes.',
        14
    ),
    -- Pillars of the Earth 
    (
        'She loved him because he had brought her back to life. She had been like a caterpillar in a cocoon, and he had drawn her out and shown her that she was a butterfly.',
        14
    ),
    -- Pillars of the Earth 
    (
        'Trusting someone was like holding a little water in your cupped hands – it was so easy to spill the water, and you could never get it back.',
        15
    ),
    -- Fall of Giants 
    ('Every good story needs a good villain.', 16);
-- Never 
SELECT b.title AS BookTitle,
    COUNT(q.quote_id) AS NumberOfQuotes
FROM books b
    LEFT JOIN -- Use LEFT JOIN to include books that might have zero quotes
    quotes q ON b.book_id = q.book_id
GROUP BY b.book_id,
    b.title -- Group by book to count quotes per book
ORDER BY NumberOfQuotes DESC,
    -- Optional: Order by most quotes first
    BookTitle ASC;
-- Then alphabetically by title
SELECT a.name AS AuthorName,
    COUNT(q.quote_id) AS NumberOfQuotes
FROM authors a
    LEFT JOIN -- Join authors to books
    books b ON a.author_id = b.author_id
    LEFT JOIN -- Join books to quotes
    quotes q ON b.book_id = q.book_id
GROUP BY a.author_id,
    a.name -- Group by author to count quotes per author
ORDER BY NumberOfQuotes DESC,
    -- Optional: Order by most quotes first
    AuthorName ASC;
-- Then alphabetically by author name
SELECT q.quote_text AS Quote,
    a.name AS AuthorName
FROM quotes q
    JOIN -- Join quotes to books
    books b ON q.book_id = b.book_id
    JOIN -- Join books to authors
    authors a ON b.author_id = a.author_id
WHERE b.title = 'The Name of the Wind';
-- Filter for the specific book title
SELECT q.quote_text AS Quote,
    b.title AS BookTitle
FROM quotes q
    JOIN -- Join quotes to books
    books b ON q.book_id = b.book_id
    JOIN -- Join books to authors
    authors a ON b.author_id = a.author_id
WHERE a.name = 'Brandon Sanderson';
-- Filter for the specific author name