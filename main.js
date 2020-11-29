//INPUT
const gameBoard = document.getElementById('game-board');

document.getElementById('formInput').addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();
  //clear reset
  gameBoard.innerHTML = '';

  let axeX = getInputVal('axeX');
  let axeY = getInputVal('axeY');
  let xAspi = getInputVal('xAspi');
  let yAspi = getInputVal('yAspi');
  let ori = getInputVal('ori');
  let ins = getInputVal('ins');

  let charsIns = ins.split('');
  
  //change taille
  gameBoard.style.gridTemplateColumns = `repeat( ${+axeX}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat( ${+axeY}, 1fr)`;

  //clear Form
  document.getElementById('formInput').reset();
  
  // initilisation
  const initAspi = [{ x: +xAspi, y: +yAspi, d: ori }];
  const aspiContent = [{ x: +xAspi, y: +yAspi, d: ori }];
  
  const Instructions  = charsIns;

  // function update
  const update = () => {
    for(let i = 0; i <= Instructions .length - 1; i++){
        getInputDirection(Instructions [i]);
        initAspi[0].x += inputDirection.x;
        initAspi[0].y += inputDirection.y;
        initAspi[0].d = inputDirection.d;  
        aspiContent.push({x: initAspi[0].x, y: initAspi[0].y, d: initAspi[0].d });
    } 
    console.log('Instruction',Instructions )
    //console.log(aspiContent);
    draw(gameBoard); 

    console.log('Check position finale:',aspiContent[Instructions.length])
  }

  // function dessiner
  const draw = (gameBoard) => {
    for(let i=0; i < Instructions .length + 1; i++){
      setTimeout(() => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = -aspiContent[i].y;
        snakeElement.style.gridColumnStart = aspiContent[i].x;
        snakeElement.classList.add('aspirateur');
        snakeElement.classList.add('show');
        gameBoard.appendChild(snakeElement);
        setTimeout(() => {
          snakeElement.classList.remove('show');
        }, 500);
        
        console.log('Etap ',i,aspiContent[i]);
      }, i*1000); 
    }
  }

  update();
}

// Change direction
function getInputVal(id){
  return document.getElementById(id).value;
}

let inputDirection = { x: 0, y: 0, d: 'N' };

const getInputDirection = (Instructions ) =>{
  let copyInputDirection = inputDirection;

  switch(Instructions ){
    case 'A':
      if (copyInputDirection.d == 'N'){
        inputDirection = { x: 0, y: +1, d: 'N' };
      }
      if (copyInputDirection.d == 'E'){
        inputDirection = { x: +1, y: 0, d: 'E' };
      }
      if (copyInputDirection.d == "S"){
        inputDirection = { x: 0, y: -1, d: 'S' };
      }
      if (copyInputDirection.d == 'W'){
        inputDirection = { x: -1, y: 0, d: 'W' };
      }
      break;

    case 'G':
      if (copyInputDirection.d == 'N'){
        inputDirection = { x: 0, y: 0, d: 'W' };
      }
      if (copyInputDirection.d == 'E'){
        inputDirection = { x: 0, y: 0, d: 'N' };
      }
      if (copyInputDirection.d == 'S'){
        inputDirection = { x: 0, y: 0, d: 'E' };
      }
      if (copyInputDirection.d == 'W'){
        inputDirection = { x: 0, y: 0, d: 'S' };
      }
      break;

      case 'D':
      if (copyInputDirection.d == 'N'){
        inputDirection = { x: 0, y: 0, d : 'E' };
      }
      if (copyInputDirection.d == 'E'){
        inputDirection = { x: 0, y: 0, d: 'S' };
      }
      if (copyInputDirection.d == 'S'){
        inputDirection = { x: 0, y: 0, d: 'W' };
      }
      if (copyInputDirection.d == 'W'){
        inputDirection = { x: 0, y: 0, d: 'N' };
      }
      break;
  }
  return inputDirection;
}





