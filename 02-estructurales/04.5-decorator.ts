// https://www.youtube.com/watch?v=GCraGHx6gso&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=4
interface Character {
  getDesc(): string;
  getStats(): { attack: number; defense: number };
}
// we always need  a class to decorate, an abstract class Decorator and each decorator impl, the class and the abstract class both inherit from a common higher interface, the impls of Decorator will be interchangeables since they extend the abstract Decorator class
class BasicCharacter implements Character {
  getDesc(): string {
    return "Basic character";
  }
  getStats() {
    return {
      attack: 10,
      defense: 10,
    };
  }
}

//! Esto es clave, el Decorador no solo es un Component sino que tiene un Component.Fijate que este patrón debería implementarlo cuando los cambios son de comportamiento, más que de valores en una propiedad 
abstract class CharacterDecorator implements Character {
  constructor(protected character: BasicCharacter){}
  getDesc(): string {
    return this.character.getDesc();
  }
  getStats(): { attack: number; defense: number; } {
    return this.character.getStats()
  }
}

class HelmetDecorator extends CharacterDecorator {
  override getDesc(){
    return `${this.character.getDesc()} y casco`;
  }
  override getStats(): { attack: number; defense: number; } {
    return {
      attack: this.character.getStats().attack,
      defense: this.character.getStats().defense + 5
    }
  }
}
class SwordDecorator extends CharacterDecorator {
  override getDesc(){
    return `${this.character.getDesc()} y espada`;
  }
  override getStats(): { attack: number; defense: number; } {
    return {
      attack: this.character.getStats().attack + 10,
      defense: this.character.getStats().defense
    }
  }
}
class RingDecorator extends CharacterDecorator {
  override getDesc(){
    return `${this.character.getDesc()} y anillo`;
  }
  override getStats(): { attack: number; defense: number; } {
    return {
      attack: this.character.getStats().attack + 5,
      defense: this.character.getStats().defense + 5
    }
  }
}
/* const basicCharacter = new BasicCharacter();
const helmetDecorator = new HelmetDecorator(basicCharacter)
const swordDecorator = new SwordDecorator(helmetDecorator);
const ringDecorator = new RingDecorator(swordDecorator);
console.log(ringDecorator.getStats())
console.log(ringDecorator.getDesc()) */
// si son intercambiables úsalo, asinto
let basicCharacter = new BasicCharacter();
basicCharacter = new HelmetDecorator(basicCharacter)
basicCharacter = new SwordDecorator(basicCharacter);
basicCharacter = new RingDecorator(basicCharacter);
console.log(basicCharacter.getStats())
console.log(basicCharacter.getDesc())

// Fijate en el ejemplo del video como con muchas mas clases (que decorarían un café (con Vainilla, con Leche, corto, con Caramelo, Expresso, )) se ve mucho mejor que se acepta cualquier combinación( caramelo y leche, caramelo, caramelo y leche y corto...)
// Fijate tmb como hay recursión desde el Decorador externo hasta la primera instancia, que es el objeto base y el que la pararía (obviamente hay recursión en este patrón, interesante)