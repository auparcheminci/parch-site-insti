<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
</script>
<template>
<vueper-slides autoplay fade :touchable="false" class="no-shadow">
  <vueper-slide
    v-for="(slide, i) in slides"
    :key="i"
    :image="slide.image"
    :title="slide.title"
    :slide-ratio="1 / 3"
    :content="slide.content" />
</vueper-slides>
</template>
<script>
export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
  slides: [
    {
    title: "De la variété",
    content: "Au Parchemin, c'est 9 gammes de produits au large choix, constamment revues et mises à jour. Nous avons à coeur que vous puissiez trouver au même endroit tous les articles de bureau et papeterie dont vous avez besoin.",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/FAC_4_edited_2454e7ecff.webp',
    },
    {
    title: "De la proximité",
    content: "Une équipe de professionnel à vos côtés en permanence. Nous répondons à vos questions et vous conseillons sur les bons choix à faire en fonction de vos besoins, pour que vous soyez toujours satisfait de vos achats.",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MAG_193_edited_c3f69d674e.webp',
    },
    {
    title: "De la qualité",
    content: "Nous sommes toujours à la recherche de produits plus solide, plus durable pour que vous disposiez des meilleurs outils. Biensure nous nous efforcons de toujours vous les vendre au prix le plus juste.",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MOB_22_c582494519.webp',
    },
    {
    title: "De la fluidité",
    content: "Nos entrepôts de grande capacité nous permettent de stocker toute la marchandise nécéssaire pour que vous ne soyez jamais à court des produits dont vous avez besoin. Nous assurons ainsi vos réassorts en permanence.",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/EXP_122_597de4a39e.webp',
    },
  ]
})

}


</script>