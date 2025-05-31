import type {
  AssignedObject2,
  LoipenStatus,
  Root,
  TrailDisplay,
  TrailSystemInfo,
} from '@/models/objects'
import axios from 'axios'

const API_TOKEN = import.meta.env.VITE_API_KEY || 'default-token'
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.example.com'

console.log('API Token:', API_TOKEN)
console.log('Base URL:', BASE_URL)

// Create axios instance with default config
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
})

// Map API status to UI status
const mapStatus = (status?: number): 'open' | 'closed' => {
  // Assuming status 1 is open, everything else is closed
  return status === 1 ? 'open' : 'closed'
}

// Map API condition to UI condition
const mapCondition = (bzustand?: number): 'Geschlossen' | 'Offen' | '' => {
  if (bzustand === undefined || bzustand === null) return ''
  switch (bzustand) {
    case 0:
      return 'Geschlossen'
    case 1:
      return 'Offen'
    default:
      return ''
  }
}

// Map snow type from API to UI
const mapSnowType = (sht?: number): string => {
  switch (sht) {
    case 2:
      return 'Neuschnee'
    case 3:
      return 'Umgewandelter Schnee'
    case 4:
      return 'Altschnee'
    case 5:
      return 'Nassschnee'
    case 6:
      return 'Vereister Schnee'
    case 7:
      return 'Technischer Schnee'
    default:
      return 'Unbekannt'
  }
}

export class TrailService {
  // Fetch trails from API
  async getTrailsAndSystemInfo(): Promise<{ trails: TrailDisplay[]; systemInfo: TrailSystemInfo }> {
    try {
      const response = await apiClient.get<Root>(
        '/api/proxy/api/v1/resource/gebietsmanager/area/gebiet/256/default.json',
      )
      const data = response.data

      // Extract trails from the nested structure
      const trails: TrailDisplay[] = []

      // System info variables
      const regions = data.assigned_objects.map(
        (region) => region.name.de || region.name.en || 'Unknown',
      )
      let openTrails = 0
      let totalTrails = 0
      let totalKilometers = 0
      let easyKilometers = 0
      let mediumKilometers = 0
      let difficultKilometers = 0
      let snowHeight = 0
      let snowType = 'Unbekannt'

      // Process all regions and trails in a single loop
      data.assigned_objects.forEach((region) => {
        region.assigned_objects.forEach((trail) => {
          // Process trails for trail list
          if (trail.mapping_type === 'tour' && trail.loipen_status) {
            trails.push(this.mapToTrailDisplay(trail))
          }

          // Process trails for system info
          if (trail.mapping_type === 'tour') {
            totalTrails++

            const loipenStatus = trail.loipen_status
            if (loipenStatus) {
              if (loipenStatus.status === 1) openTrails++

              // Get snow height from the first available trail
              if (loipenStatus.shh) snowHeight = loipenStatus.shh
              if (loipenStatus.sht) snowType = mapSnowType(loipenStatus.sht)

              // Calculate kilometers based on length
              const length = parseFloat(trail.laenge || '0')
              totalKilometers += length

              // Distribute kilometers by difficulty
              if (trail.schwierigkeit === 1) easyKilometers += length
              else if (trail.schwierigkeit === 2) mediumKilometers += length
              else difficultKilometers += length
            }
          }
        })
      })

      // Round numbers to 1 decimal place
      totalKilometers = Math.round(totalKilometers * 10) / 10
      easyKilometers = Math.round(easyKilometers * 10) / 10
      mediumKilometers = Math.round(mediumKilometers * 10) / 10
      difficultKilometers = Math.round(difficultKilometers * 10) / 10

      // Create system info object
      const systemInfo: TrailSystemInfo = {
        regions,
        openTrails,
        totalTrails,
        kilometers: totalKilometers,
        easyKilometers,
        mediumKilometers,
        difficultKilometers,
        openingHours: '08:00 - 17:00 Uhr', // Default opening hours
        snowCondition: {
          snowHeight,
          snowType,
        },
      }

      return { trails, systemInfo }
    } catch (error) {
      console.error('Error fetching trails and system info:', error)
      throw error
    }
  }

  // Convenience methods that use the combined function
  async getTrails(): Promise<TrailDisplay[]> {
    const { trails } = await this.getTrailsAndSystemInfo()
    return trails
  }

  async getSystemInfo(): Promise<TrailSystemInfo> {
    const { systemInfo } = await this.getTrailsAndSystemInfo()
    return systemInfo
  }

  // Map from API data model to our UI data model
  private mapToTrailDisplay(trail: AssignedObject2): TrailDisplay {
    const loipenStatus = trail.loipen_status as LoipenStatus
    const sportartSpecific = trail.sportart_specific

    // Parse the last preparation date
    let lastPreparation = new Date()
    if (loipenStatus.bzustanddatum) {
      lastPreparation = new Date(loipenStatus.bzustanddatum)
    }

    // Extract activities
    const activities: ('classic' | 'skating')[] = []
    //TODO
    if (loipenStatus.status_klassisch === 1) activities.push('classic')
    if (loipenStatus.status_skating === 1) activities.push('skating')

    return {
      id: trail.sid?.toString() || trail.id.toString(),
      name: trail.name.de || trail.name.en || 'Unknown',
      status: mapStatus(loipenStatus.status),
      condition: mapCondition(loipenStatus.bzustand),
      difficultyLevel: trail.schwierigkeit || 1,
      length: parseFloat(trail.laenge || '0'),
      lastPreparation,
      notes: loipenStatus.infotext || loipenStatus.bzustandinfo,
      activities,
      allowsDogs: false, // Adjust if available in API
      isBidirectional: sportartSpecific?.rundweg || false,
    }
  }
}

export const trailService = new TrailService()
