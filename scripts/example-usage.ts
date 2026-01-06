import { prisma } from '../lib/prisma'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  console.log('📚 Prisma Client Usage Examples\n')

  // Example 1: Get all programmes
  console.log('1. Fetching all programmes...')
  const allProgrammes = await prisma.programme.findMany({
    take: 5, // Limit to 5 for example
  })
  console.log(`   Found ${allProgrammes.length} programmes (showing first 5)\n`)

  // Example 2: Find programmes by country
  console.log('2. Finding programmes in Portugal...')
  const portugalProgrammes = await prisma.programme.findMany({
    where: {
      country: 'Portugal',
    },
    select: {
      programmeName: true,
      providerName: true,
      city: true,
      level: true,
    },
  })
  console.log(`   Found ${portugalProgrammes.length} programmes in Portugal\n`)

  // Example 3: Find elite programmes
  console.log('3. Finding elite level programmes...')
  const eliteProgrammes = await prisma.programme.findMany({
    where: {
      level: {
        contains: 'Elite',
      },
    },
    take: 5,
    select: {
      programmeName: true,
      country: true,
      level: true,
    },
  })
  console.log(`   Found ${eliteProgrammes.length} elite programmes (showing first 5)\n`)

  // Example 4: Count programmes by sport type
  console.log('4. Counting programmes by sport type...')
  const sportCounts = await prisma.programme.groupBy({
    by: ['sportType'],
    _count: {
      id: true,
    },
  })
  sportCounts.forEach((sport) => {
    console.log(`   ${sport.sportType}: ${sport._count.id} programmes`)
  })
  console.log()

  // Example 5: Find programmes with boarding
  console.log('5. Finding programmes with boarding...')
  const boardingProgrammes = await prisma.programme.findMany({
    where: {
      boarding: {
        in: ['Yes', 'Optional'],
      },
    },
    take: 5,
    select: {
      programmeName: true,
      country: true,
      boarding: true,
    },
  })
  console.log(`   Found ${boardingProgrammes.length} programmes with boarding (showing first 5)\n`)

  // Example 6: Get total count
  const totalCount = await prisma.programme.count()
  console.log(`📊 Total programmes in database: ${totalCount}`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

