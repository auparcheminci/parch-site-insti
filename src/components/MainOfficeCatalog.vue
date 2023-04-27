<script setup>
import axios from 'axios'
</script>
<template>
    <div id="main-catalog-office-wrapper">
                <div class="main-catalog-inside" v-for="catalog in catalogs" :key="catalog.id">
                    <div class="first-part">
                        <h2>{{ catalog.attributes.Title }}</h2>
                        <p>{{ catalog.attributes.Maj }}</p>
                    </div>
                    <div class="link-main">
                        <a :href="`http://localhost:1337` + catalog.attributes.Document.data.attributes.url"
                            target="_blank">Voir le catalogue</a>
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
            url: 'http://localhost:1337/api/main-office-catalogs?populate=*',
            headers: {
                'Authorization': 'Bearer d9021206876fa9b96a716c638ca82803a98647a80b81657a0f483a3227f1313138e1754fe19fa4ecca3c402b93a13de6543db152245e5cdfbe4e474820131bfe43c334a8e88bb5773e23567c82fdf6a8ab962a9ed394a2b0181e260f364ac9b9a034c903b852270aab7c58c5e28326b57766a6038aa2e15c678525da3bf2f062'
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