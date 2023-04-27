<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
</script>
<template>
<vueper-slides fade :touchable="false">
  <vueper-slide
    v-for="(slide, i) in slides"
    :key="i"
    :image="slide.image"
    :title="slide.title"
    :content="slide.content" />
</vueper-slides>
</template>
<script>
export default {
  components: { VueperSlides, VueperSlide },
  data: () => ({
  slides: [
    {
    title: 'Diversité.<br>Professionalisme.<br>Confiance.<br>',
    content: 'Paragraphe en overlay.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ',
    // You can also provide a URL for the image.
    image: 'src/assets/images/Fermeturechassisverrezalfjpg_63063fb114e15.jpg'
    },
    {
      title: 'Slide #2',
      content: 'Slide 2 content.'
    }
  ]
})

}


</script>