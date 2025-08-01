<script setup>
//import MainCatalog from '../components/MainCatalog.vue'
import MainOfficeCatalog from '../components/MainOfficeCatalog.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
const catalogues = ref([])

onMounted(async () => {
  const options = {
    method: 'GET',
    maxBodyLength: Infinity,
    url: 'https://ethical-bell-7cfe17e5f3.strapiapp.com/api/catalogues',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_RENDER_KEY}`
    }
  }

  try {
    const response = await axios.request(options)
    catalogues.value = response.data.data
    console.log(response.data.data)
  } catch (error) {
    console.error('Error fetching Catalogs:', error)
  }
})
</script>

<template>
  <MainOfficeCatalog />
  <div class="main-catalog-inside" v-for="catalogue in catalogues" :key="catalogue.id">
    <div class="first-part">
      <h2>{{ catalogue.Marque }}</h2>
      <!--<p>{{ catalog.attributes.Maj }}</p> -->
    </div>
  </div>
</template>
