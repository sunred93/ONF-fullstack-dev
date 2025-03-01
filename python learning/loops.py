print ("guessing game")
#guess the correct number in 10 guesses or less. If you don't, you lose.
correct_answer = 50
count = 0

input("guess a number between 1 and 100")
while count < 10:
    guess = int(input("guess a number between 1 and 100"))
    count += 1
    if guess < correct_answer:
        print("too low")
    elif guess > correct_answer:
        print("too high")
    else:
        print("you win")
        break

