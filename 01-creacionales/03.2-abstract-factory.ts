/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 * !Instrucciones:
 	1.Completen las Clases de Productos:
    •	ElectricCar debe implementar Vehicle y mostrar el mensaje "Ensamblando un auto eléctrico".
    •	GasCar debe implementar Vehicle y mostrar el mensaje "Ensamblando un auto de combustión".
    •	ElectricEngine debe implementar Engine y mostrar el mensaje "Arrancando motor eléctrico".
    •	GasEngine debe implementar Engine y mostrar el mensaje "Arrancando motor de combustión".

	2.	Completen las Clases de Fábricas:
    •	ElectricVehicleFactory debe crear un ElectricCar y un ElectricEngine.
    •	GasVehicleFactory debe crear un GasCar y un GasEngine.

	3. Prueben el Código:
	  •	Ejecuten el código para asegurarse de que cada fábrica produce el tipo correcto de vehículo y motor.

 */
// 1. Interfaces de Vehicle y Engine Fijate que deberá haber tantas como variantes de las familias, igual que las factorias concretas, etc
interface Vehicle {
  assemble(): void;
}
interface Engine {
  start(): void;
}
// 2. Clases Concretas de Productos
class ElectricCar implements Vehicle {
  assemble() {
    console.log("Ensamblando un auto %celéctrico", "color: red");
  }
}
class GasCar implements Vehicle {
  assemble() {
    console.log("Ensamblando un auto de %ccombustión", "color: green");
  }
}
class ElectricEngine implements Engine {
  start() {
    console.log("Arrancando motor %celéctrico", "color: red");
  }
}
class GasEngine implements Engine {
  start() {
    console.log("Arrancando motor de %ccombustión", "color: green");
  }
}

// Factory interface model
interface CarFactory {
  createCar(): Vehicle;
  createEngine(): Engine;
}

class ElectricCarFactory implements CarFactory {
  createCar(): Vehicle {
    return new ElectricCar();
  }
  createEngine(): Engine {
    return new ElectricEngine();
  }
}
class GasCarFactory implements CarFactory {
  createCar(): Vehicle {
    return new GasCar();
  }
  createEngine(): Engine {
    return new GasEngine();
  }
}

function main(carFactory: CarFactory) {
  const car = carFactory.createCar();
  const engine = carFactory.createEngine();
  car.assemble();
  engine.start();
}

console.log('Creando vehiculo eléctrico')
main(new ElectricCarFactory());
console.log('Creando vehiculo de combustión')
main(new GasCarFactory());
