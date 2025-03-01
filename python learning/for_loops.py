names = ['john ClEEse','Eric IDLE','michael']
names1 = ['graHam chapman', 'TERRY', 'terry jones']
additional_name = input("Enter a name: ")
additional_name1 = input("Enter another name: ")    
all_names = names + names1 + [additional_name] + [additional_name1]

for name in all_names:
    name = name.title()
    print(f"{name} you are invited to the party on saturday.!") 






