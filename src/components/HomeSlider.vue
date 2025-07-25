<script setup>
import { ref } from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'

// Reactive data
const pauseOnHover = ref(false)

const slides = ref([
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/EXP_009_9fa2018203.webp',
  },
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_2_0d593c003d.jpg',
  },
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_3_f9a40e38c5.jpg',
  },
  {
    title: '',
    content: '',
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_4_bf313942f8.jpg',
  },
])
</script>

<template>
  <vueper-slides>
  <vueper-slide
    v-for="(slide, i) in slides"
    :key="i"
    :title="slide.title"
    :content="slide.content">
  </vueper-slide>
</vueper-slides>
</template>
