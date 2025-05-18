/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que me permite mantener más objetos dentro de la cantidad disponible de RAM compartiendo las partes comunes del estado entre varios objetos.Útil cuando haya un gran número de objetos concurrentes (ojo, pueden ser de una misma clase (sistema de particulas,etc))
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

// El ejemplo de la pag de ref guru es bastante bueno, imagina un sistema de partículas en un videojuego. Realmente cada instancia de Particula no necesita tener su sprite ni su color, estos estados podrían salir a otro contexto (estado mutable o extrínseco vs estado inmutable o intrínseco)El patrón Flyweight (vuela ligero??) subiere que dejemos de almacenar el estado extrínseco (lo mutable) en cada objeto,solo almacenar el intrínseco (o inmutable) como el color o el Sprite(esa clase que almacena lo inmutable es la Flyweight??). Este patrón no tiene sentido sin un problema de memoria RAM. Siempre termina usando una class o method factory con una Collection of Flyweights??

//extrínseco
interface Location {
  display(coordinates: { x: number; y: number }): void;
}

//Flyweight
class LocationMarker implements Location {
  private type: string; // tipo del icono (hospital, parque, escuela,calle,...)
  private iconImage: string; // imagen del marcador

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type}en ${coordinates.x}, ${coordinates.y} con icono %c[${this.iconImage}]`,
      "color: green",
    );
  }
}

//fábrica de FlyWeights (la idea es que esta fábrica tenga todos los elementos en memoria una única vez)
class LocationMarkerFactory {
  // parte clave del patrón. La idea es que este Record nos permita reutilizar los marcadores, si es una escuela devolvemos el mismo marcador para cada escuela, lo mismo para un parque,etc. Recuerda que un Record es un objeto luego lo puedo inicializar con un {}
  private icons: Record<string, LocationMarker> = {};

  // dado que la prop anterior es simplemente un almaceń hay que definir métodos de acceso, borrado, añadido,etc
  getLocationMarker(type: string): LocationMarker {
    // si no existe el type creamos un nuevo Marker
    if (!this.icons[type]) {
      console.log(`%cCreando una instancia del icono ${type}`,'color: red')
      const iconImage = `imagen de ${type.toLocaleLowerCase()}.png`;
      this.icons[type] = new LocationMarker(type, iconImage);
    }
    return this.icons[type];
  }
}

// Esta clase representa un punto en el mapa simplemente
class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationMarker;

  constructor(x: number, y: number, icon: LocationMarker) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display(){
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationMarkerFactory();
  // fijate que este patrón está relacionado con el Singleton en el sentido que no vamos a crear más objetos que los necesarios. Este patrón necesitará un análisis previo para ver que podemos sacar como inmutable,etc 
  const locations = [
    new MapLocation(10,20,factory.getLocationMarker('Hospital')),
    new MapLocation(20,40,factory.getLocationMarker('Hospital')),
    new MapLocation(30,60,factory.getLocationMarker('Parque')),
    new MapLocation(25,70,factory.getLocationMarker('Hospital')),
    new MapLocation(15,75,factory.getLocationMarker('Parque')),
    new MapLocation(15,75,factory.getLocationMarker('Escuela')),
    new MapLocation(15,75,factory.getLocationMarker('Parque')),
    new MapLocation(15,75,factory.getLocationMarker('Escuela')),
    new MapLocation(15,75,factory.getLocationMarker('Parque')),
  ]
  locations.forEach(location => location.display())
}
main()