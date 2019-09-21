<template>
    <div class="snake">  
    <Block :position="position" 
           :size="headSize">
    </Block>
    <Block v-for="(coordinates, index) of tail"   
          v-bind:key="index" 
          :position="coordinates" 
          :size="headSize"
          color="yellow">
    </Block>
  </div>
</template>

<script>
import Block from "./Block";

export default {
  name: "Snake",
  props: ['position', 'headSize', 'tail'],
  components: {
    Block
  }
}
</script>

<style scoped>

</style>