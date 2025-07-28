<script setup>
import axios from 'axios'
</script>

<template>
  <div class="gallery-grid-display" v-for="photo in photos" :key="photo.id">
    <img v-if="photo.Rectangle" :src="`https://strapi-z4iu.onrender.com${photo.Rectangle.url}`" alt="MDN" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: []
    }
  },
  mounted() {
    const token = import.meta.env.VITE_RENDER_KEY;
    const options = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: 'https://strapi-z4iu.onrender.com/api/galerie-photos?pagination[pageSize]=500&populate=*',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    };

    axios.request(options).then((response) => {
      this.photos = response.data.data;
      console.log(this.photos);
    }).catch(function (error) {
      console.error("Error fetching Strapi data:", error);
    });
  }
}
</script>
