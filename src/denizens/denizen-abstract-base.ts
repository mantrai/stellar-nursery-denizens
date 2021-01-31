import RandomSeedFactory from 'stellar-nursery-shared/lib/random-seed-factory';

export default abstract class DenizenAbstractBase {
    protected _random: RandomSeedFactory | undefined;
    protected _techLevel: number = 0;
    protected _denizenName: string = '';
    protected _populatedSystemTheme = '';
    protected _systemTheme = '';
    protected _dictionaries: Map<string, string[]> = new Map<string, string[]>();
    protected _isPopulated: boolean = false;
    protected _systemName: string = '';

    public setup(randomSeedFactory: RandomSeedFactory): DenizenAbstractBase {
        this._random = randomSeedFactory;
        return this;
    }

    public reset(): DenizenAbstractBase {
        this._random = undefined;
        this._techLevel = 0;
        this._denizenName = '';
        this._populatedSystemTheme = '';
        this._systemTheme = '';
        this._dictionaries = new Map<string, string[]>();
        this._systemName = '';
        this._isPopulated = false;
        return this;
    }

    public get random(): RandomSeedFactory {
        if (this._random === undefined) {
            throw new Error('seed factory not set.');
        }

        return this._random;
    }

    public get techLevel(): number {
        return this._techLevel;
    }

    public get denizenName(): string {
        return this._denizenName;
    }

    protected getValues(key: string): string[] {
        return this._dictionaries.has(key) ? <string[]>this._dictionaries.get(key) : <string[]>[];
    }

    protected replaceValues(key: string, values: string[]) {
        this._dictionaries.set(key, values);
    }

    protected appendValues(key: string, values: string[]) {
        this._dictionaries.set(key, this.mergeUniqueArrays<string>(this._dictionaries.get(key), values));
    }

    protected shuffleValues(key: string) {
        this.replaceValues(key, this.shuffle(this._dictionaries.get(key)));
    }

    protected getRandomValue(key: string): string | boolean {
        let values: string[] = this._dictionaries.has(key) ? <string[]>this._dictionaries.get(key) : [];
        let len = values.length - 1;
        return values[this.random.between(0, len)];
    }

    protected mergeUniqueArrays<T>(arr1: T[] | undefined, arr2: T[]) {
        if (arr1 === undefined) {
            return arr2;
        }
        return [...new Set(arr1.concat(...arr2))];
    }

    protected shuffle<T>(arr1: T[] | undefined): T[] {
        if (arr1 === undefined) {
            return [];
        }
        if (this._random === undefined) {
            throw new Error('seed factory not set.');
        }
        let currentIndex = arr1.length,
            temporaryValue,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(this._random.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr1[currentIndex];
            arr1[currentIndex] = arr1[randomIndex];
            arr1[randomIndex] = temporaryValue;
        }
        return arr1;
    }

    abstract generateSystemName(isPopulated: boolean): string;
    abstract generateStarNames(qty: number): string[];
    abstract generatePlanetName(position: number): string;
    abstract generateMoonName(planetName: string, position: number): string;
}
