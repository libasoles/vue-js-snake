<template>
  <section class="arrows">
    <div class="row">
      <button class="key up" v-bind:class="{active: activeKeys.up}">&#8593;</button>
    </div>
      <div class="row">
        <button class="key left" v-bind:class="{active: activeKeys.left}">&#8592;</button>
        <button class="key down" v-bind:class="{active: activeKeys.down}">&#8595;</button>
        <button class="key right" v-bind:class="{active: activeKeys.right}">&#8594;</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Keyboard",
  mounted: function() {
    document.addEventListener("keydown", this.handleKeyboard);  
  },
  data: function() {
    const idleKeyboard = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    
    return {
      activeKeys: {...idleKeyboard},
      idleKeyboard
    }
  },
  methods: {
    handleKeyboard(event) {
      event.preventDefault();
      
      const keymap = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      }
      
      const keyname = keymap[event.key];
    
      if(keyname) {
        this.resetKeyboardState();
        this.react(keyname);        
        this.broadcast(keyname);
      }        
    },  
    resetKeyboardState() {
      this.activeKeys = {...this.idleKeyboard};    
    },
    react(keyname) {
      this.activeKeys[keyname] = true;
    },
    broadcast(keyname) {     
      this.$emit('arrow-pressed', keyname);
    }
  }
}
</script>

<style scoped>
.key {
  background: #7A33FF;
  width: 70px;
  height: 40px;
  line-height: 40px;
  color: white;
  text-align: center;
  cursor: pointer;
  border: none;
  margin: 1px;
  font-size: 22px;
  font-weight: bold;
}

.key.down {
  padding-bottom: 10px;
}

.key.active, 
.key:active {
  background: #753EDC;
  color: #AE87F9;
  outline: none;
}

.key:focus {
  outline: none;
}
</style>