/* const car = {
  type: 'car',
  brand: 'Audi',
  year: '2020',
  stop: () => {
    console.log('Stopped');
  }
}

const car2 = car;

car2.year = '2019';

console.log(car);
console.log(car2); */

const carPrototype = {
  stop: () => {
    console.log('Stopped');
  }
}

function Car(type, brand, year) {
  function constructor(type, brand, year) {
    this.type = type;
    this.brand = brand;
    this.year = year;
  }

  constructor.prototype = carPrototype;

  let instance = new constructor(type, brand, year);
  return instance;
}

const car1 = Car('car', 'Audi', '2020');
const car2 = Car('car', 'bmw', '2018');
const car3 = Car();

/* console.log(car1);
console.log(car2);
console.log(car3);

car1.stop();
car2.stop();
car3.stop(); */