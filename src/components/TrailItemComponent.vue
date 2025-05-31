<template>
  <tr class="border-b">
    <td class="px-4 py-2">
      <div
        :class="[
          'w-6 h-6 rounded-full flex items-center justify-center text-white',
          trail.status === 'open' ? 'bg-green-500' : 'bg-red-500',
        ]"
      >
        {{ trail.status === 'open' ? '✓' : '✗' }}
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="font-semibold">{{ trail.id }} {{ trail.name }}</div>
      <div v-if="trail.notes" class="text-sm text-gray-600 mt-1">ⓘ {{ trail.notes }}</div>
    </td>
    <td class="px-4 py-2">
      <span
        v-if="trail.condition"
        :class="[
          'px-2 py-1 rounded text-sm',
          trail.condition === 'Geschlossen'
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800',
        ]"
      >
        {{ trail.condition }}
      </span>
    </td>
    <td class="px-4 py-2">
      <div class="flex space-x-1">
        <span
          v-for="i in 3"
          :key="i"
          :class="['w-2 h-4', i <= trail.difficultyLevel ? 'bg-black' : 'bg-gray-200']"
        ></span>
      </div>
    </td>
    <td class="px-4 py-2">
      <div class="flex items-center space-x-2 mb-1 text-xl">
        <span v-if="trail.isBidirectional">↔️</span>
        <span v-if="trail.activities.includes('classic')">🎿</span>
        <span v-if="trail.activities.includes('skating')">⛷️</span>
        <span v-if="trail.allowsDogs">🐕</span>
      </div>
      <div class="text-sm font-medium">{{ trail.length }} km</div>
      <div class="text-xs text-gray-600 mt-1">
        Letzte Präparierung: {{ formatLastPreparation(trail.lastPreparation) }}
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import type { TrailDisplay } from '@/models/objects'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TrailItemComponent',
  props: {
    trail: {
      type: Object as () => TrailDisplay,
      required: true,
    },
  },
  setup() {
    const formatLastPreparation = (date: Date): string => {
      const now = new Date()
      const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      if (diffHours < 24) return `vor ${diffHours} Stunden`
      const diffDays = Math.floor(diffHours / 24)
      return diffDays === 1 ? 'vor 1 Tag' : `vor ${diffDays} Tagen`
    }
    return { formatLastPreparation }
  },
})
</script>
