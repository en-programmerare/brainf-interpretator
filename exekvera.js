let vanta = false;
let avsluta = false;
let indata;
onmessage = function(kommunikationTillTrad) {
   if(kommunikationTillTrad.typ === "interpretera") {
      let cell = 0;
      let instruktion = -1;
      let tecken;
      let minne = [];
      let byteindata;
      vanta = false;
      for(let index = 0; index < 1000; index++) { //skapa array med 1000 poster
         minne[index] = 0;
      }
      tecken = kommunikationTillTrad.varde.split("");
      while(!avsluta) {
         if(vanta)
            if(byteindata === undefined)
               continue;
         instruktion++;
         if(tecken[instruktion] === "+")
            minne[cell]++;
         else if(tecken[instruktion] === "-")
            minne[cell]--;
         else if(tecken[instruktion] === ">")
            cell++;
         else if(tecken[instruktion] === "<")
            cell--;
         else if(tecken[instruktion] === ".")
            utdata(minne[cell]);
         else if(tecken[instruktion] === ",") {
            if(indata === undefined) {
               begarIndata();
               vanta = true;
            }
            else {
               minne[cell] = indata;
               indata = undefined;
            }
         }
         else if(tecken[instruktion] === "[") {
            if(minne[cell] === 0) {
               let traff = false;
                  for(let sokindex = instruktion; sokindex < tecken.length - 1; sokindex++) {
                  if(tecken[sokindex] === "]") {
                     traff = true;
                     instruktion = sokindex;
                     break;
                  }
               }
               if(!traff) {
                  //ATT GÖRA felmeddelande
               }
            }
         }
         else if(tecken[instruktion] === "]") {
            if(minne[cell] !== 0) {
            let traff = false;
               for(let sokindex = instruktion; sokindex > 0; sokindex--) {
                  if(tecken[sokindex] === "[") {
                     traff = true;
                     instruktion = sokindex;
                   break;
                  }
               }
               if(!traff) {
                  //ATT GÖRA felmeddelande
               }
          }
         }
      }
   }
   else if(kommunikationTillTrad.typ === "indata") {
      indata = kommunikationTillTrad.varde;
      vanta = false;
   }
   else if(kommunikationTillTrad.typ === "avsluta") {
      avsluta = true;
   }
};

function utdata(bytedata) {
   postMessage({"typ": "byteutdata", "varde": bytedata});
}
function begarIndata() {
   postMessage({"typ": "begarindata", "varde": ""});
}

