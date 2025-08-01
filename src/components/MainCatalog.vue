<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const catalogs = ref([])
const token = import.meta.env.VITE_RENDER_KEY

onMounted(async () => {
  try {
    const res = await axios.get('https://ethical-bell-7cfe17e5f3.strapiapp.com/api/cataloguesprincipaux?populate=Document', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    catalogs.value = res.data.data
  } catch (err) {
    console.error('Error fetching main catalogs:', err)
  }
})
</script>

<template>
  <div id="main-catalog-wrapper">
    <div class="main-catalog-inside" v-for="catalog in catalogs" :key="catalog.id">
      <div class="first-part">
        <h2>{{ catalog.Title }}</h2>
        <!-- <p>{{ catalog.attributes.Maj }}</p> -->
      </div>

      <div class="link-main" v-if="catalog.Document?.url">
        <a :href="`https://ethical-bell-7cfe17e5f3.strapiapp.com${catalog.Document.url}`" target="_blank">
          Télécharger le catalogue
        </a>
      </div>
    </div>
  </div>
</template>
