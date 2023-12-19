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
                    <a style="cursor: not-allowed;">Mobilier de bureau gamme Kamos</a>
                </div>
                <div class="link-main">
                    <a style="cursor: not-allowed;">Mobilier de bureau gamme Vista</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_mob.data.attributes.url"
                        target="_blank">Mobilier de bureau gamme SIT</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_cha.data.attributes.url"
                        target="_blank">Chaises & Fauteuils</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_arm.data.attributes.url"
                        target="_blank">Armoires Métalliques</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_vest.data.attributes.url"
                        target="_blank">Vestiaires Métalliques</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_arch.data.attributes.url"
                        target="_blank">Stockage & Archivage</a>
                </div>
                <div class="link-main">
                    <a :href="`https://strapi-z4iu.onrender.com` + catalog.attributes.document_ref.data.attributes.url"
                        target="_blank">Réfectoire & Collectivité</a>
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