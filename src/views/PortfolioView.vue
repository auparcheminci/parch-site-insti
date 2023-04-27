<script setup>
import axios from 'axios';
</script>
<template>
    <section id="portfolio-wrapper">
        <div id="portfolio-filter-section">
            <div id="element-wrapper">
                <div class="section-filter-container-portfolio">
                    <div class="title-page-portfolio">
                        <h2>Nos réalisations</h2>
                    </div>
                    <div class="filters-portfolio">
                        <div class="show-filter-portfolio">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                                <path id="plus-circle-svgrepo-com"
                                    d="M13.25,7.556V18.944M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                                    transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1" />
                            </svg>
                            <p>Afficher les filtres</p>
                        </div>
                        <div class="hide-filter-portfolio">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                                <path id="plus-circle-svgrepo-com"
                                    d="M8.333,15H21.667M27,15A12,12,0,1,1,15,3,12,12,0,0,1,27,15Z"
                                    transform="translate(-2.5 -2.5)" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="1" />
                            </svg>


                            <p>Masquer les filtres</p>
                        </div>
                        <div style="display: none;" class="remove-filters-portfolio">
                            <div id="filter-selected-portfolio"></div>
                            <p style="display:none;" v-on:click="erasefilter">Effacer la sélection</p>
                        </div>
                    </div>
                </div>
                <div class="filters-to-display-portfolio">
                    <div class="catprojet" v-for="catprojet in catprojets">
                        <i v-on:click="filterelement" class="fa-regular fa-circle">{{ catprojet }}</i>
                    </div>
                </div>
            </div>
        </div>
        <div id="portfolio-card-section">
            <div class="project-card" v-for="project in projects" :key="project.id">
                <picture>
                    <source :srcset="`http://localhost:1337` + project.attributes.Carre.data.attributes.url" media="(min-width: 1320px)">
                    <source :srcset="`http://localhost:1337` + project.attributes.Rectangle.data.attributes.url" media="(min-width: 1150px)">
                    <source :srcset="`http://localhost:1337` + project.attributes.Carre.data.attributes.url" media="(min-width: 1000px)">
                    <img :src="`http://localhost:1337` + project.attributes.Carre.data.attributes.url" alt="MDN">
                </picture>
            </div>
        </div>
        <div id="back-to-top">
            <div id="back-to-top-container">
                         
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 30.042 31.558">
                    <g id="Fleche_blanche" data-name="Fleche blanche" transform="translate(15.021 15.779) rotate(-90)">
                        <g id="Group_434" data-name="Group 434" transform="translate(-15.779 -15.021)">
                            <path id="Path_383" data-name="Path 383"
                                d="M30.784,13.166,18.236.754a2.609,2.609,0,1,0-3.67,3.71L22.6,12.413H2.609a2.609,2.609,0,1,0,0,5.217H22.6l-8.035,7.948a2.609,2.609,0,1,0,3.67,3.71L30.784,16.876a2.609,2.609,0,0,0,0-3.71Z"
                                transform="translate(0 0)"  />
                        </g>
                    </g>
                </svg>
                <p>Remontez</p>
            </a>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            catprojets: [],
            projects: [],
        }
    },
    methods: {

        filterelement(catprojet) {
            const currentcat = catprojet.target.firstChild.data;
            const portfoliowrapper = document.querySelector("#portfolio-card-section");
            portfoliowrapper.innerHTML = "";
            const filterselect = document.getElementById("filter-selected-portfolio");
            filterselect.innerHTML = "";

            var sh = document.createElement('p');
            sh.innerHTML = currentcat;
            filterselect.appendChild(sh);
            document.querySelector("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.remove-filters-portfolio").style.display = "flex";
            document.querySelector("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.remove-filters-portfolio > p").style.display = "";

            const optionsr = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `http://localhost:1337/api/projets?filters[Categories][$eq]=${currentcat}&populate=*`,
                headers: {
                    'Authorization': 'Bearer d9021206876fa9b96a716c638ca82803a98647a80b81657a0f483a3227f1313138e1754fe19fa4ecca3c402b93a13de6543db152245e5cdfbe4e474820131bfe43c334a8e88bb5773e23567c82fdf6a8ab962a9ed394a2b0181e260f364ac9b9a034c903b852270aab7c58c5e28326b57766a6038aa2e15c678525da3bf2f062'
                }
            }
            axios.request(optionsr).then((response) => {
                this.projetsfiltered = response.data.data;
                const projetsList = this.projetsfiltered;
                console.log(projetsList);

                projetsList.forEach((projet) => {
                    var top = document.createElement('div');
                    top.innerHTML = '<div class="project-card">' 
                        + '<picture><source srcset="http://localhost:1337' + projet.attributes.Carre.data.attributes.url + '" media="(min-width: 1320px)">'
                            + '<source srcset="http://localhost:1337' + projet.attributes.Rectangle.data.attributes.url + '" media="(min-width: 1150px)">'
                            + '<source srcset="http://localhost:1337' +  projet.attributes.Carre.data.attributes.url + '" media="(min-width: 1000px)">'
                            + '<img src="http://localhost:1337' + projet.attributes.Carre.data.attributes.url + '" alt="MDN">'
                        + '</picture>'
                        + '</div>'
                    portfoliowrapper.appendChild(top);

                })
            }).catch(function (error) {
                console.error(error);
            });
        },

        erasefilter() {

            document.querySelector("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.remove-filters-portfolio").style.display = "none";
            document.querySelector("#element-wrapper > div.section-filter-container-portfolio > div.filters-portfolio > div.remove-filters-portfolio > p").style.display = "none";
            const portfoliowrapper = document.querySelector("#portfolio-card-section");
            portfoliowrapper.innerHTML = "";
            const filterselect = document.getElementById("filter-selected-portfolio");
            filterselect.innerHTML = "";

            const optionsx = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: 'http://localhost:1337/api/projets?populate=*',
                headers: {
                    'Authorization': 'Bearer d9021206876fa9b96a716c638ca82803a98647a80b81657a0f483a3227f1313138e1754fe19fa4ecca3c402b93a13de6543db152245e5cdfbe4e474820131bfe43c334a8e88bb5773e23567c82fdf6a8ab962a9ed394a2b0181e260f364ac9b9a034c903b852270aab7c58c5e28326b57766a6038aa2e15c678525da3bf2f062'
                }
            }
            axios.request(optionsx).then((response) => {
                this.catalogsx = response.data.data;
                const cataloglistingAll = this.catalogsx;
                console.log(cataloglistingAll);

                cataloglistingAll.forEach((projet) => {
                    var tre = document.createElement('div');
                    tre.innerHTML = '<div class="project-card">' 
                        + '<picture><source srcset="http://localhost:1337' + projet.attributes.Carre.data.attributes.url + '" media="(min-width: 1320px)">'
                            + '<source srcset="http://localhost:1337' + projet.attributes.Rectangle.data.attributes.url + '" media="(min-width: 1150px)">'
                            + '<source srcset="http://localhost:1337' +  projet.attributes.Carre.data.attributes.url + '" media="(min-width: 1000px)">'
                            + '<img src="http://localhost:1337' + projet.attributes.Carre.data.attributes.url + '" alt="MDN">'
                        + '</picture>'
                        + '</div>'
                    portfoliowrapper.appendChild(tre);
                })

            }).catch(function (error) {
                console.error(error);
            });
        }

    },
    mounted() {
        const options = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'http://localhost:1337/api/content-type-builder/content-types/api::projet.projet',
            headers: {
                'Authorization': 'Bearer d9021206876fa9b96a716c638ca82803a98647a80b81657a0f483a3227f1313138e1754fe19fa4ecca3c402b93a13de6543db152245e5cdfbe4e474820131bfe43c334a8e88bb5773e23567c82fdf6a8ab962a9ed394a2b0181e260f364ac9b9a034c903b852270aab7c58c5e28326b57766a6038aa2e15c678525da3bf2f062'
            }
        }
        axios.request(options).then((response) => {
            this.catprojets = response.data.data.schema.attributes.Categories.enum;
            console.log(this.catprojets);
        }).catch(function (error) {
            console.error(error);
        });

        const optionst = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'http://localhost:1337/api/projets?populate=*',
            headers: {
                'Authorization': 'Bearer d9021206876fa9b96a716c638ca82803a98647a80b81657a0f483a3227f1313138e1754fe19fa4ecca3c402b93a13de6543db152245e5cdfbe4e474820131bfe43c334a8e88bb5773e23567c82fdf6a8ab962a9ed394a2b0181e260f364ac9b9a034c903b852270aab7c58c5e28326b57766a6038aa2e15c678525da3bf2f062'
            }
        }
        axios.request(optionst).then((response) => {
            this.projects = response.data.data;
            console.log(this.projects);
        }).catch(function (error) {
            console.error(error);
        });
    }
}
</script>