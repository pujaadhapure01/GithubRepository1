
class Employee:
    def __init__(self, emp_id, name, role, salary):
        self.emp_id = emp_id
        self.name = name
        self.role = role
        self.salary = salary
        self.assigned_assets = []

    def assign_asset(self, asset):
        self.assigned_assets.append(asset)

    def __str__(self):
        assets_list = [a.asset_id for a in self.assigned_assets]
        assets_str = ", ".join(assets_list) if assets_list else "No Assets"
        return f"{self.emp_id} | {self.name} | {self.role} | Salary: {self.salary} | Assets: {assets_str}"


class Manager(Employee):
    def __init__(self, emp_id, name, role, salary, bonus=1000):
        super().__init__(emp_id, name, role, salary)
        self.bonus = bonus

    @property
    def total_payment(self):
        return self.salary + self.bonus

    def __str__(self):
        return f"{self.emp_id} | {self.name} | Manager | Salary: {self.salary} | Bonus: {self.bonus}"
