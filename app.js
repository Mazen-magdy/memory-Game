

function TheGame(Name){
// Create the base 
 // head creation
 let body = document.getElementsByTagName('body')[0];
 let head = document.createElement('div');
 let flipsound = new Audio('./sounds/flip.wav');
 let wrongsound = new Audio('./sounds/wrong.wav');
 let rightsound = new Audio('./sounds/right.wav');
 head.setAttribute('id', 'head');
 let greatingP = document.createElement('p');
 greatingP.setAttribute('id', 'greating');
    greatingP.innerHTML = `Hello ${Name}!`;
 let errorCounterP = document.createElement('p');
 errorCounterP.setAttribute('id', 'errorCounter');
 head.appendChild(greatingP);
 head.appendChild(errorCounterP);
 body.appendChild(head);
// game creation
 let picArr = [


     {
     src: './imgs/1.png',
     repeated: 0
     }, {
     src: './imgs/2.png',
     repeated: 0
     }, {
     src: './imgs/3.png',
     repeated: 0
     }, {
     src: './imgs/4.png',
     repeated: 0
     }, {
     src: './imgs/5.png',
     repeated: 0
     }, {
     src: './imgs/6.png',
     repeated: 0
     }, {
     src: './imgs/7.png',
     repeated: 0
     }, {
     src: './imgs/8.png',
     repeated: 0
     }, {
     src: './imgs/9.png',
     repeated: 0
     }, {
     src: './imgs/10.png',
     repeated: 0
 }];
 let game = document.createElement('div');
 let gameArr = []
 game.setAttribute('id', 'game');
 for (let i = 0; i < 20; i++) {
     let card = document.createElement('div');
     card.setAttribute('class', 'container norotate');
     card.setAttribute('id', i);
     
     card.innerHTML = `
                     <div class="unknown" ><img src="./imgs/QM.png" alt="Hidden"></div>
                     <div class="picture"  id="${i}"><img src ="${picProvider(picArr)}"></div>
                     `;
     gameArr.push(card);
     game.appendChild(card);
 }
 body.appendChild(game);

 
 function picProvider(picArr){
     let random = Math.floor(Math.random() * picArr.length);
     while(picArr[random].repeated >= 2){
         console.log('repeated');
         
         picArr.splice(random, 1);
         random = Math.floor(Math.random() * picArr.length);
     }
     
     let src = picArr[random].src;
     picArr[random].repeated++;

     return src;
 }
 
// end of game creation
// end of creation

//actions
let errorCounter = 0;
let rightCounter = 0;
errorCounterP.innerHTML = `Errors: ${errorCounter}`
let arrOfVisibles = [];
let nOfVisible = 0;
gameArr.forEach((card,index) => {
 card.addEventListener('click', function(){
     let unknown = card.getElementsByClassName('unknown')[0];
     let picture = card.getElementsByClassName('picture')[0];
     unknown.classList.remove('unrotate');
     unknown.classList.remove('rotated');
     picture.classList.remove('unrotate');
     picture.classList.remove('rotated');
     console.log(unknown, picture);
     
     if (card.classList.contains('norotate') && nOfVisible < 2){
        flipsound.play();
         unknown.classList.add('rotated');
         picture.classList.add('unrotate');
         card.classList.remove('norotate');
         card.classList.add('rotate');
         nOfVisible++
         console.log(nOfVisible);
         arrOfVisibles.push(card);
     }
     
         if(nOfVisible === 2){
             setTimeout(() => {
                 let unknown0 = arrOfVisibles[0].getElementsByClassName('unknown')[0];
                 let picture0 = arrOfVisibles[0].getElementsByClassName('picture')[0];
                 let unknown1 = arrOfVisibles[1].getElementsByClassName('unknown')[0];
                 let picture1 = arrOfVisibles[1].getElementsByClassName('picture')[0];
                 console.log(picture0, picture1);
                 
                 if(picture0.innerHTML === picture1.innerHTML){
                  console.log('match');
                     arrOfVisibles = [];
                     nOfVisible = 0;
                        rightsound.play();
                     rightCounter++
                 }
                 else{
                    wrongsound.play();
                      unknown.classList.add('unrotate');
                      unknown.classList.remove('rotated');
                      picture.classList.add('rotated');
                      picture.classList.remove('unrotate');
      
                      card.classList.remove('rotate');
                      card.classList.add('norotate');
                      unknown = arrOfVisibles[0].getElementsByClassName('unknown')[0];
                      picture = arrOfVisibles[0].getElementsByClassName('picture')[0];
      
                      unknown.classList.add('unrotate');
                      unknown.classList.remove('rotated');
                      picture.classList.add('rotated');
                      picture.classList.remove('unrotate');
      
                      arrOfVisibles[0].classList.remove('rotate');
                      arrOfVisibles[0].classList.add('norotate');
                      errorCounter++
                         errorCounterP.innerHTML = `Errors: ${errorCounter}`;
                      arrOfVisibles = [];
                      nOfVisible = 0;
                 }
                 if(rightCounter === 10){
                     setTimeout(() => {
                         alert('You win!');

                         location.reload();
                     }, 1000)
                 }
             }, 1000)
          }
     
 }) 

})
}

let startGame = document.getElementById('startGame');

startGame.addEventListener('click', () => {
    let Name = document.getElementById('name')
    if(Name.value == ''){
    console.log(Name); 
    alert('Please enter your name');
    }
    else{
        Name.classList.add('disabled');
        startGame.classList.add('disabled');
        TheGame(Name.value);
    }
});