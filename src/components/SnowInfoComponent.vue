<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-6 mb-6">
      <div class="flex-1 bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Schneelage</h3>
        <p class="text-sm text-gray-600">Schneehöhe</p>
        <p class="text-2xl font-bold">{{ snowHeight }} cm</p>
        <p class="text-sm text-gray-600 mt-2">Schneeart</p>
        <p class="text-2xl font-bold">{{ snowType }}</p>
      </div>
      <div class="flex-1 bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Gesamt: {{ trailStats?.total }} km</h3>
        <p class="text-sm">Leicht: {{ trailStats?.easy }} km</p>
        <p class="text-sm">Mittel: {{ trailStats?.medium }} km</p>
        <p class="text-sm">Schwer: {{ trailStats?.difficult }} km</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SnowInfoComponent',
  props: {
    snowHeight: { type: Number, default: 0 },
    snowType: { type: String, default: '' },
    trailStats: {
      type: Object as () => {
        total: number
        easy: number
        medium: number
        difficult: number
      } | null,
      default: null,
    },
  },
})
</script>
