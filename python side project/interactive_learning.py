# dogfooding
import json
import os
import datetime

FILE_NAME = 'dogfooding.json'
COMPLETED_FILE_NAME = 'completed.json'

DEFAULT_TASKS = [
    {"task": "make to do list", "due_date": "ASAP", "completed": False},
    {"task": "Implement file saving/loading", "due_date": "ASAP", "completed": False},
    {"task": "Add date/time handling (datetime module)", "due_date": "Later", "completed": False},
    {"task": "Add input validation", "due_date": "Later", "completed": False},
    {"task": "Implement the completed tasks list", "due_date": "ASAP", "completed": False},
    {"task": "Add the 'show completed tasks' option", "due_date": "ASAP", "completed": False},
    {"task": "Allow removing multiple tasks at once", "due_date": "ASAP", "completed": False},
    {"task": "Handle errors when marking a task as complete", "due_date": "ASAP", "completed": False},
    {"task": "Add a feature to edit a task", "due_date": "Next", "completed": False},
    {"task": "Add a feature to sort the task list", "due_date": "Next", "completed": False},
    {"task": "Add a feature to filter the task list", "due_date": "Future", "completed": False},
    {"task": "Refactor the code for better organization", "due_date": "Ongoing", "completed": False},
    {"task": "Add unit tests", "due_date": "Ongoing", "completed": False},
    {"task": "Add command-line arguments", "due_date": "Future", "completed": False},
]


    

def load_tasks(file, default = False):
    if os.path.exists(file):
        with open(file, "r") as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                print("error: could not decode JSON file. starting with default list.")
                return DEFAULT_TASKS if default else []
    else:
        return DEFAULT_TASKS if default else []

def save_tasks(tasks):
    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)

def save_completed_tasks(completed_tasks):
    with open(COMPLETED_FILE_NAME, "w") as file:
        json.dump(completed_tasks, file, indent=4)

my_list = load_tasks(FILE_NAME, default = True)
completed_tasks = load_tasks(COMPLETED_FILE_NAME)

while True:
    print("\nWhat would you like to do?")
    print("1. List all tasks")
    print("2. Add a task")
    print("3. Remove a task")
    print("4. Mark a task as complete")
    print("5. List completed tasks")
    print("6. Quit")

    choice = input("Enter your choice (1-6): ")

    if choice not in ["1", "2", "3", "4", "5", "6"]:
        print("Invalid choice. Please enter a number between 1 and 6. try again")

    if choice == "1":
        print("here is the list of tasks to do:")
        for index, task in enumerate(my_list):
            print(
                f"{index}. task: {task['task']}, due date: {task['due_date']}, completed: {task['completed']}"
            )

    if choice == "2":
        new_task = input("enter new task: ")
        new_due_date = input("enter due date: ")
        my_list.append({"task": new_task, "due_date": new_due_date, "completed": False})
        print("task added successfully!")

    if choice == "3":
        indices_to_remove = input(
            "enter the tasks you want to remove (separated by commas): "
        )
        index_strings = indices_to_remove.split(",")
        indices = []
        for index_string in index_strings:
            try:
                indices.append(int(index_string.strip()))
            except ValueError:
                print(f"invalid index: '{index_string}'. skipping.")
        indices.sort(reverse=True)  # remove in reverse to avoid index issues
        for task_index in indices:
            try:
                removed_task = my_list.pop(task_index)
                print(f"task '{removed_task['task']}' removed successfully!")
            except IndexError:
                print(f"invalid task index: {task_index}. skipping.")

    if choice == "4":
        task_index_str = input("enter the index of the task you want to mark as complete: ")
        try:
            task_index = int(task_index_str)
            if 0 <= task_index < len(my_list):
                completed_task = my_list.pop(task_index)
                completed_task["completed"] = True
                completed_task["completed_date"] = str(datetime.datetime.now())
                completed_tasks.append(completed_task)
                print(f"task ' {completed_task['task']}' marked as complete!")
            else:
                print("invalid task index.")
        except ValueError:
            print(
                "invalid task index. '{task_index_str}' please enter a single number."
            )

    if choice == "5":
        print("completed tasks:")
        if not completed_tasks:
            print("no completed tasks.")
        else:
            for task in completed_tasks:
                print(f"-{task['task']} (completed on:{task['completed_date']})")

    if choice == "6":
        print("goodbye!")
        save_tasks(my_list)  # Save tasks before quitting
        save_completed_tasks(completed_tasks)
        break  # Exit the loop

    
