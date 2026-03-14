/**
 * TODO: fare un pulsante di pausa che ferma il gioco, ossia ferma il quadrato e il cronometro. 
 * TODO: e al centro appare molto in grande la scitta di pausa, riducendo la luminosita di tutto quello che ce dietro
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
    const modalita = prompt("che modalita vuoi fare?\n-west\n-slime");
    let punti_per_target=1

    target.addEventListener("click", spostalo);
    target.addEventListener("click", segnaPunto);

    let spostamento_programamto = setInterval(spostalo,tempo_tra_spostamenti_base ); //set interVal fara la funzione spostalo ogni 2000 millisecondi (2 secondi)

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
        
        // reset eventuale colore/stato precedente
        target.style.backgroundColor = ""; // torna allo stile di default (CSS)
        punti_per_target = 1;

        // 1 possibilità su 10 che il bersaglio sia dorato
        if (rarita <= 0.1) {
            // per un quadrato/div bisogna cambiare il background, non il color
            target.style.backgroundColor = "gold"; // apparirà giallo/dorato
            punti_per_target = 10;
            tempo_tra_spostamenti = tempo_tra_spostamenti_base / 1.5;
        }

        console.log("Punti per questo target: " + punti_per_target + ", Tempo per lo spostamento: " +  tempo_tra_spostamenti);
    }

    //funzione che si avvia ogni volta che l'utente prende il bersaglio
    function segnaPunto(){

        tempo.innerHTML = "Tempo: " + Cronometro + "ms";

        
        if (Cronometro < record) {
            record = Cronometro;
            recordEl.innerHTML = "Record: " + Cronometro + "ms";
        }

        punteggio += punti_per_target;   // assegno il punto e lo scrivo
        punti.innerHTML = "Punti : " + punteggio;

        clearInterval(spostamento_programamto);
        spostamento_programamto = setInterval(spostalo,tempo_tra_spostamenti);

        Cronometro_reset();

        punti_per_target = 1;

        console.log("PUNTO- " + Cronometro + " - " + record);
    }

    /**
     * adesso faccio un intervallo che si ripete ogni millisecondo per avere un cronometro
     * che chiama sempre il metodo per aggiungere un millisecondo al cronometro... forse esistono metodi migliore ma cosi va bene.
     * e un metodo per resettare il cronometro
    */

   let Cronometro = 0;

    setInterval(Cronometro_plus,1);

    function Cronometro_plus(){
        Cronometro++;
    }

    function Cronometro_reset(){
        Cronometro=0;
    }


    







    