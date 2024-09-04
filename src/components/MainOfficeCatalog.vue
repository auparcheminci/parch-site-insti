<script setup>
import axios from 'axios'
</script>
<template>
    <div id="main-catalog-office-wrapper">
        <div class="main-catalog-inside" v-for="catalog in catalogs" :key="catalog.id">
            <div class="first-part">
                <h2>{{ catalog.attributes.Title }}</h2>
                <!-- <p>{{ catalog.attributes.Maj }}</p> -->
            </div>
            <div class="links">
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_cha.data.attributes.url"
                        target="_blank">Télécharger le catalogue</a>
                </div>
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
            url: 'https://strapi-z4iu.onrender.com/api/main-office-catalogs?populate=*',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
            }
        }
        axios.request(options).then((response) => {
            this.catalogs = response.data.data;
            //console.log(this.catalogs);
        }).catch(function (error) {
            console.error(error);
        });
    }
}
</script>