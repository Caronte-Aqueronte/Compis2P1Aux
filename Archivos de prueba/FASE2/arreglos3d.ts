let mapas = ["Desierto", "Bosque", "Mar", "Ciudad"];
let enemigos = ["Enano", "Troll", "Caballero", "Arquero", "Maquina"];
let jugadores = ["Ronald", "Manuel","Jhonatan","Cesar","Pablo"];

let score: number[] = [
    [
        [18,16,20,15,98]
    ],
    [
        [25,10,8,45,100]
    ]
];

function imprimirReporte(value: number, i: number, j: number, k: number) {
    console.log(mapas[i] + ", " + enemigos[j] + ", " + jugadores[k] + ", " + value);
}

function imprimirScore(array: number[]) {
    for (let i = 0; i < length(array); i++) {
        for (let j = 0; j < length(array[i]); j++) {
            for (let k = 0; k < length(array[i][j]); k++) {
                imprimirReporte(array[i][j][k], i, j, k);
            }
        }
    }
}

console.log("Mapa" + "          " + "Enemigo" + "          " + "Jugador" + "          " + "Derrotados");    
imprimirScore(score);