import { defineStore } from 'pinia'
import { trailService } from './services/trailService'
import type { TrailDisplay, TrailSystemInfo } from './models/objects'

export const useTrailStore = defineStore('trails', {
  state: () => ({
    trails: null as TrailDisplay[] | null,
    systemInfo: null as TrailSystemInfo | null,
    lastFetched: 0, // Timestamp of the last data fetch
    cacheTime: 5 * 60 * 1000, // 5 minutes cache time in milliseconds
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getTrails: (state) => state.trails,
    isCacheValid: (state) => {
      const now = Date.now()
      return state.lastFetched > 0 && now - state.lastFetched < state.cacheTime
    },
  },

  actions: {
    async fetchTrails(forceRefresh = false) {
      // Use cached data if available and not forcing refresh
      if (this.trails && this.isCacheValid && !forceRefresh) {
        return this.trails
      }

      this.isLoading = true
      this.error = null

      try {
        const data = await trailService.getTrailsAndSystemInfo()
        this.trails = data.trails
        this.systemInfo = data.systemInfo
        this.error = null
        this.lastFetched = Date.now()
        return data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch trails'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    clearCache() {
      this.trails = null
      this.lastFetched = 0
    },
  },
})
