<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const catalogues = ref([])
const token = import.meta.env.VITE_RENDER_KEY

onMounted(async () => {
  try {
    const res = await axios.get('https://strapi-z4iu.onrender.com/api/main-catalogs?populate=*', {
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
        <p>{{ catalogue.Maj }}</p>
      </div>
      <div class="link-main">
        <a v-if="catalogue.Document" :href="`${catalogue.Document.url}`" target="_blank">Voir le catalogue
          <svg xmlns="http://www.w3.org/2000/svg" width="17.249" fill="currentColor" height="16.42" viewBox="0 0 17.249 16.42">
            <g transform="translate(8.624 8.21)">
              <g transform="translate(-8.624 -8.21)">
                <path
                  d="M16.825,7.2,9.967.412A1.426,1.426,0,1,0,7.961,2.44l4.392,4.344H1.426a1.426,1.426,0,1,0,0,2.852H12.353L7.961,13.98a1.426,1.426,0,1,0,2.006,2.028l6.858-6.784a1.426,1.426,0,0,0,0-2.028Z" />
              </g>
            </g>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
