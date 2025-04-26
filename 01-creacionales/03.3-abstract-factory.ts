/* https://www.google.com/search?sca_esv=f9f1a50abb3c6f24&sxsrf=AHTn8zp9zj99zOLCJJbLePRvVimmWOw8eg:1744736441913&q=abstract+factory+typescript&udm=7&fbs=ABzOT_BnMAgCWdhr5zilP5f1cnRvL69nV-ns4EEhuHi7aGOP-3vvyrhQpwNuPmWYea_clDmA4LIrcDOLyRmu_jywhptS2ASik2Z7dvd9gZDzZWNW-TlR4AGrX0rSYSF9aDo-LM65lYXWc3b1NAMEzXPkK-107nytLttCvc3ApCcjYEe76PsmcoXDod17e6y8orGvSMeJEP46&sa=X&ved=2ahUKEwil_eLewdqMAxXkgf0HHSadLhEQtKgLegQIFBAB&biw=1920&bih=912&dpr=1#fpstate=ive&vld=cid:874c4ee5,vid:JgejyeRyztI,st:0 */
/* Ejemplo, quere */

interface Connector {
  open(): void;
  close(): void
}
interface Publisher {
  publish(content: string): void;
}

class LinkedInConnector implements Connector {
  open(): void {
    console.log('Abriendo conexión a LinkedIn...')
  }
  close(): void {
    console.log('Cerrando conexión a LinkedIn...')
  }
}
class FacebookConnector implements Connector {
  open(): void {
    console.log('Abriendo conexión a Facebook...')
  }
  close(): void {
    console.log('Cerrando conexión a Facebook')
  }
}

class LinkedInPublisher implements Publisher {
  constructor(private connector: Connector) {}
  publish(content: string): void {
    console.log("Publishing in LinkedIn...");
    console.log(content)
  }
}
class FacebookPublisher implements Publisher {
  constructor(private connector: Connector) {}
  publish(content: string): void {
    console.log("Publishing in Facebook...");
    console.log(content)
  }
}
// abstract Factory
interface IAbstractFactory {
  getConnector(): Connector;
  getPublisher(connector: Connector): Publisher;
}

class LinkedInFactory implements IAbstractFactory {
  getConnector(): Connector {
    return new  LinkedInConnector();
  }
  getPublisher(connector: Connector): Publisher {
    return new LinkedInPublisher(connector)
  }
}
class FacebookFactory implements IAbstractFactory {
  getConnector(): Connector {
    return new  FacebookConnector();
  }
  getPublisher(connector: Connector): Publisher {
    return new FacebookPublisher(connector)
  }
}
// en el cliente
function main(factory: IAbstractFactory){
  const connector = factory.getConnector();
  const publisher = factory.getPublisher(connector);
  connector.open()
  publisher.publish('publishing something...') 
  publisher.publish('publishing another thing...')
  connector.close();
}

main(new LinkedInFactory())
main(new FacebookFactory())