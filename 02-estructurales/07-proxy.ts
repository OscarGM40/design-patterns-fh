/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.Este patrón permite realizar acciones antes y después de interactuar con ese objeto (cualquier middleware implementa este patrón)Resumiendo no es más que un objecto que se encarga de controlar el acceso a un recurso
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
  constructor(public name: string, public level: number){}
}

// segun el tipo de Player tendrá acceso a la Room o no
interface Room  {
  enter(player: Player): void;
}

// este objeto es al que se le va a hacer proxy
class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta, ${player.name}`, 'color: blue')
    console.log('Un gran enemigo te espera')
  }
}

// Clase Proxy - MagicPortal
class MagicPortal implements Room {
  // fijate en la delegación al objeto( y a la abstracción para poder usar Liskov), pero condicional (cualquier post-action me valdría tmb)
  private secretRoom: Room;
  constructor(room:Room){
    this.secretRoom = room;
  }
  enter(player: Player): void {
    console.log('Intentando entrar al portal...')
    if(player.level >= 10){
     return this.secretRoom.enter(player)
    }
    console.log(`%c Lo siento mucho ${player.name}, tu nivel ${player.level} es muy bajo (level 10 needed)`)
  }
}

(function main(){
  const lowLevelPlayer = new Player('Initial Rogue', 5);
  const midLevelPlayer = new Player('Advanced Wizard',25);

  const secretRoom = new SecretRoom();
  const portal = new MagicPortal(secretRoom);
  portal.enter(lowLevelPlayer)
  portal.enter(midLevelPlayer)
})()