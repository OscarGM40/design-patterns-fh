// Recuerda que el patrón estructural Bridge me va a permitir realizar cualquier tipo de combinación entre una abstracción y una implementación (siendo la abstracción una clase y la implementación una dimensión ortogonal de la misma)
// Este patrón viene de un problema de violación del Interface Segregation Principle? 
// the cartesian product is a new Set of all combinations of two sets
// the key difference with Strategy is that in Bridge the separation of abstraction and implementation is the core feature, whereas in Strategy is not
interface NotificationChannel {
  send(message: string): void;
}

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`%cEnviando notificación mediante email: ${message}`, "color: orange");
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`%cEnviando notificación mediante SMS ${message}`, "color: lime");
  }
}

// si saco una abstract class solo tengo que definir la composición en esta superclase.Fijate que muchas veces será una clase compleja, con algunos métodos que quiera forzar a sobreescribir y otros propios
abstract class Notification {
  constructor(protected channels: NotificationChannel[]) {}
  abstract notify(message: string): void;
  abstract addChannel(channel: NotificationChannel): void;
}

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log("%cSending alert message", "color: red");
    this.channels.forEach(c => c.send(message)); // es la instancia de super
  }
  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

class WarningNotification extends Notification {
  override notify(message: string): void {
    console.log("%cSending warning message", "color: orange");
    this.channels.forEach(c => c.send(message)); // es la instancia de super
  }
  override addChannel(channel: NotificationChannel) {
    this.channels.push(channel);
  }
}

class InfoNotification extends Notification {
  override notify(message: string): void {
    console.log("%cSending info message", "color: lime");
    this.channels.forEach(c => c.send(message)); // es la instancia de super
  }
  override addChannel(channel: NotificationChannel) {
    this.channels.push(channel);
  }
}

(async function main() {
  const emailNotification = new EmailChannel();
  const smsNotification = new SMSChannel();

  const alertNotification = new AlertNotification([emailNotification, emailNotification, smsNotification]);
  // alertNotification.notify("this is an alert message");
  alertNotification.addChannel(smsNotification);
  alertNotification.notify("another alert message");
})();
type MainType = Awaited<ReturnType<typeof InfoNotification.prototype.addChannel>>;
// Fijate que el bridge en principio partiría de un producto cartesiando entre las dimensiones ortogonales de esa clase ([SMS,alert],[SMS,warning],[SMS,info], [EMAIL,alert],[EMAIL,warning],...) siendo el resultado n*m

// esto podría ser cualquier tipo de recurso a mostrar en algun tipo de View
interface Resource {
  getSnippet(): void;
  image:string;
  title: string;
  url: string;
}
// aqui cada concrección tiene la delegación de como traer el snippet,etc 
class ArtistResource implements Resource {
  constructor(public image: string, public title: string, public url: string){}
  getSnippet(): void {
    console.log('getting the snippet through fetch API')
  }
}

class BookResource implements Resource {
  constructor(public image: string, public title: string, public url: string){}
  getSnippet(): void {
    console.log('getting the snippet through fetch API')
  }
}
abstract class View {
  constructor(protected resource: Resource){}
  abstract showView(): string;
}

class LongFormView extends View {
  override showView(){
    // esto podria ser el html o JSX
    return 'long form view'
  }
}
class ShortFormView extends View {
  override showView(){
    // esto podria ser el html o JSX
    return 'short form view'
  }
}
