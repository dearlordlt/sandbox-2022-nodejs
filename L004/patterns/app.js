import { dbconn } from './creational/singleton.mjs';
import { VehicleFactory } from './creational/factory.mjs';
import { Car, CarBuilder } from './creational/builder.mjs';
import * as proto from './creational/prototype.mjs';
import * as facade from './structural/facade.mjs';
import * as command from './behavioral/command.mjs';
import * as obs from './structural/observer.mjs';

/* const boat = VehicleFactory('boat', 'Sailboat', '1961');
console.log(boat); */


// console.log(dbconn.getNewDbConnection());

/* const audi = new Car('car', 'Audi', '2020', true, true);
console.log(audi);

const audiBuilder = new CarBuilder('car', 'Audi', '2020')
  .setForSale(true)
  .setInstock(true)
  .build();
console.log(audiBuilder); */