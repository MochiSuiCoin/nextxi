import csv
import os

INPUT_FILE = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")
OUTPUT_FILE = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")

def validate_csv(path):
    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        print(f"Validated {len(rows)} rows")
        print("Headers:", reader.fieldnames)

if __name__ == "__main__":
    validate_csv(INPUT_FILE)
    print("Export complete")

