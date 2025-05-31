<template>
  <div class="filters">
    <div class="filter-group">
      <h3>Filter</h3>
      <div class="filter-options">
        <div class="filter-option">
          <input
            type="checkbox"
            id="open-trails"
            v-model="filters.showOpen"
            @change="applyFilters"
          />
          <label for="open-trails">Offene Loipen</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="closed-trails"
            v-model="filters.showClosed"
            @change="applyFilters"
          />
          <label for="closed-trails">Geschlossene Loipen</label>
        </div>
      </div>
    </div>

    <div class="filter-group">
      <h3>Schwierigkeit</h3>
      <div class="filter-options">
        <div class="filter-option">
          <input
            type="checkbox"
            id="easy"
            v-model="filters.difficulty.easy"
            @change="applyFilters"
          />
          <label for="easy">Leicht</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="medium"
            v-model="filters.difficulty.medium"
            @change="applyFilters"
          />
          <label for="medium">Mittel</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="difficult"
            v-model="filters.difficulty.difficult"
            @change="applyFilters"
          />
          <label for="difficult">Schwer</label>
        </div>
      </div>
    </div>

    <div class="filter-group">
      <h3>Aktivitäten</h3>
      <div class="filter-options">
        <div class="filter-option">
          <input
            type="checkbox"
            id="classic"
            v-model="filters.activities.classic"
            @change="applyFilters"
          />
          <label for="classic">Klassisch</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="skating"
            v-model="filters.activities.skating"
            @change="applyFilters"
          />
          <label for="skating">Skating</label>
        </div>
      </div>
    </div>

    <button class="reset-button" @click="resetFilters">Filter zurücksetzen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export interface TrailFilters {
  showOpen: boolean
  showClosed: boolean
  difficulty: {
    easy: boolean
    medium: boolean
    difficult: boolean
  }
  activities: {
    classic: boolean
    skating: boolean
  }
}

export default defineComponent({
  name: 'TrailFilters',
  emits: ['filter-change'],
  setup(_, { emit }) {
    const filters = reactive<TrailFilters>({
      showOpen: true,
      showClosed: true,
      difficulty: {
        easy: true,
        medium: true,
        difficult: true,
      },
      activities: {
        classic: true,
        skating: true,
      },
    })

    const applyFilters = () => {
      emit('filter-change', { ...filters })
    }

    const resetFilters = () => {
      filters.showOpen = true
      filters.showClosed = true
      filters.difficulty.easy = true
      filters.difficulty.medium = true
      filters.difficulty.difficult = true
      filters.activities.classic = true
      filters.activities.skating = true
      applyFilters()
    }

    return {
      filters,
      applyFilters,
      resetFilters,
    }
  },
})
</script>

<style scoped>
.filters {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.filter-group {
  margin-bottom: 1rem;
}

h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-option {
  display: flex;
  align-items: center;
}

input[type='checkbox'] {
  margin-right: 0.5rem;
}

.reset-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.reset-button:hover {
  background-color: #2980b9;
}
</style>
