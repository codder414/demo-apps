import * as _ from 'lodash';

export enum CellState {
    NotDefined = 0,
    Wrong = 1 << 0,
    HasColor = 1 << 1,
    ExactPosition = 1 << 2,
    ExactMatch = HasColor | ExactPosition
}

export enum Colors {
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
    Yellow = 'Yellow',
    Violet = 'Violet'
}

export enum GameState {
    GameOver = 'GameOver',
    Win = 'Win',
    Playing = 'Playing'
}

export interface ICell {
    state: CellState;
    color: Colors;
}


export const humanStates = {
    [CellState.ExactMatch]: 'Correct!',
    [CellState.ExactPosition]: 'Exact Position',
    [CellState.HasColor]: 'Has Color',
    [CellState.NotDefined]: 'Not Defined',
    [CellState.Wrong]: 'Wrong'
}

const SAMPLE_ROW_SIZE = 4;

export type SampleRow = [ICell, ICell, ICell, ICell];

export type ColorSet = [Colors,Colors,Colors,Colors];

export class Cell implements ICell {
    public state: CellState = CellState.NotDefined;
    public color: Colors;

    public constructor(color: Colors, state?:CellState) {
        if(state !== undefined){
            this.state = state;
        }
        this.color = color;
    }
}

export class InitialCell extends Cell {
    public state: CellState = CellState.ExactMatch;
}

function getUniq(arr: any[]) {
    return [...new Set(arr)];
}

function hasDuplicates(row): boolean {
    return getUniq(row).length !== SAMPLE_ROW_SIZE 
        && row.length === SAMPLE_ROW_SIZE;
}


class User {
    public id: number;
    public name: string;

    public sayHello(){
        console.log('Hello,World');
    }

    public isAdmin: boolean
    
}


class UserCollection{
    public users: User[] = [];

    public addUser(user: User){
        this.users.push(user);
    }

    public remoteUser(user: User): number {
        
    }
}

export function compare(initial: SampleRow, currentRow: SampleRow) {
    if( hasDuplicates(currentRow) ) {
        throw new Error('There are duplicates in row!');
    }

    const initialColors = initial.map(cell => cell.color); 
    
    const clonedCurrentRow: SampleRow = _.clone(currentRow);
    const controller = 'Point';

    for(let index in currentRow){
        const currentCell = currentRow[index];
        const initialCell = initial[index];

        const userColorPosition = initialColors.indexOf(currentCell.color);
        
        if ( userColorPosition !== -1) {
            clonedCurrentRow[index] = new Cell(currentCell.color, CellState.HasColor);
        }

        if ( currentCell.color === initialCell.color ) {
            clonedCurrentRow[index] = new Cell(currentCell.color, clonedCurrentRow[index].state | CellState.ExactPosition);
        }

        if(clonedCurrentRow[index].state === CellState.NotDefined ) {
            clonedCurrentRow[index] = new Cell(currentCell.color, CellState.Wrong);
        }
    }

    return clonedCurrentRow;
}

class Round {
    public static MAX_ROUNDS_NUM = 8;
    public cells: SampleRow;

    public constructor(cells: SampleRow) {
        this.cells = cells;
    }

    public getResults(): { [t: string]: string } {
        return this.cells.reduce((acc, current) => {
            acc[current.color] = humanStates[current.state];
            return acc;
        }, Object.create(null));
    }

    public isWin() {
        return this.cells.every(cell => cell.state === CellState.ExactMatch);
    }
}


export class Game {
    public maxRounds = Round.MAX_ROUNDS_NUM;
    public initialRow: SampleRow;
    public rounds: Round[] = [];
    public gameState: GameState = GameState.Playing;

    public constructor(...colors: ColorSet){
        this.initialRow = colors.map((color: Colors) => new InitialCell(color)) as SampleRow;
    }

    public play(...colorSet: ColorSet) {
        if(this.gameState !== GameState.Playing) {
            return console.log(this.gameState);
        } else {
            if(this.isRoundsExceeded()) {
                this.gameState = GameState.GameOver;
                return 
            }
            this.playRound(colorSet);
        }
    }

    private playRound(colorSet: ColorSet) {
        const row: SampleRow = colorSet.map(color => new Cell(color)) as SampleRow;
        const result = compare(this.initialRow, row);
        const round = new Round(result);
        
        if( round.isWin()) {
            this.gameState = GameState.Win;
        }

        this.rounds.push(round);
    }

    public isRoundsExceeded(): boolean {
        return this.rounds.length > this.maxRounds;
    }

    public getGameStats() {
        return this.rounds.map(round => round.getResults());
    }

    
}

// const game = new Game([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Blue, Colors.Green, Colors.Red, Colors.Yellow]);
// game.play([Colors.Green, Colors.Blue, Colors.Red, Colors.Yellow]);
// console.log(game.getGameStats());
// game.play([Colors.Green, Colors.Blue, Colors.Red, Colors.Yellow]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// game.play([Colors.Red, Colors.Green, Colors.Blue, Colors.Violet]);
// console.log(game.getGameStats());