export class Car {
  constructor(type, model, year, isForSale = false, isInstock = false) {
    this.type = type;
    this.model = model;
    this.year = year;
    this.isForSale = isForSale;
    this.isInstock = isInstock;
  }

  toString() {
    return console.log(JSON.stringify(this));
  }
}

export class CarBuilder {
  constructor(type, model, year) {
    this.type = type;
    this.model = model;
    this.year = year;
  }

  setForSale(isForSale) {
    this.isForSale = isForSale;
    return this;
  }

  setInstock(isInstock) {
    this.isInstock = isInstock;
    return this;
  }

  build() {
    return new Car(this.type, this.model, this.year, this.isForSale, this.isInstock);
  }
}