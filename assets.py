class Asset:
    def __init__(self, asset_id, name, asset_type, value):
        self.asset_id = asset_id
        self.name = name
        self.asset_type = asset_type
        self.value = value

    def __str__(self):
        return f"{self.asset_id} | {self.name} | {self.asset_type} | {self.value}"


class Hardware(Asset):
    def __init__(self, asset_id, name, value, condition="Good"):
        super().__init__(asset_id, name, "Hardware", value)
        self.condition = condition

    def __str__(self):
        return f"{self.asset_id} | {self.name} | {self.asset_type} | {self.value} | Condition: {self.condition}"


class Software(Asset):
    def __init__(self, asset_id, name, value, expiry_date):
        super().__init__(asset_id, name, "Software", value)
        self.expiry_date = expiry_date

    def __str__(self):
        return f"{self.asset_id} | {self.name} | {self.asset_type} | {self.value} | Expiry: {self.expiry_date}"
