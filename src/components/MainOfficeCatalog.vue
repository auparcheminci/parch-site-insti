<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const strapiBase = 'https://ethical-bell-7cfe17e5f3.strapiapp.com'
const token = import.meta.env.VITE_RENDER_KEY

const articles = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`${strapiBase}/api/cataloguesprincipauxbureaux`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    articles.value = res.data.data
  } catch (error) {
    console.error('Error fetching catalogs:', error)
  }
})
</script>

<template>
  <div id="main-catalog-office-wrapper">
    <div class="main-catalog-inside" v-for="article in articles" :key="article.id">
      <div class="first-part">
        <h2>{{ article.Title }}</h2>
        <!-- <p>{{ article.attributes.Maj }}</p> -->
      </div>
      <div class="links">
        <div class="link-main">
          <!-- à compléter -->
        </div>
      </div>
    </div>
  </div>
</template>
