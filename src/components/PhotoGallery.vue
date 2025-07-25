<script setup>
import axios from 'axios'
</script>
<template>
    <div class="gallery-grid-display" v-for="photo in photos" :key="photo.id">
        <img :src="`https://mighty-festival-73bd3f630e.strapiapp.com/` + photo.attributes.Rectangle.data.attributes.url" alt="MDN">
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
        const options = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'https://strapi-z4iu.onrender.com/api/galerie-photos?pagination[pageSize]=500&populate=*',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
            }
        }
        axios.request(options).then((response) => {
            this.photos = response.data.data;
            console.log(this.photos);
        }).catch(function (error) {
            console.error(error);
        });
    }
}
</script>