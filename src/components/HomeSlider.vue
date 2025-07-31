<script setup>
import { ref } from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'

// Reactive data
const pauseOnHover = ref(false)

const slides = ref([
  {
    title: '',
    content: '',
    image: 'https://ethical-bell-7cfe17e5f3.media.strapiapp.com/FAC_1_27975c4616.webp',
  },
  {
    title: '',
    content: '',
    image: 'https://ethical-bell-7cfe17e5f3.media.strapiapp.com/FAC_2_1a7444764b.webp',
  },
  {
    title: '',
    content: '',
    image: 'https://ethical-bell-7cfe17e5f3.media.strapiapp.com/FAC_4_989953292d.webp',
  },
  {
    title: '',
    content: '',
    image: 'https://ethical-bell-7cfe17e5f3.media.strapiapp.com/FAC_5_90f5d9864c.webp',
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
