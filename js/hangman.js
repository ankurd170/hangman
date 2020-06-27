
var words=[{"word":"mendicant","sent":"In others are the broken-down mendicants who live on soup-kitchens and begging","meaning":"a pauper who lives by begging"},
{"word":"meretricious","sent":"Mediocre actors are often undone by great material, but good ones can burnish even meretricious nonsense with craft and conviction.","meaning":"tastelessly showy"},
{"word":"vitiate","sent":"The new blood, however, instead of redeeming the tainted stock, itself became vitiated.","meaning":"make imperfect"},
{"word":"vapid","sent":"Tired of constantly hearing this same vapid truism, I asked him,'What then?","meaning":"lacking significance or liveliness or spirit or zest"},
{"word":"augur","sent":"Republicans believe the special election augurs well for them in November","meaning":"predict from an omen"},
{"word":"prosaic","sent":"But inside Greece, local leaders are struggling with more prosaic concerns, like trash pickups.","meaning":"lacking wit or imagination"},
{"word":"profligate","sent":"German voters are even more skeptical than their leaders about financing their 'slothful' and 'profligate' neighbors.","meaning":"unrestrained by convention or morality"},
{"word":"hoary","sent":"By thy glad youth, and tranquil prime Assured, I smile at hoary time!","meaning":"having gray or white hair as with age"},
{"word":"blase","sent":"Westwood is blase about going to next week's major as world number one or being favorite to win at Royal St George's.","meaning":"nonchalantly unconcerned"},
{"word":"insular","sent":"And yet, Japanese firms have remained largely insular, resisted change, and doubled down on existing strategies.","meaning":"narrowly restricted in outlook or scope"},
{"word":"baleful","sent":"There were no baleful stares at his box, only fist pumps after winning a well-played point.","meaning":"threatening or foreshadowing evil or tragic developments"},
{"word":"ostensible","sent":"Google insists its data gathering practice is done for the ostensible purpose of better serving its users.","meaning":"appearing as such but not necessarily so"},
{"word":"odium","sent":"It is now forgotten that with one exception—Johnson—no President ever went out of office so loaded with odium as Washington.","meaning":"hate coupled with disgust"},
{"word":"ephemeral","sent":"With services such as Amazon’s One-Click, money and transactions are more ephemeral than ever.","meaning":"anything short-lived, as an insect that lives only for a day"}];


var df=0;
var done=[],dn=0;
var nxt=0;
let chnc=9;


//start the game with the first random word

function randomstart()
{
    nxt=Math.floor(Math.random()*13);
    console.log(nxt);
    dispboxes(nxt);
    done[0]=nxt;
}


//display the word in the blank boxes (dynamically generated) form

function dispboxes(nxt)
{
    
    var reqstr=words[nxt].word.split("");
    var d=[];
    
    for (let i = 0; i < reqstr.length; i++) {
        
      d[i]=document.createElement("div");
      d[i].style.float="left";
      d[i].style.height="50px";
      d[i].style.width="50px";
      d[i].style.background="red";
      d[i].style.marginLeft="10px";
      d[i].style.fontSize="40px";
      document.getElementById("bbx").appendChild(d[i]);
      d[i].value=reqstr[i];
      d[i].innerHTML="---";
      
    }
    document.getElementById("mean").innerHTML="<b style='color:lightgreen'><u>Meaning:</u></b>"+words[nxt].meaning;
    
    guessbox(d);
    points(0,0);
    df=nxt;
}

var pts=[];


//calculate the number of points after each question

function points(red,flg)
{

pts[dn]=50-red;
document.getElementById("score").innerHTML="points for this  question:"+pts[dn];
if(flg==1)
{ var score=0;   
    for(var i=0;i<done.length;i++)
    score+=pts[i];
       
       document.getElementById("scorenow").innerHTML="total score till question "+(dn+1)+" :"+score;
       if(dn==5 || pts[dn]==0)
       {localStorage.setItem("sect",score);
       window.location.replace("result.html");
        }
}
}

//display the hint/example sentence for the word

function displayexample()
{
    var str=words[nxt].sent.split(" ");
    var strngs;
    
    for (var j = 0; j < str.length; j++) 
    {
        if(str[j].search(words[nxt].word)!=-1)
        {
         str[j]="__________";   
        }
            
     strngs=str.join(" ");   
    }


    document.getElementById("new").style.display="block";
    document.getElementById("new").innerHTML="<b>Sentence:</b><p style=color:'green'>"+strngs+"</p>";
    document.getElementById("eg").style.display="none";
    
    chances(--chnc);
    
}


//create the letter buttons for guessing the word

function guessbox(ary)
{
var bt=[];

    for (var i = 0; i <26; i++) 
    {
        bt[i]=document.createElement("button");
        bt[i].Class="btn";
        
        bt[i].innerHTML=String.fromCharCode(i+65); 
        bt[i].style.float="left";
        bt[i].style.height="50px";
        bt[i].style.width="50px";
        bt[i].style.background="goldenrod";
        bt[i].style.marginLeft="10px";
        bt[i].style.fontSize="30px";
        bt[i].value=String.fromCharCode(i+65);
        disp(ary,bt,i);        
        document.getElementById("guessbx").appendChild(bt[i]);
        
    }
    document.getElementById("chance").innerHTML="Guesses left:9";    
    playmusic();
}

//play novelty music

function playmusic()
{ var a=document.getElementById("aud");
a.play();
}

//stop novely music

function stopmusic()
{
    var a=document.getElementById("aud");
    a.pause();
}


var strg=[],str2="";   //strings used to compare the entered word to its original


//display if the guesses are right,otherwise gives a beep sound for wrong answer

function disp(d,bt,i)
{
var nw="";
document.getElementById("guessbx").style.display="block";


bt[i].addEventListener ("click", 
function()
{    
 var flag=1;
var ges=String.fromCharCode(i+97);
playmusic();
new Audio("/xampp/htdocs/hangman/im/bclick.mp3").play();
    for (var j = 0; j < d.length; j++) {
if(d[j].value==ges)
{


    new Audio("/xampp/htdocs/hangman/im/Correctanswer.mp3").play();
    d[j].innerHTML=d[j].value;
    d[j].setAttribute("class","text-center");
    
    console.log(d[j].innerHTML);
    
    flag=0;
    strg[j]=d[j].value; 

}



str2=strg.join("");

}
console.log(str2);
if(str2==words[df].word)     //take steps if word guessed is correct
{
    strg=[];
    str2="";
    stopmusic();
    new Audio("/xampp/htdocs/hangman/im/applause.mp3").play();
    document.getElementById("next").innerHTML="Please wait..next question loading" ;
    document.getElementById("guessbx").innerHTML="<p style='font-size:40px;'color:'aliceblue'';'margin-left:200px'>You are correct!!!</p>";
    document.getElementById("eg").style.display="none";
    document.getElementById("chance").style.display="none";
    document.getElementById("mean").style.display="none";
    document.getElementById("score").style.display="none";

    chances(chnc);
    for (var k = 0; k < d.length; k++) {
    d[k].style.background="green";
    }
    
    
    setTimeout(() => {
        
        next(d,bt,d.length);    
    }, 6000);
    
}
if(flag==1)    //if letter guessed is incorrect
chances(--chnc);


bt[i].disabled=true;    
   

});

}









function gameover(gs)  //if a player loses all turns ends the game
{
    if(gs==0)
    {
        
        points(50,1);
    }

}




function next(d,bt,l)              //go to the next word,refresh all boxes and guesses
{
nxt=Math.floor((Math.random()*13));    
document.getElementById("next").innerHTML="";
document.getElementById("new").style.display="none";
document.getElementById("totalscore").style.display="none";
document.getElementById("score").style.display="block";
document.getElementById("chance").style.display="block";
document.getElementById("eg").style.display="block";
document.getElementById("guessbx").innerHTML="";
document.getElementById("mean").style.display="block";

chnc=9;

  for (var j = 0;j<l;j++)
    {
      d[j].remove();
      
    }
    for (var j = 0;j<26;j++)
    {
       bt[j].remove();
       
    }

checksame();    
}



function checksame()   //check if random word generated has already been done
{
    for (var i = 0; i < done.length; i++) {
        if(nxt==done[i])
        {
            nxt=Math.floor((Math.random()*13));
            break;
                    
        }
        console.log("done words:"+done[i]+","+done.length);  
      }
      dn++;
    done[dn]=nxt;
            
          
  document.getElementById("next").innerHTML="Question "+Number(done.length)+" of 6";
  dispboxes(nxt);
}





function chances(chn)    //calculate the remaining chances
{
    new Audio("/xampp/htdocs/hangman/im/Wronganswer.mp3").play();
 document.getElementById("chance").innerHTML="Guesses left:"+chn;
 
 if(document.getElementById("score").style.display=="none")
    points((9-chn)*5,1);    
else
 points((9-chn)*5,0);
 

 if(chn==0)
 gameover(chn);   
}