let premiosGlobal = [];
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/prieces.json')
        .then(response => response.json())
        .then(data => {
            
            premiosGlobal = data; // Guardar los datos globalmente
            mostrarPremios(premiosGlobal);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
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
            ${ premio.nominees.map(nomina =>  {
                if (Array.isArray(premio.winner)) {
                    console.log('is array')
                    if (premio.winner.includes(nomina)) return `<br><strong>${nomina}</strong>`
                    else return`<br>${nomina}`
                }
                else {
                    if (nomina === premio.winner) return `<br><strong>${nomina}</strong>`
                    else return`<br>${nomina}`}
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
                ${ premio.nominees.map(nomina =>  {
                    if (Array.isArray(premio.winner)) {
                        console.log('is array')
                        if (premio.winner.includes(nomina)) return `<br><strong>${nomina}</strong>`
                    }
                    else {
                        if (nomina === premio.winner) return `<br><strong>${nomina}</strong>`
                        else return`<br>${nomina}`}
                    }).join('<br>')
                }
                </p></div>
                <br>
                <p class="year"><strong>${premio.year}</strong></p>
            `;
        }
        contenedor.appendChild(div);
    });
}

function filtrarPremios() {
    const termino = document.getElementById('buscador-juego').value.toUpperCase();
    console.log(termino);
    const premiosFiltrados = premiosGlobal.filter(premio => {
        console.log(premio.nominees)
        return premio.nominees.find( x => x.toUpperCase().includes(termino.trim())) || premio.category.toUpperCase().includes(termino.trim()) || premio.winner.toUpperCase().includes(termino.trim()) || premio.year.toUpperCase().includes(termino.trim());
        }
    );
    mostrarPremios(premiosFiltrados);
}
