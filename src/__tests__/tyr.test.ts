import DefaultRandomizer from 'stellar-nursery-shared/lib/default-randomizer';
import TyrCommonwealthDenizen from '../denizens/tyr-commonwealth-denizen';

test('Default Randomizer', () => {
    let random = new DefaultRandomizer();
    random.setSeed('1234567890');
    let denizen = new TyrCommonwealthDenizen();
    denizen.setup(random);
    expect(random.getSeed()).toBe('1234567890');
    expect(denizen.generateSystemName(true)).toBe('Gullveig');
    expect(denizen.generateStarNames(3)).toStrictEqual(['Gullveig Alpha', 'Gullveig Beta', 'Gullveig Gamma']);
    let planets = [];
    planets.push(denizen.generatePlanetName(0));
    planets.push(denizen.generatePlanetName(1));
    planets.push(denizen.generatePlanetName(2));
    planets.push(denizen.generatePlanetName(3));
    expect(planets).toStrictEqual(['Loddfáfnir', 'Gæirreðr', 'Frægr', 'Bjǫrt']);

    const moonResults = [
        ['Baudihillia'],
        ['Heiðr'],
        ['Jǫrð', 'Klœngr', 'Holler', 'Aurvandill', 'Hjúki'],
        ['Eisa', 'Hermóðr', 'Hlévargr', 'Boddi'],
    ];
    for (let i = 0; i < planets.length; i++) {
        let pos = i + 1;
        let moons = [];
        let x = random.between(0, 6);
        for (let k = 0; k < x; k++) {
            moons.push(denizen.generateMoonName(planets[i], pos));
        }

        expect(moons).toStrictEqual(moonResults[i]);
    }
});
