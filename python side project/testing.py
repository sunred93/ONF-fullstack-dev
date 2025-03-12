class Character:
 class Character:
    def __init__(self, name, health, strength):  # Now takes name, health, strength as arguments
        self.name = name  # This creates the 'name' attribute for the object
        self.health = health  # This creates the 'health' attribute for the object
        self.strength = strength  # This creates the 'strength' attribute for the object
    def move (self):
        print("move 4 paces")
    def rest(self):
        print("gains 4 healthpoints")
    def attack(self):
        print(f"does",attack * strength, "hitpoints")
class Wizzard(Character):
    def cast_spell(self):
        print("does 10 attack points")
    def heal(self):
        print("heal 10 healthpoints")
class Warrior(Character):
    def rage(self):
        print("gains" 4 + strength, "strength points")
    def block(self):
        print("blocks 6 attack points")
    def sprint(self):
        print("move 8 paces")
class Rouge(Character):
    def sneak(self):
        print("move 2 paces")
    def backstab(self):
        print("does 8 attack points")
    def hide(self):
        print("is hidden")

