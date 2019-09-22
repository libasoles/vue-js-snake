<template>
  <section class="scene" 
    v-bind:style="{
      width: dimensions.width + 'px',
      height: dimensions.heigth + 'px'
    }">

    <Fruit :position="fruit.position"
      :size="fruit.size"></Fruit>

    <!-- $listeners propagates child events -->
    <Snake ref="snake"
      v-on="$listeners" 
      :position="snake.head.position" 
      :direction="snake.head.direction" 
      :headSize="snake.head.size"
      :tail="snake.tail"
    ></Snake>
  </section>
</template>

<script>
import Snake from './Snake';
import Fruit from './Fruit';

export default {
  name: 'Scene',
  methods: {
    update() {
      this.$refs.snake.move();
    },
    checkCollision() {       
      const {position} = this.snake.head;

      if(position.x < 0 || position.x >= this.dimensions.width ||
         position.y < 0 || position.y >= this.dimensions.heigth) {
        
        return true;
      }
   
      return false;
    },
    checkFruitEaten() {
      const { head } = this.snake;
      const fruit = this.fruit;    
    
      if(head.position.x === fruit.position.x && 
         head.position.y === fruit.position.y) {

        return true;
      }
   
      return false;
    }
  },
  watch: {   
    snake: { 
       handler() {
         const collides = this.checkCollision();
         if(collides) {
           this.$emit('wall-collision');
         }       
                
         const wasFruitEaten = this.checkFruitEaten(); 
         if(wasFruitEaten) {
           this.$emit('fruit-eaten');
         }
      },
      deep: true
    }
  },
  props: ['dimensions', 'snake', 'fruit'],
  components: {
    Snake,
    Fruit
  }
}
</script>

<style scoped>
.scene {  
  background: #379452;
  position: relative;
}
</style>