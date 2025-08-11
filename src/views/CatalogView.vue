<script>
import axios from 'axios'

export default {
  data() {
    return {
      search: '',
      gammes: [],
      marques: [],
      catalogs: [],
    }
  },
  computed: {
    filteredList() {
      return this.marques.filter(marque =>
        marque.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },
  methods: {
    async fetchCatalogs() {
      try {
        const response = await axios.get(
          'https://ethical-bell-7cfe17e5f3.strapiapp.com/api/catalogues?sort=nomdufournisseur&pagination[pageSize]=50&populate=*',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_RENDER_KEY}`,
            },
          }
        )
        this.catalogs = response.data.data

        const attrs = this.catalogs[0]?.attributes
        if (attrs) {
          this.gammes = attrs.gamme || []
          this.marques = attrs.marque || []
        }
      } catch (error) {
        console.error('Erreur de chargement des catalogues:', error)
      }
    },
    filterByMarque(marque) {
      const filtered = this.catalogs.filter(catalog =>
        catalog.attributes.marque === marque
      )
      this.catalogs = filtered
    },
    filterByGamme(gamme) {
      const filtered = this.catalogs.filter(catalog =>
        catalog.attributes.gamme?.includes(gamme)
      )
      this.catalogs = filtered
    },
    clearFilters() {
      this.fetchCatalogs()
    },
    fulllistpop() {
      document.getElementById("brand-modal").style.display = 'flex'
    },
    closePopup() {
      document.getElementById("brand-modal").style.display = 'none'
    },
  },
  mounted() {
    this.fetchCatalogs()
  },
}
</script>

<template>
  <section id="wrapper-catalog">
    <!-- Brand Modal -->
    <div id="brand-modal" style="display: none">
      <div class="brand-popup">
        <div class="popup-element-wrapper">
          <div class="popup-search">
            <input type="text" v-model="search" placeholder="Tapez le nom de la marque que vous cherchez" />
          </div>
          <div class="brand-element-full">
            <div class="brand-element-full-each" v-for="marque in filteredList" :key="marque">
              <i @click="filterByMarque(marque)" class="fa-regular fa-circle">{{ marque }}</i>
            </div>
          </div>
          <div class="save-selection">
            <p @click="closePopup">Sauvegarder ma sélection</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div id="filters-section">
      <div id="filters-wrapper">
        <div class="filter-content">
          <div class="title-page">
            <h2>Nos catalogues</h2>
          </div>
          <div class="filters">
            <div class="remove-filters">
              <p @click="clearFilters">Effacer la sélection</p>
            </div>
          </div>
        </div>
        <div class="filters-to-display">
          <div id="department-filters">
            <h3>Les gammes</h3>
            <p>Cochez les cases pour filtrer</p>
            <div class="departement-element">
              <div class="departement-element-each" v-for="gamme in gammes" :key="gamme">
                <i @click="filterByGamme(gamme)" class="fa-regular fa-circle">{{ gamme }}</i>
              </div>
            </div>
          </div>
          <div id="brand-filters">
            <h3>Les marques</h3>
            <p>Cochez les cases pour filtrer</p>
            <div @click="fulllistpop" class="brand-full-list">
              <p>Voir la liste</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Catalogs -->
    <div id="catalog-content">
      <div id="wrapper-supplier-catalog">
        <div
          id="supplier-all"
          class="supplier-card-wrapper"
          v-for="catalog in catalogs"
          :key="catalog.id"
        >
          <div class="catalog-cover">
            <picture>
              <img
                :src="'https://ethical-bell-7cfe17e5f3.strapiapp.com' + (catalog.attributes.coversquareby3?.url || '')"
                alt="Catalogue image"
              />
            </picture>
          </div>
          <div class="supplier-catalog-element">
            <div class="supplier-catalog-inside">
              <div class="first-part">
                <h2>{{ catalog.attributes.nomdufournisseur }}</h2>
                <p>{{ catalog.attributes.annee }}</p>
              </div>
              <div class="link-main">
                <p>Voir le catalogue</p>
                <a
                  :href="'https://ethical-bell-7cfe17e5f3.strapiapp.com' + (catalog.attributes.document?.url || '')"
                  target="_blank"
                >
                  <i class="fa-solid fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add necessary CSS styles here */
</style>
