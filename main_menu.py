from employee_management import *
from assets_management import *
from company_financial import *

def main_menu(emp_dict, asset_dict):
    while True:
        print("\n1. Employees\n2. Assets\n3. Financials\n4. Exit")
        ch = input("Choice: ")

        if ch == "1":
            add_employee(emp_dict)
        elif ch == "2":
            add_asset(asset_dict)
        elif ch == "3":
            calculate_total_salary(emp_dict)
            calculate_total_assets(asset_dict)
        elif ch == "4":
            break

