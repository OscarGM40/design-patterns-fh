interface Delivery {
  setWholePrice(price?: number): number;
}

class Producto implements Delivery {
  constructor(private name: string, private price: number) {}
  setWholePrice(wholePrice: number) {
    wholePrice = wholePrice + this.price;
    return wholePrice;
  }
}

class Caja implements Delivery {
  constructor(private name: string, private price: number, private content: Delivery[] = []) {}
  setWholePrice(wholePrice: number) {
    return this.content.reduce((total, child) => {
      return (total += child.setWholePrice(wholePrice));
    }, this.price);
  }
  addItem(item: Delivery) {
    this.content.push(item);
  }
}

function main() {
  const producto1 = new Producto("Pasta de dientes", 300);
  const producto2 = new Producto("Desodorante", 400);
  const producto3 = new Producto("Silla", 1000);
  const caja1 = new Caja("Caja 1", 100);
  caja1.addItem(producto1);
  // console.log(caja1.setWholePrice(0));
  caja1.addItem(producto2);
  // console.log(caja1.setWholePrice(0));
  caja1.addItem(producto3);
  // console.log(caja1.setWholePrice(0)); // 1800

  const caja2 = new Caja("Caja 2", 100);
  caja2.addItem(producto1);
  // console.log(caja2.setWholePrice(0)); // 400

  const caja3 = new Caja("Caja 3", 100);
  caja3.addItem(caja2);
  caja3.addItem(producto3);
  caja3.addItem(caja1);
  console.log(caja3.setWholePrice(0));

  const caja4 = new Caja("Caja 4", 100);
  caja4.addItem(caja3);
  caja4.addItem(producto3);
  console.log(caja4.setWholePrice(0));
}
main();
type MainType = ReturnType<typeof main>;
