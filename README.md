# NextXI Project

Project structure for NextXI application.

## Directory Structure

```
nextxi/
├─ data/
│  └─ nextxi_programmes_cleaned.csv
├─ scripts/
│  ├─ export_cleaned_csv.py
│  ├─ validate_csv.py
│  └─ seed_db.py
├─ app/ (Next.js later)
└─ README.md
```

## Scripts

### export_cleaned_csv.py
Exports and validates cleaned CSV data.

**Usage:**
```bash
cd scripts
python export_cleaned_csv.py
```

### validate_csv.py
Validates CSV file structure and content.

**Usage:**
```bash
cd scripts
python validate_csv.py
python validate_csv.py ../data/your_file.csv
```

### seed_db.py
Seeds database with data from CSV file.

**Usage:**
```bash
cd scripts
python seed_db.py
python seed_db.py ../data/your_file.csv
```

## Data

The `data/` directory contains the cleaned CSV files used by the application.

## App

The `app/` directory is reserved for the Next.js application (to be implemented).

