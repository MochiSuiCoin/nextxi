import csv
import os

csv_file = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")

# Missing rows that need to be added (with proper formatting)
missing_rows = [
    ['PFAP Academy', 'Pro-Football Academy Portugal', 'Football', 'Academy', 'Portugal', 'Aveiro', '', '', '', 'Development / Elite', '', 'Annual / Monthly', 'Not published', 'Elite training programme with facilities; education options referenced (campus-based)', 'Third-party operator', 'Positions as elite training + education environment; verify competitive match pathway details', 'https://www.pro-footballacademyportugal.com/', 'Medium'],
    ['PSG Academy Paris – 5-Day Camp', 'PSG Academy', 'Football', 'Camp', 'France', 'Paris', '', '', '', 'Development', 'No', 'Weekly', 'Not published', 'PSG methodology sessions; weekly structure; training hours and add-ons vary by session', 'Third-party operator', 'Marketed as official PSG Academy camp; confirm booking partner authorization and exact inclusions', 'https://looking-for-soccer.com/en-gb/football-camps-club/psg/psg-academy-paris-france/', 'Medium'],
    ['Boarding Programme (Bad Aibling)', 'Deutsches Fußball Internat (DFI)', 'Football', 'Academy', 'Germany', 'Bad Aibling', '', '', '', 'Development / Elite', 'Yes', 'Annual / Term-based', 'Not published', 'Accommodation and full board; support with formalities; healthcare access; airport transfers referenced', 'Licensed academy', 'Programme describes boarding + support services; verify competitive match pathway and scouting access', 'https://ellefootballacademy.com/products/dfi', 'Medium'],
    ['Denmark Academy (FC Nordsjælland / Right to Dream)', 'Right to Dream', 'Football', 'Academy', 'Denmark', 'Farum', '', '', '', 'Elite', '', 'Annual', 'Not published', 'Elite academy development integrated with education and life skills (academy pathway)', 'Club-run', 'Not marketed as open enrolment; international acceptance typically selective', 'https://www.righttodream.com/denmark-academy', 'Low'],
    ['Milan Academy Nynäshamn', 'AC Milan (International Academies)', 'Football', 'Academy', 'Sweden', 'Nynäshamn', '', '', '', 'Development', 'No', 'Annual', 'Not published', 'School-linked football profile program; training connected to school hours; development focus', 'Club-run', 'International academy partnership model; international intake/boarding not clearly specified', 'https://www.acmilan.com/en/academy/ac-milan-international-academies/milan-academy-nynashamn', 'Low'],
    ['Futures (International Futsal Experience)', 'United Futsal', 'Futsal', 'Camp', 'Spain', 'Blanes', '', '', '', 'Elite', 'Optional', 'Fixed camp dates', 'Not published', 'International futsal experience; event dates published; programme format varies by edition', 'Third-party operator', 'Branded as prestigious international futsal experience; verify coaching/scouting claims per year', 'https://www.unitedfutsal.com/futures', 'Medium'],
    ['MSM Football Academy (One-Year / Half-Year)', 'MSM Football Academy', 'Football', 'Academy', 'Czech Republic', 'Prague', '', '', '', 'Development / Elite', 'Optional', 'Annual / Half-year', 'Not published', 'Programme options include one-year/half-year academy and summer camp; language study referenced', 'Third-party operator', 'Claims cooperation with Prague clubs and facilities; verify exact training base and competition schedule', 'https://msmstudy.eu/msm-football-academy/', 'Medium'],
    ['Summer Football Camp (Prague)', 'MSM International Football Academy', 'Football', 'Camp', 'Czech Republic', 'Prague', '', '', '', 'Holiday / Development', 'Optional', 'Fixed camp dates', 'Not published', 'Intensive football training + excursions + language lessons; camp-style schedule', 'Third-party operator', 'References training backed by major Prague club context; verify coaching staff and venue per camp edition', 'https://fcmsm.eu/en/summer-football-program/', 'Medium']
]

# Read existing data
existing_rows = []
with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        existing_rows.append(row)

# Remove empty rows
existing_rows = [row for row in existing_rows if row and any(cell.strip() for cell in row)]

# Get existing programme names to avoid duplicates
existing_names = set()
for row in existing_rows[1:]:  # Skip header
    if row:
        existing_names.add(row[0])

# Add missing rows
added = 0
for row in missing_rows:
    if row[0] not in existing_names:
        existing_rows.append(row)
        added += 1
        print(f"Added: {row[0]}")
    else:
        print(f"Already exists: {row[0]}")

# Write back
with open(csv_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(existing_rows)

print(f"\nAdded {added} missing rows")
print(f"Total rows: {len(existing_rows) - 1} (excluding header)")

