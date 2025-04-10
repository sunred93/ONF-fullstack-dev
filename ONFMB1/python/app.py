from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# --- Example Data (Replace with your actual data source later) ---
all_movies_data = [
    {'id': 8, 'title': 'Monty Python and the Holy Grail', 'year': 1975, 'genre': 'Comedy', 'rating': '6/6', 'poster': 'static/images/movie-poster-8.jpg', 'poster_thumb': 'static/images/movie-poster-8-thumbnail.jpg', 'credits': []},
    {'id': 9, 'title': 'Monty Python\'s Life of Brian', 'year': 1979, 'genre': 'Comedy', 'rating': '6/6', 'poster': 'static/images/movie-poster-9.jpg', 'poster_thumb': 'static/images/movie-poster-9-thumbnail.jpg', 'credits': [{'name': 'Graham Chapman', 'role': 'Actor'}, {'name': 'John Cleese', 'role': 'Actor'}, {'name': 'Eric Idle', 'role': 'Actor'}, {'name': 'Terry Gilliam', 'role': 'Actor'}, {'name': 'Terry Jones', 'role': 'Actor'}, {'name': 'Michael Palin', 'role': 'Actor'}, {'name': 'Terry Jones', 'role': 'Director'}, {'name': 'John Goldstone', 'role': 'Producer'}]},
    {'id': 4, 'title': 'Blade Runner', 'year': 1982, 'genre': 'Sci-Fi', 'rating': '6/6', 'poster': 'static/images/movie-poster-4.jpg', 'poster_thumb': 'static/images/movie-poster-4-thumbnail.jpg', 'credits': []},
    # Add other movies if you have them
]

def find_movie_by_id(id_to_find):
    """Helper function to find a movie in our example data list."""
    for movie in all_movies_data:
        if movie['id'] == id_to_find:
            return movie
    return None # Return None if not found
# --- End of Example Data ---


# Route for the home page (list of movies)
@app.route('/')
def home():
    # Use the example data list
    movies = all_movies_data
    return render_template('main.html', movies=movies)

# Route for displaying the 'new movie' form
@app.route('/new', methods=['GET'])
def new_movie():
    return render_template('new-movie.html')

# Route for handling the submission of the 'new movie' form
@app.route('/new', methods=['POST'])
def add_movie():
    # Logic to get form data using request.form (implement later)
    print("Form submitted (add_movie):", request.form)
    # Logic to save the new movie (implement later)
    # For now, just redirect back home
    return redirect(url_for('home'))

# Route for displaying a specific movie's details
@app.route('/movie/<int:movie_id>') # Example using integer movie ID
def movie_details(movie_id):
    # Use the helper function to find the movie
    movie = find_movie_by_id(movie_id)
    if movie:
        return render_template('movie.html', movie=movie)
    else:
        return "Movie not found", 404 # Handle movie not found

# Route for displaying the 'edit movie' form
@app.route('/edit/<int:movie_id>', methods=['GET'])
def edit_movie(movie_id):
     # Use the helper function to find the movie
    movie = find_movie_by_id(movie_id)
    if movie:
        # Pass movie data to pre-fill form
        return render_template('edit-movie.html', movie=movie)
    else:
        return "Movie not found", 404 # Handle movie not found

# Route for handling the submission of the 'edit movie' form
@app.route('/edit/<int:movie_id>', methods=['POST'])
def update_movie(movie_id):
    # Logic to get form data using request.form (implement later)
    print(f"Form submitted (update_movie for ID {movie_id}):", request.form)
    # Logic to update the movie with the given movie_id (implement later)
    # For now, just redirect back to the details page
    return redirect(url_for('movie_details', movie_id=movie_id))

if __name__ == '__main__':
    print("Starting Flask app...") # Add a print statement to see if this part runs
    app.run(debug=True, port=8080)

