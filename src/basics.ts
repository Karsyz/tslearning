let age: number = 25;
age = 30;
// age = "30" doesn't work

let namey: string = "Alice";
namey = "Bob";

let isStudent: boolean = true;

let numbers: number[] = [1, 2, 3];
// or
let otherNums: Array<string> = ["hello", "worldy", "people"];

let anything: any = 1234;
anything = "1234";

// Type Interface

let count = 5; // Inferred type
count = 10;
// count = '1234' doesn't work

// functions
function add(a: number, b: number, c: number): number {
  return a + b + c;
}

// add('1', 2, 3) '1' will be highlighed doesn't work
console.log(add(1, 2, 3));

// optional parameters

function greeting(name: string, greeting?: string): string {
  // the ? makes it optional
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}
console.log(greeting("Alice"));
console.log(greeting("Alice", "What's up"));

// Objects and Interfaces
interface Person {
  name: string;
  age: number;
  isStudent?: boolean; // optional property
}

let user: Person = {
  name: "Alice",
  age: 25,
};

function introduce(person: Person): string {
  return `My name is ${person.name} and I am ${person.age} years old.`;
}

console.log(introduce(user));

// Union types
let result: number | string;
result = 42;
result = "success";
// result = true // error

// type Aliases
type ID = number | string;
let userId: ID = 123;
userId = "ABC123"; //works

//Tuples
let person: [string, number] = ["alice", 29];

console.log(person[0]);
console.log(person[1]);

// enums
enum Color {
  Red,
  Green,
  Blue,
}

let favorite0: Color = Color.Red;
let favorite1: Color = Color.Green;
let favorite2: Color = Color.Blue;
console.log(favorite0);
console.log(favorite1);
console.log(favorite2);

// string enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

let move: Direction = Direction.Up;
console.log(move);

// Type Assertions (casting) us when you know the value better than ts does
{
  // block is for scope, using 'length' again
  let value: any = "hello coding coders";
  let length: number = (value as string).length; // Assert 'value' is a string
  //  let length: number = (<string>value).length; // alternate syntax
  console.log(length);
}

// null and undefined
let maybe: string | null = null;
maybe = "Now a string";
if (maybe) {
  console.log(maybe.length);
}

// Basic Classes

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): string {
    return `${this.name} makes a sounnd!`;
  }
}

let dog = new Animal("Dog");
console.log(dog.speak());

// Modules
import { greet } from "./utils.js";
console.log(greet("Matt")); // "Hello, Matt!"

// Generics
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(42);
let str = identity<string>("Hello");
console.log(num, str);

function getFirst<T>(arr: T[]): T {
  return arr[1];
}

let firstNum = getFirst([1, 2, 3]);
let firstStr = getFirst(["a", "b", "c"]);
let firstMix = getFirst([1, "b", (a: number): number => a + 1]);
console.log(firstNum, firstStr, firstMix);

// Advanced Interfaces

interface Person {
  name: string;
}

interface Employee extends Person {
  id: number;
}

let worker: Employee = {
  name: "Matt",
  age: 29,
  isStudent: true,
  id: 123,
};

console.log(worker);

// index signatures
interface Dictionary {
  [key: string]: number;
}
let scores: Dictionary = { math: 95, science: 88 };
console.log(scores["math"]);

// Type guards
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
console.log(process("Hello"));
console.log(process(42.42424242424242424242424));

// Custom Type Guards - ensures only cats 'meow'

interface Cat {
  meow: () => string;
}

function isCat(animal: any): animal is Cat {
  return "meow" in animal;
}

function speak(animal: any) {
  if (isCat(animal)) {
    console.log(animal.meow());
  } else {
    console.log("not a cat... no meow for you");
  }
}

// Valid Cat
const kitty: Cat = {
  meow: () => "Meow meow!",
};
speak(kitty); // Logs: "Meow meow!"

// Not a Cat
const doge = {
  bark: () => "Woof!",
};
speak(doge); // Does nothing (no log, no error)

// Invalid object
const random = { name: "Something" };
speak(random); // Does nothing (no log, no error)

// Union
type Status = "success" | "error" | "pending";
let current: Status = "pending";

// Intersection Types
interface User {
  name: string;
}

interface Admin {
  permissions: string[];
}

type AdminUser = User & Admin;
let boss: AdminUser = {
  name: "Matt",
  permissions: ["read", "write"],
};

// Advanced Classes
class Personas {
  private secret: string;
  constructor(public name: string, secret: string) {
    this.secret = secret;
  }
  getSecret() {
    return this.secret;
  }
}

let personas = new Personas("Karsy", "hidden");

console.log(personas.name); 
console.log(personas.getSecret());


// Abstract Classes
// abbstract classes serve as a blueprint for other classes to inherit from. they cannot be used directly to to create objects. ie  new Animals(); 

abstract class Animals { 
  abstract makeSound(): string;
  move(): string {
    return "Moving...";
  }
}

class Dogies extends Animals {
  makeSound(): string {
    return "Woof!";
  }
}

let dogies = new Dogies();
console.log( dogies.makeSound(), dogies.move());


// Generics with Contstraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength('Hello'); //5
logLength([1,2,3]); // 3
// logLength(42); //Error

// Utility Types
interface MoreUsers {
 name: string;
 age: number; 
}
let partialUser: Partial<MoreUsers> = { name: "Karsy"}; // age is optional
let userName: Pick<User, "name"> = { name: "Karsy"};
let noAge: Omit<User, "age"> = { name: "Karsy"};

// Conditional Types
type IsString<T> = T extends string ? "yes" : "no";
type Test1 = IsString<string>; //"yes"
type Test2 = IsString<number>; //"no"

// Async / Await and Promises
async function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded!"), 1000);
  });
}

async function run() {
  const data = await fetchData();
  console.log(data); // 'Data loaded!" after 1 second
}
run();

