import DenizenAbstractBase from './denizen-abstract-base';
import { ThemeMythologyNorse } from '../dict/theme/mythology/norse';
import { ThemeMythologyGermanic } from '../dict/theme/mythology/germanic';
import { ThemeMythologyChinese } from '../dict/theme/mythology/chinese';
import { NumericGreek } from '../dict/numeric/greek';
import { ThemeAnimalsMythical } from '../dict/theme/animals/mythical';
import { NumericRoman } from '../dict/numeric/roman';
import RandomSeedFactory from 'stellar-nursery-shared/lib/random-seed-factory';
import RollResults from 'stellar-nursery-shared/lib/roll-results';

export default class TyrCommonwealthDenizen extends DenizenAbstractBase {
    private _roman: string[] = [];
    private _greek: string[] = [];
    setup(randomSeedFactory: RandomSeedFactory): TyrCommonwealthDenizen {
        this.reset();
        super.setup(randomSeedFactory);
        this._techLevel = 15;
        this._denizenName = 'Tyr Commonwealth';

        const pickPopulatedTheme = [
            new RollResults<string>(70, 'protoNorse'),
            new RollResults<string>(95, 'chinese'),
            new RollResults<string>(100, 'ThemeAnimalsMythical'),
        ];

        const pickUnPopulatedTheme = [
            new RollResults<string>(50, 'protoNorse'),
            new RollResults<string>(60, 'chinese'),
            new RollResults<string>(100, 'ThemeAnimalsMythical'),
        ];

        this._populatedSystemTheme = this.random.getRollResult<string>(
            pickPopulatedTheme,
            this.random.between(1, 100),
            'protoNorse',
        );
        this._systemTheme = this.random.getRollResult<string>(
            pickUnPopulatedTheme,
            this.random.between(1, 100),
            'ThemeAnimalsMythical',
        );

        this.setThemeData(this._populatedSystemTheme, 'populated');
        this.setThemeData(this._systemTheme, 'unpopulated');
        this._greek = NumericGreek;
        this._roman = NumericRoman;

        return this;
    }

    private setThemeData(theme: string, key: string) {
        switch (theme) {
            case 'protoNorse':
                this.appendValues(key, ThemeMythologyNorse);
                this.appendValues(key, ThemeMythologyGermanic);
                this.shuffleValues(key);
                break;
            case 'chinese':
                this.appendValues(key, ThemeMythologyChinese);
                this.shuffleValues(key);
                break;
            case 'ThemeAnimalsMythical':
                this.appendValues(key, ThemeAnimalsMythical);
                this.shuffleValues(key);
                break;
        }
    }

    generateStarNames(qty: number): string[] {
        const output: string[] = [];
        for (let i = 0; i < qty; i++) {
            output.push(this._systemName + ' ' + this._greek[i]);
        }
        return output;
    }

    generateSystemName(isPopulated: boolean): string {
        const key = isPopulated ? 'populated' : 'unpopulated';
        const output: string | boolean = this.getRandomValue(key);

        this._isPopulated = isPopulated;
        this._systemName = output === false ? '' : output as string;
        return this._systemName;
    }

    generateMoonName(planetName: string, position: number): string {
        let output: string | boolean;

        if (this._isPopulated) {
            output = this.getRandomValue('populated');
        } else {
            output = planetName + '-' + this._greek[position];
        }

        return output === false ? '' : output as string;
    }

    generatePlanetName(position: number): string {
        let output: string | boolean = '';

        if (this._isPopulated) {
            output = this.getRandomValue('populated');
        } else {
            output = this._systemName + ' ' + this._roman[position];
        }

        return output === false ? '' : output as string;
    }
}
