/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.Este patrón es muy usado en Vanilla JS, aunque funciona tmb en TS.Es una función que crea funciones
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.En resumen, en el cliente
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Language = 'es' | 'en' | 'fr'; 

function createGreeting(lang: Language ){
  // para que sea un factory function tengo que devolver otra function
  return function (name: string) {
    const messages: Record<Language,string> = {
      es: `Hola, %c${name}!`,
      en: `Hello, %c${name}!`,
      fr: `Bon jour, %c${name}`
    }
    return console.log(messages[lang], COLORS.red);
  } 
}

function main(){
  const spanishGreeting = createGreeting('es');
  spanishGreeting('Fernando')
  createGreeting('en')('Mike')
  createGreeting('fr')('Antoinne')
}
main();