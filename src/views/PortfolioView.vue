<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const strapiBase = 'https://ethical-bell-7cfe17e5f3.strapiapp.com'
const token = import.meta.env.VITE_RENDER_KEY

const projets = ref([])               // Tous les projets
const selectedCat = ref('')          // Catégorie sélectionnée
const showFilter = ref(false)        // Afficher/masquer filtres

// 🔍 Extraire les catégories uniques
const catprojets = computed(() => {
  const cats = new Set()
  projets.value.forEach(p => {
    if (p.Categories) cats.add(p.Categories)
  })
  return Array.from(cats)
})

// 🧩 Projets filtrés si une catégorie est sélectionnée
const filteredProjets = computed(() => {
  if (!selectedCat.value) return projets.value
  return projets.value.filter(p => p.Categories === selectedCat.value)
})

// 🔄 Appel API pour récupérer tous les projets
const fetchAllProjets = async () => {
  try {
    const res = await axios.get(`${strapiBase}/api/projets?pagination[pageSize]=500&populate=Rectangle`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    projets.value = res.data.data
  } catch (err) {
    console.error('Erreur lors du chargement des projets:', err)
  }
}

const filterelement = (cat) => {
  selectedCat.value = cat
}

const erasefilter = () => {
  selectedCat.value = ''
}

onMounted(() => {
  fetchAllProjets()
})
</script>

<template>
  <section id="portfolio-wrapper">
    <div id="portfolio-filter-section">
      <div id="element-wrapper">
        <div class="section-filter-container-portfolio">
          <div class="title-page-portfolio">
            <h2>Nos réalisations</h2>
          </div>

          <div class="filters-portfolio">
            <div class="show-filter-portfolio" @click="showFilter = !showFilter">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                <path
                  d="M13.25,7.556V18.944M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                  transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
              </svg>
              <p>Afficher les filtres</p>
            </div>

            <div class="hide-filter-portfolio" @click="showFilter = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                <path d="M8.333,15H21.667M27,15A12,12,0,1,1,15,3,12,12,0,0,1,27,15Z" transform="translate(-2.5 -2.5)"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
              </svg>
              <p>Masquer les filtres</p>
            </div>

            <div class="remove-filters-portfolio" v-if="selectedCat">
              <div id="filter-selected-portfolio">
                <p>{{ selectedCat }}</p>
              </div>
              <p @click="erasefilter">Effacer la sélection</p>
            </div>
          </div>
        </div>

        <div class="filters-to-display-portfolio" v-if="showFilter">
          <div class="catprojet" v-for="cat in catprojets" :key="cat">
            <i class="fa-regular fa-circle" @click="filterelement(cat)">
              {{ cat }}
            </i>
          </div>
        </div>
      </div>
    </div>

    <div id="portfolio-card-section">
      <div class="project-card" v-for="projet in filteredProjets" :key="projet.id">
        <img :src="`${projet.Rectangle?.url}`" :alt="projet.Title" />
        <div class="project-card-text">
          <h1>{{ projet.Title }}</h1>
          <p class="category">{{ projet.Categories }}</p>
        </div>
      </div>
    </div>

    <div id="back-to-top">
      <div id="back-to-top-container">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 30.042 31.558">
            <g transform="translate(15.021 15.779) rotate(-90)">
              <g transform="translate(-15.779 -15.021)">
                <path
                  d="M30.784,13.166,18.236.754a2.609,2.609,0,1,0-3.67,3.71L22.6,12.413H2.609a2.609,2.609,0,1,0,0,5.217H22.6l-8.035,7.948a2.609,2.609,0,1,0,3.67,3.71L30.784,16.876a2.609,2.609,0,0,0,0-3.71Z" />
              </g>
            </g>
          </svg>
          <p>Remontez</p>
        </a>
      </div>
    </div>
  </section>
</template>
