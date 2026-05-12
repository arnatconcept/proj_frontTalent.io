
Decidi crear una pagina web para una cafeteria-bar.

Primero arme un esquema de diseño grafico en como podria agrupar y ordenar el contenido.Luego en base a como seria el diseño en general empece armando 
la estructura basica con las etiquetas relacionadas a cada parte de mi diseño.Busque imagenes de cafe o bar y descargue las que podrian llegar a ser utiles.

Una vez creadas las etiquetas y decidi centrarme en el header <header class="header_sitio" id="inicio"> coloque una imagen de fondo(en la documentacion 
vi el linear-gradient para aplicarlo y me parecio una buena idea como filtro de imagen ya que el texto a colocar ensima no se veia con nitidez).
Queria agregar una barra superior para algun texto promocional de descuento asi que agregue un <div class="header_up">. 
Agregue otra division con <div class="header_content"> y dentro utilice las etiquetas <h1 class="title_header"> para un titulo y <h3 class="text_header"> para un texto importante,
y su estilo fue en forma de columna usando flex ,alineacion en el centro con align-items padding, color y altura minima.
La ultima division dentro del <header> fue <div class="header_footer">.
Luego dentro un <nav> y agregue una lista <ul class="menu_principal"> para organizar los enlaces de navegacion de manera horizontal.
Cada opcion del menu fue creada con etiquetas <li> y <a> para poder dirigir al usuario hacia distintas secciones de la pagina utilizando identificadores con "#id".
En los estilos de .menu_principal utilice display:flex para acomodar los elementos uno al lado del otro y 
justify-content: space-evenly para distribuirlos de forma uniforme a lo largo del ancho disponible.Tambien elimine los estilos por defecto de las listas usando list-style:none.

Luego decidi trabajar sobre la adaptabilidad de la pagina en dispositivos pequeños utilizando @media (max-width:600px).
Dentro de esta media query modifique tamaños y espaciados del header para evitar que los textos y el menu se deformaran en pantallas reducidas.
(Siempre que termine de pensar que un diseño estaba listo cambiaba el tamaño de la ventana del explorador para asegurarme que se comportara de manera correcta)

Despues de terminar el encabezado cree una nueva seccion <section class="separador"> para generar una division visual entre el header y los productos.
A esta seccion le agregue un fondo utilizando linear-gradient horizontal entre negro y gris para mantener la estetica general del sitio.
Dentro del titulo <h2> agregue iconos de tazas utilizando Font Awesome con <i class="fa-solid fa-mug-saucer"></i> para reforzar visualmente la tematica de cafeteria.
Mas adelante cree la seccion principal de productos con <section class="contenedor_productos">.
La idea fue construir una grilla flexible de tarjetas reutilizables para cada producto.Para lograr eso utilice display: flex, flex-direction: row;(para que sea una al lado del otro en fila), 
flex-wrap: wrap; para que si no entra el siguiente producto se acomode en la siguiente fila, un gap para establecer la separacion entre las tarjetas de productos,
justify-content: center; para que queden centrados.

Cada producto fue creado dentro de <section class="card"> ya que queria reutilizar una misma estructura para todos los productos y mantener un diseño uniforme en toda la pagina.
Dentro de .card utilice background: linear-gradient(to top, grey, white); para evitar un color plano y darle un pequeño efecto de profundidad visual.
Tambien agregue border-radius: 8px; para redondear las esquinas y lograr un diseño mas moderno.
Use display:flex; junto con flex-direction: column; porque queria que todos los elementos internos de la tarjeta (imagen, titulo, descripcion, precio y boton) se acomodaran uno debajo del otro de manera vertical.
La propiedad width: 15rem; fue utilizada para mantener un tamaño uniforme entre todas las tarjetas y evitar diferencias visuales entre productos.
Agregue padding:10px; para generar espacio interno y evitar que el contenido quedara pegado a los bordes.
Tambien utilice box-shadow para crear una sombra y generar sensacion de profundidad separando visualmente las tarjetas del fondo general de la pagina.
La propiedad position: relative; la agregue porque algunas etiquetas promocionales como .tag necesitaban posicionarse tomando como referencia la card contenedora.
Ademas agregue transition: all 0.5s ease-out; para suavizar las animaciones y evitar cambios bruscos cuando se activa el efecto hover.
Luego cree el efecto .card:hover utilizando transform: rotate(1deg); para inclinar levemente la tarjeta al pasar el mouse y generar una sensacion mas dinamica.
Tambien en el hover modifique el box-shadow para aumentar la profundidad visual y cambie el background para resaltar aun mas la tarjeta seleccionada.
Dentro de cada card cree <div class="imagen"> para mostrar la imagen principal del producto.
En .imagen utilice width:100%; para que ocupe todo el ancho disponible de la tarjeta.
Agregue aspect-ratio: 1 / 1; para mantener una proporcion cuadrada independientemente del tamaño de pantalla y asi evitar deformaciones.
Dentro de algunas imagenes agregue <div class="tag"> para mostrar descuentos o promociones especiales.
En .tag utilice background-color:red; para captar rapidamente la atencion del usuario.

Mas adelante agregue la seccion de reseñas utilizando <section class="reseñas">.
Para esta seccion decidi probar CSS Grid en lugar de Flexbox por que asi lo requeria una de las consignas de la entrega del pre-proyecto.
La propiedad display:grid; permite trabajar con filas y columnas de forma mas estructurada.
Con grid-template-columns: repeat(auto-fit, minmax(20rem,1fr)); logre que las tarjetas se acomoden automaticamente dependiendo del espacio disponible:
auto-fit intenta acomodar la mayor cantidad posible de columnas,
minmax(20rem,1fr) establece un tamaño minimo de 20rem y un tamaño maximo flexible.
Tambien agregue gap:2rem; para mantener separacion entre las reseñas.
Cada reseña fue creada con <article class="card"> reutilizando la clase .card para aprovechar los mismos estilos base de las tarjetas de productos.
Dentro de cada reseña agregue estrellas utilizando iconos de Font Awesome para representar visualmente la puntuacion de cada cliente.
En .fa-star utilice color:goldenrod; para que las estrellas tuvieran un color similar al dorado tradicional utilizado en sistemas de valoracion.
Tambien cree botones .btn_reseña reutilizando una estetica muy parecida a los botones de compra para mantener coherencia visual entre componentes.
Finalmente agregue pequeñas animaciones utilizando @keyframes slidein.
Dentro de la animacion modifique con transform, opacity y color.
La idea fue darle movimiento a los iconos de las tazas utilizando alternancia infinita para evitar una interfaz completamente estatica y practicar propiedades relacionadas a animaciones CSS.Jugar un poco con la animacion.

Luego cree <section class="form_msj" id="formulario"> donde combine una imagen de fondo con un formulario de contacto.
Utilice display: grid y grid-template-columns: 1fr 1fr para dividir el espacio en dos columnas, una para el texto y otra para el formulario.
Con align-items: center logre una alineacion vertical equilibrada entre ambos bloques.
El formulario interno utiliza display: flex con flex-direction: column para organizar los campos de manera ordenada, y estilos como padding, 
border-radius y box-shadow para mejorar su apariencia visual y jerarquia.
Envio de formulario exitoso con la plataforma formspree.io, <form action="https://formspree.io/f/mvgkprgg" method="POST"> el link lo proporciona formspree.io al crear un formulario, 
uso necesario de la propiedad "name" para relacionar cada campo de la pagina al formulario creado con la plataforma.



Alumno: Ariel Fernando Belmonte









