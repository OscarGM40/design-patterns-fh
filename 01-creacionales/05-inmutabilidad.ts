/**
 * ! Inmutabilidad con copia
 * * Es una variación del patrón prototype. Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

// Clase que representaría el estado de un IDE.Fijate que no tiene sentido que se puedan cambiar los valores si está representando un estado concreto, luego tienen que ser readonly properties. En este punto fijate tmb que cuando quiera mantener estados debo usar este modificador de acceso
class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsaveChanges: boolean;

  constructor(content: string, cursorPosition: number, unsaveChanges: boolean) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsaveChanges = unsaveChanges;
  }

  displayState() {
    console.log(`\n%cEstado del editor:`, "color: green");
    console.log(`
      Content: ${this.content}
      CursorPosition: ${this.cursorPosition}
      Unsave changes: ${this.unsaveChanges}
      `);
  }

  //! Para implementar este patrón es como el prototype pero recibiendo argumentos. Fijate que este patrón lo estoy usando en el patrón Mother de nuestros tests.Fijate tmb que el patŕon ObjectMother no hay porque pasarle un overrides, pero entiendo que es más escalable juntandolo con el patrón de inmutabilidad con copia
  // ? Fijate que las props que recibirá rompen referencia pues son Partial<T> es otro tipo con sus propias props
  // ** El ejemplo con los undo y redo también es una ocasión perfecta para usar este patrón
  copyWith({ content, cursorPosition, unsaveChanges }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsaveChanges ?? this.unsaveChanges,
    );
  }
}
//clase que representaría el historial de esos estados del IDE y como interactuar con él
class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState) {
    if (this.currentIndex < this.history.length - 1) {
      // si estuvieramos en una posición intermedia, descartamos todos los siguientes
      this.history = this.history.splice(0, this.currentIndex + 1);
    }
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if(this.currentIndex  > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex]

    }
    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex]; // si hay un indice válido devolvemos el estado e incrementamos el indice un paso(para poder hacer redo, entiendo)
    }
    return null; // si el indice fuera igual o mayor a history.length no hay un estado al que moverse (entiendo que estaria en el último, luego no hay un estado que devolver)
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('hola mundo')", 2, false);
  history.save(editorState); // guardamos el primer estado
  console.log("%cEstado inicial", "color: orange");
  editorState.displayState();

  console.log("\n%cDespues del primer cambio", "color: orange");
  editorState = editorState.copyWith({
    content: "console.log('hola mundo);\n\t\tconsole.log('nueva línea');",
    cursorPosition: 3,
    unsaveChanges: true,
  });
  history.save(editorState);
  editorState.displayState();
  
  console.log("\n%cDespues de mover el cursor", "color: orange");
  editorState = editorState.copyWith({
    cursorPosition: 5
  })
  history.save(editorState);
  editorState.displayState();

  console.log("\n%cDespues del undo", "color: orange");
  editorState = history.undo()!;
  editorState.displayState();

  console.log("\n%cDespues del segundo undo", "color: orange");
  editorState = history.undo()!;
  editorState.displayState();

  console.log("\n%cDespues del redo", "color: orange");
  editorState = history.redo()!;
  editorState.displayState();
  
  console.log("\n%cDespues del segundo redo", "color: orange");
  editorState = history.redo()!;
  editorState.displayState();
}
main();
