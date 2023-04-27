<script setup>
import axios from 'axios'
</script>
<template>
    <div class="gallery-grid-display" v-for="photo in photos" :key="photo.id">
        <img :src="`https://parch-api-strapi.herokuapp.com` + photo.attributes.Rectangle.data.attributes.url" alt="MDN">
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
            url: 'https://parch-api-strapi.herokuapp.com/api/photos?populate=*',
            headers: {
                'Authorization': 'Bearer dc7c879469179f7e950b37a0fe3255a9c6f062d43229f8dc5875688b19c671f96c2abca6b095b20cf686cf2b8bf718df0e51c889b967b2003451ff5971dff6327fb4467919bb3da5736388032a9e47e73ae4fbf6270e3fd86e3398c0f1282676fd1111d2a392472e83e24d2cde78e774b9c4256d0178a4c31d8c4d41af56ce36'
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