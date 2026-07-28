# Employee & Asset Management System (Python)

##  Project Overview
The **Employee & Asset Management System** is a **menu-driven Python application** developed to manage employees, company assets, login authentication, and basic company data.

This project is designed for **students** to understand **real-world software structure**, **object-oriented programming**, and **file handling** concepts using Python.

---

## Project Objectives
- Manage employee records efficiently
- Track company assets (hardware & software)
- Implement login authentication
- Store data permanently using files
- Build a modular and scalable Python project

---

## Technologies & Concepts Used

### Programming Language
- Python 3

###  Core Concepts
- Object-Oriented Programming (OOP)
- File Handling (`.txt` files)
- Modular Programming
- Input Validation
- Menu-driven CLI application

###  Python Features Used
- Classes & Objects
- Functions
- Conditional Statements
- Loops
- Exception Handling (basic)
- Importing Modules

---

##  Project Folder Structure

PythonProject/
│
├── app.py # Application entry point
├── main.py # Controls program flow
├── main_menu.py # Main menu logic
│
├── employee.py # Employee class
├── employee_management.py # Employee operations
│
├── assets.py # Asset classes
├── assets_management.py # Asset operations
│
├── login_cred.py # Login authentication logic
├── input_validation.py # User input validation
├── company_financial.py # Financial-related features
├── reading_writing.py # File read/write operations
│
├── employee.txt # Employee data storage
├── assets.txt # Asset data storage
│
├── README.md # Project documentation
└── .venv/ # Virtual environment (ignored in GitHub)

---

## Key Features Implemented

###  Login System
- Username and password authentication
- Prevents unauthorized access

###  Employee Management
- Add employee details
- View employee records
- Update employee information
- Store employee data in files

###  Asset Management
- Add hardware and software assets
- Assign assets to employees
- Track asset availability

###  File-Based Data Storage
- Employee data stored in `employee.txt`
- Asset data stored in `assets.txt`
- Ensures data persistence even after program ends

###  Input Validation
- Prevents invalid or empty input
- Improves program reliability

---

##  How to Run the Project

### Step 1: Open Terminal / PyCharm
Navigate to the project folder.

### Step 2: Run the Application
```bash
python app.py
Step 3: Use Menu Options

Follow on-screen menu instructions.

Sample Data Format
employee.txt
E101|Puja|Developer|50000
E102|Amit|Manager|80000

assets.txt
A201|Laptop|Dell|Assigned
A202|Software|VS Code|Available

 What I Learned From This Project

How to structure a real Python project

How to break large problems into modules

How to use file handling for persistent storage

How login systems work at a basic level

How to write clean and reusable code

 Future Enhancements (Advanced Scope)

This project can be improved further by adding:

 Security Enhancements

Password hashing

Role-based access (Admin / User)

 Database Integration

Replace .txt files with:

SQLite

MySQL

PostgreSQL

 User Interface

GUI using Tkinter

Web app using Flask / Django

Frontend using React

 Advanced Features

Asset usage reports

Employee performance reports

Export data to Excel / CSV

Logging and audit trails

 Deployment

Host as a web application

REST API integration

The Employee & Asset Management System demonstrates how Python can be used to build real-world applications using core programming concepts. It provides a strong foundation for learning advanced software development techniques.
