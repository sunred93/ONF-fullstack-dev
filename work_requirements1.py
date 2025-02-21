#greeting and age check (1)
name = input("What is your name? ")
age = int(input("How old are you? ")) #converts input to integer
if age >= 18: print(f"hello", name, "you are old enough to enter")
else: print("sorry", name, "you are too young")

#Number List Processor (2)
number_list = []  # Creates an empty list

for _ in range(10):  # Loop 10 times or until user types exit
    user_input = input("Enter a number or type 'exit' to stop: ")  # Get user input
    if user_input.lower() == "exit":  # Check if user wants to exit
        break
    number = int(user_input)  # Convert input to integer
    number_list.append(number)  # Append to the list

print("The list of numbers is:", number_list)

# Check if the list length is greater than 5
if len(number_list) > 5:
    print("The list is long")
else:
    print("The list is short")

    #sum of user input (3)
number1 = (input("Enter a number: ")) #converts input to string
number2 = (input("Enter another number: ")) 
number3 = (input("Enter another number: "))

num1 = int(number1) #converts string to integer
num2 = int(number2)
num3 = int(number3)

number_list = [num1, num2, num3] #creates a list of the numbers
sum = num1 + num2 + num3 #adds the numbers together
print("The sum of the numbers is:", sum) #prints the sum of the numbers
print("The list of numbers is:", number_list) #prints the list of numbers
if sum % 2 == 0: #checks if the sum is even
    print("The sum is even")
else:
    print("The sum is odd") #prints if the sum is odd

#fruit basket (4)
fruit_basket = {"apple":5, "banana":3, "orange":2, "pear":4, "grapes":10,} #creates a dictionary of fruits and their quantities
fruit = input("Enter a fruit: ") #asks the user to enter a fruit
if fruit in fruit_basket: #checks if the fruit is in the dictionary
    print(fruit_basket[fruit]) #prints the quantity of the fruit
    for letter in fruit:
        print(letter) #prints each letter of the fruit
else:
    print("we do not have that fruit") #prints if the fruit is not in the dictionary

    #Temperature Converter (5)
    
#temperature converter celcius to fahrenheit

celsius = float(input("Enter temperature in Celsius: ")) #converts input to float
fahrenheit = (celsius * 9/5) + 32 #converts celsius to fahrenheit
print(fahrenheit)
if fahrenheit > 80: # if farhenheit is greater than 80
    print("It is hot")
else: print("it/'s not hot")
temperature_list = [celsius, "degrees celsius", fahrenheit, "degrees fahrenheit",] #creates a list of the temperatures
print("The list of temperatures is:", temperature_list)

#menu selection (6)
menu = {"burger":210, "fries":110, "drink":49, "dessert":120, "salad":140, "coffee":45} # a dictionary of menu items and their prices
customer_order = input("Enter your order: ")
if customer_order in menu: #checks if the order is in the dictionary
    print(f"the price of {customer_order} is {menu[customer_order]}")
else:
    print("we do not have that item")
print("\nFull menu:") # prints the string "Full menu" on a new line
for item, price in menu.items():
    print(f"{item}: {price}") #prints the menu items and their prices


# number analyzer (7)
numbers_input = input("enter a series of numbers separeted by spaces: ") #asks the user to enter a series of numbers
number_list = numbers_input.split() #splits the numbers
numbers = [int(num) for num in number_list] #converts the numbers to integers
print("list of numbers:", numbers) #prints the numbers
smallest_value = numbers[0] #sets the smallest value to the first number
largest_value = numbers[0] #sets the largest value to the first number  
total = 0 #sets the total to 0
for number in numbers: #loops trhough the numbers
    if number < smallest_value: #checks if the number is less than the smallest value
        smallest_value = number #sets the smallest value to the number
    if number > largest_value: #checks if the number is greater than the largest value
        largest_value = number #sets the largest value to the number
    total += number #adds the number to the total
    averege = total / len(numbers) #calculates the average

print("The smallest number is:", smallest_value) #prints the smallest number
print("The largest number is:", largest_value) #prints the largest number
print("the average is:", averege) #prints the average
if averege > 10: #checks if the average is greater than 10
    print("The average is high") #prints if the average is greater than 10
else:
    print("The average is low") #prints if the average is less than 10

#letter counter (8)
word = input("enter a word: ").lower() #converts input to lowercase
letter_counts = {} #creates an empty dictionary
for letter in word: #loops trhough the letters of the word
    if letter in letter_counts: #checks if the letter is in the dictionary
        letter_counts[letter] += 1 #adds 1 to the letter count
    else:
        letter_counts[letter] = 1 #adds the letter to the dictionary
for letter, count in letter_counts.items(): #loops through the dictionary
    print(f"{letter}: {count}") #prints the letter and the count
if len(word) > 5:
        print("The word is long")




        
