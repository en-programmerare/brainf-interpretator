let interpretering;
let indata;
let hogstaAnvandaCell;
let indataKallkod;

//Aktiveras av användaren
function kor() {
   document.getElementById("kor").disabled = true; //Fixa med vilka knappar som är på
   document.getElementById("avbryt").disabled = false;
   interpretera(document.getElementById("kod").value); //Interpretera källkod
}

function interpretera(kallkod) { //Interpreterar koden angiven som parameter
   meddelande("Interpreterar Brainf-program"); //Meddela
   //Skapa WebWorker som kör programmet
   interpretering = new Worker("https://en-programmerare.github.io/brainf-interpretator/exekvera.js"); 
   //Skicka meddelande till tråden att starta
   interpretering.postMessage({"typ": "interpretera", "varde": kallkod});
   //Vid meddelande från Webworkern
   interpretering.onMessage = function(kommunikation) {
      if(kommunikation.typ === "byteutdata") //Hantera byteutdata
         utdata(kommunikation.varde);
      else if(kommunikation.typ === "begarIndata") //Hantera begäran om indata
         begarIndata();
   };
}
function utdata(bytedata) { //Skriv ut byte i konsolen
   document.getElementById("utdata").innerHTML += String.fromCharCode(bytedata).replace(" ","&nbsp;");
}
function meddelande(meddelande) { //Skriv ut meddelande
   if(document.getElementById("utdata").innerHTML.substr(-4, 4) === "<br>")
      document.getElementById("utdata").innerHTML += meddelande + "<br>";
   else
      document.getElementById("utdata").innerHTML += "<br>" + meddelande + "<br>";
}
function begarIndata() { //Skapa textfält där användaren kan mata in
   document.getElementById("avbryt").disabled = true; //Förbjudet att avbryta under inmatning
   indata = document.createElement("input"); //Skapa textfält
   indata.id = "programindata";
   indata.classList.add("indata");
   indata.addEventListener("change", lasInIndata);
   document.getElementById("utdata").innerHTML += "&gt;";
   document.getElementById("utdata").appendChild(indata); //Lägg till textfält i konsol
}
function lasInIndata() {
   let varde = document.getElementById("programindata").value; //Läs in värdet
   indata.removeEventListener("change", lasInIndata);
   indata.remove(); //Ta bort textfältet
   utdata(varde.charCodeAt(0)); //Visa vad användaren skrivit
   minne[cell] = varde.charCodeAt(0);
   exekvering = setInterval(loopIExekvering, 0.1);
   document.getElementById("avbryt").disabled = false; 
}
function avslutaKorning() {
   interpretera.terminate();
   document.getElementById("kor").disabled = false;
   document.getElementById("avbryt").disabled = true;
   meddelande("Interpreteringen avslutades");
   
}
