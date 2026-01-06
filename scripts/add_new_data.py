import csv
import os
import re

# New data rows (with formatting issues to fix)
new_data_raw = [
    'Super Camp Dragon Force (Foot-Camp / Super Camp),FC Porto (Dragon Force),Football,Camp,Portugal,(Multiple locations),4,15,Mixed,Holiday / Development,No,Fixed camp dates,Not published,"Daily training sessions and competition blocks (programme varies by host/location); weekly format during summer period",Club-run,"Club-branded camp programme (Dragon Force) with structured weekly training blocks",https://dragonforce.fcporto.pt/en/dragon-force-com-programas-de-ferias-de-verao-em-varios-pontos-do-pais/,High',
    'NF International Trials,NF Academy,Football,Camp,(Multiple),(Scandinavia tour locations),9,16,Mixed,Development,No,Fixed camp dates,Not published,"High-intensity sessions; grouped by age/level; multi-location camp series",Third-party operator,"Claims Portuguese-coach backgrounds linked to top academies; international opportunities referenced",https://www.nfacademy.com/nf-international/,Medium',
    'Short Term Program (U16+),International Football Academy de Portugal (IFAPT),Football,Academy,Portugal,,16,,,Development / Elite,,Weekly / Monthly,Not published,"Short-term structured training programme (details vary by option); U16+ focus",Third-party operator,"Programme outlines Short Term and Long Term options; club affiliation should be verified case-by-case",https://ifapt.com/academy-programs/,Medium',
    'Long Term Program (U16+),International Football Academy de Portugal (IFAPT),Football,Academy,Portugal,,16,,,Elite,,Annual,Not published,"Long-term training pathway; U16+ focus (education/accommodation details depend on option)",Third-party operator,"Programme offers long-term pathway in Portugal; verify placement/club access claims per intake",https://ifapt.com/academy-programs/,Medium',
    'Residential Soccer School (Year-round boarding),ProSoccerAcademyPortugal,Football,Academy,Portugal,,,,,Development / Elite,Yes,Annual / Monthly,Not published,"Boarding-style residency; training environment; claims placement with local clubs; education referenced",Third-party operator,"States players are placed with local Portuguese clubs after assessment",https://www.prosocceracademyportugal.com/,Medium',
    'PFAP Academy,Pro-Football Academy Portugal,Football,Academy,Portugal,Aveiro,,,,,Development / Elite,,Annual / Monthly,Not published,"Elite training programme with facilities; education options referenced (campus-based)",Third-party operator,"Positions as elite training + education environment; verify competitive match pathway details",https://www.pro-footballacademyportugal.com/,Medium',
    'Cascais Football Academy (Annual Program),Ertheo (listing for Cascais academy),Football,Academy,Portugal,Cascais,15,23,Boys,Elite,Yes,Annual,Not published,"Annual (Aug–Jun) training programme; residence accommodation; Portuguese classes/activities referenced",Third-party operator,"Listing describes a long-term high-performance boarding model; verify local club/league integration on enquiry",https://www.ertheo.com/en/cascais-football-academy,Medium',
    '3 Month Program (Ages 12+),International Football Development (IFD),Football,Academy,Portugal,,12,,,Development,Optional,Monthly,Not published,"Structured residency option; language classes; chaperone and weekend activities referenced",Third-party operator,"Program pricing shown for 16+ tiers; verify match/club integration per intake",https://www.internationalfootballdevelopment.com/programs,Medium',
    'Boarding Football Academy (Integrated Program),Kaptiva Sports Academy,Football,Academy,Spain,Barcelona,12,18,,Elite,Yes,Annual,Not published,"Integrated football development + boarding school pathway (education and player development)",Licensed academy,"International boarding academy model; pathway claims should be validated via placement history",https://kaptivasportsacademy.com/,High',
    'Barcelona Boarding Football Academy (Long/Short Stays),WOSPAC (Barcelona Residential Football Academy),Football,Academy,Spain,Barcelona,10,24,,Development / Elite,Yes,Annual / Weekly,Not published,"Residency + training; short stays (from 1 week) and long stays (months)",Licensed academy,"Residential academy offering staged stays; verify competitive match pathway (clubs/leagues) per programme track",https://wospacstages.com/,Medium',
    'Getafe International Madrid Football Academy,IFX Soccer (Getafe International),Football,Academy,Spain,Madrid,14,17,,Elite,Yes,Annual / Term-based,Not published,"Boarding academy environment; high-intensity training; education component referenced",Third-party operator,"Programme marketed as Getafe-linked; confirm official affiliation/coach involvement before committing",https://ifxsoccer.com/,Medium',
    'Football Trials Camps (Ages 15–23),FCV International Football Academy,Football,Trial,England,(Leicestershire / Midlands region),15,23,,Trial-based,Yes,Fixed camp dates,"£850–£999","Daily training + match preparation; end-of-week showcase game; feedback provided",Licensed academy,"Claims scouts attend showcase; verify scout list/attendance per camp date",https://internationalfootball.academy/fcv-football-academy-trials-and-scholarship-camp/,High',
    'Football Summer Camps,FCV International Football Academy,Football,Camp,England,Leicestershire,14,19,,Development,Yes,Weekly,"£2,500","Coaching programme + facilities; excursions referenced; residential camp format",Licensed academy,"International camp intake; confirm weekly schedule and accommodation specifics per session",https://internationalfootball.academy/football-summer-camps/,High',
    'International Soccer Academy (Rome),International Development Academy (IDA),Football,Academy,Italy,Rome,15,22,,Elite,Optional,Annual / Term-based,Not published,"Academy training + academic curriculum; match programme referenced",Licensed academy,"Positions as pathway to college/pro; verify club exposure and competition level in Rome programme",https://internationalda.com/rome/,High',
    'Juventus Summer Camp (incl. Elite Camp 14–18),Juventus,Football,Camp,Italy,,8,18,Mixed,Holiday / Development / Elite,Optional,Fixed camp dates,Not published,"Football activities; Elite Camp option; goalkeeper options referenced; residency campus for elite segment",Club-run,"Official Juventus camp brand; Elite Camp highlighted for 14–18 at residency campus",https://camp.juventus.com/en/,High',
    'PSG Academy Pro – Summer Pro Camps,PSG Academy Pro (Greater Geneva Campus),Football,Camp,France,(Greater Geneva),9,18,,Elite,Yes,Fixed camp dates,Not published,"Immersion into academy environment; elite training weeks; residency campus format",Licensed academy,"PSG Academy Pro branded residency environment; verify selection/trial claims if offered",https://grandgeneve.psgacademypro.com/summer-pro-camps/,High',
    'PSG Academy Paris – 5-Day Camp,PSG Academy,Football,Camp,France,Paris,,,,,Development,No,Weekly,Not published,"PSG methodology sessions; weekly structure; training hours and add-ons vary by session",Third-party operator,"Marketed as official PSG Academy camp; confirm booking partner authorization and exact inclusions",https://looking-for-soccer.com/en-gb/football-camps-club/psg/psg-academy-paris-france/,Medium',
    'German Football Academy (Boarding),IFX Soccer,Football,Academy,Germany,,13,18,Boys,Elite,Yes,Annual / Term-based,Not published,"Residential academy setting; German youth development methodology referenced; schooling included",Third-party operator,"IFX-run/marketed programme; confirm host club/academy and league exposure details",https://ifxsoccer.com/soccer-boarding-school-in-germany/,Medium',
    'Boarding Programme (Bad Aibling),Deutsches Fußball Internat (DFI),Football,Academy,Germany,Bad Aibling,,,,,Development / Elite,Yes,Annual / Term-based,Not published,"Accommodation and full board; support with formalities; healthcare access; airport transfers referenced",Licensed academy,"Programme describes boarding + support services; verify competitive match pathway and scouting access",https://ellefootballacademy.com/products/dfi,Medium',
    'International Soccer Academy (SC Borea),Warubi Sports (SC Borea),Football,Academy,Germany,Dresden,12,19,,Development / Elite,Yes,Annual / Term-based,Not published,"Boarding school environment; training frequency stated; education/career placement support referenced",Third-party operator,"Claims contacts with pro clubs in region; verify placements and trial process",https://warubi-sports.com/international-soccer-academy/,Medium',
    'Academy (Junior U7–U14 / Premium U15–U18),FK Austria Wien,Football,Academy,Austria,Vienna,7,18,,Elite,No,Annual,Not published,"Club youth academy structure (age-group teams and development pathway)",Club-run,"Primarily a club academy system; international intake requirements not clearly stated",https://fk-austria.at/en/akademie-2/academy,Low',
    'Denmark Academy (FC Nordsjælland / Right to Dream),Right to Dream,Football,Academy,Denmark,Farum,,,,,Elite,,Annual,Not published,"Elite academy development integrated with education and life skills (academy pathway)",Club-run,"Not marketed as open enrolment; international acceptance typically selective",https://www.righttodream.com/denmark-academy,Low',
    'Milan Academy Nynäshamn,AC Milan (International Academies),Football,Academy,Sweden,Nynäshamn,,,,,Development,No,Annual,Not published,"School-linked football profile program; training connected to school hours; development focus",Club-run,"International academy partnership model; international intake/boarding not clearly specified",https://www.acmilan.com/en/academy/ac-milan-international-academies/milan-academy-nynashamn,Low',
    'Our Programs (International Programs),Freddie Academy,Football,Camp / Academy,Sweden,,,,,Development / Elite,Yes,Weekly / Fixed camp dates,Not published,"All-inclusive experience described (accommodation, food, training, activities)",Licensed academy,"Facility-based international programme; verify age bands, competition exposure, and dates per intake",https://www.freddieacademy.com/en/our-programs/,Medium',
    'Futures (International Futsal Experience),United Futsal,Futsal,Camp,Spain,Blanes,,,,,Elite,Optional,Fixed camp dates,Not published,"International futsal experience; event dates published; programme format varies by edition",Third-party operator,"Branded as prestigious international futsal experience; verify coaching/scouting claims per year",https://www.unitedfutsal.com/futures,Medium',
    'LNFS Talent ID Camps,Inter Sport Management,Futsal,Trial,Spain,,15,18,,Trial-based,,Fixed camp dates,Not published,"Skill-development drills and evaluation focus; pathway step described",Third-party operator,"Positioned as LNFS-aligned ID camps; confirm official LNFS authorization and player pathway specifics",https://intersportmanagement.com/lnfs-talent-id-camps/,Medium',
    'FDP International,Futsal Development Program (FDP),Futsal,Camp,Spain,,,,,Development / Elite,,Fixed camp dates,Not published,"International playing/training exposure; coaching methodologies and games referenced",Third-party operator,"Programme positioning is international exposure; confirm Europe-based camp locations for specific sessions",https://www.futsaldevelopmentprogram.com/fdp-international,Low',
    'MSM Football Academy (One-Year / Half-Year),MSM Football Academy,Football,Academy,Czech Republic,Prague,,,,,Development / Elite,Optional,Annual / Half-year,Not published,"Programme options include one-year/half-year academy and summer camp; language study referenced",Third-party operator,"Claims cooperation with Prague clubs and facilities; verify exact training base and competition schedule",https://msmstudy.eu/msm-football-academy/,Medium',
    'Summer Football Camp (Prague),MSM International Football Academy,Football,Camp,Czech Republic,Prague,,,,,Holiday / Development,Optional,Fixed camp dates,Not published,"Intensive football training + excursions + language lessons; camp-style schedule",Third-party operator,"References training backed by major Prague club context; verify coaching staff and venue per camp edition",https://fcmsm.eu/en/summer-football-program/,Medium',
    'Soccer Skills Camps,Soccer Skills Pro (SoccerSkills.pl),Football,Camp,Poland,,,,,Development,,Fixed camp dates,Not published,"Small-group technique training; physical/tactical/mental components; skills tests",Licensed academy,"Claims winners may visit foreign clubs; verify selection criteria and partner clubs",https://en.soccerskills.pl/en/how-are-we-different,Medium',
    'U15 Boarding School,LOS PUMA,Football,Academy,Poland,,,,,Development / Elite,Yes,Annual,Not published,"Integrated academic + athletic programme; language support for internationals referenced",Licensed academy,"International intake referenced; verify competitive match pathway and scouting exposure",https://lospuma.pl/pages/Pages/U15-Boarding-School.html,Low'
]

def parse_and_clean_row(row_string):
    """Parse a CSV row string and return a list of fields"""
    # Use csv.reader to properly handle quoted fields
    reader = csv.reader([row_string])
    return next(reader)

def add_new_data():
    csv_file = os.path.join("..", "data", "nextxi_programmes_cleaned.csv")
    
    # Read existing data
    existing_rows = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            existing_rows.append(row)
    
    # Parse new data
    new_rows = []
    for row_string in new_data_raw:
        try:
            row = parse_and_clean_row(row_string)
            # Ensure we have the right number of columns (18)
            if len(row) == 18:
                new_rows.append(row)
            else:
                print(f"Warning: Row has {len(row)} columns, expected 18: {row[0] if row else 'empty'}")
        except Exception as e:
            print(f"Error parsing row: {e}")
            print(f"Row: {row_string[:100]}...")
    
    # Append new rows (skip header if it's in existing_rows)
    all_rows = existing_rows[:-1] if existing_rows and existing_rows[-1] == [''] else existing_rows
    
    # Add new rows
    for row in new_rows:
        all_rows.append(row)
    
    # Write back to file
    with open(csv_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(all_rows)
    
    print(f"Added {len(new_rows)} new rows")
    print(f"Total rows: {len(all_rows) - 1} (excluding header)")

if __name__ == "__main__":
    add_new_data()

