const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem-vindo ao In.Orbit";

let meta = {
    value: 'Tomar agua todo dia',
    checked: false
}
let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta: "})

    if (meta.length == 0) {
        mensagem = "A meta nao pode estar vazia."
        return

    }

    metas.push({
        value: meta, checked: false

    })

    mensagem = 'Meta(s) cadastrada(s) com sucesso!'

}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para trocar de meta, o espaco para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return

    }

   


    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        
        meta.checked = true;
    })
    mensagem = "Metas marcadas como concluidas"

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked 

    })

    if (realizadas.length == 0) {
        console.log("Nao existem metas realiazadas! :(")
        return
    }

    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true 
    })

    if (abertas.length == 0) {
        mensagem = "Nao existe metas abertas! :)"
        return
    }

    await select ({
        message:"Metas abertas:" + " " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })


    const deletaAsMetas = await checkbox({
        message: "Selecione uma meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (deletaAsMetas.length == 0) {
        mensagem = "Nenhum item para deletar"
        return
    }

    deletaAsMetas.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
             
        })

    })

    mensagem = "Meta(s) Deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = "" 
    }
}

const start = async () => {

    while(true){
        mostrarMensagem()


        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]

        })



        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
               await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Ate a proxima")
                return
        } 
    }
}

start();
