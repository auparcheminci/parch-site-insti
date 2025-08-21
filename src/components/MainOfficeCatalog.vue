<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const strapiBase = 'https://ethical-bell-7cfe17e5f3.strapiapp.com'
const token = import.meta.env.VITE_RENDER_KEY

const catalogues = ref([])

onMounted(async () => {
    try {
        const res = await axios.get(`${strapiBase}/api/cataloguesprincipauxbureaux`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        catalogues.value = res.data.data
    } catch (error) {
        console.error('Error fetching catalogs:', error)
    }
})
</script>

<template>
    <div id="main-catalog-office-wrapper">
        <div class="main-catalog-inside" v-for="catalogue in catalogues" :key="catalogue.id">
            <div class="first-part">
                <h2>{{ catalogue.Title }}</h2>
                <p>{{ catalogue.Maj }}</p>
            </div>
            <div class="links">
                <div class="link-main">
                    <!-- à compléter -->
                </div>
            </div>
        </div>
    </div>
</template>
