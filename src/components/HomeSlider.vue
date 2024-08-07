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
    image: 'https://strapi-z4iu.onrender.com/uploads/BANNIERE_8e50fdb62c.jpg',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MAG_183_cff171910a.webp',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MOB_22_c582494519.webp',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MOB_26_648fa4fcce.webp',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/EXP_150_c25121c6e5.webp',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/EXP_122_597de4a39e.webp',
    },
  ]
})

}

</script>