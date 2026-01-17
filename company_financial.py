from employee import Manager


def calculate_total_salary_expenditure(emp_dict):
    total = 0
    for emp in emp_dict.values():
        if isinstance(emp, Manager):
            total += emp.total_payment
        else:
            total += emp.salary
    print(f"Total Salary Expenditure: {total}")


def calculate_total_assets_value(asset_dict):
    total = sum(a.value for a in asset_dict.values())
    print(f"Total Assets Value: {total}")

