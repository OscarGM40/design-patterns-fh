// https://www.youtube.com/watch?v=6FfqopVI9bo
// Decorator pattern: este patrón permite extender funcionalidad a una entidad (objeto,clase) en caliente mediante objetos wrappers especiales que contienen esa funcionalidad (fijate que por naturaleza un objeto es estático).Este patrón cobra sentido cuando por alguna razón hay que dejar intacta la funcionalidad base, y desacoplarla de las funcionalidades extra(again videogames are a good example)

interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  operation(): string {
    return ConcreteComponent.name;
  }
}

// fijate que con FH esto fue una abstract class, lo importante es que hay delegación por composición hacia la instancia inyectada y que es otra rama de subclases de esa primera y atómica interfaz compartida.
class Decorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  operation(): string {
    return this.component.operation();
  }
}

// y de esa otra rama de subclases van a heredar todos los Decoradores, interchangeable s by Liskov
class ComponentDecoratorA extends Decorator {
  override operation(): string {
    return `ComponentDecoratorA(${super.operation()})`;
  }
}

class ComponentDecoratorB extends Decorator {
  override operation(): string {
    return `ComponentDecoratorB(${super.operation()})`;
  }
}
/* let component = new ConcreteComponent();
console.log(component.operation());
component = new ComponentDecoratorA(component);
console.log(component.operation());
component = new ComponentDecoratorB(component);
console.log(component.operation()); */
// fijate que al final importa mucho que instancia reciba el Decorator, si la original o una ya decorada, pues por naturaleza solo amplia, si le paso una ya ampliada la ampliará aún más
const component = new ConcreteComponent();
const decoratorA = new ComponentDecoratorA(component);
const decoratorB = new ComponentDecoratorB(decoratorA);
console.log(decoratorB.operation());

interface Notifier {
  send(message: string): string;
}
class BasicNotifier implements Notifier {
  send(message: string): string {
    return message;
  }
}
class NDecorator implements Notifier {

  constructor(protected notifier: Notifier){}
  send(message: string): string {
    return this.notifier.send(message);
  }
}
// Concrete Decorators
class FacebookDecorator extends NDecorator{
  override send(_: string): string {
    return 'Sending message through Facebook'
  }
}
class SlackDecorator extends NDecorator{
  override send(_: string): string {
    return 'Sending message through Slack'
  }
}
class SMSDecorator extends NDecorator{
  override send(_: string): string {
    return 'Sending message through SMS'
  }
}

const facebookEnabled = true;
const slackEnabled = true;
const smsEnabled = false;
// esto podría ser un ejemplo más real, fijate que reusar la instancia parece un approach muy usado, cobra más sentido para mi
let stack = new BasicNotifier();
if(facebookEnabled){
  stack = new FacebookDecorator(stack);
}
if(slackEnabled){
  stack = new FacebookDecorator(stack);
}
if(smsEnabled){
  stack = new FacebookDecorator(stack);
}
