import timeit

months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

def num_days(month):
    if month == "february":
        return 28
    elif month in ["april", "june", "september", "november"]:
        return 30
    else:
        return 31

# Measure the time it takes to execute num_days("august") 100000 times
execution_time = timeit.timeit('num_days("august")', globals=globals(), number=100000)
print(f"Execution time: {execution_time} seconds")