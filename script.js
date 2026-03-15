/**
 * TODO: fare un pulsante di pausa che ferma il gioco, ossia ferma il quadrato e il cronometro. 
 * TODO: e al centro appare molto in grande la scitta di pausa, riducendo la luminosita di tutto quello che ce dietro
 * 
 * TODO: slime in cui cambia lo sfondo e il target con altre icone
 */
    let target = document.getElementById("target");
    let punti = document.getElementById("punti");
    let tempo = document.getElementById("tempo");
    
    let recordEl = document.getElementById("record");
    let record = Infinity; // best time in ms (lower is better). Infinity means "no record yet"
    //ok per questo o chiesto a una chatIA perche non capivo perche il record non funzionasse. 
    //? mi ha detto di separare record come elemento dall'HTML e record come numero per farlo funzionare, io stavo facendo tutto con una sola variabile... daje impariamo sempre cose nuove

    let punteggio = 0;
    const tempo_tra_spostamenti_base = prompt("inserisci in millisecondi la velocita del bersaglio");
    let tempo_tra_spostamenti = tempo_tra_spostamenti_base;
    let punti_per_target=1

    target.addEventListener("click", spostalo);
    target.addEventListener("click", segnaPunto);

    let spostamento_programmato = setInterval(spostalo,tempo_tra_spostamenti_base ); //set interVal fara la funzione spostalo ogni 2000 millisecondi (2 secondi)

    //funzione per spostare il target
    function spostalo()
    {
        tempo_tra_spostamenti = tempo_tra_spostamenti_base;

        let w = window.innerWidth-100;
        let h = window.innerHeight-100;

        let x = Math.random() * w;
        let y = Math.random() * h;

        target.style.left = x+"px";
        target.style.top=y+"px";

        let rarita = Math.random();
        
        // reset eventuale immagine/stato precedente: usa l'immagine di default (PinkSlime)
        target.style.backgroundImage = 'url("contents/PinkSlime.webp")';
        target.style.backgroundSize = 'cover';
        target.style.backgroundPosition = 'center';
        target.style.backgroundColor = ""; // se eri impostando un colore, rimuovilo
        punti_per_target = 1;

        //* 1 possibilità su 10 che il bersaglio sia dorato
        if (rarita <= 0.1) {
            // usa l'immagine dorata se presente nella cartella contents
            target.style.backgroundImage = 'url("contents/GoldSlime.png")';
            target.style.backgroundSize = 'cover';
            punti_per_target = 10; // assegna 10 punti per questo bersaglio
            tempo_tra_spostamenti = (tempo_tra_spostamenti_base * 75) / 100; // il tempo per prendere quello d'oro sara del 75% rispetto al tempo base

            
        }

        console.log("Punti per questo target: " + punti_per_target + ", Tempo per lo spostamento: " +  tempo_tra_spostamenti);
    }

    //funzione che si avvia ogni volta che l'utente prende il bersaglio
    function segnaPunto(){
        
        console.log("PRESO!!! \n Tempo per questo target: " + spostamento_programmato + ", Punti assegnati: " + punti_per_target );

        tempo.innerHTML = "Tempo: " + Cronometro + "ms";

        
        if (Cronometro < record) {
            record = Cronometro;
            recordEl.innerHTML = "Record: " + Cronometro + "ms";
        }

        punteggio += punti_per_target;   // assegno il punto e lo scrivo
        punti.innerHTML = "Punti : " + punteggio;

        clearInterval(spostamento_programmato);
        spostamento_programmato = setInterval(spostalo,tempo_tra_spostamenti);

        Cronometro_reset();

        punti_per_target = 1;

    }

    /**
     * adesso faccio un intervallo che si ripete ogni millisecondo per avere un cronometro
     * che chiama sempre il metodo per aggiungere un millisecondo al cronometro... forse esistono metodi migliore ma cosi va bene.
     * e un metodo per resettare il cronometro
    */

   let Cronometro = 0;

    let intervallo_cronometro = setInterval(Cronometro_plus,1);

    function Cronometro_plus(){
        Cronometro++;
    }

    function Cronometro_reset(){
        Cronometro=0;
    }


    /**
     * TODO: bottone di pausa.
     * *deve fermare il gioco, quindi fermare il target e mettere in sospensione il cronometro
     * voglio anche che "spenga" il resto dellos chermo, quindi deve abbassare la luminosita del resto dello schermo
     * per prima cosa creo un evento che ascolta il pulsante dall HTML
     * 
     * si sostituisce a un "play button" per riprednere il gioco
     * 
     * creo una variabile booleana per tenere conto se il gioco è in corso o fermo.
     * 
     * faccio due funzioni diverse per fermare, e riprendere il gioco. si alternano a vicenda.
     */

        let pause = document.getElementById("pause");

        
        pause.addEventListener("click", bottone_di_pausa);

        let is_paused=false;

        function bottone_di_pausa(){
        
            if(is_paused==false){
                pausa();
            }
            else{
                riprendi();
            }
        }



        function pausa(){

            //rimuovo temporaneamente gli eventListener, cosi l'utente non puo piu interagire con il target una volta in pausa.
            target.removeEventListener("click", spostalo);
            target.removeEventListener("click", segnaPunto);

            //poi elimino gli intervalli, cosi il target non si sposta piu e il cronometro si ferma.
            clearInterval(spostamento_programmato);
            clearInterval(intervallo_cronometro);



            pause.style.backgroundImage = 'url("contents/play.png")'
            //uhhhhhhh l'immagine non mi piace tanto.... ne cercher'ò una nuova piu bella piu tardi.

            is_paused = true;

            console.log("GIOCO MESSO IN PAUSA");
        }

        //questa è la funzione per riprendere il gioco e può essere 
        function riprendi(){

            //rimetto gli eventi e gli intervalli
            target.addEventListener("click", spostalo);
            target.addEventListener("click", segnaPunto);

            spostamento_programmato = setInterval(spostalo,tempo_tra_spostamenti_base );
            intervallo_cronometro = setInterval(Cronometro_plus,1);

            pause.style.backgroundImage = 'url("contents/pause_icon.png")'

            is_paused = false;

            console.log("GIOCO RIPRESO"); 

        }
