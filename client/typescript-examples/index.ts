function sum(x: number, y: number): number {
    return x + y;
}

const sumExample = sum(2, 5);

// Primitive types
let age: number = 35;
let userName: string = 'Joe';
let isValid: boolean = true;

let productNames: string[] = ['iphone', 'car'];

enum States {
    valid = 'valid1',
    inValid = 'inValid',
    pristine = 'pristine',
}

type FormStates = States.valid | 'inValid' | 'pristine';


enum StatesDefault {
    valid,
    invalid,
    pristine,
}

console.log(StatesDefault.valid);
console.log(StatesDefault[0]);


let formState: FormStates = States.valid;

type User = {
    userName: string;
    age: number;
}

const user: User = {
    userName: 'Joe',
    age: 25,
};

function wrapperSum(a: number, b: number, fn: (x: number, y: number) => number) {
    return fn.apply(null, [a, b]);
}

wrapperSum(3, 5, sum);

function customPush<T>(arr: T[], value: T): T[] {
    return [...arr, value];
}

let arr1 = [1, 2, 3];
customPush(arr1, 45);

type Product = {
    title: string;
    price: number
}

interface ICart {
    products: Product[];
    getTotalPrice: () => number;
}

class Cart implements ICart {
    constructor(public products: Product[]) {
    }

    getTotalPrice() {
        return this.products.reduce((acc: number, item: Product ) => acc + item.price, 0);
    }
}