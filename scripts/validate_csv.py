import csv
import os
import sys

def validate_csv(path):
    """
    Validate a CSV file by checking its structure and content.
    
    Args:
        path (str): Path to the CSV file to validate
    """
    if not os.path.exists(path):
        print(f"Error: File '{path}' not found.")
        sys.exit(1)
    
    try:
        with open(path, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
            
            print(f"CSV file validated successfully")
            print(f"  Rows: {len(rows)}")
            print(f"  Headers: {reader.fieldnames}")
            
            # Check for empty rows
            empty_rows = sum(1 for row in rows if not any(row.values()))
            if empty_rows > 0:
                print(f"  Warning: {empty_rows} empty rows found")
            
            return True
            
    except csv.Error as e:
        print(f"Error: CSV validation failed - {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    csv_file = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")
    if len(sys.argv) > 1:
        csv_file = sys.argv[1]
    
    validate_csv(csv_file)

