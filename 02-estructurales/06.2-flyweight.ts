/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 */

import { COLORS } from "../helpers/colors.ts";

// fijate que estamos simplemente creando una Custom Collection con nuestra forma de comparar la equality (por ejemplo const personSet = new SetWithContentEquality<Person>(person => person.name)).
class SetWithContentEquality<T> {
  private items: T[] = [];
  private getKey: (item: T) => string;

  constructor(getKey: (item: T) => string){
    this.getKey = getKey;
  }
  add(item: T): void {
    const key = this.getKey(item);
    if(!this.items.some(existing => this.getKey(existing) === key)){
      this.items.push(item)
    }
  }
  has(item: T): boolean {
    return this.items.some(existing => this.getKey(existing) === this.getKey(item));
  }
  values(): T[] {
    return [...this.items]
  }
}
// 1. Clase que representa el tipo de bala - BulletType (Flyweight)
class BulletType {
  constructor(private name: string, private damage: number, private color: string) {}
  getName(): string {
    return this.name;
  }
  getDamage(): number {
    return this.damage;
  }
  getColor(): string {
    return this.color;
  }
}

// 2. Fábrica de Flyweights - BulletTypeFactory
class BulletTypeFactory {
  // private bulletTypes: Record<string, BulletType> = {};
  /*   getBulletType(name: string, damage: number, color: string) {
    const key = `${name}-${damage}-${color}`;
    
    if (!this.bulletTypes[key]) {
      console.log(`%cCreada nueva bala de tipo ${key}`, 'color: red');
      this.bulletTypes[key] = new BulletType(name, damage, color);
      }
      return this.bulletTypes[key];
      } */
  // En vez de un Record un Set tiene buena pinta tmb.Ojo, el Set hace comparación por valor, asi que dos objetos van a ser diferentes y no debería, luego no era buena idea
  private bulletTypes: Set<BulletType> = new Set<BulletType>();
  getBulletType(name: string, damage: number, color: string): BulletType {
    const key = `${name}-${damage}-${color}`;
    const bulletTypeToCheck = new BulletType(name, damage, color);
    if (!this.bulletTypes.has(bulletTypeToCheck)) {
      console.log(`%cCreada nuevo tipo de arma con balas de tipo ${key}`, "color: red");
      this.bulletTypes.add(bulletTypeToCheck);
    }
    return this.bulletTypes.values().find((bulletType) => bulletType === bulletTypeToCheck)!;
  }
}

// 3. Clase que representa una Bala - Bullet
class Bullet {
  constructor(
    private x: number,
    private y: number,
    private direction: number,
    private bulletType: BulletType,
  ) {}

  display(): void {
    const text = `
      Bala del tipo: %c"${this.bulletType.getName()}" 
      %cCoords: (${this.x}, ${this.y})
      Dirección ${this.direction}
      Daño: ${this.bulletType.getDamage()} 
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text, COLORS.green, COLORS.white);
  }
}

// 4. Sistema de Disparos - ShootingSystem
class ShootingSystem {
  private bullets: Bullet[] = [];
  private factory: BulletTypeFactory;
  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  shoot(
    x: number,
    y: number,
    direction: number,
    name: string,
    damage: number,
    color: string,
  ): void {
    const bulletType = this.factory.getBulletType(name, damage, color);
    const bullet = new Bullet(x, y, direction, bulletType);
    this.bullets.push(bullet);
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }
}

// 5. Código Cliente para probar el Flyweight

(function main() {
  const factory = new BulletTypeFactory();
  const shootingSystem = new ShootingSystem(factory);

  // Disparar varias balas de diferentes tipos
  shootingSystem.shoot(10, 20, 0, "Pistola", 10, "Gris");
  shootingSystem.shoot(15, 25, 90, "Escopeta", 20, "Rojo");
  shootingSystem.shoot(20, 30, 180, "Rifle", 15, "Verde");
  shootingSystem.shoot(10, 20, 45, "Pistola", 10, "Gris");
  shootingSystem.shoot(25, 35, 270, "Escopeta", 20, "Rojo");

  console.log(`Total de balas disparadas: %c${shootingSystem.getBulletCount()}\n`, COLORS.yellow);
})();
