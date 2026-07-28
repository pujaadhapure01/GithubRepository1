from reading_writing import (
    read_data_from_employee,
    save_employee_data,
    read_data_from_assets,
    save_assets_data,
    read_data_from_login_cred
)
from employee import Employee, Manager
from assets import Hardware, Software

# ------------------ EMPLOYEE MENU ------------------
def employee_menu(employees):
    while True:
        print("\n=== EMPLOYEE MANAGEMENT ===")
        print("1. Add New Employee")
        print("2. View All Employees")
        print("3. Update Employee")
        print("4. Delete Employee")
        print("5. Back to Main Menu")
        choice = input("Select an option: ")

        if choice == "1":
            emp_id = input("Enter Employee ID: ")
            name = input("Enter Employee Name: ")
            role = input("Enter Role (manager/staff): ").lower()
            salary = float(input("Enter Salary: "))
            if role.startswith("m"):
                bonus = float(input("Enter Bonus: "))
                employees[emp_id] = Manager(emp_id, name, role, salary, bonus)
            else:
                employees[emp_id] = Employee(emp_id, name, role, salary)
            print("Employee added successfully!")

        elif choice == "2":
            if not employees:
                print("No employees found.")
            else:
                print("\nID | Name | Role | Salary | Bonus")
                for emp in employees.values():
                    if isinstance(emp, Manager):
                        print(f"{emp.emp_id} | {emp.name} | {emp.role} | {emp.salary} | {emp.bonus}")
                    else:
                        print(f"{emp.emp_id} | {emp.name} | {emp.role} | {emp.salary}")

        elif choice == "3":
            emp_id = input("Enter Employee ID to update: ")
            if emp_id in employees:
                name = input("Enter New Name: ")
                role = input("Enter New Role (manager/staff): ").lower()
                salary = float(input("Enter New Salary: "))
                if role.startswith("m"):
                    bonus = float(input("Enter Bonus: "))
                    employees[emp_id] = Manager(emp_id, name, role, salary, bonus)
                else:
                    employees[emp_id] = Employee(emp_id, name, role, salary)
                print("Employee updated successfully!")
            else:
                print("Employee not found.")

        elif choice == "4":
            emp_id = input("Enter Employee ID to delete: ")
            if emp_id in employees:
                del employees[emp_id]
                print("Employee deleted successfully!")
            else:
                print("Employee not found.")

        elif choice == "5":
            break
        else:
            print("Invalid option. Try again.")


# ------------------ ASSETS MENU ------------------
def assets_menu(assets):
    while True:
        print("\n=== ASSET MANAGEMENT ===")
        print("1. Add New Asset")
        print("2. View All Assets")
        print("3. Update Asset")
        print("4. Delete Asset")
        print("5. Back to Main Menu")
        choice = input("Select an option: ")

        if choice == "1":
            asset_id = input("Enter Asset ID: ")
            name = input("Enter Asset Name: ")
            asset_type = input("Enter Asset Type (Hardware/Software): ").strip().lower()
            value = float(input("Enter Value: "))
            if asset_type.startswith("h"):
                condition = input("Enter Condition: ")
                assets[asset_id] = Hardware(asset_id, name, value, condition)
            elif asset_type.startswith("s"):
                expiry_date = input("Enter Expiry Date: ")
                assets[asset_id] = Software(asset_id, name, value, expiry_date)
            else:
                print("Invalid Asset Type. Asset not added.")
                continue
            print("Asset added successfully!")

        elif choice == "2":
            if not assets:
                print("No assets found.")
            else:
                print("\nID | Name | Type | Value | Extra")
                for asset in assets.values():
                    if isinstance(asset, Hardware):
                        print(f"{asset.asset_id} | {asset.name} | Hardware | {asset.value} | {asset.condition}")
                    else:
                        print(f"{asset.asset_id} | {asset.name} | Software | {asset.value} | {asset.expiry_date}")

        elif choice == "3":
            asset_id = input("Enter Asset ID to update: ")
            if asset_id in assets:
                name = input("Enter New Name: ")
                asset_type = input("Enter Asset Type (Hardware/Software): ").strip().lower()
                value = float(input("Enter Value: "))
                if asset_type.startswith("h"):
                    condition = input("Enter Condition: ")
                    assets[asset_id] = Hardware(asset_id, name, value, condition)
                elif asset_type.startswith("s"):
                    expiry_date = input("Enter Expiry Date: ")
                    assets[asset_id] = Software(asset_id, name, value, expiry_date)
                else:
                    print("Invalid Asset Type. Update canceled.")
                    continue
                print("Asset updated successfully!")
            else:
                print("Asset not found.")

        elif choice == "4":
            asset_id = input("Enter Asset ID to delete: ")
            if asset_id in assets:
                del assets[asset_id]
                print("Asset deleted successfully!")
            else:
                print("Asset not found.")

        elif choice == "5":
            break
        else:
            print("Invalid option. Try again.")


# ------------------ COMPANY FINANCIALS ------------------
def company_financials(employees, assets):
    while True:
        print("\n=== COMPANY FINANCIALS ===")
        print("1. View Total Salaries")
        print("2. View Total Bonuses")
        print("3. View Total Asset Value")
        print("4. Back to Main Menu")
        choice = input("Select an option: ")

        if choice == "1":
            total_salary = sum(emp.salary for emp in employees.values() if hasattr(emp, "salary"))
            print(f"Total Salary Expense: {total_salary}")

        elif choice == "2":
            total_bonus = sum(emp.bonus for emp in employees.values() if hasattr(emp, "bonus"))
            print(f"Total Bonus Expense: {total_bonus}")

        elif choice == "3":
            total_assets = sum(asset.value for asset in assets.values() if hasattr(asset, "value"))
            print(f"Total Asset Value: {total_assets}")

        elif choice == "4":
            break
        else:
            print("Invalid option. Try again.")


# ------------------ MAIN MENU ------------------
def main_menu(username, employees, assets):
    while True:
        print("\n=== MAIN MENU ===")
        print("1. Manage Employees")
        print("2. Manage Assets")
        print("3. Company Financials")
        print("4. Save & Exit")
        choice = input("Select an option: ")

        if choice == "1":
            employee_menu(employees)
        elif choice == "2":
            assets_menu(assets)
        elif choice == "3":
            company_financials(employees, assets)
        elif choice == "4":
            save_employee_data(employees)
            save_assets_data(assets)
            print("Data saved. Exiting...")
            break
        else:
            print("Invalid option. Try again.")


# ------------------ LOGIN ------------------
print("="*50)
print("        NexGen Corporate Ecosystem")
print("="*50)
print("\n=== LOGIN REQUIRED ===")

username_input = input("Enter Username: ").strip()
password_input = input("Enter Password: ").strip()

login_creds = read_data_from_login_cred()

if username_input in login_creds and login_creds[username_input][1] == password_input:
    print(f"\nWelcome {username_input}!")
    employees = read_data_from_employee()
    assets = read_data_from_assets()
    main_menu(username_input, employees, assets)
else:
    print("Invalid credentials. Exiting...")







