import React from "react";
import './2048.css';

class Board extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            'board':[
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ],
            newEl:{
                row:false,
                col:false
            }
        };
        
    }
    componentDidMount() {
        this.randomcells();
        const body = document.querySelector('body');
        body.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    handleKeyDown(e) {
        e.preventDefault();
        const up = 38;
        const right = 39;
        const down = 40;
        const left = 37
        const n = 78;
        if (e.keyCode === up) {
            this.moveup();
        } else if (e.keyCode === right) {
            this.moveright();
        } else if (e.keyCode === down) {
            this.movedown();
        } else if (e.keyCode === left) {
            this.moveleft();
        } else if (e.keyCode === n && e.altKey) 
        {
            this.newgame();
        }
    }
/*     componentDidMount()
    {
        this.randomcells();
    } */
    newgame = ()=>{
        /* this.setState({
            'board': [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        });
        this.randomcells();
        this.forceUpdate();
 */ 
        let gamestate = this.state;
        
        gamestate.board= [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        this.setState(gamestate);
        this.randomcells();
        this.forceUpdate();
    }
    randomcells = ()=>{
        const gamestate = this.state;
        let boardstate = gamestate.board;
        let newEl = gamestate.newEl;
        let blankcords = [];
        for (let row in boardstate) {
            for (let cell in boardstate[row]) {
                if (boardstate[row][cell] === 0) {
                    blankcords.push([row,cell]);
                }
            }
        }
        if(blankcords.length>0)
        {
            const rC = blankcords[Math.floor(Math.random() * blankcords.length)];
            const randomNumber = this.randomStartingNumber();
            boardstate[rC[0]][rC[1]] = randomNumber;      
            newEl.row = rC[0];
            newEl.col = rC[1];
            
        }
        this.setState(gamestate.boardstate);
        this.forceUpdate();     
    }
    
     randomStartingNumber() {
        const startingNumbers = [2];
        const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
        return randomNumber;
    } 
/*     getblankcells = ()=>{
        
    } */
    moveright = (event) => {
        //event.preventDefault();
        
        const gamestate = this.state;
        let anyMoves = false;
        let boardstate = gamestate.board;
        for(let row in boardstate)
        {
            let pivot = boardstate[row].length;
                let next = pivot;
                let lastzero = false;
                if (boardstate[row][pivot] == 0){
                    lastzero = pivot;
                }
                while (pivot > 0 && next > 0) {
                    next--;
                    if(boardstate[row][next] > 0)
                    {
                        if (boardstate[row][pivot] == boardstate[row][next])
                        {
                            if (lastzero !== false && lastzero > pivot)
                            {
                                boardstate[row][lastzero] = boardstate[row][pivot] * 2;
                                boardstate[row][pivot] = 0;
                                anyMoves = true;
                                lastzero--;
                            }else{
                                boardstate[row][pivot] = boardstate[row][pivot] * 2;
                                lastzero = next;
                                anyMoves = true;
                            }
                            boardstate[row][next] = 0;
                            pivot = next;
                        }else{
                            if (lastzero !== false){
                                boardstate[row][lastzero] = boardstate[row][next];
                                boardstate[row][next] = 0;
                                anyMoves = true;
                                pivot = lastzero;
                                lastzero--;
                            }else{
                                pivot = next;
                            }
                        }
                    }else{
                        if (lastzero === false){
                            lastzero = next;
                        }
                    }
                }
        }
        
        this.setState(gamestate.boardstate);
        if (anyMoves)
        {
            this.randomcells();
        }else{
                this.forceUpdate();
            }
    }
    movedown = ()=>{
        //event.preventDefault();
        const gamestate = this.state;
        let anyMoves = false;
        let boardstate = gamestate.board;
        for (let cell in boardstate[0]) {
            cell=parseInt(cell);
            let pivot = boardstate[0].length-1;
            let next = pivot;
            let lastzero = false;
            if (boardstate[pivot][cell] == 0) {
                lastzero = pivot;
            }
            while (pivot > 0 && next > 0) {
                next--;
                if (boardstate[next][cell] > 0) {
                    if (boardstate[pivot][cell] == boardstate[next][cell]) {
                        if (lastzero !== false && lastzero > pivot) {
                            boardstate[lastzero][cell] = boardstate[pivot][cell] * 2;
                            boardstate[pivot][cell] = 0;
                            anyMoves = true;
                            lastzero--;
                        } else {
                            boardstate[pivot][cell] = boardstate[pivot][cell] * 2;
                            lastzero = next;
                            anyMoves = true;
                        }
                        boardstate[next][cell] = 0;
                        pivot = next;
                    } else {
                        if (lastzero !== false) {
                            boardstate[lastzero][cell] = boardstate[next][cell];
                            boardstate[next][cell] = 0;
                            anyMoves = true;
                            pivot = lastzero;
                            lastzero--;
                        } else {
                            pivot = next;
                        }
                    }
                } else {
                    if (lastzero === false) {
                        lastzero = next;
                    }
                }
            }
        }
        this.setState(gamestate.boardstate);
        if (anyMoves) {
            this.randomcells();
        } else {
            this.forceUpdate();
        }
    }
    moveleft = ()=>{
        const gamestate = this.state;
        let anyMoves = false;
        let boardstate = gamestate.board;
        for (let row in boardstate) {
            let pivot = 0;
            let next = pivot;
            let lastzero = false;
            if (boardstate[row][pivot] == 0) {
                lastzero = pivot;
            }
            while (pivot < boardstate[row].length && next < boardstate[row].length) {
                next++;
                if (boardstate[row][next] > 0) {
                    if (boardstate[row][pivot] == boardstate[row][next]) {
                        if (lastzero !== false && lastzero < pivot) {
                            boardstate[row][lastzero] = boardstate[row][pivot] * 2;
                            boardstate[row][pivot] = 0;
                            anyMoves = true;
                            lastzero++;
                        } else {
                            boardstate[row][pivot] = boardstate[row][pivot] * 2;
                            lastzero = next;
                            anyMoves = true;
                        }
                        boardstate[row][next] = 0;
                        pivot = next;
                    } else {
                        if (lastzero !== false) {
                            boardstate[row][lastzero] = boardstate[row][next];
                            boardstate[row][next] = 0;
                            anyMoves = true;
                            pivot = lastzero;
                            lastzero++;
                        }else{
                            pivot = next;
                        }
                    }
                } else {
                    if (lastzero === false) { 
                        lastzero = next;
                    }
                }
            }
        }
        this.setState(gamestate.boardstate);
        if (anyMoves) {
            this.randomcells();
        } else {
            this.forceUpdate();
        }
    }

    moveup = ()=>{
        const gamestate = this.state;
        let anyMoves = false;
        let boardstate = gamestate.board;
        for (let cell in boardstate[0]) {
            cell = parseInt(cell);
            let pivot = 0;
            let next = pivot;
            let lastzero = false;
            if (boardstate[pivot][cell] == 0) {
                lastzero = pivot;
            }
            
            while (pivot < boardstate.length-1 && next < boardstate.length-1) {
                next++;
                if (boardstate[next][cell] > 0) {
                    if (boardstate[pivot][cell] == boardstate[next][cell]) {
                        if (lastzero !== false && lastzero < pivot) {
                            boardstate[lastzero][cell] = boardstate[pivot][cell] * 2;
                            boardstate[pivot][cell] = 0;
                            anyMoves = true;
                            lastzero++;
                        } else {
                            boardstate[pivot][cell] = boardstate[pivot][cell] * 2;
                            lastzero = next;
                            anyMoves = true;
                        }
                        boardstate[next][cell] = 0;
                        pivot = next;
                    } else {
                        if (lastzero !== false) {
                            boardstate[lastzero][cell] = boardstate[next][cell];
                            boardstate[next][cell] = 0;
                            anyMoves = true;
                            pivot = lastzero;
                            lastzero++;
                        } else {
                            pivot = next;
                        }
                    }
                } else {
                    if (lastzero === false) {
                        lastzero = next;
                    }
                }
            }
        }
        this.setState(gamestate.boardstate);
        if (anyMoves) {
            this.randomcells();
        } else {
            this.forceUpdate();
        }
    }

    
    render()
    {
        return (
            <div>
                <div id="main">
                    <div className="button" onClick={this.newgame}>
                        New Game
                        </div>
                    <div className="buttons">
                        <div className="button" onClick={this.moveup}>Up</div>
                        <div className="button" onClick={this.moveright}>Right</div>
                        <div className="button" onClick={this.movedown}>Down</div>
                        <div className="button" onClick={this.moveleft}>Left</div>
                    </div>
                    <div className="score">
                    </div>
                    <table>
                        <tbody>
                            {
                                this.state.board.map((board, row) => {
                                return (
                                    <Createrow key={'cr_' + row} newEl={this.state.newEl}  board={board} row={row} />
                                );
                            })
                            }
                        </tbody>
                    </table>
                    <p></p>
                </div>
            </div>
        );
    }
} 
const Createrow = (props) => {
    return (
        <tr key={'row_' + props.row}>
            {props.board.map((cell, index) => {
                let newElClass = "existing-el";
                let newEl = props.newEl;
                if (props.row === parseInt(newEl.row) && index === parseInt(newEl.col)){
                    newElClass = "new-el";
                }
                return (
                    <td key={'cell_' + index}>
                    <div className="cell-parent">
                        <div className={`cell color-${cell} ${newElClass}`}>
                            <div className="number">{cell > 0 ? cell : ''}</div>
                        </div>
                    </div>    
                    </td>
                );
            })}
        </tr>
    );
}
export default Board;