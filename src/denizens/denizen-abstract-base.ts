import RandomSeedFactory from 'stellar-nursery-shared/lib/random-seed-factory';
import ThemeChance from '../objects/theme-chance';
import {IDenizen} from "../i-denizen";

export default abstract class DenizenAbstractBase implements IDenizen {
    protected _systemTheme = '';
    protected _dictionaries: string[] = [];
    protected _systemName: string = '';
    protected _moonNameless: number = -1;
    protected _planetNameless: number = -1;
    protected _used: number[] = [];

    protected _random: RandomSeedFactory | undefined;

    get random(): RandomSeedFactory {
        if (this._random === undefined) {
            throw new Error('seed factory not set.');
        }

        return this._random;
    }

    protected _techLevel: number = 0;

    // noinspection JSUnusedGlobalSymbols
    get techLevel(): number {
        return this._techLevel;
    }

    protected _denizenName: string = '';

    // noinspection JSUnusedGlobalSymbols
    get denizenName(): string {
        return this._denizenName;
    }

    setup(randomSeedFactory: RandomSeedFactory): DenizenAbstractBase {
        this._random = randomSeedFactory;
        return this;
    }

    reset(): DenizenAbstractBase {
        this._random = undefined;
        this._techLevel = 0;
        this._denizenName = '';
        this._systemTheme = '';
        this._dictionaries = [];
        this._systemName = '';
        this._moonNameless = -1;
        this._planetNameless = -1;
        this._used = [];
        return this;
    }

    abstract generateSystemName(): string;

    abstract generateStarNames(qty: number): string[];

    abstract generatePlanetName(position: number): string;

    abstract generateMoonName(planetName: string, position: number): string;

    getTheme(themes: ThemeChance[], rand: number, def: string): string {
        themes.forEach((chance) => {
            if (rand <= chance.chance) {
                return chance.theme;
            }
        });

        return def;
    }

    shuffleDictionary() {
        for (let i = this._dictionaries.length - 1; i > 0; i--) {
            const j = Math.floor(this.random.random() * (i + 1));
            [this._dictionaries[i], this._dictionaries[j]] = [this._dictionaries[j], this._dictionaries[i]];
        }
    }
}
