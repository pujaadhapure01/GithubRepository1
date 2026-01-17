def login():
    print("=== NexGen Corporate Ecosystem Login ===")

    username = input("Username: ")
    password = input("Password: ")

    if username == "admin" and password == "admin123":
        print("Login successful\n")
    else:
        print("Invalid credentials")
        exit()
