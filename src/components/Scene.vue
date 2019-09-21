<template>
  <section class="scene" v-bind:style="{
      width: this.dimensions.width + 'px',
      height: this.dimensions.heigth + 'px'
    }">
    <Fruit :position="fruit.position"
      :size="fruit.size"></Fruit>
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
      if(this.snake.speed > 0) {
        this.$refs.snake.move();
      }
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
      const {position, size} = this.snake.head;
      const fruit = this.fruit;    
      
      const snakeCoordinates = {
        x: Math.round(position.x / size),
        y: Math.round(position.y / size)
      }
      
      const fruitCoordinates = {
        x: Math.round(fruit.position.x / fruit.size),
        y: Math.round(fruit.position.y / fruit.size)
      }
   
      if(snakeCoordinates.x === fruitCoordinates.x && 
         snakeCoordinates.y === fruitCoordinates.y) {
        
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
      deep: true // TODO: check for specific value
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