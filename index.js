// Cria uma meta 
let meta = {
    value: 'ler um livro todo dia',
    checked: true
}

// Cria uma lista de METAS e podemos manipular o obejeto meta para usarmos depois
let metas = [
    meta,
    {
        value: 'caminhar todo dia',
        checked: false
    }
]

// console.log(metas[0].value ou checked) pega o primeiro objeto. 
// Se colocarmos no [] o valor 1 ela o os parametros dentro do arrey 
// Se atente que usei o metaS pois se usassemos o meta com [] daria erro 

console.log(metas[1].value);