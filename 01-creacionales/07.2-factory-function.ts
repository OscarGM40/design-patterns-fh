/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

//! Salida esperada
//! Colocar colores de log según el nivel
//* [INFO:2025-10-21:07] Aplicación iniciada correctamente.
//* [WARNING:2025-10-21:07] El uso de memoria está alto.
//* [ERROR:2025-10-21:07] Error de conexión a la base de datos.

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // obtain the month, always with 2 digits
  const day = String(date.getDay()).padStart(2, "0"); // always 2 digits
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

type LogLevel = "info" | "warn" | "error";

// Función fábrica que crea un manejador de logs
function createLogger(level: LogLevel) {
  // Retorna una función que recibe el "message" como argumento
  // Completar: implementar el logger con formato y color para cada nivel
  return (message: string): void => {
    const timestamp = formatDate(new Date());

    const options: Record<LogLevel, string> = {
      error: `%c[ERROR: ${timestamp}] ${message}`,
      info: `%c[INFO: ${timestamp}] ${message}`,
      warn: `%c[WARNING: ${timestamp}] ${message}`,
    };

    const mapLogLevelToColor: Record<LogLevel, string> = {
      error: "color: red",
      info: "color: white",
      warn: "color: orange",
    };
    return console.log(options[level], mapLogLevelToColor[level]);
  };
}

// Ejemplo de uso
function main() {
  const infoLogger = createLogger("info");
  const warnLogger = createLogger("warn");
  const errorLogger = createLogger("error");

  infoLogger("Aplicación iniciada correctamente.");
  warnLogger("El uso de memoria está alto.");
  errorLogger("Error de conexión a la base de datos.");
}

main();
