import config from '../config';

const defaultOptions = {
  constraint: config.blockSize
};

export default class Position {
  constructor(x = 0, y = 0, options = defaultOptions) {
    const { constraint } = options;
    this.x = Math.round(x / constraint) * constraint;
    this.y = Math.round(y / constraint) * constraint;
  }
  
  static clone(position) {
    return new Position(position.x, position.y)
  }
  
  static getRandom(maxX, maxY, options = {}) {
    const min = 0;
    
    const position = new Position(
      Math.floor(Math.random() * (maxX - min)) + min, 
      Math.floor(Math.random() * (maxY - min)) + min
    );  
    
    const tryAgain = options.except 
      && position.x === options.except.x 
      && position.y === options.except.y;

    if(tryAgain) {
      return Position.getRandom(maxX, maxY);
    }
    
    return position;
  }

  static add(pos1, pos2) {
    return new Position(pos1.x + pos2.x, pos1.y + pos2.y);
  }
}