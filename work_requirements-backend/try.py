import json

def load_settings(filepath="../JSON/settings.json"):
    """Loads settings from a JSON file.

    Args:
        filepath: The path to the settings file.

    Returns:
        A dictionary containing the settings, or None if an error occurred.
    """
    try:
        with open(filepath, "r") as file:
            settings = json.load(file)
            return settings
    except FileNotFoundError:
        print(f"Error: Settings file not found at {filepath}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {filepath}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

def save_settings(settings, filepath="settings.json"):
    """Saves settings to a JSON file.

    Args:
        settings: A dictionary containing the settings.
        filepath: The path to the settings file.
    """
    try:
        with open(filepath, "w") as file:
            json.dump(settings, file, indent=2)
        print(f"Settings saved to {filepath}")
    except Exception as e:
        print(f"Error: Failed to save settings to {filepath}: {e}")

def main():
    """Main function to handle settings."""
    settings = load_settings()

    if settings is None:
        return

    print("Current settings:")
    for key, value in settings.items():
        print(f"  {key}: {value}")

    while True:
        setting_to_change = input("Enter the setting you want to change (or 'quit' to exit): ")
        if setting_to_change.lower() == "quit":
            return
        if setting_to_change in settings:
            break
        else:
            print("Invalid setting name. Please choose from:", ", ".join(settings.keys()))

    new_value_str = input(f"Enter the new value for '{setting_to_change}': ")

    current_type = type(settings[setting_to_change])

    try:
        if current_type is int:
            new_value = int(new_value_str)
        elif current_type is float:
            new_value = float(new_value_str)
        elif current_type is str:
            new_value = str(new_value_str)
        elif current_type is bool:
            new_value = new_value_str.lower() == "true"
        else:
            print("Unsupported setting type.")
            return
    except ValueError:
        print("Invalid value type. Please enter a valid value.")
        return

    settings[setting_to_change] = new_value
    save_settings(settings)

if __name__ == "__main__":
    main()