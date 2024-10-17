import { getPrieces, syncPrieces } from "./prieces.js";

document.addEventListener('DOMContentLoaded', () => {
    syncPrieces().then(mostrarPremio);
});

function mostrarPremio() {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('c');
    const premio = getPrieces(cat)[0];
    console.log(getPrieces(cat))
    
    document.getElementById('titulo-premio').textContent = premio.category;
    // document.getElementById('imagen-premio').src = premio.image;
    
    if (premio.nominees) {
        const ctx = document.getElementById('grafico-votos').getContext('2d');
        const data = {
            labels: Object.keys(premio.nominees),
            datasets: [{
                data: Object.values(premio.nominees),
                backgroundColor: [
                    '#D84D3A', // Darker Pink
                    '#D68F2A', // Darker Orange
                    '#C2B700', // Darker Yellow
                    '#388E3C', // Darker Green
                    '#1976D2', // Darker Blue
                    '#C2185B', // Darker Purple
                    '#A27CDB', // Darker Lavender
                    '#0097A7', // Darker Mint
                    '#C0483D', // Darker Peach
                    '#D2694A'  // Darker Coral
                ],
                borderWidth: 1.25
            }]
        };
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: false,
                        text: 'Resultados de la Votación'
                    }
                }
            }
        });
    }
}

