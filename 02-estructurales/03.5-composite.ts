// https://www.youtube.com/watch?v=7KRtX838rZE
/**
 ** Composite is a pattern that offers an alternative way to define hierarchies of objects without using inheritance(it uses composition instead).It does this by creating a common interface for all objects in the hierarchy, allowing them to be treated uniformly.We can traverse the hierarchy from the top down or bottom up, and we can add or remove objects from the hierarchy at any time. 

 * 
 *  */

interface ClientElement {
  render(): string;
}

class AppComponent implements ClientElement {
  constructor(private children: Array<ClientElement> = []) {}

  render(): string {
    let str = `
      <html> \n
      `;
    this.children.map((child) => {
      str += child.render() + "\n";
      return;
    });
    str += `</html>`;
    return str;
  }

  add(child: ClientElement): void {
    this.children.push(child);
  }
  remove(index: number): void {
    if (index < this.children.length && index >= 0) {
      this.children.splice(index, 1);
      return void 0;
    }
    throw new Error(`Incorrect index provided: ${index}`);
  }
  replace(index: number, child: ClientElement): void {
    if (index < this.children.length && index >= 0) {
      this.children.splice(index, 1, child); // fijate que siendo uno podría usar array[i]= child pero para reemplazar varios tengo que usar splice si o si
      return void 0;
    }
    throw new Error(`Incorrect index provided: ${index}`);
  }
}
interface MyElement {
  _elemType: string;
  _propString: string;
  _textStr: string;
}
class MyElement implements ClientElement {
  constructor(
    private elemType: string,
    private propString: string = "",
    private textStr: string = "",
  ) {}
  render(): string {
    return `
    <${this.elemType}${this.propString.padStart(this.propString.length + 1, " ")}>
      ${this.textStr}
    </${this.elemType}>

    `;
  }
}

function _createMyElement(params: MyElement) {
  return {
    elemType: params._elemType,
    propString: params._propString,
    textStr: params._textStr,
    render: (): string => "",
  };
}

const app = new AppComponent();
const label = new MyElement("label", undefined, "First Name");
const input = new MyElement("input", `type="text" placeholder="Enter first name..."`);
const fnameinput = new MyElement("input", `type="text" placeholder="Enter the first name..."`);

app.add(label);
app.add(input);
// console.log(app.render());
app.replace(1, fnameinput);
console.log(app.render());

// Interview Questions
/* Explain Composite Pattern and its use cases => It is an structural pattern that I can use in hierarchical structures like trees to avoid inheritance. It creates a common interface/abstraction that lets me treat all elements as the same kind, performing instructions on all the tree up or down recursively.It treats all the hierarchy as a single object/entity
Real world use-cases are a file manager system or gui components 
It ensures uniform treatment by creating a common interface and through composition in the class with the composition
As drawbacks it can be challenging to figure out what is the base interface that I should use(too generic will force to more specialized classes, too complex will violate Interface Seggregation Principle, forcing subclasses to implement methods that they don't need) 
 */