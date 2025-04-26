/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos paso a paso
 * El patrón nos permite producir distiontos tipos y representaciones de un objeto empleando el mismo código de construcción
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 *
 * ? El patrón Builder sugiere que saque el código de construcción del objeto de su propia clase y lo coloque
 * ? dentro de objetos(más bien métodos, y obviamente uno por propiedad) independientes llamados constructores
 * ? Además el constructor por convención se le pone como sufijo Builder (HouseBuilder, ContractBuilder) y habrá una última llamada a
 * ? un método llamado getResult(): Instance que devuelva esa instancia
 * ! Este patrón se debe usar cuando sea mejor ir paso a paso en la construcción de un object (por complejidad, flexibilidad,...)
 *
 * *  Los patrones creacionales ayudan a crear objetos de manera eficiente y flexible, además de que ocultan los detalles de la implementación y reducen el acoplamiento entre clases. También promueven el principio de responsabilidad única (cada uno de nuestros objetos tiene una única responsabilidad)
 * *  Factory Method, Factory Function, Abstract Factory, Builder, Prototype, Singleton, Inmutabilidad con copia
 */

// En deno hay que decirle que es un archivo de typescript usando la extensión .ts en los imports
import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu -not defined";
  public ram: string = "ram -not defined";
  public storage: string = "storage -not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Configuración de la computadora
      CPU: ${this.cpu}
      RAM: ${this.ram}
      STORAGE: ${this.storage}
      GPU: ${this.gpu}
      `);
  }
}

class ComputerBuilder {
  // ? la clase Builder necesita una instancia de la clase a encapsular su instanciación.Ojo, debe ser privada para encapsular la construcción.
  private computer: Computer;

  constructor() {
    this.computer = new Computer(); // ocultación de la instanciación
  }

  //! cada método tiene que devolver una instancia de la clase Builder,ojo (para poder encadenar los métodos)
  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }
  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  //! Y nos faltaría el método que devuelva la istancia(o sea retornar el this.computer) Esto es como un getter simplemente, al ser privada la instancia hace falta este método para acceder a ella
  build() {
    return this.computer;
  }
}
function main() {
  //ojo, el tipo del objeto debe ser la clase que encapsulamos, pero se construye con el Builder
  const basicComputer: Computer = new ComputerBuilder()
    .setCPU("Intel Core 2 Dúo")
    .setRAM("4GB")
    .setStorage("256GB")
    .build();
    // ** para pasar un color es con %c
  console.log("%cComputadora básica: ", COLORS.pink);
  basicComputer.displayConfiguration();

  const awesomeComputer: Computer = new ComputerBuilder()
    .setCPU("AMD Rizen 9")
    .setRAM("64GB")
    .setStorage("2TB SSD")
    .setGPU("Nvidia RTX 5090")
    .build();
  
    console.log("%cComputadora deseada ", 'color: orange')
    awesomeComputer.displayConfiguration();
}

main();
