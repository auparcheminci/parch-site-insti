<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
</script>
<template>
<vueper-slides fade :touchable="false" class="no-shadow">
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
    title: "C'est la rentrée !",
    content: "Pour tous les goûts et pour tous les budgets. Equipez vos enfants sans prise de tête pour la rentrée scolaire.<br> Choissisez parmi une sélection d'articles qui feront leur bonheur tout au long de l'année, en boutique ou chez nos revendeurs.",
    // You can also provide a URL for the image.
    image: '/assets/images/main-rentree-cote.jpg',
    },
  ]
})

}


</script>