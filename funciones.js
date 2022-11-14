//console.clear();

const sliderProps = {
    fill: "#FF3333",
    background: "rgba(255, 255, 0, 0.214)",
};


const slider = document.querySelector(".range__slider");

const MateRadio = document.getElementById('Mate');

const boton_encendido = document.getElementById('result');

const recuperacion_boton = document.getElementById('generate');

const TeRadio = document.getElementById('Te');

const CafeRadio = document.getElementById('Cafe');

const CocinaRadio = document.getElementById('Cocina');

const sliderValue = document.querySelector(".length__title");

const slider_pos =document.getElementById("slider");

if (encender==0){
  boton_encendido.innerHTML="START"
}else{
  boton_encendido.innerHTML="STOP"
}

if (recuperar==0){
  recuperacion_boton.innerHTML="Recuperacion ON"
}else{
  recuperacion_boton.innerHTML="Recuperacion OFF"
}


slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
    cambiar_en_firebase(parseInt(event.target.value));    
    destildar();


})
  
applyFill(slider.querySelector("input"));

function applyFill(slider) {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
            0.1}%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value);
  
 
} 

function destildar(){
  MateRadio.checked = false;
  TeRadio.checked = false;
  CafeRadio.checked = false;
  CocinaRadio.checked = false;
}




  // Importamos funciones de firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import {
    getDatabase,
    set,
    ref,
    onValue,
    update,
    child,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

  // Informacion y configuracion de nuestra base de datos
  const firebaseConfig = {
    apiKey: "AIzaSyCIs1BIciKJG6zeOdvFjPLEWDWYAoIS_OM",
    authDomain: "pava-electrica.firebaseapp.com",
    databaseURL: "https://pava-electrica-default-rtdb.firebaseio.com",
    projectId: "pava-electrica",
    storageBucket: "pava-electrica.appspot.com",
    messagingSenderId: "653532764209",
    appId: "1:653532764209:web:8f3586138fd3aa62e95d10",
    measurementId: "G-CVD1M561BH",
  };

  // Iniciamos nuestra base de datos
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database);


  const referencia = ref(database, "temperatura");
  const ref2 = ref(database, "encendido");
  const reff3 = ref(database, "recuperacion");
  var encender;
  var recuperar;

  document.getElementById("result").onclick = function(){
    const db = getDatabase();
    encender^=1;
    
    set(ref(db, "encendido"), encender);
    if (encender==0){
      boton_encendido.innerHTML="START"
    }else{
      boton_encendido.innerHTML="STOP"
    }

    
   

  }
  
    document.getElementById("generate").onclick = function(){
      const db = getDatabase();
      recuperar^=1;
      
      set(ref(db, "recuperacion"), recuperar);
      if (recuperar==0){
        recuperacion_boton.innerHTML="Recuperacion ON"
      }else{
        recuperacion_boton.innerHTML="Recuperacion OFF"
      }
    
    

  };

  document.getElementById('Te').onchange=function(){
      if(Te.checked==true){
        const db = getDatabase();
        set(ref(db, "temperatura"), 75);
        applyFill(slider.querySelector("input"));

      }
 };

 document.getElementById('Mate').onchange=function(){
  if(Mate.checked==true){
    const db = getDatabase();
    set(ref(db, "temperatura"), 80);
    applyFill(slider.querySelector("input"));

  }
};

document.getElementById('Cafe').onchange=function(){
  if(Cafe.checked==true){
    const db = getDatabase();
    set(ref(db, "temperatura"), 90);
    applyFill(slider.querySelector("input"));

  }
};

document.getElementById('Cocina').onchange=function(){
  if(Cocina.checked==true){
    const db = getDatabase();
    set(ref(db, "temperatura"), 100);
    applyFill(slider.querySelector("input"));

  }
};

  function cambiar_en_firebase(valor) {
    const db = getDatabase();
    set(ref(db, "temperatura"), valor);
  }

  
  onValue(ref2, (snapshot) => {
    const data = snapshot.val();
    encender=data;
  
});

  onValue(referencia, (snapshot) => {
    const data = snapshot.val();
    sliderValue.setAttribute("data-length", data);
    slider_pos.value=data;
    
});


onValue(ref2, (snapshot) => {
  const data = snapshot.val();
  encender=data;
  if (encender==0){
    boton_encendido.innerHTML="START"
  }else{
    boton_encendido.innerHTML="STOP"
  }

});




 
