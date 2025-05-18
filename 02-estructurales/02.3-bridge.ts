/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz para las 'implementaciones'
interface NotificationChannel {
  send(message: string): void;
}
// 2. Implementaciones de Canales de Comunicación,a referenciar en la abstracción
class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}
class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification que usará composición
abstract class Notification {
  constructor(protected channels: NotificationChannel[]) {}

  abstract notify(message: string): void;
  abstract addChannel(channel: NotificationChannel): void;
  //aqui podriamos seguir con el CRUD, eliminando un canal, etc
}

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log("\n%cNotificación de Alerta:", COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }
  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

function main(){
  // esto puede ser algo más real, mandar las notificaciones a todos los medios que configure el usuario. Podríamos seleccionar tmb de manera dinámica porque mecanismos de comunicación enviar las notificaciones, pero esto es el patrón strategy (ojo, bridge es estructural, strategy es de comportamiento)
  const channels = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new SMSChannel(),
    new EmailChannel(),
  ];
  const alert = new AlertNotification(channels);
  alert.notify('Alguien en frente de la casa');
  console.log('\n')
}
main()