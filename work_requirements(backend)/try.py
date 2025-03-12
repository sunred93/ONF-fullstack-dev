import os

directory_path = input("Enter a directory path: ")

try:
    contents = os.listdir(directory_path)  # Get the directory contents as a list

    for item in contents:  # Iterate over the items in the list
        print(f"- {item}")  # Print each item nicely formatted

except FileNotFoundError:
    print("Directory not found.")

except PermissionError:
    print("You do not have permission to access this directory.")
