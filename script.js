//to get all the boxes
let boxes=document.querySelectorAll(".box");
//to get reset button
let reset=document.querySelector("#reset-btn");
//to track that which player start the match..(kaun sa player start karega game ko)
let turnO=true;
let gameactive=true;//O will start the game..
//to write the winning patterns...
let newgamebtn=document.querySelector("#newbtn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
const resetgame=()=>{
    let turnO=true;
    gameactive=true;
    enableboxes();
    msgcontainer.classList.add("hide");
}
//button ko click karnre par kuch hona chahiye ushke liye hum listner use karenge..
//har box pe dalna padega ushke liye hum loop lagaye
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if(turnO===true){//yaha check kar rahe hai ki kya o ki turn hai agar hai toh O put hoga
            box.innerHTML="O";
            turnO=false;//phir O ko false kar denge(yani player x ki turn aa jayegi)
        }
        else{
            box.innerHTML="X";
            turnO=true;
        }
        box.disabled=true;//jab ek baar x ya o fill kar denge ushke baad dubara fill nhi karenge thats why we use disabled..
        checkwinner();
        
    });
});
const disabledboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
    gameactive=false;
};
const showdraw=()=>{
    msg.innerText="It's a draw!";
    msgcontainer.classList.remove("hide");
    disabledboxes();
    gameactive=false;
};

const checkwinner=()=>{//here we check the winning pattern
    for(pattern of winpatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val !="" && pos3val !=""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
            }
        }
        const isdraw=[...boxes].every(box=>box.innerText);
        if(isdraw){
        showdraw();
    }
}
};
newgamebtn.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);