<script setup>
import axios from 'axios'
</script>
<template>
    <div id="main-catalog-wrapper">
        <div class="main-catalog-inside" v-for="catalog in catalogs" :key="catalog.id">
            <div class="first-part">
                <h2>{{ catalog.Title }}</h2>

                <!--<p>{{ catalog.attributes.Maj }}</p> -->
            </div>
            <div class="link-main" v-if="catalog?.Document?.data?.attributes?.url">
                <a :href="`https://strapi-z4iu.onrender.com${catalog.Document.data.attributes.url}`"
                    target="_blank">
                    Télécharger le catalogue
                </a>
            </div>

        </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      catalogs: []
    }
  },
  mounted() {
    const options = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: 'https://strapi-z4iu.onrender.com/api/main-catalogs?populate=*',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_RENDER_KEY}`
      }
    }

    axios.request(options)
      .then((response) => {
        this.catalogs = response.data.data  // ✅ fixed path
        // console.log(this.catalogs)
      })
      .catch((error) => {
        console.error('Error fetching main catalogs:', error)
      })
  }
}

</script>