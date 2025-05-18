// https://www.youtube.com/watch?v=WNlqIsUPp1g
/* Este patrón permite agregar comportamiento a nuestro objeto sin alterar su estructura. Este patrón se puede asimilar a la estructura de una cebolla, en el centro estaría el objeto original y cada cada sería un decorador  */

// Tenemos una tienda de música y queremos aplicar diferentes descuentos en base al cliente y la campaña actual(por ejemplo primera compra o cliente VIP )

interface IDiscount {
  calculate(price: number): number;
}

class BasePrice implements IDiscount {
  calculate(price: number): number {
    console.log(`${this.constructor.name} discount applied.`);
    return price;
  }
}

/* abstract class PriceDecorator implements IDiscount {
  constructor(private readonly price: IDiscount) {}
  calculate(price: number): number {
    return this.price.calculate(price);
  }
} */
// quizas sería buena idea tipar los decoradores, creo que me convence más el approach con una abstract class para los decoradores
class SpecialPriceDecorator {
  private readonly discountAmount: number = 0.04;
  constructor(private readonly discount: IDiscount) {}
  calculate(price: number): number {
    console.log(`${this.constructor.name} discount applied.`);
    return this.discount.calculate(price * (1 - this.discountAmount));
  }
}

class VipCustomerPriceDecorator {
  private readonly discountAmount: number = 0.02;
  constructor(private readonly discount: IDiscount) {}
  calculate(price: number): number {
    console.log(`${this.constructor.name} discount applied.`);
    return this.discount.calculate(price * (1 - this.discountAmount));
  }
}
const customer = {
  isFirstBuy: true,
  type: "VIP",
};

let discount = new BasePrice();
// fijate que puede entrar por los dos ifs y habrá cascada de calls al calculate de la clase padre en ese caso. Esto es como una pila, el ultimo decorador en implementarse es el primero en ejecutarse y va llamando de afuera adentro(luego el ultimo calculate es el del objeto original)
if (customer.isFirstBuy) {
  discount = new SpecialPriceDecorator(discount);
} 
if (customer.type === "VIP") {
  discount = new VipCustomerPriceDecorator(discount);
}
console.log(discount.calculate(100));
