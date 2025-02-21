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


