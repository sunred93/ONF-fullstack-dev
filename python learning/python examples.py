sales_w1 = [7,3,42,19,15,35,9]
sales_w2 = [12,4,26,10,7,28, 16]
sales = sales_w1 + sales_w2

profit = sales * int(1.5)
worst_day = min(profit) * 1,5
best_day = max(profit) * 1,5
total = sum(profit)
print("Total profit is", total)
print("Best day is", best_day)
print("Worst day is", worst_day)