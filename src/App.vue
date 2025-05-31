<template>
  <div class="loipeninfo-container">
    <header-component :system-info="systemInfo" />
    <snow-info-component
      :snow-height="systemInfo?.snowCondition.snowHeight"
      :snow-type="systemInfo?.snowCondition.snowType"
      :trail-stats="trailStats"
    />

    <div v-if="isLoading" class="loading">
      <p>Loading trail data...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="retryFetch" class="retry-button">Retry</button>
    </div>

    <!-- use paginatedTrails instead of full list -->
    <trail-list-component v-else :trails="paginatedTrails" />

    <!-- pagination controls -->
    <div class="pagination flex justify-center items-center gap-4 mt-6" v-if="totalPages > 1">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="text-gray-700 font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref } from 'vue'
import { useTrailStore } from './store'
import HeaderComponent from './components/HeaderComponent.vue'
import SnowInfoComponent from './components/SnowInfoComponent.vue'
import TrailListComponent from './components/TrailListComponent.vue'
import { type TrailDisplay } from './models/objects'

export default defineComponent({
  name: 'App',
  components: { HeaderComponent, SnowInfoComponent, TrailListComponent },
  setup() {
    const trailStore = useTrailStore()
    const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes
    let intervalId: number

    onMounted(() => {
      trailStore.fetchTrails()
      intervalId = window.setInterval(() => {
        trailStore.fetchTrails(true)
      }, REFRESH_INTERVAL)
    })
    onUnmounted(() => {
      clearInterval(intervalId)
    })

    const trails = computed<TrailDisplay[]>(() => trailStore.trails ?? [])
    // pagination state
    const currentPage = ref(1)
    const pageSize = ref(10) // items per page
    const totalPages = computed(() => Math.ceil(trails.value.length / pageSize.value))
    const paginatedTrails = computed(() =>
      trails.value.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value,
      ),
    )
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    const systemInfo = computed(() => trailStore.systemInfo)
    const isLoading = computed(() => trailStore.isLoading)
    const error = computed(() => trailStore.error)

    const trailStats = computed(() => {
      if (!systemInfo.value) return null
      return {
        total: systemInfo.value.kilometers,
        easy: systemInfo.value.easyKilometers,
        medium: systemInfo.value.mediumKilometers,
        difficult: systemInfo.value.difficultKilometers,
      }
    })
    const retryFetch = () => trailStore.fetchTrails(true)

    return {
      paginatedTrails,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      systemInfo,
      trailStats,
      isLoading,
      error,
      retryFetch,
    }
  },
})
</script>

<style scoped>
.loipeninfo-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #e74c3c;
}

.retry-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover {
  background-color: #2980b9;
}
</style>
