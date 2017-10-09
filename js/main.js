"use strict";
const app={
    mapaInicial: { //datos para generar el mapa inicial
        zoom: 7,
        center: {lat: -16.3988900, lng: -71.5350000},//coordenadas de Arequipa
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl:false
    },
    ubicacionActual:{ //datos de la ubicacion dada con encuentrame
        latitud: null,
        longitud: null,
        mapa:null
    },
    buscar: ()=>{ //funcion que da la ubicacion actual
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(app.funcionExito,app.funcionError);
        }
    },
    funcionExito : (posicion)=>{ //funcion ejecutada cuando se encuentra la ubicacion
        app.ubicacionActual.latitud = posicion.coords.latitude;
        app.ubicacionActual.longitud= posicion.coords.longitude;

        let miUbicacion = new google.maps.Marker({ 
            position: {lat:app.ubicacionActual.latitud, lng:app.ubicacionActual.longitud},
            animation: google.maps.Animation.DROP,
            map: app.ubicacionActual.mapa
        });

        app.ubicacionActual.mapa.setZoom(17);
        app.ubicacionActual.mapa.setCenter(miUbicacion.position);
    },

    funcionError: (error)=>{ //funcion ejecutada cuando hay error en encontrar la ubicacion
        alert("Tenemos un problema con encontrar tu ubicación");
    },
    evento: ()=>{
        $("#encuentrame").click(app.buscar);
    },
    iniciar: ()=> {
        app.ubicacionActual.mapa = new google.maps.Map($("#mapa")[0], app.mapaInicial);
        app.evento();
    }
}

function initMap() {
    app.iniciar();
}

