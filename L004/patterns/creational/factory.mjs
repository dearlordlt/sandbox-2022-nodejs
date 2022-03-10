class Boat {
  constructor(type, model, year) {
    this.type = type;
    this.model = model;
    this.year = year;
  }
}

class Aircraft {
  constructor(type, model, year) {
    this.type = type;
    this.model = model;
    this.year = year;
  }
}

class Car {
  constructor(type, model, year) {
    this.type = type;
    this.model = model;
    this.year = year;
  }
}

export const VehicleFactory = (type, model, year) => {
  switch (type) {
    case 'boat':
      return new Boat(type, model, year);
    case 'aircraft':
      return new Aircraft(type, model, year);
    case 'car':
      return new Car(type, model, year);
    default:
      throw new Error('Vehicle type is not recognized');
  }
}