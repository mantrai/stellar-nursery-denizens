export default class ThemeChance {
    private readonly _chance: number;
    private readonly _theme: string;

    constructor(chance: number, theme: string) {
        this._chance = chance;
        this._theme = theme;
    }

    public get chance(): number {
        return this._chance;
    }

    public get theme(): string {
        return this._theme;
    }
}
