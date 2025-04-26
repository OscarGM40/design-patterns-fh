/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 * El patrón Factory Methos sugiere que en lugar de llamar al operador new para construir objetos directamente, se invoque a un método fábrica especial
 * Obviamente los objetos se seguirán creando mediante el operador new, pero se crearań desde ese método fábrica. Estos objetos a menudo se denominan productos
 * Ejemplo interface Logistics con un método createTransport (éste es el método fábrica). Las subclases que implementan esta interface cuando lo llamen retornará por ejemplo un Camión o un Barco
 * https://refactoring.guru/es/design-patterns/factory-method
 * El patrón siempre encapsula la lógica de fabricación. El polimorfismo es necesario siempre entiendo
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %cpollo", "color: yellow");
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %cternera", COLORS.brown);
  }
}

class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %cbean", "color: pink");
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  // El override es opcional en este momento en TS al pisar un modificador con la keyword 'abstract'. Ojo, si no es abstract cambia el comportamiento, solo se asegurará que en la superclase exista lo que queremos pisar(override keyword will assert that the function it describes is present in the parent class)Tira un error si no existe
  // Es buena practica para que me lanze el error por ello
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}
class BeanRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeanHamburger();
  }
}
// es a partir de aqui cuando viene la utilización del patrón(que será consumiendo la clase Restaurant) Osea este es el factory method
function main() {
  let restaurant: Restaurant; // let porque será determinado en tiempo de ejecución
  const burguerType = prompt("¿Qué tipo de hamburguesa quieres? (chicken | beef | bean)");

  switch (burguerType) {
    case "chicken":
      restaurant = new ChickenRestaurant();
      break;
    case "beef":
      restaurant = new BeefRestaurant();
      break;
    case "bean":
      restaurant = new BeanRestaurant();
      break;
    default:
      console.log("Opción no válida");
      return;
  }

  restaurant.orderHamburger();
}
main();

// Puedo observar como es super sencillo extender este código