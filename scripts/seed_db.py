import csv
import os
import sys

def seed_database(csv_path, db_path=None):
    """
    Seed database with data from CSV file.
    
    Args:
        csv_path (str): Path to the CSV file
        db_path (str, optional): Path to database file
    """
    print("Database seeding script")
    print("=" * 50)
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file '{csv_path}' not found.")
        sys.exit(1)
    
    try:
        with open(csv_path, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
            
            print(f"Found {len(rows)} rows in CSV")
            print(f"Columns: {reader.fieldnames}")
            
            # TODO: Implement database connection and insertion logic
            # This is a placeholder for future database seeding
            print("\nDatabase seeding logic to be implemented...")
            
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    csv_file = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")
    if len(sys.argv) > 1:
        csv_file = sys.argv[1]
    
    seed_database(csv_file)

