<script setup>
import axios from 'axios'
</script>
<template>
    <div id="main-catalog-office-wrapper">
        <div class="main-catalog-inside" v-for="article in articles" :key="article.id">
            <div class="first-part">
                <h2>{{ article.title }}</h2>
                <!-- <p>{{ catalog.attributes.Maj }}</p> -->
            </div>
            <div class="links">
                <div class="link-main">
                    


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
            url: 'https://ethical-bell-7cfe17e5f3.strapiapp.com/api/articles?populate=*',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_RENDER_KEY}`
            }
        }

        axios.request(options)
            .then((response) => {
                this.articles = response.data.data  // ✅ corrected here
            })
            .catch((error) => {
                console.error('Error fetching catalogs:', error)
            })
    }
}

</script>
