from assets import Hardware, Software


def generate_asset_id(asset_dict):
    return f"A{len(asset_dict)+1:03}"


def add_asset(asset_dict):
    name = input("Asset Name: ").strip()
    value = float(input("Value: "))
    asset_type = input("Type (hardware/software): ").strip().lower()

    asset_id = generate_asset_id(asset_dict)
    if asset_type == "hardware":
        condition = input("Condition: ").strip()
        asset = Hardware(asset_id, name, value, condition)
    else:
        expiry = input("Expiry Date: ").strip()
        asset = Software(asset_id, name, value, expiry)

    asset_dict[asset_id] = asset
    print("Asset added successfully")


def view_all_assets(asset_dict):
    if not asset_dict:
        print("No assets found")
        return
    for asset in asset_dict.values():
        print(asset)

