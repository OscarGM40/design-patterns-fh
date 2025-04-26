/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { COLORS } from "../helpers/colors.ts";

class DatabaseConnection {
  private static instance: DatabaseConnection; // la instancia tmb debe ser estática, ya que el método es estático, ojo, y no va a crearla
  private connected: boolean = false;

  private constructor() {}
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  // Método para conectar a la base de datos
  public connect(): void {
    // Completar: si no está conectado, mostrar mensaje de conexión
    if(!this.connected){
      console.log('Conectando a la base de datos...');
      console.log('Conectado.');
      this.connected = true;
      return
    } else {
      console.log('Ya existe una conexión activa')
    }
  }

  // Método para desconectar de la base de datos
  public disconnect(): void {
    if(this.connected){
      console.log('Desconectando de la base de datos...')
      console.log('Desconectado.')
      this.connected = false;
    } else {
      console.log('No hay conexión a la base de datos. Nada de lo que desconectar')
    }
    // Completar: desconectar y mostrar mensaje de desconexión
  }
}

// Pruebas
function main() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect(); // Debería conectar a la base de datos

  const db2 = DatabaseConnection.getInstance();
  db2.connect(); // Debería mostrar que ya existe una conexión activa

  console.log("Son iguales:", db1 === db2); // Debería mostrar true

  db1.disconnect(); // Debería cerrar la conexión
  db2.disconnect(); // Debería fallar la desconexión, pues ya se ha desconectado db1

  db2.connect(); // Ahora debería conectar de nuevo, ya que se cerró la anterior
}

main();
