# Create stores
freelancers = {'name': 'Freelancing Shop', 'brian': 70, 'black knight': 20, 'biccus diccus': 100, 'grim reaper': 500, 'minstrel': -15}
antiques = {'name': 'Antique Shop', 'french castle': 400, 'wooden grail': 3, 'scythe': 150, 'catapult': 75, 'german joke': 5}
pet_shop = {'name': 'Pet Shop', 'blue parrot': 10, 'white rabbit': 5, 'newt': 2}

# List of stores
stores = [freelancers, antiques, pet_shop]

# Create an empty shopping cart
cart = {}
purse = 1000

# Function to display store inventory
def display_inventory(store):
    print(f"\nWelcome to {store['name']}! Here are the items available for purchase:")
    for item, price in store.items():
        if item != 'name':
            print(f"{item}: {price} gold pieces")

# Function to handle purchasing items
def purchase_item(store, item):
    global purse
    if item in store:
        if purse >= store[item]:
            cart[item] = store.pop(item)
            purse -= cart[item]
            print(f"You have purchased {item} for {cart[item]} gold pieces.")
            return True
        else:
            print("You don't have enough gold pieces to buy this item.")
            return False
    else:
        print("Invalid item. Please choose a valid item or type 'exit' to leave the store.")
        return False

# Main game loop
for store in stores:
    display_inventory(store)
    while True:
        buy_item = input("What do you want to buy? (type 'exit' to leave the store): ").lower()
        if buy_item == 'exit':
            break
        if purchase_item(store, buy_item):
            break  # Move to the next store after a successful purchase

# Display final cart and remaining gold
print("\nYou have finished shopping. Here are the items you purchased:")
for item, price in cart.items():
    print(f"{item}: {price} gold pieces")
print(f"\nTotal cost: {sum(cart.values())} gold pieces")
print(f"Gold pieces remaining: {purse}")