import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Game} from '../src/index';
import {SampleRow, Colors, ColorSet} from '../src/Game';

describe('Test game mastermind', function(){

    // Arragement
    const initialColors: ColorSet = [Colors.Green, Colors.Red, Colors.Violet, Colors.Yellow];

    it('should return game instance', (done) => {
        const game = new Game(...initialColors);
        expect(game).to.be.instanceOf(Game);
        done();
    });

    it('should return error if duplicate color', (done) => {
        const initialColors = [Colors.Red, Colors.Red, Colors.Blue, Colors.Yellow];
        const game = new Game(...initialColors as ColorSet)
        expect(game).to.throw()
        done();
    })

});


// rounds = 8;
// colors = 4;
// states = 3
