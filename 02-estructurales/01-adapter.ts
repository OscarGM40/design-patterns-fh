/**
 * ! Patrón Adapter
 *  El patrón adapter permite que objetos con interfaces incompatibles puedan trabajar juntos.También es muy útil para utilizar librerias de terceros en nuestra aplicación sin depender directamente de ellas
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *? Bridge, State, Strategy y hasta cierto punto Adapter tienen estructuras muy similares. De echo, todos estos patrones se basan en la composición, que consiste en delegar trabajo a otros objetos (dificil verla en el adapter mediante funciones)
 * https://refactoring.guru/es/design-patterns/adapter
 */

// import { LocalLogger } from "./adapter-files/local-logger.ts";
import { DenoLoggerAdapter } from "./adapter-files/logger-adapter.ts";

//vamos a asumir que tengo toda mi app con este sistema de logs,y que resulta que necesitamos elaborar mejor este sistema de logs, por algo más profesional,etc
// const logger = new LocalLogger("01-adapter.ts");
// fijate como toda la sintaxis anterior valdría, solo hay que cambiar la clase por la adaptadora
const logger = new DenoLoggerAdapter('01-adapter.ts');
logger.writeLog("Mensaje de un log normal");
logger.writeWarning("Una alerta normal, información");
logger.writeError("Algo mal salió por aquí");