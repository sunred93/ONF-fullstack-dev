from flask import Flask, render_template, request, redirect, url_for
import json
import os

app = Flask(__name__)

DATA_FILE = 'movies.json'

# json data handling

def load_movies():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
            if not content:
                return []
            data = json.loads(content)
            return data if isinstance(data, list) else []
    except (json.JSONDecodeError, IOError) as e:
        print (f"eroor loading data from {DATA_FILE}: {e} ")
        return []
    
def save_movies(movies):
    """Saves the movie data list to the JSON file."""
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(movies, f, indent=4) # Use indent for readability
    except IOError as e:
        print(f"Error saving data to {DATA_FILE}: {e}")
            
all_movies_data = load_movies()

def find_movie_by_id(movie_id):
    """Helper function to find a movie in our data list by its ID."""
    for movie in all_movies_data:
        # Ensure comparison is between integers
        if movie.get('id') == int(movie_id):
            return movie
    return None # Return None if not found

def get_next_id():
    if not all_movies_data:
        return 1
    max_id = max(movie.get('id', 0) for movie in all_movies_data)
    return max_id + 1
    
    # /json data handling

# flask routes

@app.route('/')
def home():
    #sort movies by title
    sorted_movies = sorted(all_movies_data, key=lambda x: x.get('title', ''))
    return render_template('main.html', movies=sorted_movies)


@app.route('/new', methods=['GET'])
def new_movie_form():
    return render_template('new-movie.html')

@app.route('/new', methods=['POST'])
def add_movie():
    try:
        new_movie_data = {
             'id': get_next_id(),
            'title': request.form.get('title', 'Untitled'),
            'year': int(request.form.get('year', 0)), # Convert year to int
            'genre': request.form.get('genre', 'Unknown'),
            'rating': request.form.get('rating', 'N/A'),
            'credits': [] # Start with empty credits, maybe add later?
        }
        all_movies_data.append(new_movie_data)
        save_movies(all_movies_data)
        print(f"New movie added: {new_movie_data}")
        return redirect(url_for('home'))
    except ValueError:
        # Handle case where year is not a valid number
        print("Error adding movie: Invalid year provided.")
        
        return "Invalid year provided", 400
    except Exception as e:
        print(f"Error adding movie: {e}")
        # Generic error handling
        return "An error occurred while adding the movie.", 500
    

    # Route for displaying a specific movie's details
@app.route('/movie/<int:movie_id>')
def movie_details(movie_id):
    movie = find_movie_by_id(movie_id)
    if movie:
        return render_template('movie.html', movie=movie)
    else:
        return "Movie not found", 404

# Route for displaying the 'edit movie' form
@app.route('/edit/<int:movie_id>', methods=['GET'])
def edit_movie_form(movie_id):
    movie = find_movie_by_id(movie_id)
    if movie:
        return render_template('edit-movie.html', movie=movie)
    else:
        return "Movie not found", 404

# Route for handling the submission of the 'edit movie' form
@app.route('/edit/<int:movie_id>', methods=['POST'])
def update_movie(movie_id):
    movie = find_movie_by_id(movie_id)
    if not movie:
        return "Movie not found", 404

    try:
        # Update movie data from form
        movie['title'] = request.form.get('title', movie.get('title'))
        movie['year'] = int(request.form.get('year', movie.get('year'))) # Convert year to int
        movie['genre'] = request.form.get('genre', movie.get('genre'))
        movie['rating'] = request.form.get('rating', movie.get('rating'))
        movie['poster'] = request.form.get('poster', movie.get('poster'))
        movie['poster_thumb'] = request.form.get('poster_thumb', movie.get('poster_thumb'))
        # Note: Editing credits is more complex and not handled here yet

        save_movies(all_movies_data)
        print(f"Updated movie ID {movie_id}: {movie['title']}") # Log success
        return redirect(url_for('movie_details', movie_id=movie_id))
    except ValueError:
        # Handle case where year is not a valid number
        print(f"Error updating movie ID {movie_id}: Invalid year provided.")
        # Redirect back to edit form with an error message (more advanced)
        return "Invalid year provided", 400
    except Exception as e:
        print(f"Error updating movie ID {movie_id}: {e}")
        return "An error occurred while updating the movie.", 500

# --- Add a route for deleting movies ---
@app.route('/delete/<int:movie_id>', methods=['POST']) # Use POST for actions that change data
def delete_movie(movie_id):
    global all_movies_data # Need to modify the global list
    movie = find_movie_by_id(movie_id)
    if not movie:
        return "Movie not found", 404

    try:
        # Create a new list excluding the movie to be deleted
        all_movies_data = [m for m in all_movies_data if m.get('id') != movie_id]
        save_movies(all_movies_data)
        print(f"Deleted movie ID {movie_id}") # Log success
        return redirect(url_for('home'))
    except Exception as e:
        print(f"Error deleting movie ID {movie_id}: {e}")
        return "An error occurred while deleting the movie.", 500


# --- Run the App ---
if __name__ == '__main__':
    print("Starting Flask app...")
    # Make sure debug=True is only used for development
    app.run(debug=True, port=8080)









                


            

