import "dotenv/config";
import { prisma } from '../lib/prisma';
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

interface ProgrammeRow {
  programme_name: string
  provider_name: string
  sport_type: string
  programme_type: string
  country: string
  city: string
  ages_min: string
  ages_max: string
  gender: string
  level: string
  boarding: string
  duration: string
  price_range: string
  inclusions: string
  operator_type: string
  verification_notes: string
  official_website: string
  source_confidence: string
}

async function seed() {
  console.log('🌱 Seeding database...')
  
  const csvPath = path.join(__dirname, '..', 'data', 'nextxi_programmes_cleaned.csv')
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found at: ${csvPath}`)
    process.exit(1)
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const records: ProgrammeRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
    relax_quotes: true,
    escape: '"',
  })

  console.log(`📊 Found ${records.length} programmes to import`)

  // Clear existing data
  await prisma.programme.deleteMany()
  console.log('🗑️  Cleared existing programmes')

  // Insert programmes
  for (const record of records) {
    await prisma.programme.create({
      data: {
        programmeName: record.programme_name,
        providerName: record.provider_name,
        sportType: record.sport_type,
        programmeType: record.programme_type,
        country: record.country,
        city: record.city || null,
        agesMin: record.ages_min ? parseInt(record.ages_min) : null,
        agesMax: record.ages_max ? parseInt(record.ages_max) : null,
        gender: record.gender || null,
        level: record.level,
        boarding: record.boarding || null,
        duration: record.duration,
        priceRange: record.price_range,
        inclusions: record.inclusions,
        operatorType: record.operator_type,
        verificationNotes: record.verification_notes,
        officialWebsite: record.official_website,
        sourceConfidence: record.source_confidence,
      },
    })
  }

  console.log(`✅ Successfully seeded ${records.length} programmes`)
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

