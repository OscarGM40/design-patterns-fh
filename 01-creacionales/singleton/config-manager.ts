// ** Esto es clave, no exportamos la clase
class ConfigManager {
  // La interface Record permite crear un object(un dict) con n cantidad de llaves
  private config: Record<string, string> = {};

  //método para agregar una entrada
  public setConfig(key: string, value: string): void {
    this.config[key] = value;
  }

  public getConfig(key: string): string | undefined {
    return this.config[key];
  }

  public getAllConfig(): Record<string, string> {
    // nunca mandar la prop porque la pueden manipular, mandar una copy
    return { ...this.config }; // como son strings me vale el spread pero si fuera un object complejo habría que mandar un structured clone
  }
}

// sino que importamos la instancia, cada vez que JS llame al módulo será la misma
export const configManager = new ConfigManager();
