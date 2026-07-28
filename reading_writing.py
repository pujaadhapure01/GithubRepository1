import os
from employee import Employee, Manager
from assets import Hardware, Software

def read_data_from_employee():
    emp_dict = {}
    if not os.path.exists("employee.txt"):
        return emp_dict
    with open("employee.txt") as f:
        for line in f:
            parts = line.strip().split("|")
            if parts[2] == "manager":
                emp_dict[parts[0]] = Manager(parts[0], parts[1], parts[2], float(parts[3]), float(parts[4]))
            else:
                emp_dict[parts[0]] = Employee(parts[0], parts[1], parts[2], float(parts[3]))
    return emp_dict

def save_employee_data(emp_dict):
    with open("employee.txt", "w") as f:
        for emp in emp_dict.values():
            if isinstance(emp, Manager):
                f.write(f"{emp.emp_id}|{emp.name}|manager|{emp.salary}|{emp.bonus}\n")
            else:
                f.write(f"{emp.emp_id}|{emp.name}|staff|{emp.salary}\n")

def read_data_from_assets():
    asset_dict = {}
    if not os.path.exists("assets.txt"):
        return asset_dict
    with open("assets.txt") as f:
        for line in f:
            parts = line.strip().split("|")
            if parts[2] == "Hardware":
                asset_dict[parts[0]] = Hardware(parts[0], parts[1], float(parts[3]), parts[4])
            else:
                asset_dict[parts[0]] = Software(parts[0], parts[1], float(parts[3]), parts[4])
    return asset_dict

def save_assets_data(asset_dict):
    with open("assets.txt", "w") as f:
        for asset in asset_dict.values():
            if asset.asset_type.lower() == "hardware":
                f.write(f"{asset.asset_id}|{asset.name}|Hardware|{asset.value}|{asset.condition}\n")
            else:
                f.write(f"{asset.asset_id}|{asset.name}|Software|{asset.value}|{asset.expiry_date}\n")

def read_data_from_login_cred():
    if not os.path.exists("login_cred.txt"):
        return {"admin": ("admin", "1234")}
    creds = {}
    with open("login_cred.txt") as f:
        for line in f:
            role, user, pwd = line.strip().split("|")
            creds[role] = (user, pwd)
    return creds


