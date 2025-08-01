<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import MainCatalog from '../components/MainCatalog.vue'
import MainOfficeCatalog from '../components/MainOfficeCatalog.vue'

// 🔐 API
const token = import.meta.env.VITE_RENDER_KEY
const strapiBase = 'https://ethical-bell-7cfe17e5f3.strapiapp.com'

// 🔁 Réactifs
const search = ref('')
const gammes = ref([])
const marques = ref([])
const catalogs = ref([])

const selectedGamme = ref('')
const selectedMarque = ref('')
const showModal = ref(false)

// 🧠 Filtrage côté client
const filteredList = computed(() => {
  return marques.value.filter(m =>
    m.toLowerCase().includes(search.value.toLowerCase())
  )
})

// 📡 Charger les catalogues fournisseurs
const fetchCatalogs = async () => {
  try {
    const res = await axios.get(`${strapiBase}/api/supplier-catalogs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const attributes = res.data.data?.[0]?.attributes || {}
    gammes.value = attributes?.Gamme?.options || []
    marques.value = attributes?.MarqueSupplier?.enum || []
  } catch (err) {
    console.error('Erreur chargement gammes/marques :', err)
  }
}

// 📡 Charger les catalogues avec tous les détails
const fetchSupplierCatalogs = async () => {
  try {
    const res = await axios.get(`${strapiBase}/api/supplier-catalogs?sort[0]=TitleSupplier&pagination[pageSize]=50&populate=*`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    catalogs.value = res.data.data
  } catch (err) {
    console.error('Erreur chargement des catalogues fournisseurs :', err)
  }
}

// 🔍 Appliquer un filtre gamme
const filterByGamme = async (gamme) => {
  selectedGamme.value = gamme
  selectedMarque.value = ''
  try {
    const res = await axios.get(`${strapiBase}/api/supplier-catalogs?filters[Gamme][$contains]=${gamme}&sort[0]=TitleSupplier&pagination[pageSize]=50&populate=*`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    catalogs.value = res.data.data
  } catch (err) {
    console.error('Erreur filtre gamme :', err)
  }
}

// 🔍 Appliquer un filtre marque
const filterByMarque = async (marque) => {
  selectedMarque.value = marque
  selectedGamme.value = ''
  try {
    const res = await axios.get(`${strapiBase}/api/supplier-catalogs?filters[MarqueSupplier][$eq]=${marque}&pagination[pageSize]=50&populate=*`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    catalogs.value = res.data.data
  } catch (err) {
    console.error('Erreur filtre marque :', err)
  }
}

// 🔄 Effacer filtres
const clearFilters = async () => {
  selectedGamme.value = ''
  selectedMarque.value = ''
  await fetchSupplierCatalogs()
}

// 🟢 Initialisation
onMounted(async () => {
  await fetchCatalogs()
  await fetchSupplierCatalogs()
})
</script>

<template>
  <section id="wrapper-catalog">
    <!-- 🔲 Modal Marques -->
    <div id="brand-modal" v-show="showModal">
      <div class="brand-popup">
        <div class="popup-element-wrapper">
          <div class="popup-search">
            <input v-model="search" placeholder="Tapez le nom de la marque" />
          </div>
          <div class="brand-element-full">
            <div v-for="marque in filteredList" :key="marque">
              <i @click="filterByMarque(marque)">{{ marque }}</i>
            </div>
          </div>
          <div class="save-selection">
            <p @click="showModal = false">Sauvegarder ma sélection</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔘 Filtres -->
    <div id="filters-section">
      <div id="filters-wrapper">
        <div class="filter-content">
          <div class="title-page">
            <h2>Nos catalogues</h2>
          </div>
          <div class="filters">
            <div class="show-filter">
              <p>Afficher les filtres</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                <path id="plus-circle-svgrepo-com"
                  d="M13.25,7.556V18.944M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                  transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
              </svg>
            </div>
            <div class="hide-filter">
              <p>Masquer les filtres</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                <path id="plus-circle-svgrepo-com"
                  d="M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                  transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
              </svg>
            </div>
            <div class="remove-filters" v-if="selectedGamme || selectedMarque">
              <div id="filter-selected">
                <p v-if="selectedGamme">{{ selectedGamme }}</p>
                <p v-if="selectedMarque">{{ selectedMarque }}</p>
              </div>
              <p @click="clearFilters">Effacer la sélection</p>
            </div>
          </div>
        </div>

        <div class="filters-to-display">
          <div id="department-filters">
            <h3>Les gammes</h3>
            <p>Cochez les cases pour filtrer</p>
            <div v-for="gamme in gammes" :key="gamme">
              <i @click="filterByGamme(gamme)">{{ gamme }}</i>
            </div>
          </div>

          <div id="brand-filters">
            <h3>Les marques</h3>
            <p>Cochez les cases pour filtrer</p>
            <div @click="showModal = true">
              <p>Voir la liste</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 📚 Catalogues -->
    <div id="catalog-content">
      <div id="section-fixed">
        <MainCatalog />
        <MainOfficeCatalog />
      </div>

      <div id="wrapper-supplier-catalog">
        <div class="supplier-card-wrapper" v-for="catalog in catalogs" :key="catalog.id">
          <div class="catalog-cover">
            <picture>
              <source :srcset="`${strapiBase}${catalog.attributes?.CoverSquareby3?.url}`" media="(min-width: 1620px)" />
              <img :src="`${strapiBase}${catalog.attributes?.CoverSupplierDefault?.url}`" alt="catalogue" />
            </picture>
          </div>
          <div class="supplier-catalog-element">
            <div class="supplier-catalog-inside">
              <div class="first-part">
                <h2>{{ catalog.attributes?.TitleSupplier }}</h2>
                <p>{{ catalog.attributes?.Annee }}</p>
              </div>
              <div class="link-main">
                <p>Voir le catalogue</p>
                <a :href="`${strapiBase}${catalog.attributes?.DocumentSupplier?.url}`" target="_blank">
                  <i class="fa-solid fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔼 Back to top -->
    <div id="back-to-top">
      <div id="back-to-top-container">
        <a href="#">
          <p>Remontez</p>
        </a>
      </div>
    </div>
  </section>
</template>
