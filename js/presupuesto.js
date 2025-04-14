// Precios de los productos
const precios = {
    corte: 15,
    afeitado: 10,
    color: 30,
    barba: 12
};

// Precios de los extras
const extras = {
    jabon_liquido: 12,
    brocha_afeitar: 18,
    crema_hidratante: 15,
    cera_barba: 14,
    aceite_barba: 16
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quote-form');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const presupuestoFinal = document.getElementById('presupuesto-final');
    const checkboxes = document.querySelectorAll('input[name="productos"]');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');

    // Validación de nombre
    nombreInput.addEventListener('input', function() {
        const nombre = this.value;
        if (!/^[A-Za-z\s]{1,15}$/.test(nombre)) {
            this.setCustomValidity('El nombre solo puede contener letras y espacios, máximo 15 caracteres');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validación de apellidos
    apellidosInput.addEventListener('input', function() {
        const apellidos = this.value;
        if (!/^[A-Za-z\s]{1,40}$/.test(apellidos)) {
            this.setCustomValidity('Los apellidos solo pueden contener letras y espacios, máximo 40 caracteres');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validación de teléfono
    telefonoInput.addEventListener('input', function() {
        const telefono = this.value;
        if (!/^\d{1,9}$/.test(telefono)) {
            this.setCustomValidity('El teléfono solo puede contener números, máximo 9 dígitos');
        } else {
            this.setCustomValidity('');
        }
    });

    // Validación de email
    emailInput.addEventListener('input', function() {
        const email = this.value;
        if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            this.setCustomValidity('Por favor, introduce un email válido');
        } else {
            this.setCustomValidity('');
        }
    });

    // Función para calcular el presupuesto
    function calcularPresupuesto() {
        let total = 0;
        
        // Sumar productos seleccionados
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += precios[checkbox.value];
            }
        });

        // Sumar extras seleccionados
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += extras[checkbox.value];
            }
        });

        presupuestoFinal.textContent = total.toFixed(2) + '€';
    }

    // Event listeners para actualizar el presupuesto
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    extrasCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calcularPresupuesto);
    });

    // Validación del formulario antes de enviar
    form.addEventListener('submit', function(e) {
        // Siempre prevenir el envío por defecto
        e.preventDefault();
        
        let isValid = true;
        let productosSeleccionados = false;

        // Verificar que al menos un producto está seleccionado
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                productosSeleccionados = true;
            }
        });

        if (!productosSeleccionados) {
            alert('Por favor, selecciona al menos un servicio');
            isValid = false;
        }

        if (isValid) {
            // Mostrar mensaje de éxito
            const fecha = fechaInput.value;
            const hora = horaInput.value;
            const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            alert(`¡Cita reservada con éxito!\n\nTu cita ha sido programada para el ${fechaFormateada} a las ${hora}.\n\nTe esperamos en nuestra barbearía. ¡Gracias por confiar en nosotros!`);
            
            // Redirigir al usuario a la página de inicio
            window.location.href = "../index.html";
        }
    });
}); 