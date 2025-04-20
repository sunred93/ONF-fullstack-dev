# 1. file to List converter
import os

print("what file do you want to convert?")
filename = input()

try:
    with open(filename, "r") as f:
        lines = f.readlines()
    print("file exists and is readable")
    stripped_lines = [line.strip() for line in lines]  # Now inside the 'with' block
    print(stripped_lines) # print the list.
except FileNotFoundError:
    print("file does not exist or is not readable")

#____________________________________________________________________________________________


#task list manager
import task


task_list = []

def main():
    """
    Main function to manage tasks.
    """
    while True:
        print("\nTask Manager Menu:")
        print("1. Add Task")
        print("2. Remove Task")
        print("3. View Tasks")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            task.add_task(task_list, "temp") #call the add_task function in task.py
        elif choice == '2':
    
            if not task_list:
                print("No tasks to remove.")
            else:
                print("Current tasks:")
                for index, task_item in enumerate(task_list):
                    print(f"{index}: {task_item['task']}")

                try:
                    task_index = int(input("Enter the index of the task to remove: "))
                    task.remove_task(task_list, task_index)  #call the remove_task function in task.py
                except ValueError:
                    print("Invalid input. Please enter a number.")
        elif choice == '3':
            if not task_list:
                print("No tasks in the list.")
            else:
                print("Current tasks:")
                for index, task_item in enumerate(task_list):
                    print(f"{index}: {task_item['task']}")
        elif choice == '4':
            print("Exiting Task Manager.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
# ────────────────────────────────────────────────────────────────
# 3. simple class and inheritance.
class person:
    def __init__(self, name, age, greeting):
        self.name = name
        self.age = age
        self.greeting = greeting
#parent class
    def greet(self):
        print(f"Hello, my name is {self.name} and I am {self.age} years old, {self.greeting}.")
#greeting for that class

class student(person):
    def __init__(self, name, age, greeting, student_id):
        super().__init__(name, age, greeting)
        self.student_id = student_id
# child class that inherits from parent class
    def greet(self):
        super().greet()  # Call the person's greet() method
        print(f"my student id is {self.student_id}.")



my_student = student("Jane", 20, "Hi!", "S12345")
my_student.greet()
print(my_student.student_id)

# ────────────────────────────────────────────────────────────────

# 4. math quiz with exception handling

import random

# Generate two random numbers
number1 = random.randint(1, 10)
number2 = random.randint(1, 10)

# Calculate the correct answer
correct_answer = number1 + number2

# Display the question to the user
print(f"What is the sum of {number1} and {number2}?")

while True:
    try:
        user_answer_str = input("Your answer: ")  # Get the user's answer as a string
        user_answer_int = int(user_answer_str)   # Try to convert it to an integer

        # Check if the answer is correct
        if user_answer_int == correct_answer:
            print("you did it!","the correct number is:",correct_answer)
            break  # Exit the loop if the answer is correct
        else:
            print("Incorrect!")

    except ValueError:
        print("Invalid input! Please enter an integer value.")

# ────────────────────────────────────────────────────────────────

# 5. Directory Lister
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

# ────────────────────────────────────────────────────────────────

# 6. Json settings handler

import json

def load_settings(filepath="settings.json"):
    """Loads settings from a JSON file.

    Args:
        filepath: The path to the settings file.

    Returns:
        A dictionary containing the settings, or None if an error occurred.
    """
    try:
        with open(filepath, "r") as file:
            settings = json.load(file)
            return settings
    except FileNotFoundError:
        print(f"Error: Settings file not found at {filepath}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {filepath}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

def save_settings(settings, filepath="settings.json"):
    """Saves settings to a JSON file.

    Args:
        settings: A dictionary containing the settings.
        filepath: The path to the settings file.
    """
    try:
        with open(filepath, "w") as file:
            json.dump(settings, file, indent=2)
        print(f"Settings saved to {filepath}")
    except Exception as e:
        print(f"Error: Failed to save settings to {filepath}: {e}")

def main():
    """Main function to handle settings."""
    settings = load_settings()

    if settings is None:
        return

    print("Current settings:")
    for key, value in settings.items():
        print(f"  {key}: {value}")

    while True:
        setting_to_change = input("Enter the setting you want to change (or 'quit' to exit): ")
        if setting_to_change.lower() == "quit":
            return
        if setting_to_change in settings:
            break
        else:
            print("Invalid setting name. Please choose from:", ", ".join(settings.keys()))

    new_value_str = input(f"Enter the new value for '{setting_to_change}': ")

    current_type = type(settings[setting_to_change])

    try:
        if current_type is int:
            new_value = int(new_value_str)
        elif current_type is float:
            new_value = float(new_value_str)
        elif current_type is str:
            new_value = str(new_value_str)
        elif current_type is bool:
            new_value = new_value_str.lower() == "true"
        else:
            print("Unsupported setting type.")
            return
    except ValueError:
        print("Invalid value type. Please enter a valid value.")
        return

    settings[setting_to_change] = new_value
    save_settings(settings)

if __name__ == "__main__":
    main()
#_________________________________________________________________

# scoped Variables Experiment

#temperature changes in dough
temp = 37

def dough_changes():
    temp = 12
    print(f"Inside dough_changes (before loop): temp = {temp}")

    def dough_mixing():
        nonlocal temp
        temp = 22
        print(f"Inside dough_mixing: temp = {temp}")
     
    for i in range(2):
        temp = temp + i + 10
        print(f"Inside dough_changes (loop iteration {i+1}): temp = {temp}")
    print(f"Inside dough_changes (after loop): temp = {temp}")

    dough_mixing()
    print(f"Inside dough_changes (after dough_mixing): temp = {temp}")
    return temp

print(f"Before calling dough_changes: temp = {temp}")

dough_changes()
print(f"After calling dough_changes: temp = {temp}")
#________________________________________________________


