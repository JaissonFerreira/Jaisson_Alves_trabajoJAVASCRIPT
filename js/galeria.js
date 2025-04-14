
$(document).ready(function () {
    // cargar el archivo JSON
    $.getJSON("../data/galeria.json", function (imagenes) {
      let galleryHTML = "";
  
      // Itera sobre las imagens y crea los elementos HTML
      imagenes.forEach(imagen => {
        galleryHTML += `
          <div class="gallery-item">
            <a href="${imagen.imagen}" data-lightbox="gallery" data-title="${imagen.titulo}">
             <img src="${imagen.imagen}" alt="${imagen.titulo}" class="gallery-image">
            </a>
            <h3>${imagen.titulo}</h3>
          </div>
        `;
      });
      
     
      // Agrega el HTML generado al contenedor de la galería
      $("#gallery").html(galleryHTML);


    }).fail(function () {
      console.error("No se pudo cargar el archivo de galería.");
    });
  });

