export let premiosGlobal = [];
export function syncPrieces() {
    return fetch('data/prieces.json')
        .then(response => response.json())
        .then(data => {
            premiosGlobal = data; // Guardar los datos globalmente
            return data;
        });
}

export function nomIsWinner(premio, nom) {
    return premio.winner.split(';;').includes(nom)
}

export function getPrieces(termino) {
    console.log(termino)
    return premiosGlobal.filter(premio => {
        console.log(premio.nominees)
        return Object.keys(premio.nominees).find( x => x.toUpperCase().includes(termino.trim())) || premio.category.toUpperCase().includes(termino.toUpperCase().trim()) || premio.winner.toUpperCase().includes(termino.trim()) || premio.year.toUpperCase().includes(termino.trim());
        }
    );
}
