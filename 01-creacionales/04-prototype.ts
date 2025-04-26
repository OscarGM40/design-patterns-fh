/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar(permite crear clones de un objeto) objetos existentes sin que el código dependa de sus clases.Este patrón delega el proceso de clonación a los propios objetos que estan siendo clonados.Nos permite clonar un objeto sin acoplar el código a la clase de ese objeto (normalmente mediante el uso de un método clone() o similar).Obviamente, el objeto a clonar llevará todos los valoresdel objeto a clonar(del último objeto creado).
 * 
 * * Es útil sobre todo cuando queremos clonar un objeto muy complejo.Fijate que a veces los objetos tienen propiedades ocultas o privadas, este es el problema que resuelve el patrón prototype, y que no resuelve el operador spread o el método structuredClone (esto es asi??)
 * ? Para implementar este patŕon hay que crear en nuestra clase una forma de clonar ese object (clone(): T {
 * ? return new T(params)}) Fijate que como estaré dentro de la propia clase me dan igual los modificadores de acceso
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */
class Document {
  public title: string;
  private content: string; // solo podemos acceder al contenido dentro de esta clase
  public author: string;
  // recuerda que en typescript si en el constructor le doy un modificador de acceso a la property es lo mismo que si la defino y a la vez la asigno. Pero vamos con la sintaxis larga de momento
  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  displayInfo() {
    console.log(`
     Title: ${this.title}
     Content: ${this.content}
     Author: ${this.author}`);
  }
  clone(): Document {
    return new Document(this.title, this.content, this.author)
  }
}

function main() {
  const document1 = new Document("Cotización", "500 dólares", "Fernando");
  console.log({ document1 });
  document1.displayInfo();

  // hasta aqui todo bien, pero que pasa si queremos hacer una copia del objeto. Fijate que el operador spread no copia el tipo
  const document2 = { ...document1 }; // fijate que aqui se perdió el tipo (el prototipo podriamos decir tmb ya que estamos en Javascript)
  document2.title = "Nueva cotización";
  console.log({ document2 }); // ojo, si no usamos #content el modificador de acceso private es sugar syntactic en Javascript, y nos va a llegar la prop
  // document2.displayInfo(); // como hemos perdido el prototipado ya no tenemos un Document en document2
  const document3 = structuredClone(document1);
  console.log({ document3 });
  // document3.displayInfo(); // aqui da error tmb

  //? para evitar la pérdida del tipado simplemente llamamos al clone() 
  const document4 = document1.clone();
  document4.title = 'Cloned nueva cotización'
  console.log({ document4 });
  document4.displayInfo();
}
main();
