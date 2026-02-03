<script setup>
import { ref } from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'

// Reactive data
const pauseOnHover = ref(false)

const slides = ref([
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_1_0f08dfb984.jpg',
  },
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_2_0d593c003d.jpg',
  },
])
</script>

<template>
  <vueper-slides>
  <vueper-slide
    v-for="(slide, i) in slides"
    :key="i"
    :title="slide.title"
    :content="slide.content"
    :image="slide.image">
  </vueper-slide>
</vueper-slides>
</template>
