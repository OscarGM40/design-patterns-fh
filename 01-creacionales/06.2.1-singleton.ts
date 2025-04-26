/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

// Recuerda que en deno tengo que especificar la extensión
import { configManager } from "./singleton/config-manager.ts";

configManager.setConfig('apiURL', 'http://localhost:3000/api') 
configManager.setConfig('timeout', '5000') 
configManager.setConfig('apiKEY', 'abc123') 

console.log(configManager.getConfig('apiURL'))
console.log(configManager.getConfig('timeout'))
console.log(configManager.getConfig('jsdlfkjasdlfkjasdf'))