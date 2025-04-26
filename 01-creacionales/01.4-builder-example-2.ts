const characterTypes = {
  MAGE: "MAGE",
  WARRIOR: "WARRIOR",
  ROGUE: "ROGUE",
} as const;

type CharacterTypes = keyof typeof characterTypes;

class Character {
  level!: number;
  strength!: number;
  agility!: number;
  intelligence!: number;
  defense!: number;

  constructor(private name: string, private classType: CharacterTypes) {}

  displayStats(): void {
    console.log(`Name: ${this.name}`);
    console.log(`Level: ${this.level}`);
    console.log(`Class Type: ${this.classType}`);
    console.log(`Agility: ${this.agility}`);
    console.log(`Defense: ${this.defense}`);
    console.log(`Intelligence: ${this.intelligence}`);
    console.log(`Strength: ${this.strength}`);
  }
}

class CharacterBuilder {
  private character: Character;

  constructor(name: string, characterType: CharacterTypes) {
    this.character = new Character(name, characterType);
  }

  setLevel(level: number): CharacterBuilder {
    this.character.level = level;
    return this;
  }

  setStrength(strength: number): CharacterBuilder {
    this.character.strength = strength;
    return this;
  }

  setAgility(agility: number): CharacterBuilder {
    this.character.agility = agility;
    return this;
  }

  setIntelligence(intelligence: number): CharacterBuilder {
    this.character.intelligence = intelligence;
    return this;
  }

  setDefense(defense: number): CharacterBuilder {
    this.character.defense = defense;
    return this;
  }

  build(): Character {
    return this.character;
  }
}

const warrior = new CharacterBuilder("Gentleman", characterTypes.WARRIOR)
  .setAgility(25)
  .setDefense(50)
  .setStrength(12)
  .setIntelligence(10)
  .setLevel(8)
  .build();

warrior.displayStats();
