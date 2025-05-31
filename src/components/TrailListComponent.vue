<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Zustand</th>
        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          Schwierigkeit
        </th>
        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
          Weitere Details
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <trail-item-component v-for="trail in trails" :key="trail.id" :trail="trail" />
    </tbody>
  </table>
</template>

<script lang="ts">
import type { TrailDisplay } from '@/models/objects'
import { defineComponent } from 'vue'
import TrailItemComponent from './TrailItemComponent.vue'

export default defineComponent({
  name: 'TrailListComponent',
  components: { TrailItemComponent },
  props: {
    trails: {
      type: Array as () => TrailDisplay[],
      required: true,
    },
  },
})
</script>
