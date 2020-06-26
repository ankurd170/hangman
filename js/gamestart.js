
//show all items available 

var i=0,j=0;

var respnse=[];



//store candidate respnses


var counter=[];


var i=0;


function music()
{
  new Audio("/xampp/htdocs/hangman/im/sound1.mp3").play();  
}

	
function startgame() 
{
    document.getElementById("dn").innerText="LOADING PLEASE WAIT.." ;
    document.getElementById("barcv").style.display="block" ;
    new Audio("/xampp/htdocs/hangman/im/sound1.mp3").play();
    if (i==0) {
        i=1;
        var elem=document.getElementById("bar");
        var wd=1;
        var id=setInterval(frame,60);
    }
    
    function frame()
    {
        if (wd>=100) {
            clearInterval(id);
            i=0;
            window.location.replace("hangman.html");
        }
        else
        {
            wd++;
            elem.style.width=wd+"%";
            document.getElementById("bar").innerText=wd+"%";
        }
    }
    
}


 





