/**
 * Dado que es el cliente en tiempo de ejecución el que determine que objeto se va a crear debe haber un lugar donde resida esa lógica (la factory).
 *
 *  */
import { COLORS } from "../helpers/colors.ts";

// 1 -Crear el contrato que defina las reglas de los product
interface Forma {
  dibujar(): void;
}
// 2 Concrete Products
class Circulo implements Forma {
  dibujar(): void {
    console.log("%cDibujando un circulo", "color: red");
  }
}

class Cuadrado implements Forma {
  dibujar(): void {
    console.log("%cDibujando un cuadrado", COLORS.green);
  }
}

class Triangulo implements Forma {
  dibujar(): void {
    console.log("%cDibujando un triangulo", COLORS.green);
  }
}
// 3 Factory method | class
class FormaFactory {
  public obtenerForma(forma: string) {
    if (forma === "triangulo") {
      return new Triangulo();
    }
    if (forma === "cuadrado") {
      return new Cuadrado();
    }
    if (forma === "circulo") {
      return new Circulo();
    }
    throw Error('Forma no soportada')
  }
}
// Desde el cliente se llama a la factory
const factory = new FormaFactory()
const forma = factory.obtenerForma('circulo')
const formaDos = factory.obtenerForma('cuadrado')

// por polimorfismo podemos llamar al método de la superclase
forma.dibujar();
forma.dibujar();
// Para implementar un patrón lo primero es preguntarme si realmente es necesario, y lo segundo cual es el problema que estoy intentando resolver: creacional? comportamiento? estructura?
// Fijate que los concrete creators no son necesarios, pero si el contrato y las subclases a instanciar + el factory method(supongo que ni siquiera es necesaria la clase factory, solo el method)
// A function is a factory function when it returns a new object without the use of the new keyword!!
const createUser = ({firstName, lastName, email}:{firstName: string, lastName: string, email: string}) => {
  return {
    firstName,
    lastName,
    email
  }
}// esto es un factoryMethod, ya que creará un object