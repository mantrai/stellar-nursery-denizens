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

    abstract generateSystemName(isPopulated: boolean): string;
    abstract generateStarNames(qty: number): string[];
    abstract generatePlanetName(position: number): string;
    abstract generateMoonName(planetName: string, position: number): string;
}
