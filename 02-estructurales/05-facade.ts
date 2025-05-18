/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada/centralizada para un conjunto de interfaces en un subsistema (subsistema pues estamos en un sistema ya,ojo, es correcto el name) (por ejemplo una biblioteca, un framework o cualquier otro grupo complejo de clases).Es decir el patrón Facade define una interfaz de más alto nivel que hace que el subsistema sea más fácil de usar.Normalmente suele ofrecer funcionalidad limitada, ya que nos traemos solo las partes core de ese subsistema, pero ganamos en sencillez
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender y asi poder proporcionar una interfaz simplificada para el cliente
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }
  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }
  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("VideoPlayer encendido");
  }
  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, "color: orange");
  }
  stop() {
    console.log("Pelicula detenida");
  }
  off() {
    console.log("VideoPlayer apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas");
  }
  stopPoppingPopcorn() {
    console.log("Deteniendo las palomitas");
  }
}
interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}
// En este punto tenemos un subsistema de clases con varias funcionalidades. Para agregar Facade tendría que crear una interfaz de más alto nivel que solamente tenga las funcionalidades core de ese subsistema.El ejemplo es self-explanatory. Fijate que esta interfaz recibirá por composición las dependencias necesarias e implementará sus métodos propios con ayuda de estas delegaciones. Gran ejemplo
class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({ projector, soundSystem, videoPlayer, popcornMaker }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }
  // la idea es tener una interfaz simplificada, luego tiene sentido que esté encapsulado todo aqui y sea transparente toda la delegación al llamar a la interfaz
  watchMovie(movie: string) {
    console.log(`%cPreparando subsistema para ver la película`, "color: red");
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    console.log(`%cTodo preparado. Disfrute de la película`, "color: orange");
    this.videoPlayer.play(movie);
    console.log("")
  }
  
  endWatchingMovie() {
    console.log(`%cPreparando para detener la película`, "color: lime");
    this.popcornMaker.stopPoppingPopcorn();
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    console.log(`%cSistema apagado`, "color: lime");
  }
}

(function main() {
  const homeTheaterFacade = new HomeTheaterFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popcornMaker: new PopcornMaker(),
  });
  homeTheaterFacade.watchMovie("Los avengers que no avengan nada");
  homeTheaterFacade.endWatchingMovie();
})();
