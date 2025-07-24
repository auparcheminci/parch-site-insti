<script setup>
import MainCatalog from '../components/MainCatalog.vue'
import MainOfficeCatalog from '../components/MainOfficeCatalog.vue'
import axios from 'axios'

</script>

<template>
    <section id="wrapper-catalog">
        <div id="brand-modal" style="display: none">
            <div class="brand-popup">
                <div class="popup-element-wrapper">
                    <div class="popup-search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.311" height="23.311" viewBox="0 0 23.311 23.311">
                            <path id="search-svgrepo-com_2_" data-name="search-svgrepo-com (2)"
                                d="M3,24.5l5.308-5.308M5.529,12.485a9.485,9.485,0,1,1,9.485,9.485A9.485,9.485,0,0,1,5.529,12.485Z"
                                transform="translate(-1.939 -2.25)" fill="none" stroke="#fff" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="1.5" />
                        </svg>
                        <input type="text" v-model="search" placeholder="Tapez le nom de la marque que vous cherchez" />
                    </div>
                    <div class="brand-element-full">
                        <div class="brand-element-full-each" v-for="marque in filteredList">
                            <i v-on:click="greet" class="fa-regular fa-circle">{{ marque }}</i>
                        </div>
                    </div>
                    <div class="save-selection">
                        <p v-on:click="closePopup">Sauvegarder ma sélection</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="filters-section">
            <div id="filters-wrapper">
                <div class="filter-content">
                    <div class="title-page">
                        <h2>Nos catalogues</h2>
                    </div>
                    <div class="filters">
                        <div class="show-filter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                                <path id="plus-circle-svgrepo-com"
                                    d="M13.25,7.556V18.944M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                                    transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1" />
                            </svg>
                            <p>Afficher les filtres</p>
                        </div>
                        <div class="hide-filter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 21.5 21.5">
                                <path id="plus-circle-svgrepo-com"
                                    d="M7.556,13.25H18.944m4.556,0A10.25,10.25,0,1,1,13.25,3,10.25,10.25,0,0,1,23.5,13.25Z"
                                    transform="translate(-2.5 -2.5)" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1" />
                            </svg>
                            <p>Masquer les filtres</p>
                        </div>
                        <div class="remove-filters">
                            <div id="filter-selected"></div>
                            <p style="display:none;" v-on:click="greeterase">Effacer la sélection</p>
                        </div>
                    </div>
                </div>
                <div class="filters-to-display">
                    <div id="department-filters">
                        <div class="departement-intro">
                            <h3>Les gammes</h3>
                            <p>Cochez les cases pour ne voir apparaitre que les éléments sélectionnés</p>
                        </div>
                        <div class="departement-element">
                            <div class="departement-element-each" v-for="gamme in gammes">
                                <i v-on:click="greetgamme" class="fa-regular fa-circle">{{ gamme }}</i>
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
        <div id="catalog-content">
            <div id="section-fixed">
                <MainCatalog />
                <MainOfficeCatalog />
            </div>
            <div id="wrapper-supplier-catalog">
                    <div id="supplier-all" class="supplier-card-wrapper" v-for="catalog in catalogs" :key="catalog.TitleSupplier">
                        <div class="catalog-cover">
                            <picture>
                                <source :srcset="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.CoverSquareby3Full.url" media="(min-width: 1700px)">
                                <source :srcset="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.CoverSquareby3.url" media="(min-width: 1620px)">
                                <source :srcset="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.CoverSquareby2.url" media="(min-width: 1320px)">
                                <source :srcset="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.Cover620.url" media="(min-width: 1095px)">
                                <source :srcset="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.CoverRectangle.url" media="(min-width: 1000px)">
                                <img :src="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.CoverSupplierDefault.url" alt="MDN">
                            </picture>
                        </div>
                    <div class="supplier-catalog-element">
                        <div class="supplier-catalog-inside">
                            <div class="first-part">
                                <h2>{{ catalog.TitleSupplier }}</h2>
                                <p>{{ catalog.attributes.Annee }}</p>
                            </div>
                            <div class="link-main">
                                <p>Voir le catalogue</p>
                                <a :href="`https://mighty-festival-73bd3f630e.strapiapp.com` + catalog.attributes.DocumentSupplier.data.attributes.url"
                                    target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="17.249" height="16.42"
                                        viewBox="0 0 17.249 16.42">
                                        <g id="Fleche_blanche" data-name="Fleche blanche" transform="translate(8.624 8.21)">
                                            <g id="Group_285" data-name="Group 285" transform="translate(-8.624 -8.21)">
                                                <path id="Path_347" data-name="Path 347"
                                                    d="M16.825,7.2,9.967.412A1.426,1.426,0,1,0,7.961,2.44l4.392,4.344H1.426a1.426,1.426,0,1,0,0,2.852H12.353L7.961,13.98a1.426,1.426,0,1,0,2.006,2.028l6.858-6.784a1.426,1.426,0,0,0,0-2.028Z"
                                                    transform="translate(0 0)" />
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
            search: '',
            gammes: [],
            marques: [],
            catalogs: [],
        }
    },
    methods: {
        greet(marque) {
            const currentbrand = marque.target.firstChild.data;


            const optionsc = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `https://mighty-festival-73bd3f630e.strapiapp.com/api/supplier-catalogs?filters[MarqueSupplier][$eq]=${currentbrand}&pagination[pageSize]=50&populate=*`,
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
                }
            }
            axios.request(optionsc).then((response) => {
                this.catalogsc = response.data.data;
                const cataloglistingC = this.catalogsc;
                const erasesec = document.querySelector("#filter-selected");
                document.querySelector("#filters-wrapper > div.filter-content > div.filters > div.remove-filters > p").style.display = "block";
                const wrapper = document.getElementById("wrapper-supplier-catalog");
                wrapper.innerHTML = "";
                erasesec.innerHTML = "";
                var e = document.createElement('p');
                    e.innerHTML = currentbrand;
                    erasesec.appendChild(e);
                    document.querySelector("#filters-wrapper > div.filter-content > div.filters > div.remove-filters > p").style.display = "block";

                if (cataloglistingC.length === 0) {
                    wrapper.innerHTML = "Aucun filtre ne correspond à votre recherche"
                }
                else {
                    console.log(cataloglistingC);
                }

                cataloglistingC.forEach((catalog) => {
                    var tr = document.createElement('div');
                    tr.innerHTML =
                        '<div id="supplier-all" class="supplier-card-wrapper">'
                        + '<div class="catalog-cover">'
                        + '<picture>'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3Full.data.attributes.url + '" media="(min-width: 1700px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3.data.attributes.url + '" media="(min-width: 1620px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby2.data.attributes.url + '" media="(min-width: 1320px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.Cover620.data.attributes.url + '" media="(min-width: 1095px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverRectangle.data.attributes.url + '" media="(min-width: 1000px)">'
                            + '<img src="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSupplierDefault.data.attributes.url + '" alt="MDN">'
                        + '</picture>'
                        + '</div>'
                        + '<div class="supplier-catalog-element"> '
                        + '<div class="supplier-catalog-inside">'
                        + '<div class="first-part">'
                        + '<h2>' + catalog.TitleSupplier + '</h2>'
                        + '<p>' + catalog.attributes.Annee + '</p>'
                        + '</div>'
                        + '<div class="link-main">'
                        + '<p>' + 'Voir le catalogue' + '</p>'
                        + '<a href="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.DocumentSupplier.data.attributes.url + ' "><i class="fa-solid fa-arrow-right"></i>' + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                    wrapper.appendChild(tr);
                    
                })

            }).catch(function (error) {
                console.error(error);
            });

        },

        greetgamme(gamme) {
            const currentgamme = gamme.target.firstChild.data;
            console.log(currentgamme);
            document.querySelector("#filters-wrapper > div.filter-content > div.filters > div.remove-filters > p").style.display = "block";

            const optionsg = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `https://mighty-festival-73bd3f630e.strapiapp.com/api/supplier-catalogs?filters[Gamme][$contains]=${currentgamme}&sort[0]=TitleSupplier&pagination[pageSize]=50&populate=*`,
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
                }
            }
            axios.request(optionsg).then((response) => {
                this.catalogsg = response.data.data;
                const cataloglistingG = this.catalogsg;
                const erasesec = document.querySelector("#filter-selected");
                const wrapper = document.getElementById("wrapper-supplier-catalog");
                wrapper.innerHTML = "";
                erasesec.innerHTML = "";
                var i = document.createElement('p');
                    i.innerHTML = currentgamme;
                    erasesec.appendChild(i);

                if (cataloglistingG.length === 0) {
                    wrapper.innerHTML = "Aucun filtre ne correspond à votre recherche"
                  

                }
                else {
                    console.log(cataloglistingG);
                }

                cataloglistingG.forEach((catalog) => {
                    var te = document.createElement('div');
                    te.innerHTML =
                    '<div id="supplier-all" class="supplier-card-wrapper">'
                        + '<div class="catalog-cover">'
                        + '<picture>' 
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3Full.data.attributes.url + '" media="(min-width: 1700px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3.data.attributes.url + '" media="(min-width: 1620px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby2.data.attributes.url + '" media="(min-width: 1320px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.Cover620.data.attributes.url + '" media="(min-width: 1095px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverRectangle.data.attributes.url + '" media="(min-width: 1000px)">'
                            + '<img src="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSupplierDefault.data.attributes.url + '" alt="MDN">'
                        + '</picture>'
                        + '</div>'
                        + '<div class="supplier-catalog-element"> '
                        + '<div class="supplier-catalog-inside">'
                        + '<div class="first-part">'
                        + '<h2>' + catalog.TitleSupplier + '</h2>'
                        + '<p>' + catalog.Annee + '</p>'
                        + '</div>'
                        + '<div class="link-main">'
                        + '<p>' + 'Voir le catalogue' + '</p>'
                        + '<a href="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.DocumentSupplier.data.attributes.url + ' "><i class="fa-solid fa-arrow-right"></i>' + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                    wrapper.appendChild(te);
                   

                })

            }).catch(function (error) {
                console.error(error);
            });
        },

        greeterase() {
            const erasesecb = document.querySelector("#filter-selected");
            const wrapper = document.getElementById("wrapper-supplier-catalog");
            document.querySelector("#filters-wrapper > div.filter-content > div.filters > div.remove-filters > p").style.display = "none";
            wrapper.innerHTML = "";
            erasesecb.innerHTML = "";
            const optionse = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: 'https://mighty-festival-73bd3f630e.strapiapp.com/api/supplier-catalogs?sort[0]=TitleSupplier&pagination[pageSize]=50&populate=*',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
                }
            }
            axios.request(optionse).then((response) => {
                this.catalogse = response.data.data;
                const cataloglistingE = this.catalogse;
                const wrapper = document.getElementById("wrapper-supplier-catalog");
                wrapper.innerHTML = "";

                cataloglistingE.forEach((catalog) => {
                    var tr = document.createElement('div');
                    tr.innerHTML =
                    '<div id="supplier-all" class="supplier-card-wrapper">'
                        + '<div class="catalog-cover">'
                        + '<picture>'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3Full.data.attributes.url + '" media="(min-width: 1700px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby3.data.attributes.url + '" media="(min-width: 1620px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSquareby2.data.attributes.url + '" media="(min-width: 1320px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.Cover620.data.attributes.url + '" media="(min-width: 1095px)">'
                            + '<source srcset="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverRectangle.data.attributes.url + '" media="(min-width: 1000px)">'
                            + '<img src="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.CoverSupplierDefault.data.attributes.url + '" alt="MDN">'
                        + '</picture>'
                        + '</div>'
                        + '<div class="supplier-catalog-element"> '
                        + '<div class="supplier-catalog-inside">'
                        + '<div class="first-part">'
                        + '<h2>' + catalog.TitleSupplier + '</h2>'
                        + '<p>' + catalog.Annee + '</p>'
                        + '</div>'
                        + '<div class="link-main">'
                        + '<p>' + 'Voir le catalogue' + '</p>'
                        + '<a href="https://mighty-festival-73bd3f630e.strapiapp.com' + catalog.attributes.DocumentSupplier.data.attributes.url + ' "><i class="fa-solid fa-arrow-right"></i>' + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                    wrapper.appendChild(tr);
                })

            }).catch(function (error) {
                console.error(error);
            });
        },

        fulllistpop() {
            document.getElementById("brand-modal").style.display = 'flex';
        },
        closePopup() {
            document.getElementById("brand-modal").style.display = 'none';
        }
    },
    mounted() {
        const options = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'https://mighty-festival-73bd3f630e.strapiapp.com/api/supplier-catalogs',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
            }
        }
        axios.request(options).then((response) => {
            this.gammes = response.Gamme.options
            this.marques = response.data.schema.attributes.MarqueSupplier.enum
        }).catch(function (error) {
            console.error(error);
        });

        const optionsa = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'https://mighty-festival-73bd3f630e.strapiapp.com/api/supplier-catalogs?sort[0]=TitleSupplier&pagination[pageSize]=50&populate=*',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_RENDER_KEY}`
            }
        }
        axios.request(optionsa).then((response) => {
            this.catalogs = response.data.data;
            console.log(this.catalogs)
        }).catch(function (error) {
            console.error(error);
        });

    },
    computed: {
        filteredList() {
            return this.marques.filter(marque => {
                return marque.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
}
</script>