/**
 * ! Patrón decorador/wrapper (tmb se llama wrapper)
 Es un patrón estructural que permite añadir funcionalidades a objetos, colocando estos objetos dentro de objetos encapsuladores especiales que contienen esa funcionalidad.Dado que se hace en el cliente on demand se puede añadir esa funcionalidad de manera dinámica, condicional,etc...
 Diria que la idea de este patrón es que en tiempo de ejecución pueda alterar la funcionalidad de un objeto (que por naturaleza es estático esto),fijate que cada decorador extiende su funcionalidad encima de la que ya existia(esto tiene que ser así siempre??)
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 * Drawbacks of inheritance:
 * La herencia es estática.NO se puede alterar la funcionalidad de un objeto existente durante el tiempo de ejecución (fijate que además es más dificil de trackear que que superclase viene X funcionalidad, mientras que con la composición queda muy claro donde se delegó/recibió esta funcionalidad)
 * Las subclases solo pueden tener una clase padre(esto es según el lenguaje realmente, pero en mucho no existe herencia múltiple)
 * Una de las formas de superar estas limitaciones es usar la Agregacion o Composicion.Ambas estrategias llevan a lo mismo, solo que con que la herencia es el mismo objeto el que puede hacer todo(al heredarlo) mientras que con la Composición hay Delegación de cierta funcionalidad a ese otro objeto. Con la Composicion puedo sustituir fácilmente ese objeto helper o delegado, incluso en runtime.Un objeto puede utilizar el comportamiento de varias clases con referencias a varios objetos, delegandoles todo tipo de tareas (Composición múltiple?).La Agregación/Composicion es el principio clave que se esconde tras muchos patrones de diseño, como ya hemos visto(Bridge,Composite...) incluyendo el Decorator
 *
 *? Este objeto wrapper contiene el mismo grupo de métodos que el objeto main(luego implementarań la misma interfaz) y le delega todo a éste, menos alguna tarea propia de ese wrapper. El wrapper tiene una referencia a esa interfaz padre??
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 * 
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

//interface común a los wrappers/decoradores y la clase a decorar
interface Notification {
  send(message: string): void;
}
//objeto a decorar
class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`Enviando notificación básica: %c${message}`, 'color: white');
  }
}

// superclase para los decoradores, como necesita composición y no queremos instanciarla tiene que ser una abstract class
abstract class NotificationDecorator implements Notification {
  constructor(protected notification: Notification) {} //ojo, la composicion es contra la interfaz, para que los subtipos de esta clase sean interchangeables(pues tmb serán Notification, porque esta clase es subclase de Notification)
  send(message: string): void {
    this.notification.send(message); // delegación del wrapper hacia el objeto a decorar??
  }
}

// decoradores/wrappers
class EmailDecorator extends NotificationDecorator {
  override send(message: string): void {
    super.send(message);// al loro con esta instrucción, ya que vamos a terminar llamando a la funcionalidad del objeto key y del decorador(ambas)
    this.sendEmail(message)
  }
  private sendEmail(message: string){
    console.log(`%cEnviando notificación por correo electrónico: %c${message}`, 'color: green', 'color: lime')
  }
}

class SMSDecorator extends NotificationDecorator {
  override send(message: string): void {
    super.send(message);// de nuevo fijate que la idea de los decoradores es que añadamos funcionalidad a un comportamiento existente(no sustituirla?)
    this.sendSMS(message)
  }
  private sendSMS(message: string){
    console.log(`%cEnviando notificación por SMS: %c${message}`, 'color: orange','color: red')// puedo colorear varios substrings
  }
}
// use
function main(){
  //ojo, la variable tiene que ser del tipo de la interfaz padre de todos, para poder usar Liskov en todos lados
  //fijate en el chain de calls a super(), es super importante esto
  let notification: Notification = new BasicNotification();
  notification = new EmailDecorator(notification);
  notification = new SMSDecorator(notification);
  notification.send('Tu casa está ardiendo'); // ojo, fijate que cada send tiene una llamada al padre y a si mismo, SMSDecorator llamará al send de EmailDecorator que llama a su send y al send de NotificationDecorator que mediante composición llama al send de la clase main a decorar
  // investigar esto en el otro video a ver si hay una forma de no llamar a todos.No parece que este approach se vaya a usar en la vida real
}
main();
