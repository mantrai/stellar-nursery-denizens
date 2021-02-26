export default class ThemeChance {
    constructor(chance: number, theme: string) {
        this._chance = chance;
        this._theme = theme;
    }

    private _chance: number;

    public get chance(): number {
        return this._chance;
    }

    public set chance(value: number) {
        this._chance = value;
    }

    private _theme: string;

    public get theme(): string {
        return this._theme;
    }

    public set theme(value: string) {
        this._theme = value;
    }
}
