import jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pprint import pp
import os # Import os for path joining if needed later

# -----DATABASE------#

# Combine movies and their specific credits
# (Added some sample credits - you should fill these out!)
movies_data = [
    {'id': 1, 'title': 'Shaun of the Dead',
     'year': 2004, 'rating': 6, 'genre': 'Comedy/Horror',
     'credits': [
         {'name': 'Simon Pegg', 'role': 'Actor (Shaun)'},
         {'name': 'Nick Frost', 'role': 'Actor (Ed)'},
         {'name': 'Kate Ashfield', 'role': 'Actor (Liz)'},
         {'name': 'Edgar Wright', 'role': 'Director/Writer'},
         {'name': 'Simon Pegg', 'role': 'Writer'},
     ]},
    {'id': 2, 'title': 'Hot Fuzz',
     'year': 2007, 'rating': 6, 'genre': 'Action/Comedy',
     'credits': [
         {'name': 'Simon Pegg', 'role': 'Actor (Nicholas Angel)'},
         {'name': 'Nick Frost', 'role': 'Actor (Danny Butterman)'},
         {'name': 'Jim Broadbent', 'role': 'Actor (Inspector Frank Butterman)'},
         {'name': 'Edgar Wright', 'role': 'Director/Writer'},
         {'name': 'Simon Pegg', 'role': 'Writer'},
     ]},
    {'id': 3, 'title': 'The Worlds End', 
     'year': 2013, 'rating': 5, 'genre': 'Comedy/Sci-Fi',
     'credits': [
          {'name': 'Simon Pegg', 'role': 'Actor (Gary King)'},
          {'name': 'Nick Frost', 'role': 'Actor (Andy Knightley)'},
          {'name': 'Martin Freeman', 'role': 'Actor (Oliver Chamberlain)'},
          {'name': 'Edgar Wright', 'role': 'Director/Writer'},
          {'name': 'Simon Pegg', 'role': 'Writer'},
     ]},
    {'id': 4, 'title': 'Blade Runner',
     'year': 1982, 'rating': 6, 'genre': 'Sci-Fi',
     'credits': [
         {'name': 'Harrison Ford', 'role': 'Actor (Rick Deckard)'},
         {'name': 'Rutger Hauer', 'role': 'Actor (Roy Batty)'},
         {'name': 'Sean Young', 'role': 'Actor (Rachael)'},
         {'name': 'Ridley Scott', 'role': 'Director'},
     ]},
    {'id': 5, 'title': 'Blade Runner 2049',
     'year': 2017, 'rating': 6, 'genre': 'Sci-Fi',
      'credits': [
         {'name': 'Ryan Gosling', 'role': 'Actor (K)'},
         {'name': 'Harrison Ford', 'role': 'Actor (Rick Deckard)'},
         {'name': 'Ana de Armas', 'role': 'Actor (Joi)'},
         {'name': 'Denis Villeneuve', 'role': 'Director'},
     ]},
    {'id': 6, 'title': 'The Princess Bride',
     'year': 1987, 'rating': 6, 'genre': 'Fantasy/Adventure',
     'credits': [
         {'name': 'Cary Elwes', 'role': 'Actor (Westley)'},
         {'name': 'Robin Wright', 'role': 'Actor (Buttercup)'},
         {'name': 'Mandy Patinkin', 'role': 'Actor (Inigo Montoya)'},
         {'name': 'Rob Reiner', 'role': 'Director'},
         {'name': 'William Goldman', 'role': 'Writer (Screenplay/Book)'},
     ]},
    {'id': 7, 'title': 'This Is Spinal Tap',
     'year': 1984, 'rating': 5, 'genre': 'Comedy/Mockumentary',
      'credits': [
         {'name': 'Christopher Guest', 'role': 'Actor/Writer (Nigel Tufnel)'},
         {'name': 'Michael McKean', 'role': 'Actor/Writer (David St. Hubbins)'},
         {'name': 'Harry Shearer', 'role': 'Actor/Writer (Derek Smalls)'},
         {'name': 'Rob Reiner', 'role': 'Director/Actor (Marty DiBergi)'},
     ]},
    {'id': 8, 'title': 'Monty Python and the Holy Grail',
     'year': 1975, 'rating': 6, 'genre': 'Comedy',
     'credits': [
         {'name': 'Graham Chapman', 'role': 'Actor'},
         {'name': 'John Cleese', 'role': 'Actor'},
         {'name': 'Eric Idle', 'role': 'Actor'},
         {'name': 'Terry Gilliam', 'role': 'Actor/Director'},
         {'name': 'Terry Jones', 'role': 'Actor/Director'},
         {'name': 'Michael Palin', 'role': 'Actor'},
     ]},
    {'id': 9, 'title': 'Monty Python Life of Brian', 
     'year': 1979, 'rating': 6, 'genre': 'Comedy',
     'credits': [
         {'name': 'Graham Chapman', 'role': 'Actor'},
         {'name': 'John Cleese',    'role': 'Actor'},
         {'name': 'Eric Idle',      'role': 'Actor'},
         {'name': 'Terry Gilliam',  'role': 'Actor'},
         {'name': 'Terry Jones',    'role': 'Actor'},
         {'name': 'Michael Palin',  'role': 'Actor'},
         {'name': 'Terry Jones',    'role': 'Director'},
         {'name': 'John Goldstone', 'role': 'Producer'},
     ]},
]


genres = [
    'Action', 'Action/Comedy', 'Comedy', 'Comedy/Horror',
    'Comedy/Mockumentary', 'Comedy/Sci-Fi', 'Drama',
    'Fantasy/Adventure', 'Horror', 'Romance', 'Sci-Fi',
]


# ---- RENDERING ---- #

# Define the directory where templates are located
TEMPLATE_DIR = 'templates'
# Define the directory where output HTML files will be saved
OUTPUT_DIR = 'output'

# Create output directory if it doesn't exist (Uncommented)
if not os.path.exists(OUTPUT_DIR):
   print(f"Creating output directory: {OUTPUT_DIR}")
   os.makedirs(OUTPUT_DIR)

env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(['html', 'xml'])
)

def render(template, outfile, **context):
    """Renders a Jinja2 template and saves it to a file in the OUTPUT_DIR."""
    try:
        # Construct the full output path using os.path.join 
        full_outfile_path = os.path.join(OUTPUT_DIR, outfile)

        tmpl = env.get_template(template)
        # Update print statement to show the full path
        print(f'Rendering {template} to {full_outfile_path}')

        if __debug__:
            print('--- Context Data ---')
            pp(context)
            print('--------------------')

        # Use the full_outfile_path in the open() call
        with open(full_outfile_path, 'w', encoding='utf-8') as file:
            file.write(tmpl.render(**context))

    except jinja2.TemplateNotFound:
        print(f"Error: Template '{template}' not found in '{TEMPLATE_DIR}'.")
    except Exception as e:
        # Use full_outfile_path in the error message
        print(f"Error rendering {template} to {full_outfile_path}: {e}")


# ---- RENDER THE PAGES ----

# 1. Render the main index page (sorted by year)
# ---- RENDER THE PAGES ----

def main():
    """Generates all static HTML pages for the movie database."""
    print("Starting page generation...")

    # 1. Render the main index page (sorted by year)
    print("Rendering main list page...")
    sorted_movies = sorted(movies_data, key=lambda x: x['year'])
    # Consider naming the main page 'index.html' for web server defaults
    render(template='main.html', outfile='main.html', movies=sorted_movies)

    # 2. Render individual movie detail pages (Loop!)
    print("\nRendering individual movie pages...")
    for movie in movies_data:
        render(
            template='movie.html',
            outfile=f"movie-{movie['id']}.html", # Dynamic filename
            movie=movie,
            credits=movie.get('credits', []) # Get credits from the movie dict
        )

    # 3. Render the 'New Movie' form page
    print("\nRendering new movie form page...")
    # Create 10 empty dicts for the fixed slots in the form template
    no_credits = [{} for _ in range(10)]
    render(
        template='movie-form.html',
        outfile='new-movie.html',
        title='New Movie',
        movie={}, # Pass an empty dictionary for a new movie
        credits=no_credits,
        genres=genres
    )

    # 4.  loop Render individual 'Edit Movie' form pages
    print("\nRendering edit movie form pages...")
    for movie in movies_data:
        # Get the actual credits for the current movie
        actual_credits = movie.get('credits', [])
        # Pad *these* credits to 10 slots for the form template
        padded_credits = actual_credits + [{} for _ in range(10 - len(actual_credits))]

        render(
            template='movie-form.html',
            outfile=f"edit-movie-{movie['id']}.html", # Dynamic filename
            title=f"Edit Movie: {movie['title']}", # Dynamic title
            movie=movie, # Pass the specific movie dict to pre-fill
            credits=padded_credits, # Pass its padded credits
            genres=genres
        )

    print("\nFinished rendering all pages.")


# calls the main function when the script is run
if __name__ == "__main__":
    main()
