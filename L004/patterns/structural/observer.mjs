class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  fire() {
    this.observers.forEach(observer => observer());
  }
}

const subject = new Subject();

function observer1() {
  console.log('observer1');
}

function observer2() {
  console.log('observer2');
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire();
subject.unsubscribe(observer1);
subject.fire();