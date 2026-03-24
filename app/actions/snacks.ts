'use server'

import { sql } from '@/db'

export async function getSnacks() {
  try {
    const snacks = await sql`
      SELECT * FROM snacks 
      ORDER BY name ASC
    `
    return snacks
  } catch (error) {
    console.error('Database error fetching snacks:', error)
    return []
  }
}
