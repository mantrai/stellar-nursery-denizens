import DefaultRandomizer from 'stellar-nursery-shared/lib/default-randomizer';
import TyrCommonwealthDenizen from '../denizens/tyr-commonwealth-denizen';

test('Default Randomizer all nameless', () => {
    let random = new DefaultRandomizer();
    random.setSeed('14779772585652506');
    let denizen = new TyrCommonwealthDenizen();
    denizen.setup(random);
    expect(random.getSeed()).toBe('14779772585652506');
    expect(denizen.generateSystemName()).toBe('Minokawa');
    expect(denizen.generateStarNames(3)).toStrictEqual(['Minokawa Alpha', 'Minokawa Beta', 'Minokawa Gamma']);
    let planets = [];
    planets.push(denizen.generatePlanetName(1));
    planets.push(denizen.generatePlanetName(2));
    planets.push(denizen.generatePlanetName(3));
    planets.push(denizen.generatePlanetName(4));
    expect(planets).toStrictEqual(['Minokawa-I', 'Minokawa-II', 'Minokawa-III', 'Minokawa-IV']);

    const moonResults = [
        ['Minokawa-I-Alpha'],
        ['Minokawa-II-Alpha', 'Minokawa-II-Beta', 'Minokawa-II-Gamma', 'Minokawa-II-Delta', 'Minokawa-II-Epsilon'],
        ['Minokawa-III-Alpha', 'Minokawa-III-Beta'],
        [],
    ];
    for (let i = 0; i < planets.length; i++) {
        let moons = [];
        let x = random.between(0, 6);
        for (let k = 0; k < x; k++) {
            let pos = k + 1;
            moons.push(denizen.generateMoonName(planets[i], pos));
        }
        expect(moons).toStrictEqual(moonResults[i]);
    }
});

test('Default Randomizer nameless planets', () => {
    let random = new DefaultRandomizer();
    random.setSeed('87593671061958780');
    let denizen = new TyrCommonwealthDenizen();
    denizen.setup(random);
    expect(random.getSeed()).toBe('87593671061958780');
    expect(denizen.generateSystemName()).toBe('Capricornus');
    expect(denizen.generateStarNames(3)).toStrictEqual(['Capricornus Alpha', 'Capricornus Beta', 'Capricornus Gamma']);
    let planets = [];
    planets.push(denizen.generatePlanetName(1));
    planets.push(denizen.generatePlanetName(2));
    planets.push(denizen.generatePlanetName(3));
    planets.push(denizen.generatePlanetName(4));
    expect(planets).toStrictEqual(['Capricornus-I', 'Capricornus-II', 'Capricornus-III', 'Capricornus-IV']);

    const moonResults = [
        ['Ondine', 'Werewolf'],
        ['Tennin', 'Nue', 'Dryad'],
        ['Jorōgumo'],
        ['Sidehill', 'Ghoul', 'Mermaid', 'Owlman', 'Demon'],
    ];
    for (let i = 0; i < planets.length; i++) {
        let moons = [];
        let x = random.between(0, 6);
        for (let k = 0; k < x; k++) {
            let pos = k + 1;
            moons.push(denizen.generateMoonName(planets[i], pos));
        }
        expect(moons).toStrictEqual(moonResults[i]);
    }
});

test('Default Randomizer no nameless', () => {
    let random = new DefaultRandomizer();
    random.setSeed('50753275929720210');
    let denizen = new TyrCommonwealthDenizen();
    denizen.setup(random);
    expect(random.getSeed()).toBe('50753275929720210');
    expect(denizen.generateSystemName()).toBe('Dwarf');
    expect(denizen.generateStarNames(3)).toStrictEqual(['Dwarf Alpha', 'Dwarf Beta', 'Dwarf Gamma']);
    let planets = [];
    planets.push(denizen.generatePlanetName(1));
    planets.push(denizen.generatePlanetName(2));
    planets.push(denizen.generatePlanetName(3));
    planets.push(denizen.generatePlanetName(4));
    expect(planets).toStrictEqual(['Lucifer', 'Kamaitachi', 'Salamander', 'Redcap']);

    const moonResults = [
        ['Hugin', 'Haetae', 'Wyvern', 'Vampire', 'Potamus'],
        ['Narasimha', 'Mokumokuren', 'Ammit'],
        ['Griffin', 'Madame', 'Adlet', 'Fairy', 'Ceryneian'],
        ['Nue', 'Ziz', 'Tsuchinoko'],
    ];
    for (let i = 0; i < planets.length; i++) {
        let moons = [];
        let x = random.between(0, 6);
        for (let k = 0; k < x; k++) {
            let pos = k + 1;
            moons.push(denizen.generateMoonName(planets[i], pos));
        }
        expect(moons).toStrictEqual(moonResults[i]);
    }
});
