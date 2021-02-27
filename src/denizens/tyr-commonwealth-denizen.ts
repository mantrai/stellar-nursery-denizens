import DenizenAbstractBase from './denizen-abstract-base';
import { ThemeMythologyNorse } from '../dict/theme/mythology/norse';
import { ThemeMythologyGermanic } from '../dict/theme/mythology/germanic';
import { ThemeMythologyChinese } from '../dict/theme/mythology/chinese';
import { NumericGreek } from '../dict/numeric/greek';
import { ThemeAnimalsMythical } from '../dict/theme/animals/mythical';
import { NumericRoman } from '../dict/numeric/roman';
import RandomSeedFactory from 'stellar-nursery-shared/lib/random-seed-factory';
import ThemeChance from '../objects/theme-chance';

export default class TyrCommonwealthDenizen extends DenizenAbstractBase {
    private _roman: string[] = [];
    private _greek: string[] = [];

    setup(randomSeedFactory: RandomSeedFactory): TyrCommonwealthDenizen {
        this.reset();
        super.setup(randomSeedFactory);
        this._techLevel = 15;
        this._denizenName = 'Tyr Commonwealth';

        const pickTheme = [
            new ThemeChance(70, 'protoNorse'),
            new ThemeChance(95, 'chinese'),
            new ThemeChance(100, 'ThemeAnimalsMythical'),
        ];

        this._systemTheme = this.getTheme(pickTheme, this.random.between(1, 100), 'ThemeAnimalsMythical');

        this.setThemeData(this._systemTheme);
        this._greek = NumericGreek;
        this._roman = NumericRoman;

        return this;
    }

    generateStarNames(qty: number): string[] {
        const output: string[] = [];
        for (let i = 1; i <= qty; i++) {
            output.push(this._systemName + ' ' + this._greek[i]);
        }
        return output;
    }

    generateSystemName(): string {
        const index = this.random.between(0, this._dictionaries.length - 1);
        this._systemName = this._dictionaries[index];
        this._used.push(index);
        return this._systemName;
    }

    generateMoonName(planetName: string, position: number): string {
        let output;
        let index = this.random.between(0, this._dictionaries.length - 1);
        while (this._used.includes(index)) {
            index = this.random.between(0, this._dictionaries.length - 1);
        }

        if (this._moonNameless === -1) {
            this._moonNameless = this.random.between(1, 100) > 65 ? 0 : 1;
        }

        if (this._moonNameless === 0) {
            output = this._dictionaries[index];
            this._used.push(index);
        } else {
            output = planetName + '-' + this._greek[position];
        }

        return output;
    }

    generatePlanetName(position: number): string {
        let output;
        let index = this.random.between(0, this._dictionaries.length - 1);
        while (this._used.includes(index)) {
            index = this.random.between(0, this._dictionaries.length - 1);
        }

        if (this._planetNameless === -1) {
            this._planetNameless = this.random.between(1, 100) > 65 ? 0 : 1;
        }
        if (this._planetNameless === 0) {
            output = this._dictionaries[index];
            this._used.push(index);
        } else {
            output = this._systemName + '-' + this._roman[position];
        }

        return output;
    }

    private setThemeData(theme: string) {
        switch (theme) {
            case 'protoNorse':
                this._dictionaries = this._dictionaries.concat(ThemeMythologyNorse, ThemeMythologyGermanic);
                break;
            case 'chinese':
                this._dictionaries = this._dictionaries.concat(ThemeMythologyChinese);
                break;
            case 'ThemeAnimalsMythical':
                this._dictionaries = this._dictionaries.concat(ThemeAnimalsMythical);
                break;
        }
        this.shuffleDictionary();
    }
}
