/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 * !Composition or dependency injection:
 * ? 1- dependency: occurs when one object is dependant on another. It can occur with or without a relation between those 2 objects
 * ? 2- Composition: here the class B object will be created inside class A, the object B is part of the class A. It is a type of association in wich the child object cannot exist without the parent class, and it has to be in the parent object(again, is a type of dependency) 
 * ? 3- Aggregation: the child object can exist outside the parent object. A Car has a Driver, the Driver can exists outside the Car
 * * La composición es un subset de dependencia. dependency is a general term, then composition/agreggarion/inheritance lead to dependency. De todas formas tiene más sentido usar inyección en vez de composicion ?
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz PaymentProcessor, ojo que la interfaz cliente es super imporante y es la que llamará el cliente
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// 2. Clases de Servicios de Pago Externos
// Estas clases simulan los servicios externos de PayPal, Stripe y MercadoPago

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cPayPal`, COLORS.blue);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cStripe`, COLORS.purple);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cMercadoPago`, COLORS.yellow);
  }
}

// 3. Clases Adaptadoras

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
  constructor(private readonly service: PayPalService) {
    this.service = service;
  }
  processPayment(amount: number): void {
    return this.service.sendPayment(amount);
  }
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {
  constructor(private readonly service: StripeService) {}
  processPayment(amount: number): void {
    return this.service.makeCharge(amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
  constructor(private readonly service: MercadoPagoService) {}
  processPayment(amount: number): void {
    return this.service.pay(amount);
  }
}

// 4. Código Cliente para probar el Adapter

function main() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter(new PayPalService());
  const stripeProcessor: PaymentProcessor = new StripeAdapter(new StripeService());
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(new MercadoPagoService());

  // Procesar pagos con los diferentes servicios
  // Los 3 procesadores de pago trabajan exactamente igual después de adaptaros
  console.log("Usando PayPal:");
  paypalProcessor.processPayment(paymentAmount);

  console.log("\nUsando Stripe:");
  stripeProcessor.processPayment(paymentAmount);

  console.log("\nUsando MercadoPago:");
  mercadoPagoProcessor.processPayment(paymentAmount);
}

main();

