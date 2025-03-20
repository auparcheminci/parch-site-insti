<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
</script>
<template>
<vueper-slides 
fade :touchable="false" 
class="no-shadow"
autoplay
  :pause-on-hover="pauseOnHover" >
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
  pauseOnHover: false,
  autoPlaying: true,
  slides: [
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_1_0f08dfb984.jpg',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_2_0d593c003d.jpg',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_3_f9a40e38c5.jpg',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_SLIDE_4_bf313942f8.jpg',
    },
  ]
})

}

</script>