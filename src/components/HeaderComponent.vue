<template>
  <div class="header">
    <h1>Loipeninfo</h1>
    <h2>{{ regions }}</h2>
    <p class="open-trails">Offene Loipen: {{ openTrails }}/{{ totalTrails }}</p>
    <p class="description">
      Auf über 240 herrlichen Kilometern mit unübertroffener landschaftlicher Vielfalt, top
      Loipen-qualität und legendärer Schneesicherheit finden Langlauffans aus aller Welt ihre ganz
      persönlichen Traumloipen.
    </p>
    <p class="opening-hours">Generelle Öffnungszeiten: {{ openingHours }}</p>
    <hr />
  </div>
</template>

<script lang="ts">
import type { TrailSystemInfo } from '@/models/objects'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    systemInfo: {
      type: Object as () => TrailSystemInfo | null,
      required: true,
    },
  },
  setup(props) {
    const regions = computed(() => {
      return props.systemInfo?.regions.join(', ') || ''
    })

    const openTrails = computed(() => props.systemInfo?.openTrails || 0)
    const totalTrails = computed(() => props.systemInfo?.totalTrails || 0)
    const openingHours = computed(() => props.systemInfo?.openingHours || '')

    return {
      regions,
      openTrails,
      totalTrails,
      openingHours,
    }
  },
})
</script>

<style scoped>
.header {
  text-align: left;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}

.open-trails {
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.description {
  line-height: 1.5;
  margin-bottom: 1rem;
}

.opening-hours {
  margin-bottom: 1rem;
}

hr {
  border: none;
  border-top: 1px dotted #ccc;
  margin: 1rem 0;
}
</style>
