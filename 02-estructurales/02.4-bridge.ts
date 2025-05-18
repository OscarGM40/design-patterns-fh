/* Bridge pattern is an structural pattern in where one abstraction and its implementation are decoupled so they can vary independently.It has a connecting point between them.Instead of having a class that implements a functionality, we try to separate it into two pieces(the first part is the abstraction and the second part is the implementation. Este naming me parece una mierda) This is one more pattern that avoids using inheritance (ya que va a usar composición)
El UML es una abstraction que tiene una implementación (la composicion) y cada una de estos dos lados del puente tiene n concrecciones. Ojo, la abstracción es una clase abstracta, la implementación es una clase normal, y puede tener una interfaz en común, debería
*/
//interface que tipa la implementación
interface TeamArranger {
  arrangeBattingOrder(keyPlayer: string, players: string[]): string[];
}
// ConcreteImplementations
class FirstClassTeamArranger implements TeamArranger {
  arrangeBattingOrder(keyPlayer: string, players: string[]): string[] {
    // we put keyPlayer at last
    return players.filter((player) => player !== keyPlayer).concat(keyPlayer);
  }
}
class InternationalTeamArranger implements TeamArranger {
  arrangeBattingOrder(keyPlayer: string, players: string[]): string[] {
    const arr = players.filter((player) => player !== keyPlayer);
    arr.unshift(keyPlayer);
    return arr;
  }
}

//astraccion de la que se sacó el connecting point
abstract class CricketTeam {
  constructor(protected players: string[], protected teamArranger: TeamArranger) {}

  abstract arrangeBattingOrder(keyPlayer: string): void;

  getPlayers(): string[] {
    return this.players;
  }
}
// RefinedAbstractions
class DomesticCricketTeam extends CricketTeam {
  override arrangeBattingOrder(keyPlayer: string): void {
    this.players = this.teamArranger.arrangeBattingOrder(keyPlayer, this.getPlayers());
  }
}

class InternationalCricketTeam extends CricketTeam {
  override arrangeBattingOrder(keyPlayer: string): void {
    this.players = this.teamArranger.arrangeBattingOrder(keyPlayer, this.getPlayers());
  }
}

type ArrangeBattingOrder = ReturnType<typeof CricketTeam.prototype.arrangeBattingOrder>;
const players = ['asinto', 'lucia', 'agapito', 'hulio', 'macmanaman']
const keyPlayer = 'bernardo caracardo';
const domesticTeam = new DomesticCricketTeam(players, new FirstClassTeamArranger());

domesticTeam.arrangeBattingOrder(keyPlayer);
console.log(domesticTeam.getPlayers());

const internationalTeam = new InternationalCricketTeam(players, new InternationalTeamArranger());
internationalTeam.arrangeBattingOrder(keyPlayer);
console.log(internationalTeam.getPlayers());

// como beneficios que ofrece este patrón estaría Separation of Concerns( éste es muy obvio, ya que hemos sacado un parte importante de lógica de una clase a otra nueva), flexibilidad, escalabilidad de ambas entidades, maintainability y se puede cambiar en runtime la implementación (esto fijate que será crucial en algunas situaciones)
// como drawbacks introduce complejidad al introducir multiple layers of abstraction