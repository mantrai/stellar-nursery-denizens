import RandomSeedFactory from 'stellar-nursery-shared/lib/random-seed-factory';
import ThemeChance from './objects/theme-chance';
import DenizenAbstractBase from './denizens/denizen-abstract-base';

export interface IDenizen {
    readonly random: RandomSeedFactory;
    readonly techLevel: number;
    readonly denizenName: string;

    setup(randomSeedFactory: RandomSeedFactory): DenizenAbstractBase;

    reset(): DenizenAbstractBase;

    generateSystemName(): string;

    generateStarNames(qty: number): string[];

    generatePlanetName(position: number): string;

    generateMoonName(planetName: string, position: number): string;

    getTheme(themes: ThemeChance[], rand: number, def: string): string;

    shuffleDictionary(): void;
}
