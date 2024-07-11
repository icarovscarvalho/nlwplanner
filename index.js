const createCityName = () => {
    const citySearch = document.querySelector('input')
    const city = citySearch.value
    console.log(city)
}
createCityName()

const formatador = (data)=>{
    return{
        dia:{
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd')
            }
        },
        mes: {
            numerico: dayjs(data).format('MM'),
            texto: dayjs(data).format('MM'),
        },
        hora: dayjs(data).format('HH:mm'),
        ano: dayjs(data).format('YYYY')
    }
}

formatador(new Date('2024-04-01'))

const atividade = {
    nome:"Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

let atividades = [
    atividade,
    {
        nome:"Academia em grupo",
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome:"Gamming session",
        data: new Date("2024-07-09 16:00"),
        finalizada: true
    }
]

const calendarioAtualizado = () => {
    const diaAgora = formatador().dia.numerico
    const mesAgora = formatador().mes.numerico
    const anoAgora = formatador().ano
    const dataHoje = `${anoAgora}-${mesAgora}-${diaAgora}`

    const dateInput = document.getElementById('dateInput')
    dateInput.setAttribute('min', dataHoje)
 }
calendarioAtualizado()

const criarItemDeAtividade = (atividade) => {
    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `

    if(atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    const formatar = formatador(atividade.data);

    return`
    <div class="card-bg">
        ${input}

        <div class="checked-wrapper">
            <ion-icon class="active" id="active-color" name="checkmark-circle-outline"></ion-icon>

            <ion-icon class="inactive"  name="ellipse-outline"></ion-icon>

            <span>${atividade.nome}</span>
        </div> 
        <time class="short">
            ${formatar.dia.semana.curto}.
            ${formatar.dia.numerico} <br>
            ${formatar.hora}
        </time>
        <time class="full">
            ${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico} 
            de ${formatador().mes.texto} 
            às ${formatar.hora}h
        </time>    
    </div>
    `    
}

const atualizarListadeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  if(atividades.length == 0){
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for(let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}
atualizarListadeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
    nome,
    data,
    finalizada: false
    }

    const atividadeExiste = atividades.find((atividade)=>{
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia e Hora não disponível')
    }

    atividades = [novaAtividade,...atividades]
    atualizarListadeAtividades()
}

// const criarDiasSelecao = () => {
//     const dias = [
//         "2024-02-28",
//         "2024-02-29",
//         "2024-03-01",
//         "2024-03-02",
//         "2024-03-03",
//     ]

//     let diasSelecao = ''

//     for(dia of dias) {
//         const formatar = formatador(dia)
//         const diaFormatado = `
//         ${formatar.dia.numerico} de 
//         ${formatar.mes}
//         `

//         diasSelecao += `
//         <option value="${dia}">${diaFormatado}</option>
//         `
//     }

//     document.querySelector('label[name="dia"]').innerHTML = diasSelecao
// }
// criarDiasSelecao()

const criarHorasSeleção = () => {
    let  horasDisponiveis = ''

    for(let i=6; i<23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSeleção()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade)=>{
        return atividade.data == dataDesteInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}