/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia, a la vez que proporciona un punto de acceso global a ella.Alfinal lo único que hace este patrón es crear una instancia la primera vez y las sucesivas devuelve esa misma instancia.Fijate que estamos devolviendo el mismo objeto en memoria
 *
 * * Es útil cuando necesitas controlar el acceso a algún recurso compartido (bases de datos u objetos de configuración).
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  // !La clase debe tener una propiedad del tipo de ella  privada tmb, igual que el constructor
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance() {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log('%cLas bolas de dragón han sido creadas!', 'color: green')
    }
    return DragonBalls.instance;
  }
  collecBall(): void {
    if(this.ballsCollected < 7){
      this.ballsCollected++;
      return console.log(`Bola de dragón recolectada. Total de esferas: ${this.ballsCollected}`)
    }
    console.log('Ya se han recolectado las 7 bolas de dragón! Invoca a Shenlong')
  }
  summonShenlong(){
    if(this.ballsCollected === 7){
      console.log('Shenlong ha sido invocado. Pide tu deseo');
      this.ballsCollected = 0;
      return;
    }
    console.log(`Aún faltan ${7 - this.ballsCollected} bolas de dragón por recolectar`)
  }
}
function main(){
  // ? Fijate que este patrón tmb dictamina como se crearán las instancias de esa clase
  const goku = DragonBalls.getInstance();
  goku.collecBall();
  goku.collecBall();
  goku.collecBall();

  goku.summonShenlong();
  const vegeta = DragonBalls.getInstance();
  vegeta.collecBall();
  vegeta.collecBall();
  vegeta.collecBall();
  vegeta.collecBall();
  goku.summonShenlong();
  vegeta.summonShenlong();

}
main()


