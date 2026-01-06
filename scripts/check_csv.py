import csv
import os

csv_file = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    print(f"Total rows: {len(rows)}")
    print(f"Columns: {len(reader.fieldnames)}")
    print(f"Headers: {reader.fieldnames}")
    if rows:
        print(f"Sample programme: {rows[0]['programme_name']}")

