<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const photos = ref([])
const token = import.meta.env.VITE_RENDER_KEY

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://ethical-bell-7cfe17e5f3.strapiapp.com/api/galeries?pagination[pageSize]=500&populate=*',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    )
    photos.value = response.data.data
    console.log(photos.value)
  } catch (error) {
    console.error('Error fetching Strapi data:', error)
  }
})
</script>

<template>
  <div class="gallery-grid-display" v-for="photo in photos" :key="photo.id">
    <img v-if="photo.Rectangle" :src="`${photo.Rectangle.url}`" alt="MDN" />
  </div>
</template>