<template>
  <div id="app">
    <div class="container">
      <Scene v-bind:dimensions="scene.dimensions"
            v-bind:snake="snake"
            v-bind:fruit="fruit"
            v-on:wall-collision="handleCollition"
            v-on:fruit-eaten="handleFruitEaten">      
      </scene>
      
      <div class="message">{{message}}</div>
      
      <aside class="side-controls">
        <button class="button" @click="start">Start</button>
        <keyboard v-on:arrow-pressed="setDirection"></keyboard> 
      </aside>
    </div>
  </div>
</template>

<script>
import Scene from './components/Scene.vue'
import Keyboard from './components/Keyboard'
import Position from './helpers/position'
import config from "./config";

const { blockSize, dimensions } = config; 

const initialState = {
  message: "",
  scene: {
    dimensions
  },
  snake: {
    head: {
      size: blockSize,
      position: Position.getRandom(dimensions.width / 2, dimensions.heigth / 2),
      direction: new Position()
    },      
    tail: [],
    speed: blockSize, 
  },
  fruit: {
    position: Position.getRandom(dimensions.width / 2, dimensions.heigth / 2),
    size: blockSize,      
  }
};

export default {
  name: 'app',
  mounted: function() {    
    setInterval(() => {
      this.move();
    }, config.refreshRate);
  },
  data: () => initialState,
  methods: {    
    start() {    
      this.message = initialState.message;
      this.snake = {
        ...this.snake,
        speed: initialState.snake.speed,
        head: {
          position: this.getRandomPosition(),
          direction: new Position(),
        },
        tail: []
      }
      this.fruit.position = this.getRandomPosition({ except: this.snake.head.position });
    },
    getRandomPosition(options) {
      return Position.getRandom(
        dimensions.width - blockSize, 
        dimensions.heigth - blockSize,
        options
      );
    },
    setDirection(keyname) {
      const { speed } = this.snake;
      const direction = new Position();

      if(keyname === "up") {
        direction.y -= speed;
      }
      if(keyname === "down") {
        direction.y += speed;
      }
      if(keyname === "left") {
        direction.x -= speed;
      }
      if(keyname === "right") {
        direction.x += speed;
      }

      this.snake.head.direction = direction;
    },
    move() {
      if(this.snake.speed === 0) {
        return false;
      }

      const { head, tail, speed } = this.snake;
      const { size } = head;
      let { x, y } = head.position;
         
      // move head   
      let previous = {...head.position};
      this.snake.head.position = Position.add(
        this.snake.head.position, 
        this.snake.head.direction
      );
  
      // move tail   
      let newTail = [];   
      for(let chunk in tail) {  
        const newPosition = Position.clone(previous);
        previous = tail[chunk];
        newTail.push(newPosition);
      }
      this.snake.tail = newTail;
    },  
    handleCollition() {
      this.endGame("Oh no!");
    },
    handleFruitEaten() {
      this.displayTemporalMessage("Yum!");  
      
      const { head } = this.snake;
      
      const tailChunk = new Position(
        head.position.x, 
        head.position.y
      );
      this.snake.tail.push(tailChunk);
      
      this.fruit.position = this.getRandomPosition({ except: this.snake.head.position });
    },
    displayTemporalMessage(message) {
       this.message = message;
       setTimeout(() => {
         if(this.message === message) {
           this.message = "";
         }
       }, 2000);
    },
    endGame(message = "") {
      this.message = message;
      this.snake.speed = 0;
    }
  },
  components: {
    Scene,
    Keyboard
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

* {  
  font-family: 'Roboto', sans-serif;
  color: white;
  background: #1D1E22;
}

.container {
  display: flex;
  justify-content: space-between;
}

.message {
  color: white;
  font-size: 30px;
}

.row {
  display: flex;
  justify-content: center;
}

.side-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button {
  border: none;
  outline: none;
  background: #387562;
  color: white;
  height: 40px;
  font-size: 20px;
}

</style>
