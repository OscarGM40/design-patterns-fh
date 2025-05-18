// https://medium.com/@artemkhrenov/composite-pattern-implementation-in-javascript-160aa5ef9fe2

//interface or abstract class with the Composite
interface MenuComponent {
  getDescription(): void;
  isComposite(): boolean;
}

// Leaf class
class MenuItem implements MenuComponent {
  constructor(private name: string, private url: string, private active = false) {}
  // we don't need to override add/remove/getChild since it is a leaf
  getDescription() {
    return `${this.name} - ${this.url} ${this.active ? "(active)" : ""}`;
  }
  isComposite(): boolean {
    return false;
  }
}

class MenuGroup implements MenuComponent {
  constructor(private name: string, private children: MenuComponent[] = []) {}

  // operator overload
  add(component: MenuComponent | MenuComponent[]): MenuGroup {
    if (Array.isArray(component)) {
      this.children.push(...component);
      return this;
    }
    this.children.push(component);
    return this;
  }

  remove(component: MenuComponent | MenuComponent[]): MenuGroup {
    if (Array.isArray(component)) {
      const initialIndex = this.children.indexOf(component[0]);
      if (initialIndex !== -1) {
        this.children.splice(initialIndex, component.length);
        return this;
      }
    } else {
      const initialIndex = this.children.indexOf(component);
      if (initialIndex !== -1) {
        this.children.splice(initialIndex, 1);
      }
    }
    return this;
  }
  getChild(index: number): MenuComponent | MenuComponent[] {
    return this.children[index];
  }

  getDescription() {
    return `${this.name} (${this.children.length} items)`;
  }

  countItems(): number {
    // solo cuenta los hijos
    return this.children.reduce((count, child) => {
      if (child instanceof MenuGroup) {
        return count + child.countItems();
      }
      return (count += 1);
    }, 0);
  }
  isComposite(): boolean {
    return true;
  }
  listItems() {
    console.group(this.name);
    this.children.forEach((child) => {
      if (child.isComposite()) {
        (child as MenuGroup).listItems();
      } else {
        console.log(child.getDescription());
      }
    });
    console.groupEnd();
  }
}

const mainMenu = new MenuGroup("Main Menu");

mainMenu.add(new MenuItem("Home", "/", true));
mainMenu.add(new MenuItem("About", "/about"));

// dropdown
const productsDropdown = new MenuGroup("Products");
productsDropdown.add(new MenuItem("Enterprise", "/products/enterprise"));
productsDropdown.add(new MenuItem("Personal", "/products/personal"));

const servicesDropdown = new MenuGroup("Services");
servicesDropdown.add(new MenuItem("Consulting", "/services/consulting"));
servicesDropdown.add(new MenuItem("Training", "/services/training"));

mainMenu.add([productsDropdown, servicesDropdown, new MenuItem("Contact", "/contact")]);

// mainMenu.listItems();
// console.log(`Total menu items: ${mainMenu.countItems()}`);

// functional approach (since Javascript excels at functional programming it might be a better approach)

//Create factory functions instead of classes
const createMenuItem = (name: string, url: string, active: boolean = false) => {
  return {
    name,
    url,
    active,
    getDescription: () => `${name} - ${url} ${active ? "(active)" : ""}`,
    isComposite: () => false,
    countItems: () => 1,
  };
};
// fijate que cualquier function que retorne un object es una factory function, que prehistoric esta peña, toxic al-andalus
const createMenuGroup = (name: string) => {
  const children: unknown[] = [];
  return {
    name,
    children,
    isComposite: () => true,
    add: (component: unknown) => {
      children.push(component);
      console.log({children})
      // return this; // fijate como usan el method chaining en una factory function
    },
    remove: (component: unknown) => {
      const index = children.indexOf(component);
      if (index !== -1) children.splice(index, 1);
      // return this;
    },
    getChild: (index: number) => children[index],
    getDescription: () => `${name} (${children.length} items)`,
    listItems: () => {
      console.group(name);
      children.forEach((child: any) => {
        if (child.isComposite()) {
          child.listItems();
        } else {
          console.log(child.getDescription());
        }
      });
      console.groupEnd();
    },
    countItems: () => {
      return children.reduce((count, child: any) => {
        return count + child.countItems();
      }, 0);
    },
  };
};
// Create menu with functional approach
const mainMenuF = createMenuGroup('Main Menu');
mainMenuF.add(createMenuItem('Home', '/', true));
mainMenuF.add(createMenuItem('About', '/about'));

const productsMenuF = createMenuGroup('Products');
productsMenuF.add(createMenuItem('Enterprise', '/products/enterprise'));
productsMenuF.add(createMenuItem('Personal', '/products/personal'));

mainMenuF.add(productsMenuF);
mainMenuF.add(createMenuItem('Contact', '/contact'));

// Display the structure
mainMenuF.listItems();
// productsMenuF.listItems();
// console.log(mainMenuF.countItems());

// The functional approach has some advantages
// 1- NO need for class inheritance
// 2- Easier to compose with other functional utilities
// 3- Often more concise and flexible

const myIterable = {
  *[Symbol.iterator](){
    yield 1;
    yield 2;
    yield 3;
  }
}
// console.log([...myIterable])