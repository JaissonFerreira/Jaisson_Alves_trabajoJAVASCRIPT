$(document).ready(function() {
  $.getJSON("data/noticias.json", function(noticias) {
    let indiceActual = 0;

    function mostrarNoticia(indice) {
      const noticia = noticias[indice];
      const noticiaHTML = `
        <div class="news-item">
          <h3>${noticia.titulo}</h3>
          <p>${noticia.descripcion}</p>
          <img src="${noticia.imagen}" class="news-image" alt="Imagen de noticia">
          <br>
          <small>${noticia.fecha}</small>
        </div>
      `;
      $(".news-item").html(noticiaHTML);
    }


  mostrarNoticia(indiceActual);


 
  // Configura el intervalo para cambiar automáticamente la noticia cada 5 segundos
setInterval(function() {
    indiceActual = (indiceActual + 1) % noticias.length;
    mostrarNoticia(indiceActual);
  }, 5000);

  $("#anterior").click(function() {
      // Retrocede al índice anterior y muestra la noticia correspondiente
      indiceActual = (indiceActual - 1 + noticias.length) % noticias.length;
      mostrarNoticia(indiceActual);
    });

    $("#proxima").click(function() {
      // Avanza al siguiente índice y muestra la noticia correspondiente
      indiceActual = (indiceActual + 1) % noticias.length;
      mostrarNoticia(indiceActual);
    });
  
  
  }).fail(function() {
    console.error("No se pudo cargar el archivo de noticias.");
  } );
} );


