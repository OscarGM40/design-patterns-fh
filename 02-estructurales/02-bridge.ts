/**
 * ! Patrón Bridge
 ** Este patrón estructural me permite desacoplar una abstracción de su implementación, de tal forma que ambas puedan variar independientemente(Este problema suele darse porque intentamos extender las clases/implementaciones en varias dimensiones, por ejemplo, forma y color). El patrón bridge intenta resolver este problema pasando de la herencia a la composición. Esto quiere decir que se extrae una de las dimensiones a una jerarquía de clases separada. Esta propiedad de clase B en la clase A actuará como PUENTE (y fijate que tengo que tener un problema con clases con multiples dimensiones en cuanto a su lógica, para que tenga sentido sacar una de ellas)
 *! Cuando el patrón especifica que se puede desacoplar una abstracción de su implementación no se refiere a una interfaz y una clase, la abstracción puede ser una GUI y la implementación el codigo del sistema operativo subyacente
 ** Este patrón me permite dividir una clase en varias jerarquias de clase (la abstracción y la implementación).Fijate que incluso puedo sacar varias jerarquías y no una solo(una por cada dimensión o jerarquía, obviamente). Todas estas jerarquias pueden variar independientemente e incluso cambiarse en runtime. Esto es otro motivo para implementarlo.
 *? Para usarlo lo primero es identificar las dimesiones ortogonales(en programación ortogonal=independiente) de mi clase, por ejemplo los pares abstracción/plataforma, dominio/infraestructura frontend/backend o interfaz/implementación.
 Este patrón cumple/fomenta con el SRP y con el Open/Closed (era obvio esto)
 *! La composición siempre implica delegación, asi pues este patrón delega parte de funcionalidad a la referencia de cada dimensión ortogonal
 En el patrón Builder con director la clase Directora hace de asbtracción mientras que las constructoras hacen de implementaciones
 * Realizar cambios en una base de código monolítica es bastante dificil. Es mucho más sencillo realizar cambios en módulos más pequeños y bien definidos (SRP)
 *
 * * Es útil cuando se tienen múltiples implementaciones de una asbtracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
  use(): void;
}
// Implementaciones
class SwordAttack implements Ability {
  use(): void {
    console.log("Ataca con una %cespada ferozmente", COLORS.blue);
  }
}
class MagicSpell implements Ability {
  use(): void {
    console.log("Lanza un hechizo %cmágico poderoso", COLORS.green);
  }
}
class FireballSpell implements Ability {
  use(): void {
    console.log("Lanza una %cbola de fuego poderosa", COLORS.red);
  }
}

class DualDaggersAttack implements Ability {
  use(): void {
    console.log("Ataca con ambas %cdagas rápidamente", COLORS.orange);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("Ataca con un %chacha cruelmente", COLORS.red);
  }
}
// Esta sería la abstracción, fijate que la composición se ha dado en la abstracción
// Fijate tmb que el Character está evolucionando de manera independiente a la habilidad (incluso puede cambiarla)
abstract class Character {
  protected ability: Ability; // nunca usar public ni private(con private no la ven las subclases), tiene que ser protected. Este es el bridge
  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }
  // vamos a delegar a las clases que creen un Character que habilidad use
  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("El guerrero está listo para luchar");
    this.ability.use(); // fijate que tenemos acceso al otro grupo de clases ya por la composición que llegó al hijo
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log("El mago está listo para el hechizo");
    this.ability.use();
  }
}
class Rogue extends Character {
  override performAbility(): void {
    console.log("El pícaro está listo para atacar");
    this.ability.use();
  }
}

//! Fijate que al usar este patrón puedo escalar Character y Ability de forma independientemente, pero podia haber creado solo Character y definir las habilidades en esa clase. Obviamente Ability habría sido candidata a salir fuera como clase 
function main(){
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();
  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();
  // se puede observar perfectamente como Character y Ability van por caminos distintos, y como la clase main tiene por composición una referencia a la clase que sacamos
  mage.setAbility(new FireballSpell())
  mage.performAbility();
}
main();