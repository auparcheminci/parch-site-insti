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
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/FAC_2_11944f6e8f.webp',
    },
    {
    title: "",
    content: "",
    // You can also provide a URL for the image.
    image: 'https://strapi-z4iu.onrender.com/uploads/MAG_193_edited_c3f69d674e.webp',
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
    image: 'https://strapi-z4iu.onrender.com/uploads/EXP_122_597de4a39e.webp',
    },
  ]
})

}


</script>