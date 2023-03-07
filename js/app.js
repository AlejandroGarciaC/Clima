const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// const apiID = '7a0f297c0ff6ad62ba75d60d62a51057';
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    // console.log(ciudad);
    // console.log(pais);

    if (ciudad === '' || pais === '') {
        //Hubo un error
        mostrarError('Ambos campos son abligatorios')
        return;
    }
    //Consultar API

    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alert = document.querySelector('.bg-red-100');
    if (!alert) {
            //Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3',
        'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <stron class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}
function consultarAPI(ciudad, pais){
    const apiID = '7a0f297c0ff6ad62ba75d60d62a51057';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;
    
    Spinner(); //Muestra un spinner de carga

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(datos => {

                limpiarHTML(); //Limpiar html previo
                if (datos.cod === '404') {
                    mostrarError('Ciudad no encontrada');
                    return;
                }

                //Imprime la respuesta en el html
                mostrarClima(datos);
            })
   

    }

function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}}= datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    const nombreCiudad  = document.createElement('p');

    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML=`${centigrados} &#8451;`
    actual.classList.add('font-bold','text-6xl')

    const tempMax = document.createElement('p');
    tempMax.innerHTML=`Max: ${max} &#8451;`
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML=`Min: ${min} &#8451;`
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `

    resultado.appendChild(divSpinner);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function consultarAPI(ciudad, pais){
//     const urlGEO = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=${apiID}`

//     fetch(urlGEO)
//         .then(respuesta => respuesta.json())
//         .then(datos => consultarAPI2(datos[0].lat, datos[0].lon))
// }

// function consultarAPI2(lat, lon){
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiID}`

//     fetch(url)
//         .then(respuesta => respuesta.json())
//         .then(datos => console.log(datos))
// }