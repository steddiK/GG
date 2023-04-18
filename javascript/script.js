var player1= document.querySelector('.player1');
var player2= document.querySelector('.player2');
var player3= document.querySelector('.player3');

var player11= document.querySelector('.player11');
var player22= document.querySelector('.player22');
var player33= document.querySelector('.player33');

var divRouge= document.querySelector('.tourRouge');
var divBleu= document.querySelector('.tourBleu');

var win = document.querySelector('.win');
var notif= document.querySelector('.notif');
var btn = document.getElementById("btnAmerina");

var haut= document.querySelector('.haut');
var cages= document.querySelectorAll('#cage');

//aUDIO
const clickAudio = document.getElementById("click");
const gameoverAudio = document.getElementById("gameover");

//compteur de mouvement, 
var cptVert=0;
var tourDeJeu;
var tourClick=0;
var selectedDiv= null;



var valeurDV= [];
var valeurDB= [];

//initialisation des cpts, pour position initiale des pieces
var cpt1=0;
var cpt2=0;
var cpt3=0;
var cpt4=0;
var cpt5=0;
var cpt6=0;

//Les mouvements que chaque piece du fanorona peut faire.
var mouvPermis= [
    [1,3,4],
    [0,2,4],
    [1,4,5],
    [0,4,6],
    [0,1,2,3,5,6,7,8],
    [2,4,8],
    [3,4,7],
    [4,6,8],
    [4,5,7]
];
//Les positions de Victoire.
var posWin= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//possibilité d'égalité.
var posEgal= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [3,6,7],
    [1,2,5],
    [2,4,6],
    [5,7,8],
    [0,1,3]
];

divRouge.addEventListener("click", function(){
    if(tourClick==0){
        tourDeJeu=2;
        clickAudio.play();
        divRouge.innerHTML="OK";
        tourClick++;
    }
}); 
divBleu.addEventListener("click", function(){
    if(tourClick==0){
        tourDeJeu=1;
        clickAudio.play();
        divBleu.innerHTML="OK";
        tourClick++;
    }
});
//fonction de refresh page
function refresheo(){
    location.reload();
}
btn.addEventListener("click",refresheo);
// les Divs rouges

player1.addEventListener("click", function(){
    clickAudio.play();
    if(tourDeJeu==2){
        selectedDiv= this;
    
        if(cpt1==0){
            selectedDiv.num = 0;
        }
        cpt1++;
        cptVert=0;
    }
})
player2.addEventListener("click", function(){
    clickAudio.play();
    if(tourDeJeu==2){
        selectedDiv= this;
        if(cpt2==0){
            selectedDiv.num = 1;
        }
        cpt2++;
        cptVert=0;
    }
})
player3.addEventListener("click", function(){
    clickAudio.play();
    if(tourDeJeu==2){
        selectedDiv= this;
        if(cpt3==0){
            selectedDiv.num = 2;
        }
        cpt3++;
        cptVert=0;
    }
})


//les Divs bleus
player11.addEventListener("click", function(){
    clickAudio.play();
    if(tourDeJeu==1){
        selectedDiv= this;
        if(cpt4==0){
            selectedDiv.num = 6;
        }
        cpt4++;
        cptVert=0;
    }
})
player22.addEventListener("click", function(){
    clickAudio.play();
    if (tourDeJeu==1){
        selectedDiv= this;
        if(cpt5==0){
            selectedDiv.num = 7;
        }
        cpt5++;
        cptVert=0;
    }
})
player33.addEventListener("click", function(){
    clickAudio.play();
    if(tourDeJeu==1){
        selectedDiv= this;
        if(cpt6==0){
            selectedDiv.num = 8;
        }
        cpt6++;
        cptVert=0;
    }
})


function deplacerDivRouge(event){
    
    //maka position du div vert
    if (selectedDiv !== null){
        clickAudio.play();
        var rect= event.target.getBoundingClientRect();

        //contenu du div vert cliqué
        var divVert= event.target.textContent;
        var divVertI= parseInt(divVert);   

        if(mouvPermis[selectedDiv.num].includes(divVertI)){
            var top= rect.top-30+ scrollY;
            var left= rect.left-270+ scrollX;
            //Mouvement du div
            selectedDiv.style.top= top+"px";
            selectedDiv.style.left= left+"px";

            //change la valeur de la piece en mouv 
            selectedDiv.num = divVertI;

            selectedDiv.textContent= divVertI;
            selectedDiv.style.fontSize= 0;

            //changement de tour apres Mouvement.
            if(tourDeJeu==1){
                tourDeJeu=2;
            }else{
                tourDeJeu=1;
            }
            
           
        };
        //tester l'ordre des elements de deux tableaux
        function testOrder(tab1,tab2){
            if(tab1.length !== tab2.length){
                return false;
            }
            for (var i=0; i < tab1.length;i++){
                if( tab1[i] !== tab2[i]){
                    return false;
                }
            }
            return true;
        }
        //Collecte des position des chaque piece pour chaque camp
        var valeurDV= [parseInt(player1.textContent),parseInt(player2.textContent),parseInt(player3.textContent)];
        var valeurDB= [parseInt(player11.textContent),parseInt(player22.textContent),parseInt(player33.textContent)];

        //Tri des tableaux de position.
        valeurDV.sort();
        valeurDB.sort();

        //Verification si les Rouges ont gagné la partie
        if (cpt1!=0 && cpt2!=0 && cpt3!=0){
                var estWinner = posWin.some(function(tab){
                    return testOrder(tab,valeurDV);
                });
                if (estWinner){
                    gameoverAudio.play();
                    setTimeout(function(){
                        notif.textContent= "Nandresy ianareo Mena";
                        notif.style.color= "white";
                        btn.style.backgroundColor="red";
                        win.style.visibility= "visible";
                        win.style.backgroundColor= "rgb(255, 123, 123)";
                    },1000);
                    console.log("RED team victoryyyyyyyy!!! ");
                }
        } else{
            //appel fonction compareEgal
            compareEgal(posEgal[6],posEgal[7]);
            compareEgal(posEgal[6],posEgal[8]); 
            compareEgal(posEgal[9],posEgal[10]);
            compareEgal(posEgal[9],posEgal[11]);   
        }

        //Verification si les Bleus ont gagné la partie
        if (cpt4!=0 && cpt5!=0 && cpt6!=0){
                var estWinner = posWin.some(function(tab){
                    return testOrder(tab,valeurDB);
                });
                if (estWinner){
                    gameoverAudio.play();
                    setTimeout(function(){
                        notif.textContent= "Nandresy ianareo Manga";
                        notif.style.color= "blue";
                        win.style.visibility= "visible";
                    },1000);
                    console.log("BLUE team victoryyyyyyyy!!! ");
                }
        } else{
            //appel fonction compareEgal
            compareEgal(posEgal[6],posEgal[7]);
            compareEgal(posEgal[6],posEgal[8]);
            compareEgal(posEgal[9],posEgal[10]);
            compareEgal(posEgal[9],posEgal[11]);
        }

        //Comparaison de deux tableau
        function compareTab(tab1,tab2){
            for(let i=0; i< tab1.length;i++){
                if(tab1[i] !== tab2[i]){
                    return false;
                }
            }
            return true;
        }

        //comparaison si il y a une position d'égalité
        function compareEgal(tab1,tab2){
            if((compareTab(valeurDB,tab1) && compareTab(valeurDV,tab2))||(compareTab(valeurDB,tab2) && compareTab(valeurDV,tab1))){
                gameoverAudio.play();
                setTimeout(function(){
                    notif.textContent= "Mitovy (egalité)";
                    notif.style.color= "blue";
                    win.style.visibility= "visible";
                },1000);
                
            }
        }
        
    }
    
}

for (var i=0; i < cages.length;i++){
    cages[i].addEventListener("click",function(){
        if(cptVert==0){
            deplacerDivRouge(event);
        }
        cptVert++;
    });
}