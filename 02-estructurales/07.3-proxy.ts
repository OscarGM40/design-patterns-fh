// https://www.youtube.com/watch?v=NwaabHqPHeM&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=10
// The proxy patterns creates a placeholder for an object to control the access to it, thus allowing to make operations after or before that access to this object. It creates 1 level of indirection (we access the object that will access the object).Fijate que el objeto proxy lucirá como el objeto al que le haga proxy (ambos compartirán la misma interfaz) pero tmb tiene una relación de composición con ese objeto (tiene ese object como property)

// A proxy can be a remote proxy, a virtual proxy or a protection proxy

// 1 - A remote proxy is used when we can to control the access to an object that is remote (for example in a different server, in a different namespace, in a different project...)Fijate que esto normalmente se usarán Promises,etc, será una acción asíncrona
// 2 - A virtual proxy controls access to a resource that is expense to create (lazy evaluation). Fijate que podriamos crear una cache de esos expensive resources tmb, es lo más probable que se haga
// 3 - A protection proxy is an access manager (check the role of the user,etc)(ejemplo 01 de FH de las Rooms, middlewares)

//
interface ISubject {
  request(): void;
}

class RealSubject implements ISubject {
  request(): void {
    console.log("requesting data");
  }
}

// es un proxy porque luce como el object al que le hace proxy y lo tiene tmb.Fijate que hay muchos escenarios diferentes, en este no controlamos el acceso, sino la instanciación
class Proxy implements ISubject {
  private static realSubject: RealSubject;
  constructor() {}

  request(): ReturnType<typeof Proxy.realSubject.request> {
    if (!Proxy.realSubject) {
      // Aqui iría un proceso muy complejo de instanciación que no queremos repetir
      Proxy.realSubject = new RealSubject();
    }
    Proxy.realSubject.request();
  }
}

const proxy = new Proxy();
proxy.request();
proxy.request();

interface IBookParser {
  getNumPages(): number;
}

class BookParser implements IBookParser {
  getNumPages(): number {
    // expensive process
    return 100;
  }
}

class ProxyParser implements IBookParser {
  private bookParser: BookParser | null = null;
  getNumPages(): number {
    if (!this.bookParser) {
      this.bookParser = new BookParser();
    }
    return this.bookParser.getNumPages();
  }
}

const proxyParser = new ProxyParser();
proxyParser.getNumPages();