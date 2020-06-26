








function music()
{
  new Audio("/xampp/htdocs/hangman/im/sound1.mp3").play();  
}

	
function topscore() 
{ 

var val=parseInt(localStorage.getItem("sect")); 
var top=[];
top[0]=0;


for (var i = 0; i < 5; i++) 
{
    if (val>top[i])
    {top.pop();
    top.push(val);
    }
    else
    top.push(0);
    
    document.getElementById("tp").innerHTML+=(i+1)+"."+top[i]+"<br>";    
}    
}


 





