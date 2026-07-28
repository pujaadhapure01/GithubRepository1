from employee import Employee, Manager


def generate_emp_id(emp_dict):
    return f"E{len(emp_dict)+1:03}"


def add_employee(emp_dict):
    name = input("Name: ").strip()
    role = input("Role (manager/staff): ").strip().lower()
    salary = float(input("Salary: "))

    emp_id = generate_emp_id(emp_dict)
    if role == "manager":
        bonus = float(input("Bonus: "))
        emp = Manager(emp_id, name, role, salary, bonus)
    else:
        emp = Employee(emp_id, name, role, salary)

    emp_dict[emp_id] = emp
    print("Employee added successfully")


def view_all_employees(emp_dict):
    if not emp_dict:
        print("No employees found")
        return
    for emp in emp_dict.values():
        print(emp)


def delete_employee(emp_dict):
    emp_id = input("Employee ID to delete: ").strip()
    if emp_id in emp_dict:
        del emp_dict[emp_id]
        print("Employee deleted")
    else:
        print("Employee not found")


def update_employee(emp_dict):
    emp_id = input("Employee ID to update: ").strip()
    if emp_id not in emp_dict:
        print("Employee not found")
        return
    emp = emp_dict[emp_id]
    print("Updating:", emp)

    name = input(f"New Name ({emp.name}): ").strip()
    salary = input(f"New Salary ({emp.salary}): ").strip()

    if name:
        emp.name = name
    if salary:
        emp.salary = float(salary)

    if isinstance(emp, Manager):
        bonus = input(f"New Bonus ({emp.bonus}): ").strip()
        if bonus:
            emp.bonus = float(bonus)

    print("Employee updated successfully")

