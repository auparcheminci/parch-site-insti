<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"
import MainOfficeCatalog from '../components/MainOfficeCatalog.vue'
import MainCatalog from "../components/MainCatalog.vue"

// --- Config ---
const STRAPI_URL   = import.meta.env.VITE_STRAPI_URL || "https://ethical-bell-7cfe17e5f3.strapiapp.com"
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || import.meta.env.VITE_RENDER_KEY

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}
})

// --- State ---
const search = ref("")
const gammes = ref([])
const marques = ref([])
const catalogues = ref([])

// Helper URL média Strapi (gestion Strapi v5)
function getMedia(media) {
  if (!media) return ""
  
  // Handle media objects from Strapi
  const url = media.url || media.attributes?.url
  if (!url) return ""
  
  // Absolute URLs are returned as-is
  if (url.startsWith("http")) return url
  
  // Otherwise prepend base Strapi URL
  return `${STRAPI_URL}${url}`
}

// Fetch catalogues
async function fetchCatalogues(params = {}) {
  const { data } = await api.get("/api/catalogues", {
    params: {
      populate: "*",
      "pagination[pageSize]": 50,
      "sort[0]": "nomdufournisseur",
      ...params
    }
  })
  catalogues.value = data.data || []

  // Populate marques & gammes if empty
  if (!marques.value.length || !gammes.value.length) {
    const mset = new Set()
    const gset = new Set()
    for (const c of catalogues.value) {
      if (c?.marque) mset.add(c.marque)
      if (Array.isArray(c?.gamme)) c.gamme.forEach(g => g && gset.add(g))
    }
    marques.value = [...mset].sort()
    gammes.value = [...gset].sort()
  }
}

// UI helpers
function showRemoveButton(show) {
  const el = document.querySelector("#filters-wrapper > div.filter-content > div.filters > div.remove-filters > p")
  if (el) el.style.display = show ? "block" : "none"
}

function setFilterChip(text) {
  const chipZone = document.querySelector("#filter-selected")
  if (!chipZone) return
  chipZone.innerHTML = ""
  if (text) {
    const p = document.createElement("p")
    p.textContent = text
    chipZone.appendChild(p)
  }
}

// --- Filter actions ---
async function greet(marque) {
  const currentbrand = typeof marque === "string" ? marque : (marque?.target?.textContent || "")
  showRemoveButton(true)
  setFilterChip(currentbrand)
  await fetchCatalogues({ "filters[marque][$eq]": currentbrand })
}

async function greetgamme(gamme) {
  const currentgamme = typeof gamme === "string" ? gamme : (gamme?.target?.textContent || "")
  showRemoveButton(true)
  setFilterChip(currentgamme)
  await fetchCatalogues({ "filters[gamme][$id]": currentgamme })
}

async function greeterase() {
  showRemoveButton(false)
  setFilterChip("")
  await fetchCatalogues()
}

function fulllistpop() {
  const m = document.getElementById("brand-modal")
  if (m) m.style.display = "flex"
}
function closePopup() {
  const m = document.getElementById("brand-modal")
  if (m) m.style.display = "none"
}

// --- Mount ---
onMounted(async () => {
  try {
    await fetchCatalogues()
  } catch (e) {
    console.error(e)
  }
})

// --- Search marques (popup) ---
const filteredList = computed(() =>
  marques.value.filter(m => m.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
<section id="wrapper-catalog">
  <!-- Brand popup -->
  <div id="brand-modal" style="display: none">
    <div class="brand-popup">
      <div class="popup-element-wrapper">
        <div class="popup-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="23.311" height="23.311" viewBox="0 0 23.311 23.311">
            <path d="M3,24.5l5.308-5.308M5.529,12.485a9.485,9.485,0,1,1,9.485,9.485A9.485,9.485,0,0,1,5.529,12.485Z"
                  fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
          </svg>
          <input type="text" v-model="search" placeholder="Tapez le nom de la marque que vous cherchez" />
        </div>
        <div class="brand-element-full">
          <div class="brand-element-full-each" v-for="marque in filteredList" :key="marque">
            <i v-on:click="greet(marque)" class="fa-regular fa-circle">{{ marque }}</i>
          </div>
        </div>
        <div class="save-selection">
          <p v-on:click="closePopup">Sauvegarder ma sélection</p>
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
          <div class="show-filter">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
              <path d="M13.25,7.556V18.944M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
            </svg>
            <p>Afficher les filtres</p>
          </div>
          <div class="hide-filter">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
              <path d="M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
            </svg>
            <p>Masquer les filtres</p>
          </div>
          <div class="remove-filters">
            <div id="filter-selected"></div>
            <p style="display:none;" v-on:click="greeterase">Effacer la sélection</p>
          </div>
        </div>
      </div>

      <!-- Filter lists -->
      <div class="filters-to-display">
        <div id="department-filters">
          <div class="departement-intro">
            <h3>Les gammes</h3>
            <p>Cochez les cases pour ne voir apparaitre que les éléments sélectionnés</p>
          </div>
          <div class="departement-element">
            <div class="departement-element-each" v-for="gamme in gammes" :key="gamme">
              <i v-on:click="greetgamme(gamme)" class="fa-regular fa-circle">{{ gamme }}</i>
            </div>
          </div>
        </div>
        <div id="brand-filters">
          <div class="brand-intro">
            <h3>Les marques</h3>
            <p>Cochez les cases pour ne voir apparaitre que les éléments sélectionnés</p>
          </div>
          <div v-on:click="fulllistpop" class="brand-full-list">
            <p>Voir la liste </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Catalog content -->
  <div id="catalog-content">
    <div id="section-fixed">
        <MainOfficeCatalog/>
        <MainCatalog/>
    </div>
    <div id="wrapper-supplier-catalog">
      <div class="supplier-card-wrapper" v-for="catalogue in catalogues" :key="catalogue.id">
        <div class="catalog-cover">
          <picture>
            <source :srcset="getMedia(catalogue.coversquareby3full)" media="(min-width: 1700px)">
            <source :srcset="getMedia(catalogue.coversquareby3)" media="(min-width: 1620px)">
            <source :srcset="getMedia(catalogue.coversquareby2)" media="(min-width: 1320px)">
            <source :srcset="getMedia(catalogue.cover620)" media="(min-width: 1095px)">
            <source :srcset="getMedia(catalogue.coverrectangle)" media="(min-width: 1000px)">
            <img :src="getMedia(catalogue.coversupplierdefault)" alt="Cover">
          </picture>
        </div>
        <div class="supplier-catalog-element">
          <div class="supplier-catalog-inside">
            <div class="first-part">
              <h2>{{ catalogue.nomdufournisseur }}</h2>
              <p>{{ catalogue.annee }}</p>
            </div>
            <div class="link-main">
              <p>Voir le catalogue</p>
              <a v-if="catalogue.document" :href="getMedia(catalogue.document)" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="17.249" height="16.42" viewBox="0 0 17.249 16.42">
                  <g transform="translate(8.624 8.21)">
                    <g transform="translate(-8.624 -8.21)">
                      <path d="M16.825,7.2,9.967.412A1.426,1.426,0,1,0,7.961,2.44l4.392,4.344H1.426a1.426,1.426,0,1,0,0,2.852H12.353L7.961,13.98a1.426,1.426,0,1,0,2.006,2.028l6.858-6.784a1.426,1.426,0,0,0,0-2.028Z"/>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="supplier-all-hide" style="display: none;">
        <p>Display none</p>
      </div>
    </div>
  </div>

  <!-- Back to top -->
  <div id="back-to-top">
    <div id="back-to-top-container">
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 30.042 31.558">
          <g transform="translate(15.021 15.779) rotate(-90)">
            <g transform="translate(-15.779 -15.021)">
              <path d="M30.784,13.166,18.236.754a2.609,2.609,0,1,0-3.67,3.71L22.6,12.413H2.609a2.609,2.609,0,1,0,0,5.217H22.6l-8.035,7.948a2.609,2.609,0,1,0,3.67,3.71L30.784,16.876a2.609,2.609,0,0,0,0-3.71Z"/>
            </g>
          </g>
        </svg>
        <p>Remontez</p>
      </a>
    </div>
  </div>
</section>
</template>
