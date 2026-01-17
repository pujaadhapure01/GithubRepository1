def get_user_choice(valid_options, prompt_text):
    while True:
        choice = input(f"{prompt_text}: ").strip()
        if choice in valid_options:
            return choice
        print(f"Invalid input! Choose from {valid_options}")

