<script setup>
//import MainCatalog from '../components/MainCatalog.vue'
//import MainOfficeCatalog from '../components/MainOfficeCatalog.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
const articles = ref([])

onMounted(async () => {
  const options = {
    method: 'GET',
    maxBodyLength: Infinity,
    url: 'https://ethical-bell-7cfe17e5f3.strapiapp.com/api/articles?populate=*',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_RENDER_KEY}`
    }
  }

  try {
    const response = await axios.request(options)
    articles.value = response.data.data
    console.log(response.data.data)
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
})
</script>

<template>
    <div class="main-catalog-inside" v-for="article in articles" :key="article.id">
        <div class="first-part">
            <h2>{{ article.title }}</h2>

            <!--<p>{{ catalog.attributes.Maj }}</p> -->
        </div>
        </div>
</template>