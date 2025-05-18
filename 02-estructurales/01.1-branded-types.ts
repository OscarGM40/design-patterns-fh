// https://javascript.plainenglish.io/writing-robust-typescript-with-branded-primitives-bde7cd2d1c77

// Nominal typing: see that typescript is not a nominally typed language, it is a structurally typed language(why?). Typescript treats an object as type-compatible with a type if has the same structure as the type, regardless of wheterh it was explicitly declared to be of that type. This is called structural typing
// On the other hand, nominal typing treats an object as incompatible with a type if it was not explicity declared to be of that type. The term "nominal" refers to the type name; nominal types are only compatible if they have (or inherit from) the same type name. Java is a nominally typed language, for example, usually requiring that two objects implement the same interface to be able to be treated as interchangeable
// We could solve the semantic mismatch problem if we could create nominal types for primitives, and Typescript allow us to do exactly this. We'll use a feature of TS that enables us to declare that a property must have a specific value and no other. When this value is unique to the specific type, the property is called a BRAND and the type a branded type.It is clear that we can declare such properties for objects, but Typescript also lets us declare these properties for primitives. The result is a branded primitive.
// Branded primitives allow us to create nominally typed primitives that prevent semantic and lexical mismatches
type UserId = string & { __myAppUserID: "userId" };
type UserId2 = string & { __kind: "MyApp:UserId" };
type UserId3 = string & { readonly __brand: unique symbol };

// TS is not mandating the underscores nor the names kind or brand. TS will still mandae the readonly constraint on unique symbol. Of these 3 approaches, only unique symbol establishes a nominal type.One could create a new type having an indentical definition and use instances of that type interchangeably
// Moreover, one cannot create  a generic type for producing nominally typed primitives based on unique symbol.For example, all types defined as Branded<string> would be interchangeable under the following definition:
type Branded<T> = T & { readonly __brand: unique symbol };
// Branded primitives behave as follows:
type UserId4 = string & { readonly __brand: unique symbol };
type EmailAdress = string & { readonly __brand: unique symbol };

function takeUserID(userId: UserId4) {
  return userId;
}
const plainString = "jfksajdf";
// takeUserID(plainString) // esto dara error
const userId = "xyz" as UserId4;
takeUserID(userId);

// we can brand numbers, booleans, bigints and even nulls
// fijate que la única forma de hacer que un string sea de type UserID4 es mediante casteo
// const anotherString: UserId4 = "jsdfkf";
// en Typescript string es un supertipo de cualquier literal y por ello una union como string | "blue" | "red" es lo mismo que string y el compilador reduce agresivamente esas uniones a string. Pero el intellisense no va a encontrar despues las sugerencias??
const knownColors = {
  red: "red",
  blue: "blue",
};
function getColor(
  color: keyof typeof knownColors | (string & { readonly __brand: unique symbol }),
): string {
  // function getColor(color: keyof typeof knownColors ): string {
  if (color in knownColors) {
    return knownColors[color as keyof typeof knownColors];
  }
  return color;
}
const plainColor = "red";
getColor("blue");
getColor("red");
getColor(plainColor);

const trackStatus = {
  DELIVERED: "DELIVERED",
  PENDING: "PENDING",
  DELIVERING: "DELIVERING",
} as const;

type TrackStatus = keyof typeof trackStatus | (string & { readonly _: unique symbol });

type Delivery = {
  name: string;
  age: number;
} & (Delivered | { status: Exclude<TrackStatus, Delivered["status"]> });

type Delivered = {
  status: typeof trackStatus.DELIVERED;
  adress: string;
};

const deliveryOne: Delivery = {
  status: "DELIVERED",
  adress: "ksdjflfj",
  name: "fkjafjk",
  age: 46,
};
const deliveryTwo: Delivery = {
  status: "DELIVERING",
  age: 34,
  name: "asdfkl",
};

//fijate que ayuda al intellisense pero no evita error
// type Color = "primary" | "secondary" | (string & {readonly _: unique symbol});
type Color = "primary" | "secondary" | (string & {});
const color: Color = "primary";

const callStatuses = {
  SUCESS: "SUCCESS",
  ERROR: "ERROR",
  INITIAL: "INITIAL",
} as const;

type CallStatus = keyof typeof callStatuses | (string & { readonly _: unique symbol });

type CallDomain = {
  name: string;
  age: number;
} & (SuccessCall | Exclude<CallStatus, SuccessCall["status"]>);

type SuccessCall = {
  status: typeof callStatuses.SUCESS;
  price: number;
};
