# Snake

First of all, you can play the prototype demo [here](https://codepen.io/libasoles/pen/bGbONWJ?editors=1010).

![Demo](https://github.com/libasoles/vue-js-snake/blob/master/public/screenshot.png)

Basically, it's a Vue.js exercise to try out componentization. 

### Design decisions
- state is all managed in the main component
- components emits events
- there's a game loop, that triggers an _update_ chain

## How to run?

As usual, install dependencies:

`yarn install`

And run:

`yarn serve`


### Next step
A multiplayer game with socket.io, that's a variant of the snake. Meet Tron:

https://www.youtube.com/watch?v=3SsRP2_fr3w&t=40s
