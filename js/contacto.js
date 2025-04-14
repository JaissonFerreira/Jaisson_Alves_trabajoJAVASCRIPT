// Variables globales
let map;
let marker;
let directionsService;
let directionsRenderer;

// Coordenadas del negocio (ejemplo: Madrid, España)
const businessLocation = {
    lat: 40.4168,
    lng: -3.7038
};

// Inicializar el mapa cuando se carga la página
function initMap() {
    // Crear el mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: businessLocation,
        zoom: 15,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Añadir marcador para la ubicación del negocio
    marker = new google.maps.Marker({
        position: businessLocation,
        map: map,
        title: 'Nuestro Negocio',
        animation: google.maps.Animation.DROP
    });

    // Inicializar servicios de direcciones
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });

    // Añadir evento para calcular ruta
    document.getElementById('calculate-route').addEventListener('click', calculateRoute);
}

// Calcular ruta desde la ubicación del usuario
function calculateRoute() {
    const start = document.getElementById('start-location').value;
    
    if (!start) {
        alert('Por favor, introduce tu ubicación de inicio');
        return;
    }

    const request = {
        origin: start,
        destination: businessLocation,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Mostrar información de la ruta
            const route = result.routes[0].legs[0];
            const distance = route.distance.text;
            const duration = route.duration.text;
            
            alert(`Distancia: ${distance}\nDuración estimada: ${duration}`);
        } else {
            alert('No se pudo calcular la ruta. Por favor, verifica la dirección.');
        }
    });
}

// Manejar el envío del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validar campos
    if (!name || !email || !subject || !message) {
        alert('Por favor, completa todos los campos del formulario');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido');
        return;
    }
    
    // Aquí iría el código para enviar el formulario al servidor
    // Por ahora, solo mostraremos un mensaje de éxito
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    this.reset();
});

// Obtener la ubicación actual del usuario
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Rellenar automáticamente el campo de ubicación
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: userLocation }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        document.getElementById('start-location').value = results[0].formatted_address;
                    }
                });
            },
            (error) => {
                console.error('Error al obtener la ubicación:', error);
            }
        );
    }
}

// Llamar a getUserLocation cuando se carga la página
window.addEventListener('load', getUserLocation); 