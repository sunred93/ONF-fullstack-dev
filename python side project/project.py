import json
import os

FILE_NAME = "todo_list.json"

DEFAULT_TASKS = [
    {"task": "wash car", "due_date": "08.03.2025", "completed": False},
    {"task": "buy groseries", "due_date": "10.03.2025", "completed": False},
    {"task": "book doctor appointment", "due_date": "15.03.2025", "completed": False},
    {"task": "pay electricity bill", "due_date": "20.03.2025", "completed": False},
    {"task": "finish reading book", "due_date": "25.03.2025", "completed": False},
    {"task": "call mom", "due_date": "27.03.2025", "completed": False},
    {"task": "plan weekend trip", "due_date": "30.03.2025", "completed": False},
    {"task": "schedule haircut", "due_date": "05.04.2025", "completed": False},
    {"task": "exercise for 30 minutes", "due_date": "07.04.2025", "completed": False},
    {"task": "water the plants", "due_date": "12.04.2025", "completed": False},
    {"task": "clean the bathroom", "due_date": "15.04.2025", "completed": False},
    {"task": "organize closet", "due_date": "20.04.2025", "completed": False},
    {"task": "write a thank you letter", "due_date": "23.04.2025", "completed": False},
    {"task": "meal prep for the week", "due_date": "27.04.2025", "completed": False},
    {"task": "learn a new recipe", "due_date": "30.04.2025", "completed": False},
    {"task": "check car tire pressure", "due_date": "03.05.2025", "completed": False},
    {"task": "backup computer files", "due_date": "07.05.2025", "completed": False},
    {"task": "fix leaky faucet", "due_date": "10.05.2025", "completed": False},
    {"task": "research a new hobby", "due_date": "15.05.2025", "completed": False},
    {"task": "declutter desk", "due_date": "20.05.2025", "completed": False},
    {"task": "take out the trash", "due_date": "25.05.2025", "completed": False},
    {"task": "replace light bulbs", "due_date": "30.05.2025", "completed": False},
]

def load_tasks():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                print("Error: could not decode JSON file. Starting with default list.")
                return DEFAULT_TASKS
    else:
        return DEFAULT_TASKS

def save_tasks(tasks):
    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)

my_list = load_tasks()
# main loop
while True:
    print("\nWhat would you like to do?")
    print("1. List all tasks")
    print("2. Add a task")
    print("3. Remove a task")
    print("4. Mark a task as complete")
    print("5. Quit")

    choice = input("Enter your choice (1-5): ")

    if choice == "1":
        print("Here is a list of tasks you can do today:")
        for index, task in enumerate(my_list):
            print(
                f"{index}. task: {task['task']}, due date: {task['due_date']}, completed: {task['completed']}"
            )

    elif choice == "2":
        new_task = input("Enter the new task: ")
        new_due_date = input("Enter the due date for the task: ")
        my_list.append({"task": new_task, "due_date": new_due_date, "completed": False})
        print("Task added successfully!")

    elif choice == "3":
        indices_to_remove = input(
            "Enter the indices of the tasks to remove, separated by commas (e.g., 0,2,5): "
        )
        index_strings = indices_to_remove.split(",")
        indices = []
        for index_str in index_strings:
            try:
                indices.append(int(index_str.strip()))
            except ValueError:
                print(f"Invalid index: '{index_str}'. Skipping.")

        indices.sort(reverse=True)  # Remove in reverse order to avoid index issues
        for task_index in indices:
            try:
                removed_task = my_list.pop(task_index)
                print(f"Task '{removed_task['task']}' removed successfully!")
            except IndexError:
                print(f"Invalid task index: {task_index}. Skipping.")

    elif choice == "4":
        task_index_str = input("Enter the index of the task to mark as complete (from the list above): ")
        try:
            task_index = int(task_index_str)
            if 0 <= task_index < len(my_list):
                my_list[task_index]["completed"] = True
                print("Task marked as complete!")
            else:
                print("Invalid task index.")
        except ValueError:
            print(f"Invalid index: '{task_index_str}'. Please enter a single number.")

    elif choice == "5":
        print("goodbye!")
        save_tasks(my_list)  # Save tasks before quitting
        break  # Exit the loop

    elif choice not in ["1", "2", "3", "4", "5"]:
        print("Invalid choice. Please enter a number between 1 and 5.")
