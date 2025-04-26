/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.Fijate que lo determinará el cliente segun sus necesidades
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 * La factoria es la clase encargada de tener la lógica de creación de las instancias, over. Fijate que este patrón usa polimorfismo
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar 
      la interfaz Report, generando el contenido de cada reporte en el método generate.
	  
  2.	Implementen las clases SalesReportFactory e InventoryReportFactory 
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Definir la interfaz Report
interface Report {
  generate(): void;
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport
class SalesReport implements Report {
  generate(): void {
    console.log("%cGenerando reporte de ventas...", COLORS.blue)
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('%cGenerando reporte de inventario...', COLORS.green);
  }
}

// 3. Clase Base ReportFactory con el Método Factory
abstract class ReportFactory {
  // fijate que este método abstracto que crea la instancia es clave que sea abstracto y que devuelva una instancia.Además no tiene sentido que éste expuesto, (ojo, no puede ser private si es abstract, porque hay que pisarlo, debe ser protected para hacerle override al public que tenia por default)
  protected abstract createReport(): Report;
  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// 4. Clases Concretas de Fábricas de Reportes

class SalesReportFactory extends ReportFactory {
  override createReport(): Report {
  return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  override createReport(): Report {
    return new InventoryReport();
  }
}
// Fijate que habrá X clases factory + las mismas de concrecciones + la clase BaseFactory con el método factory.

// 5. Código Cliente para Probar
function main() {
  let reportFactory: ReportFactory;

  const reportType = prompt(
    '¿Qué tipo de reporte deseas? (sales/inventory)');

  if (reportType === 'sales') {
    reportFactory = new SalesReportFactory();
  } else {
    reportFactory = new InventoryReportFactory();
  }

  reportFactory.generateReport();
}

main();

// Fijate que para poder usar este patŕon debemos poder ser capaces de crear las instancias de manera aislada y anticipada y despues determinar cual se quiere en tiempo de ejecución mediante la selección de una opción. En muchos casos se podrá implementar, o incluso dejar algun parámetro para ese momento