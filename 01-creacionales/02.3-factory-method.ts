// Este patrón es un patrón creacional que nos permite abstraer la complejidad de instanciar objetos que pertenecen a la misma familia(las subclases + la superclase es la familia)
// Fijate que abstract factory hace lo mismo pero con N familias de objetos (interesante, envidias toxic)

interface Entity {
  updateLogic(): void;
}

class Boo implements Entity {
  updateLogic(): void {
    console.log("%cI am a boo", "color: red");
  }
}
class Koopa implements Entity {
  updateLogic(): void {
    console.log("%cI am a Koopa", "color: orange");
  }
}
class Goomba implements Entity {
  updateLogic(): void {
    console.log("%cI am a Goomba", "color: pink");
  }
}

// Factory method
abstract class EnemyFactory {
  protected abstract createEnemy(): Entity;
  generateEnemy() {
    const enemy = this.createEnemy();
    enemy.updateLogic();
  }
}
//Concrete Creators
class BooFactory extends EnemyFactory {
  createEnemy(): Entity {
    return new Boo();
  }
}
class KoopaFactory extends EnemyFactory {
  createEnemy(): Entity {
    return new Koopa();
  }
}
class GoombaFactory extends EnemyFactory {
  createEnemy(): Entity {
    return new Goomba();
  }
}
class RandomEnemiesFactory extends EnemyFactory {
  createEnemy(): Entity {
    const generator = Math.floor(Math.random() * 10) + 1;
    console.log({ generator });
    switch (true) {
      case generator < 3:
        return new Boo();
      case generator < 6:
        return new Koopa();
      case generator < 9:
        return new Goomba();
      default:
        return new Goomba();
    }
  }
}

function main() {
  let factory: EnemyFactory;
  const chooseFactory = prompt("Elige el tipo de enemigos (boo | koopa | goomba | random)");
  switch (chooseFactory) {
    case "boo":
      factory = new BooFactory();
      break;
    case "koopa":
      factory = new KoopaFactory();
      break;
    case "goomba":
      factory = new GoombaFactory();
      break;
    case "random":
      factory = new RandomEnemiesFactory();
      break;
    default:
      console.log("opción no válida");
      return;
  }
  factory.generateEnemy();
}
main();
