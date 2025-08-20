<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const catalogues = ref([])
const token = import.meta.env.VITE_RENDER_KEY

onMounted(async () => {
  try {
    const res = await axios.get('https://ethical-bell-7cfe17e5f3.strapiapp.com/api/cataloguesprincipaux?populate=Document', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    catalogues.value = res.data.data
  } catch (err) {
    console.error('Error fetching main catalogs:', err)
  }
})
</script>

<template>
  <div id="main-catalog-wrapper">
    <div class="main-catalog-inside" v-for="catalogue in catalogues" :key="catalogue.id">
      <div class="first-part">
        <h2>{{ catalogue.Title }}</h2>
        <!-- <p>{{ catalog.attributes.Maj }}</p> -->
      </div>

      <div class="link-main" v-if="catalogue.Document?.url">
        <a :href="`https://ethical-bell-7cfe17e5f3.strapiapp.com${catalogue.Document.url}`" target="_blank">
          Télécharger le catalogue
        </a>
      </div>
    </div>
  </div>
</template>
