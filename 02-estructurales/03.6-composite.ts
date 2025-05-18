// https://www.youtube.com/watch?v=EWDmWbJ4wRA&list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc&index=18
// Este patrón es muy útil cuando desde la perspectiva del cliente no querramos saber si estamos tratando con un objeto o una colección de objetos We can do this by simply making both inherit from a common interface, thus making possible to interchange them.Trees data structure are perfect for this pattern
// Ojo, la composite es todo el árbol(es una composición, no puede ser el nodo root sino todo el arból), pero al ser una composite puede preguntar a todas las referencias a las que apunte que ejecute una función en todas ellas(recursión + delegación)
// Fijate que este patrón hace trivial el trabajar con estructuras jerarquicas ya que me permite tratar todos los nodos como una entidad única(al final se trata de cambiar ifs por polimorfismo (si soy una hoja haz esto, si soy unnodo haz esto otro))

const createArchive = (name: string) => {
  return {
    name,
    isComposite: () => false,
    countItems: () => 1,
    showDetails: () => {
      console.log(`- Archivo: ${name}`);
    },
  };
};
// En cualquier nodo que sea una composición debería haber un método para añadir y eliminar más elementos en la jerarquia. Aparte este patrón obliga a que cada composición tenga una relación de agregación con la interfaz comun (vamos, que tiene un arreglo de elementos de ese tipo generico, linea 18 aqui)
//Fijate que tiene que ser esta interfaz la que tenga el add y remove por el principio de segregación de interfaces, no puedo forzar a Archive a implementar estos métodos siendo una Leaf
const createFolder = (name: string) => {
  const children: unknown[] = [];

  return {
    name,
    children,
    isComposite: () => true,
    add: (component: unknown) => {
      children.push(component);
      return this; // para encadenar adds
    },
    remove: (component: unknown) => {
      const index = children.indexOf(component);
      if (index !== -1) children.splice(index, 1);
      return this;
    },
    getChild: (index: number) => children[index],
    showDetails: (indent: string = "*") => {
      console.group(name);
      children.forEach((child: any) => {
        if (child.isComposite()) {
          child.showDetails(indent); //recursion
        } else {
          child.showDetails(indent); //recursion
        }
      });
      console.groupEnd();
    },
  };
};

const file1 = createArchive("archivo1.txt");
const file2 = createArchive("archivo2.txt");
const file3 = createArchive("archivo3.txt");
const file4 = createArchive("archivo4.txt");

const folder1 = createFolder("Carpeta 1");
folder1.add(file1);
folder1.add(file2);
const folder2 = createFolder("Carpeta 2");
folder2.add(file3);
const folder3 = createFolder("Carpeta 3");
folder3.add(file4);
const rootFolder = createFolder("Root folder");
rootFolder.add(folder1);
rootFolder.add(folder2);
folder2.add(folder3);
rootFolder.showDetails("*");

//** Fijate que fácil sería con este patrón iterar por todo el arbol y por ejemplo preguntar si falta algun Todo por hacer (isDone: boolean) y con ello saber si el proyecto esta en curso, etc */
// List of tasks and possible subtasks
// interface of higher level interchangeable
interface TodoList {
  getHTML(): string;
}

class Todo implements TodoList {
  constructor(public content: string) {}

  getHTML(): string {
    return this.content;
  }
}

class Project implements TodoList {
  constructor(private title: string, private todos: TodoList[]) {}

  getHTML(): string {
    return `
    <ul>
      <li>${this.title} ${this.todos.map(
      (todo) => `
        <ul>
          <li>${todo.getHTML()}</li>
        </ul>)
        `,
    )}
      </li> 
    </ul>
    `;
  }
}

const todoOne = new Todo("jump");
const todoTwo = new Todo("walk");
const projectOne = new Project("move", [todoOne, todoTwo]);
const projectTwo = new Project("move two", [todoOne, todoTwo]);

const mainProject = new Project("mainProject", [projectOne, projectTwo]);
console.log(mainProject.getHTML());
