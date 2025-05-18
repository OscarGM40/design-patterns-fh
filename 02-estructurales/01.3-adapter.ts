/* There are 4 patterns that are quite similiar, Adapter, Facade, Proxy and Decorator. Ver video extra con las diferencias entre Adapter, Facade and Proxy 
Adapter: makes two imcompatible interfaces compatible
Facade: takes a bunch of complex interactions and creates a facade (a dashboard) that I can use, having all centralized 
Proxy: is a way of placing a 'proxy' between something that I want to call, so instead of calling that thing I call the proxy who calls that thing (used in security or caching data, ie)
Decorator: is a way of adding behaviour to some particular object without opening and changing that object(I suposse they mean the class)
Fijate en el ejemplo del adapter para corriente, siempre voy a tener un tipo de input y otro tipo de output, e incompatibles.Obviamente puedo cambiar tipo por type o interface en programación 
Adapter let classes work together that otherwise couldn't work because of imcompatible interfaces
Fijate como tiene todo el sentido del mundo este patrón al trabajar con librerías externas que no podemos cambiar. La intención nunca es cambiar, eliminar o añadir comportamiento, este patrón solo resuelve la incompatibilidad que haya entre dos interfaces, haciendolas operables entre sí (el cliente siempre llama al adapter)
 */


class Adaptee {
  makeRequest(){
    console.log('making request with adaptee')
  }
}
interface ITarget {
  request(): void;
}

class Adapter implements ITarget {
  constructor(private readonly adaptee: Adaptee){}
  request(){
    return this.adaptee.makeRequest()
  }
}
// En el cliente
 const target: ITarget = new Adapter(new Adaptee());
 target.request(); // fijate que en el cliente llamamos a target pero por detras mediante el wrapper/adapter llamamos a makeRequest realmente. Esto obviamente tiene que haber algo que haga que no podamos usar Adaptee, por ser una libreria,el back, etc

 // NOTA: fijate que este patrón introduce un nivel de indirección, ya que en vez de llamar a target.request y que se ejecute la lógica de ese método realmente llamamos a adaptee.makeRequest a traves de una clase Adapter. Se podría incluso adaptar un método/firma estático, pero no necesitariamos la inyección de la dependencia,claro