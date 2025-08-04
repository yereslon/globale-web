// Espera a que todo el contenido del HTML se haya cargado
document.addEventListener('DOMContentLoaded', function () {

    // ==================== 1. SELECCIÓN DE ELEMENTOS DEL DOM ====================
    const pantallaInicio = document.getElementById('pantalla-inicio-test');
    const pantallaCuestionario = document.getElementById('pantalla-cuestionario');
    const pantallaResultado = document.getElementById('pantalla-resultado');

    const seleccionIdioma = document.getElementById('seleccion-idioma');
    const btnEmpezarTest = document.getElementById('btn-empezar-test');

    const contadorPregunta = document.getElementById('contador-pregunta');
    const rellenoBarraProgreso = document.getElementById('relleno-barra-progreso');
    const contenedorImagenPregunta = document.getElementById('contenedor-imagen-pregunta');
    const textoPregunta = document.getElementById('texto-pregunta');
    const opcionesRespuesta = document.getElementById('opciones-respuesta');
    const btnSiguientePregunta = document.getElementById('btn-siguiente-pregunta');

    const tituloNivelResultado = document.getElementById('titulo-nivel-resultado');
    const descripcionNivelResultado = document.getElementById('descripcion-nivel-resultado');
    const btnVerCursos = document.getElementById('btn-ver-cursos');
    const btnContactarAsesor = document.getElementById('btn-contactar-asesor');

    // ==================== 2. BASE DE DATOS DE PREGUNTAS ====================
    const baseDePreguntas = {
        ingles: [
            // Nivel A1 (Básico) - 6 Preguntas
            { pregunta: "Excuse me, ___ is the train station?", opciones: ["Where", "What", "Who", "Why"], respuestaCorrecta: "Where" },
            { pregunta: "I ___ a student.", opciones: ["is", "are", "am", "be"], respuestaCorrecta: "am" },
            { pregunta: "My brother doesn't ___ fish.", opciones: ["likes", "to like", "like", "liking"], respuestaCorrecta: "like" },
            { pregunta: "How ___ is this book? It's €15.", opciones: ["many", "old", "much", "long"], respuestaCorrecta: "much" },
            { pregunta: "I usually go to bed ___ 11 PM.", opciones: ["on", "in", "at", "with"], respuestaCorrecta: "at" },
            { pregunta: "What is this fruit?", imagen: "https://placehold.co/400x250/DD2E44/FFFFFF?text=Apple", opciones: ["An apple", "A banana", "An orange", "A pear"], respuestaCorrecta: "An apple" },

            // Nivel A2 (Elemental) - 6 Preguntas
            { pregunta: "This famous tower is in ___.", imagen: "https://placehold.co/400x250/C2C2C2/000000?text=Eiffel+Tower", opciones: ["London", "New York", "Paris", "Rome"], respuestaCorrecta: "Paris" },
            { pregunta: "What ___ you do last weekend?", opciones: ["did", "do", "were", "have"], respuestaCorrecta: "did" },
            { pregunta: "This restaurant is ___ than the other one.", opciones: ["good", "best", "better", "well"], respuestaCorrecta: "better" },
            { pregunta: "She has never ___ to Asia.", opciones: ["go", "went", "been", "gone"], respuestaCorrecta: "been" },
            { pregunta: "You ___ pay for the museum ticket; it's free.", opciones: ["mustn't", "don't have to", "shouldn't", "can't"], respuestaCorrecta: "don't have to" },
            { pregunta: "I was watching a movie when the phone ___.", opciones: ["ring", "rang", "was ringing", "rung"], respuestaCorrecta: "rang" },

            // Nivel B1 (Intermedio) - 6 Preguntas
            { pregunta: "This ancient structure, the Colosseum, is in ___.", imagen: "https://placehold.co/400x250/E0D6B1/000000?text=Colosseum", opciones: ["Greece", "Egypt", "Turkey", "Italy"], respuestaCorrecta: "Italy" },
            { pregunta: "If you heat water to 100 degrees, it ___.", opciones: ["boils", "will boil", "would boil", "is boiling"], respuestaCorrecta: "boils" },
            { pregunta: "He's been working here ___ more than five years.", opciones: ["since", "for", "during", "ago"], respuestaCorrecta: "for" },
            { pregunta: "The problem is being ___ by a team of experts.", opciones: ["looked into", "looked up", "looked for", "looked out"], respuestaCorrecta: "looked into" },
            { pregunta: "I'm not used to ___ up so early.", opciones: ["get", "getting", "got", "to get"], respuestaCorrecta: "getting" },
            { pregunta: "He told me he ___ the movie the day before.", opciones: ["sees", "has seen", "had seen", "saw"], respuestaCorrecta: "had seen" },

            // Nivel B2 (Intermedio-Alto) - 6 Preguntas
            { pregunta: "The Great Wall of China was built to ___.", imagen: "https://placehold.co/400x250/A9A9A9/000000?text=Great+Wall", opciones: ["be a tourist attraction", "protect against invasions", "connect two cities", "serve as a river"], respuestaCorrecta: "protect against invasions" },
            { pregunta: "Had I known you were coming, I ___ a cake.", opciones: ["would bake", "baked", "would have baked", "will bake"], respuestaCorrecta: "would have baked" },
            { pregunta: "The company is planning to ___ a new line of products.", opciones: ["bring in", "bring up", "bring out", "bring about"], respuestaCorrecta: "bring out" },
            { pregunta: "She is considered to ___ one of the best artists of her generation.", opciones: ["be", "being", "have been", "is"], respuestaCorrecta: "be" },
            { pregunta: "I regret ___ so much money on that gadget.", opciones: ["to spend", "spending", "spent", "of spending"], respuestaCorrecta: "spending" },
            { pregunta: "The more you practice, ___ you will become.", opciones: ["the fluent", "the more fluent", "more fluent", "fluenter"], respuestaCorrecta: "the more fluent" },

            // Nivel C1 (Avanzado) - 6 Preguntas
            { pregunta: "This building is renowned for its ___ design.", imagen: "https://placehold.co/400x250/F0F0F0/000000?text=Sydney+Opera", opciones: ["cubist", "baroque", "expressionist", "art deco"], respuestaCorrecta: "expressionist" },
            { pregunta: "The project was challenging, but we managed to ___.", opciones: ["pull it off", "pull it over", "pull it up", "pull it through"], respuestaCorrecta: "pull it off" },
            { pregunta: "She has a ___ for spotting new trends in fashion.", opciones: ["sharp look", "good view", "keen eye", "clear sight"], respuestaCorrecta: "keen eye" },
            { pregunta: "___ the fact that he is new, he has made a significant impact.", opciones: ["Although", "In spite", "Despite", "However"], respuestaCorrecta: "Despite" },
            { pregunta: "The CEO's speech was meant to ___ the employees' concerns.", opciones: ["assuage", "provoke", "escalate", "exacerbate"], respuestaCorrecta: "assuage" },
            { pregunta: "The new regulations will come into ___ next month.", opciones: ["action", "force", "play", "effect"], respuestaCorrecta: "force" }
        ],
        frances: [],
    };

    let preguntasActuales = [];
    let preguntaActualIndex = 0;
    let puntuacion = 0;

    // ==================== 3. LÓGICA DEL TEST ====================

    function empezarTest() {
        const idiomaSeleccionado = seleccionIdioma.value;
        preguntasActuales = baseDePreguntas[idiomaSeleccionado];

        if (!preguntasActuales || preguntasActuales.length === 0) {
            alert('Lo sentimos, la prueba para este idioma no está disponible todavía.');
            return;
        }

        preguntaActualIndex = 0;
        puntuacion = 0;
        pantallaInicio.classList.add('hidden');
        pantallaCuestionario.classList.remove('hidden');
        mostrarPregunta();
    }

    function mostrarPregunta() {
        opcionesRespuesta.innerHTML = '';
        btnSiguientePregunta.classList.add('hidden');

        const pregunta = preguntasActuales[preguntaActualIndex];
        textoPregunta.textContent = pregunta.pregunta;

        contenedorImagenPregunta.innerHTML = '';
        if (pregunta.imagen) {
            const img = document.createElement('img');
            img.src = pregunta.imagen;
            img.alt = "Imagen de la pregunta";
            img.classList.add('imagen-pregunta');
            contenedorImagenPregunta.appendChild(img);
            contenedorImagenPregunta.style.display = 'block';
        } else {
            contenedorImagenPregunta.style.display = 'none';
        }

        contadorPregunta.textContent = `Pregunta ${preguntaActualIndex + 1} de ${preguntasActuales.length}`;
        const progreso = ((preguntaActualIndex + 1) / preguntasActuales.length) * 100;
        rellenoBarraProgreso.style.width = `${progreso}%`;

        pregunta.opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.textContent = opcion;
            boton.classList.add('opcion-btn');
            boton.addEventListener('click', () => seleccionarRespuesta(boton, opcion, pregunta.respuestaCorrecta));
            opcionesRespuesta.appendChild(boton);
        });
    }

    function seleccionarRespuesta(botonSeleccionado, opcion, respuestaCorrecta) {
        const todosLosBotones = opcionesRespuesta.querySelectorAll('.opcion-btn');
        todosLosBotones.forEach(boton => {
            boton.disabled = true;
            if (boton.textContent === respuestaCorrecta) {
                boton.classList.add('correcta');
            }
        });

        if (opcion === respuestaCorrecta) {
            puntuacion++;
            botonSeleccionado.classList.add('correcta');
        } else {
            botonSeleccionado.classList.add('incorrecta');
        }

        btnSiguientePregunta.classList.remove('hidden');
    }

    function siguientePregunta() {
        preguntaActualIndex++;
        if (preguntaActualIndex < preguntasActuales.length) {
            mostrarPregunta();
        } else {
            mostrarResultados();
        }
    }

    function mostrarResultados() {
        pantallaCuestionario.classList.add('hidden');
        pantallaResultado.classList.remove('hidden');

        // Lógica de puntuación ajustada para 30 preguntas
        let nivel = '';
        let descripcion = '';

        if (puntuacion <= 6) {
            nivel = 'A1 - Principiante';
            descripcion = 'Estás dando tus primeros pasos. ¡El mejor momento para empezar a construir una base sólida!';
        } else if (puntuacion <= 12) {
            nivel = 'A2 - Elemental';
            descripcion = 'Ya puedes comunicarte en tareas sencillas y cotidianas. ¡Sigue así para ganar más confianza!';
        } else if (puntuacion <= 18) {
            nivel = 'B1 - Intermedio';
            descripcion = 'Puedes entender los puntos principales de textos claros y mantener una conversación. ¡Estás en el camino perfecto hacia la fluidez!';
        } else if (puntuacion <= 24) {
            nivel = 'B2 - Intermedio-Alto';
            descripcion = 'Tienes un dominio sólido del idioma y puedes expresarte con fluidez y espontaneidad. ¡Es hora de perfeccionar los detalles!';
        } else {
            nivel = 'C1 - Avanzado';
            descripcion = 'Posees un dominio operativo eficaz del idioma. ¡Estás listo para enfrentarte a situaciones complejas y académicas!';
        }

        tituloNivelResultado.textContent = nivel;
        descripcionNivelResultado.textContent = descripcion;

        const idioma = seleccionIdioma.value;
        btnVerCursos.href = `IDIOMAS/${idioma}.html`;
        btnVerCursos.textContent = `Ver Cursos de ${idioma.charAt(0).toUpperCase() + idioma.slice(1)}`;

        const mensajeAsesor = `Hola, he completado la prueba de nivel de ${idioma} y mi resultado es ${nivel}. Me gustaría recibir más información.`;
        btnContactarAsesor.href = `contacto.html?mensaje=${encodeURIComponent(mensajeAsesor)}`;
    }

    // ==================== 4. EVENT LISTENERS ====================
    btnEmpezarTest.addEventListener('click', empezarTest);
    btnSiguientePregunta.addEventListener('click', siguientePregunta);
});
