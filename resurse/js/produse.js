window.addEventListener("load",function(){
   
    function normalizeText(text) {
        var map = {
            'ă': 'a',
            'â': 'a',
            'î': 'i',
            'ș': 's',
            'ț': 't',
            'ȃ': 'a',
            'ȋ': 'i',
            'ș': 's',
            'ț': 't',
        };
        ///g pentru toate aparitile din text
        return text.replace(/[ăâîșțȃȋșț]/g, function(match) {
            return map[match];
        });
    }
    

    function validateInput(id, allowNumbers = true){
        let val = document.getElementById(id).value;
        if (!allowNumbers && /\d/.test(val)){
            document.getElementById(id).style.borderColor = "red"; 
            return false;
        }
        else{
            document.getElementById(id).style.borderColor = ""; 
            return true;
        }
    }

    function validateAllInputs(){
        return validateInput("i_datalist", false) 
            && validateInput("i_textarea", false); 
    }

    function displayProductsSmoothly(products) {
        let i = 0;
        function next() {
            if (i < products.length) {
                let prod = products[i];
                prod.style.display = "block";
                prod.style.opacity = "0";
                setTimeout(() => {
                    prod.style.transition = "opacity 0.5s linear";
                    prod.style.opacity = "1";
                }, 100);
                i++;
                setTimeout(next, 200); // funcția next se va apela pentru fiecare produs la un interval de 200ms
            }
        }
        next();
    }
    //am stat 5 ore sa o fac, altfel nu stiu!
    //pentru 0.3
    
    
    document.getElementById("inp-nume").value = "";



    // document.getElementById("inp-pret").onchange=function(){
    //     document.getElementById("infoRange").innerHTML=`(${this.value})`
    
    // }
    let produse = document.getElementsByClassName("card produs");
    
    // Le ascundem și resetăm opacitatea la încărcarea paginii.
    for (let prod of produse) {
        prod.style.display = "none";
        prod.style.opacity = "0";
    }

    displayProductsSmoothly(Array.from(produse));




   /* let tipuri = document.getElementsByName("checks");
        if (defaultFilters.val_categorie && defaultFilters.val_categorie.length > 0) {
            for (let t of tipuri) {
                if (defaultFilters.val_categorie.includes(t.value)) {
                    t.checked = true;
                }
            }
        }*/

        
        function filtrareProduse(){
             //se apasa click pe butonul filtare
             let val_nume=normalizeText(document.getElementById("inp-nume").value.toLowerCase());
             console.log(val_nume);

             let radiobuttons=document.getElementsByName("gr_rad");
             let val_material;
             for (let r of radiobuttons){
                 if(r.checked){
                     val_material=r.value;
                     break;
                 }
             }

             let iduriProduse=localStorage.getItem("cos_virtual");
             //localstorage memoreaza date in browser, si cand se redeschide pagina raman acolo salvate, se memoreaza doar stringuri
             iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]
         
             for(let idp of iduriProduse){
                //da doar primul element css, nu ca querySelectorAll
                 let ch = document.querySelector(`[value='${idp}'].select-cos`);
                 //querySelector selecteaza dupa css
                 if(ch){
                     ch.checked=true;
                 }
                 else{
                     console.log("id cos virtual inexistent:", idp);
                 }
             }
         
             //----------- adaugare date in cosul virtual (din localStorage)
             let checkboxuri= document.getElementsByClassName("select-cos");
             for(let ch of checkboxuri){
                //la fiecare schimbare
                 ch.onchange=function(){
                    //preluam vectorul de iduri
                     let iduriProduse=localStorage.getItem("cos_virtual");
                     iduriProduse=iduriProduse?iduriProduse.split(","):[];
                    
                     //daca e bifat, punem valoarea pt el
                     if( this.checked){
                         iduriProduse.push(this.value)
                     }
                     else{
                         let poz= iduriProduse.indexOf(this.value);
                         if(poz != -1){
                             iduriProduse.splice(poz,1);
                             //splice sterge un element de pe pozitia poz
                         }
                     }
         
                     localStorage.setItem("cos_virtual", iduriProduse.join(","))
                 }
                 
            }

            if(validateAllInputs()){
             
 
 
                var optiuni = document.getElementById("inp-marime").options;
                var val_marime = "";
                for (let opt of optiuni) {
                    if (opt.selected) {
                     val_marime += opt.value + " ";
                    }
                }   
   
   
               
    
                let val_pret=document.getElementById("inp-pret").value;
                //asa se ia valoarea inputului
        
                var produse=document.getElementsByClassName("card produs");
   
                let filteredProducts = [];
                for(let prod of produse){
                    prod.style.display="none"; 
                    prod.style.opacity = "0";
   
                }
   
                document.getElementById("infoRange").innerHTML = `(${val_pret})`;
   
        
                let val_categorie=document.getElementById("inp-categorie").value;
    
                let val_culoare=document.getElementById("i_datalist").value;
    
                let val_voucher=document.getElementById("i_check1").checked;
   
                /*let noutati=document.getElementById("i_check2").checked;*/
    
                let val_descriere=document.getElementById("i_textarea").value.toLocaleLowerCase();
    
   
                for(let prod of produse){
                    prod.style.display="none";
                    prod.style.opacity = "0";
                    counter = 0;
                    //selecteaza elementele dupa clasa, returneaza o colectie cu toate paragrafele
                    let nume=normalizeText(prod.getElementsByClassName("val-nume")[0].innerHTML.toLocaleLowerCase());
                    //de [0] pentru ca stiu ca e un singur element si vreau din el continutul si il iau cu inner html ( 8 mai laborator)
   
                    console.log(nume);
    
   
                    let pret=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
    
                    let categorie=prod.getElementsByClassName("val-tipuri")[0].innerHTML;
    
                    let material=prod.getElementsByClassName("val-material")[0].innerHTML;
    
                    let marime=prod.getElementsByClassName("val-marime")[0].innerHTML;
    
                    let culoare=prod.getElementsByClassName("val-culoare")[0].innerHTML;
    
                    let voucher = prod.getElementsByClassName("val-voucher")[0].innerHTML;
   
                    let data_adaugare = Date.UTC(2020, 0, 1);
   
                    let data = new Date(prod.getElementsByClassName("val-data_adaugare")[0].innerHTML);
                    
                    /*let esteNou = data.getTime() >= dataReferinta;*/
    
                    let marimiSelectate = val_marime.trim().split(" ");
    
                    let descriere=prod.getElementsByClassName("val-descriere")[0].innerHTML.split(',');
       
                    let cond1= (nume.startsWith(val_nume));
    
                    let cond2= (pret>val_pret);
    
                    let cond3= (val_categorie=="toate" || val_categorie==categorie);
    
                    let cond4= (val_material=="toate" || val_material==material);
    
                    let includeToateMarimile = val_marime.includes("toate");
    
                    let cond5 = includeToateMarimile || marimiSelectate.some(m => marime.includes(m));
    
                    let cond6= (val_culoare=="toate" || val_culoare==culoare || val_culoare=="");
    
                    let cond7=true;
    
                    let cond8=true;
   
                    /*let cond9 = !noutati || esteNou;*/
    
                    if(val_voucher){
                        cond7=voucher=="true";
                    }
    
                    if (val_descriere != "") {
                        let descriere_introdusa = val_descriere.split(",");
                        for (let descriere of descriere_introdusa) {
                            descriere = descriere.trim(); // eliminăm spațiile de la începutul și sfârșitul fiecărei dotări
                            if (!descriere.includes(descriere)) {
                                cond8 = false;
                                break;
                            }
                        }
                    }
    
                    if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8)
                    {
                        filteredProducts.push(prod);
                        counter++;
                    }
                }
                let p = document.createElement("p");
                document.getElementById("demo").innerHTML = p;
               /* if(counter == 0){
                    let p="Nu avem produs care corespunde cu filtrele dvs.";
                    document.getElementById("demo").innerHTML = p;
                }
                else*/
                displayProductsSmoothly(filteredProducts); // apelăm funcția de afișare treptată pentru produsele filtrate
            }
            else{
                alert("Există input-uri invalide! Corectați și încercați din nou.");
            }
              
           }
   
           // Selectează toate elementele de intrare pentru filtrare
           let filtrareInputs = document.querySelectorAll('#inp-nume, #inp-pret, #inp-categorie, [name="gr_rad"], #inp-marime, #i_datalist, #i_check1, #i_textarea, #i_check2');
           for(let filtru of filtrareInputs) {
           // Atribuie fiecărui element selectat un eveniment onchange
               filtru.onchange = filtrareProduse;
           }
    
        document.getElementById("resetare").onclick = function() {
            var confirmReset = confirm("Ești sigur că vrei să resetezi filtrele?");
          
            if (confirmReset) {
              document.getElementById("inp-nume").value = "";
              document.getElementById("infoRange").innerHTML = "(0)";
              document.getElementById("inp-categorie").value = "toate";
              document.getElementById("i_rad5").checked = true;
              document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
              document.getElementById("inp-marime").value = "toate";
              document.getElementById("i_datalist").value = "toate";
              document.getElementById("i_check1").checked = false;
              document.getElementById("i_textarea").value = "";
              /*document.getElementById("i_check2").checked = false;*/


          
              var produse = document.getElementsByClassName("card produs");

              for (var i = 0; i < produse.length; i++) {
                  produse[i].style.display = "none"; // ascundem toate produsele
                  produse[i].style.opacity = "0"; // resetăm opacitatea la 0
              }
              displayProductsSmoothly(Array.from(produse)); // și le afișăm treptat
          }
          }; 
          
          
          document.getElementById("btnSortare").onclick = function() {
            var cheie1 = document.getElementById("selectCheie1").value;
            var cheie2 = document.getElementById("selectCheie2").value;
            var ordine = document.getElementById("selectOrdine").value;
    
            var semn = 1;
            if (ordine === "descrescator") {
              semn = -1;
            }
            
            console.log(cheie1,cheie2,semn);
            sortare_dinamica(semn, cheie1, cheie2);
          }
          
          function sortare_dinamica(semn, cheie1, cheie2) {
            var produse = document.getElementsByClassName("card produs");
            var v_produse = Array.from(produse);
    
            v_produse.sort(function(a, b) {
                var val_a = a.getElementsByClassName("val-" + cheie1)[0].innerHTML;
                var val_b = b.getElementsByClassName("val-" + cheie1)[0].innerHTML;
      
                  if (cheie1 == "pret" & val_a != val_b){
                      val_a = parseFloat(val_a);
                      val_b = parseFloat(val_b);
                      return(semn * (val_a-val_b));
                  }
      
                if (val_a == val_b) {
                  val_a = a.getElementsByClassName("val-" + cheie2)[0].innerHTML;
                  val_b = b.getElementsByClassName("val-" + cheie2)[0].innerHTML;
                }
      
                if(cheie1 != "pret"){
                  return semn * (val_a.localeCompare(val_b));
                }
      
                if (cheie1 == "pret" & cheie2 != "pret"){
                  return semn * (val_a.localeCompare(val_b));
                }
                
                if (cheie1 == "pret" || cheie2 == "pret") {
                  val_a = parseFloat(val_a);
                  val_b = parseFloat(val_b);
                  if (val_a != val_b){
                  return(semn * (val_a-val_b))
              }
                }
                  return semn * (val_a.localeCompare(val_b));
              });
    
            for (var i = 0; i < v_produse.length; i++) {
                console.log(semn);
              v_produse[i].parentElement.appendChild(v_produse[i]);
            }
        }    
        
        /*document.getElementById("sortCrescNume").onclick = function () {
            sortare(1)
        }
        document.getElementById("sortDescrescNume").onclick = function () {
            sortare(-1)
        }*/

            // sortare(semn){
            //     var produse=document.getElementsByClassName("card produs"); 
            //     var v_produse=Array.from(produse);
            //     v_produse.sort(function(a,b){
            //         let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            //         let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
            //         if(pret_a==pret_b){
            //             let nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
            //             let nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
            //             return semn*nume_a.localeCompare(nume_b);
            //         }
            //         return semn*(pret_a-pret_b);
            //     });
            //     for(let prod of v_produse){
            //         prod.parentElement.appendChild(prod);
                    
            //     }
            // }
        
            // document.getElementById("sortCrescNume").onclick=function(){
            //     sortare(1);
            // }
        
            // document.getElementById("sortDescrescNume").onclick=function(){
            //     sortare(-1);
            // }
      

            
            window.onkeydown= function(e){
                if(e.key =="c" && e.altKey){
                    if(document.getElementById("info-suma"))
                        return;
                    var produse= document.getElementsByClassName("card produs");
                    let suma=0;
                    for(let prod of produse){
                        if(prod.style.display!="none")
                        {
                            let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
                            suma+=pret;
                        }
                    }
                    
                    let p=document.createElement("p");
                    p.innerHTML=suma;
                    p.id="info-suma"
                    ps=document.getElementById("p-suma");
                    container = ps.parentNode;
                    frate=ps.nextElementSibling
                    container.insertBefore(p,frate);
                    setTimeout(function(){
                        let info=document.getElementById("info-suma");
                        if(info)
                            info.remove();
                    },2000)
                }
            }
})