/**
 * ! Patrón Builder with Director
 * * En el patrón Builder se puede derivar la llamada a algunos pasos del constructor y ponerlos en una clase independiente llamada directora. La clase directora define el orden en el que se deben ejecutar los pasos de construcción, mientras que el constructor proporciona la implementación de dichos pasos (la interface Builder)
 * ? Fijate que realmente no es necesario tener una clase directora, ya que puedo invocar los pasos de la construcción de las propiedades en un orden especifica, sin embargo, si hubiera distintas rutinas de construcción si que es necesario una clase Directora para poder reutilizarlas y centralizar esa lógica. Además la clase directora esconde por completo los detalles de la construcción
 */

// Fijate que Castle es el producto, siempre hay un producto ?
class Castle {
  constructor(
    private region: string,
    private walls: number,
    private towers: number,
    private dungeons: number,
  ) {}

  displayCastleInfo() {
    console.log(
      `%cThis castle is in the region of ${this.region}, it has ${this.walls} walls, ${this.towers} towers and ${this.dungeons} dungeons.`,
      "color: orange",
    );
  }
}

// Builder (interface)
interface PlanoDeCastillo {
  region: string;
  walls: number;
  towers: number;
  dungeons: number;

  setRegion(region: string): PlanoDeCastillo;
  setWalls(walls: number): PlanoDeCastillo;
  setTowers(towers: number): PlanoDeCastillo;
  setDungeons(dungeons: number): PlanoDeCastillo;
  build(): Castle; //! dado que será una propiedad privada necesito un getter para devolver el Product
}

class Artesano implements PlanoDeCastillo {
  region: string;
  walls: number;
  towers: number;
  dungeons: number;

  constructor() {
    this.region = "";
    this.walls = 0;
    this.towers = 0;
    this.dungeons = 0;
  }

  setRegion(region: string): PlanoDeCastillo {
    this.region = region;
    return this;
  }
  setWalls(walls: number): PlanoDeCastillo {
    this.walls = walls;
    return this;
  }
  setTowers(towers: number): PlanoDeCastillo {
    this.towers = towers;
    return this;
  }
  setDungeons(dungeons: number): PlanoDeCastillo {
    this.dungeons = dungeons;
    return this;
  }

  build(): Castle {
    return new Castle(this.region, this.walls, this.towers, this.dungeons);
  }

  reset() {
    this.region = "";
    this.walls = 0;
    this.towers = 0;
    this.dungeons = 0;
    return this;
  }
}

//1 - En este punto hay dos formas de usar el patŕon Builder, la primera es a través del Builder concreto (la clase que implementa la interfaz)
const artesano = new Artesano();
const castilloDelNorte = artesano
  .setRegion("norte")
  .setWalls(8)
  .setTowers(4)
  .setDungeons(1)
  .build();
castilloDelNorte.displayCastleInfo();
//fijate como hay que llamar al método reset antes de cada nueva construcción
const castilloDelSur = artesano.reset().setRegion("sur").build();
castilloDelSur.displayCastleInfo();

//2- Mediante un director (La interface Director recibe una instancia del Builder)
class Rey {
  private artesano: Artesano;

  constructor(artesano: Artesano) {
    this.artesano = artesano;
  }

  // en esta abstracción implementaremos toda la lógica compleja
  crearSuperCastillo(region: string, walls: number, towers: number, dungeons: number) {
    // como validaciones o transformaciones
    if (walls > 10) {
      this.artesano.setRegion(region).setWalls(walls).setTowers(towers).setDungeons(dungeons);
    } else  {
      console.log('no se puede construir un super castillo con menos de 10 muros')
    }
  }
  // esta interface Director tmb debe implementar un metodo construct():
}

const rey = new Rey(artesano);
rey.crearSuperCastillo('Central',15,10,5)
const superCastillo = artesano.build();
superCastillo.displayCastleInfo();