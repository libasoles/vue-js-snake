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
import Position from "../helpers/position"

export default {
  name: "Snake",
  methods: {
    move() {      
      // move head   
      let previous = {...this.position};
      const newPosition = Position.add(
        this.position, 
        this.direction
      );
  
      // move tail   
      let newTail = [];   
      for(let chunk in this.tail) {  
        const newPosition = Position.clone(previous);
        previous = this.tail[chunk];
        newTail.push(newPosition);
      }
   
      this.$emit('snake-moved', {
        head: newPosition,
        tail: newTail
      });
    },  
  },  
  props: ['position', 'direction', 'headSize', 'tail'],
  components: {
    Block
  },  
}
</script>