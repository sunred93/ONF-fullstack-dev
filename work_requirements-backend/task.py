def add_task(task_list, task):
    new_task = input("enter new task: ")
    task_list.append({"task": new_task})
    print("task added successfully!")
    
def remove_task(task_list, task_index):
    if 0 <= task_index < len(task_list):
        removed_task = task_list.pop(task_index)
        print(f"task '{removed_task['task']}' removed successfully!")
    else:
        print("Invalid task index.")