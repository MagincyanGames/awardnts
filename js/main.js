import { syncPrieces, getPrieces, premiosGlobal, nomIsWinner } from "./prieces.js";

document.addEventListener('DOMContentLoaded', () => {
    syncPrieces().then(mostrarPremios);
});

function mostrarPremios(premios) {
    const contenedor = document.getElementById('priece-container');
    contenedor.innerHTML = ''; // Limpiar el contenedor
    premios.forEach(premio => {
        const div = document.createElement('div');
        div.classList.add('premio');

        if(premio.type && premio.type === 'PERSONAL') {
            div.classList.add('premio-personal');
            div.innerHTML = `
            <div><h2>${premio.category}</h2>
            <br>
            <p><strong>Nominados</strong> <hr>
            ${ Object.keys(premio.nominees).map(nomina =>  {
                const game = nomina.split('::')[0]

                if (nomIsWinner(premio, nomina)) return `<br><strong>${game}</strong>`
                        else return`<br>${game}`
                }).join('<br>')
            }
            </p></div>
            <br>
            <p class="year"><strong>${premio.year}</strong></p>
        `;
        } else {
            div.innerHTML = `
                <div><h2>${premio.category}</h2>
                
                <br>
                <p><strong>Nominados</strong> <hr>
                ${ Object.keys(premio.nominees).map(nomina =>  {
                    const game = nomina.split('::')[0]
                    console.log(nomina)
                    if (premio.winner.split(';;').includes(nomina)) return `<br><strong>${game}</strong>`
                        else return`<br>${game}`
                    }).join('<br>')
                }
                </p></div>
                <br>
                <p class="year"><strong>${premio.year}</strong></p>
            `;
        }

        div.addEventListener('click', () => {
            window.location.href = `detail.html?c=${premio.category}`;
        });

        contenedor.appendChild(div);
    });
}

function filtrarPremios() {
    const termino = document.getElementById('buscador-juego').value.toUpperCase();
    mostrarPremios(getPrieces(termino));
}
