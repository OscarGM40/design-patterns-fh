/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.Fijate el ejemplo de refactoring con el simulador de muebles, como la familia de objetos sería la variante moderna, o clásica o victoriana, etc que entrega un conjunto de muebles del mismo estilo(familia)
 * El ejemplo con objetos de forma piramidal o abstracta tmb es bueno
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí. O sea, es útil cuando entre las familias haya alguna relación de lógica de negocio
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

// Queremos crear dos restaurante, uno fast-food y otro con comida saludable.
interface Hamburger {
  prepare(): void;
}
interface Drink {
  pour(): void; // pour es vertir dentro de un vaso(o sea servir)
}

class ChickenHamburger implements Hamburger {
  prepare() {
    console.log("Preparando hamburguesa de %cpollo", COLORS.yellow);
  }
}

class BeefBurger implements Hamburger {
  prepare() {
    console.log("Preparando una hamburguesa de %cternera", COLORS.green);
  }
}

class Water implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de %cagua", COLORS.blue);
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de %csoda", COLORS.pink);
  }
}

// Contrato para las Factories
interface RestaurantFactory {
  createHamgurger(): Hamburger;
  createDrink(): Drink;
}
// Concrete Factories (fijate que están opinionadas a la familia)
class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamgurger(): Hamburger {
    return new BeefBurger();
  }
  createDrink(): Drink {
    return new Soda();
  }
}
class HealthyRestaurantFactory implements RestaurantFactory {
  createHamgurger(): Hamburger {
    return new ChickenHamburger();
  }
  createDrink(): Drink {
    return new Water();
  }
}

// asumamos que queremos determinar en tiempo de ejecución la familia/factory, luego se recibirá por parámetro
function main(factory: RestaurantFactory){
  const hamburger = factory.createHamgurger();
  const drink = factory.createDrink();
  hamburger.prepare();
  drink.pour();
}
console.log('\n%cPedido del menu de fast-food',COLORS.green)
main(new FastFoodRestaurantFactory()); // este sería el cliente
console.log('\n%cPedido del menu saludable',COLORS.red)
main(new HealthyRestaurantFactory()); // otro cliente, fijate que los objects siempre estarán relacionados por algun concepto en este patrón 
