const formularioUser = document.getElementById('formularioInfo');
const formulario = document.getElementById('miFormulario');
const contenedorMensaje = document.getElementById('mensaje');

formularioUser.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que se recargue la página
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const form2 = document.getElementById('ChatBot');
    const form1 = document.getElementById('Informacion');
    const response = await fetch('https://api-student-yg19.onrender.com/Student/guardar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'cb65583e-4b30-45f9-8841-b6378b740e60'
        },
        body: JSON.stringify({
            Nombre: nombre,
            Edad: edad
        })
    })
    const mensaje = await response.json();
    console.log(mensaje.message);
    if (mensaje.message != "Guardado") {
        alert("Error al guardar la información");
    } else {
        form2.style.display = "block";
        form1.style.display = "none";
    }
});

formulario.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const question = document.getElementById('pregunta').value;
    const API_KEY = "a7d469b6ce564446b20c0d14b2806461"
    const response = await fetch('https://api.aimlapi.com/chat/completions', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role":"system", "content": "Quiero que seas un asistente de apoyo emocional para las personas con ansiedad."},
            {"role":"user", "content": question},
        ]
        }),
    });
    const mensaje = await response.json();
    if (mensaje?.choices?.length > 0) {
        contenedorMensaje.textContent = mensaje.choices[0].message.content;
        formulario.reset();
    }else {
        contenedorMensaje.textContent = "No se pudo obtener una respuesta";
    }
});