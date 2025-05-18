/**
 * ! Patrón Composite
 * Es un patrón de diseñ estructural que permite componer objetos (de ahi su nombre)
 * en estructuras de árbol(no solo binarias, sino de n ramas) para representar jerarquías y trabajar con estas estructuras como si fueran objetos individuales( osea toda la estructura es una única entidad)
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos individuales y a sus composiciones.
 * Este patrón solo tiene sentido si el modelo de datos puede representarse en forma de árbol, por ejemplo Productos y Cajas. Una Caja puede tener varios productos asi como varias Cajas más pequeñas dentro. Estas cajas a su vez tmb podrían tener más Productos o incluso más Cajas. Fijate que la relacion es 1 a n y recursiva
 * Si me tocara diseñar un sistema de pedidos que usara estas clases, como haría para calcular el precio de todo(del Pedido)? El patrón Composite sugiere que trabaje con Productos y Cajas a través de una interfaz común y declararé un método para calcular el precio total.
 * Es decir, el patŕon Composite me permite ejecutar/definir un comportamiento de forma recursiva sobre todos los componentes de un árbol de objetos(sistema de archivos de un SO es un árbol)
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

// Esto es la interfaz común, el Composite, y cada tipo de Leaf la tiene que implementar
interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
  constructor(private name: string) {}
  showDetails(indent: string = ""): void {
    console.log(`${indent}- Archivo: ${this.name}`);
  }
}
type FileType = ReturnType<typeof File.prototype.showDetails>;

class Folder implements FileSystemComponent {
  //recuerda que siempre hay agregación/composicion desde el Composite hacia la interfaz para la recursión
  constructor(private name: string, private content: FileSystemComponent[] = []) {}

  showDetails(indent: string = ""): void {
    console.log(`${indent}+ Carpeta: ${this.name} `);
    this.content.forEach((c) => c.showDetails(indent + " "));
  }
  add(component: FileSystemComponent) {
    this.content.push(component);
  }
}

function main() {
  const file1 = new File("archivo1.txt");
  const file2 = new File("archivo2.txt");
  const file3 = new File("archivo3.txt");
  const file4 = new File("archivo4.txt");

  const folder1 = new Folder("Carpeta 1");
  folder1.add(file1);
  folder1.add(file2);
  // folder1.showDetails();
  const folder2 = new Folder("Carpeta 2");
  folder2.add(file3);
  const folder3 = new Folder("Carpeta 3");
  folder3.add(file4)

  const rootFolder = new Folder("Root Folder");
  rootFolder.add(folder1)
  rootFolder.add(folder2)
  folder2.add(folder3);
  rootFolder.showDetails(); // fijate que aqui está el patrón Composite(aqui y obviamente en como se construyó el arbol con una interfaz común, fijate en la delegacion en el Folder, o la rama, Caja,etc,lo que sea que contiene a la hoja,Producto, ya que hay composición en su constructor),y por esto con llamar al primer nodo del arbol ya tendría los datos de todo el árbol
}
main();
