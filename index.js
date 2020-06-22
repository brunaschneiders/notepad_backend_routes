const express = require('express');

const server = express();

server.use(express.json());

const notes = [];

function verifyData(req, res, next){
    const {title, content, date, time} = req.body;

    if(!title){
        return res.json({
            error: 'É obrigatório incluir um título para que a nota seja criada.'
        })
    }else if(!content){
        return res.json({
            error: 'É obrigatório incluir um conteúdo para que a nota seja criada.'
        })
    }else if(!date){
        return res.json({
            error: 'É obrigatório incluir uma data para que a nota seja criada.'
        })
    }else if(!time){
        return res.json({
            error: 'É obrigatório incluir um horário para que a nota seja criada.'
        })
    }
    next();
}

server.get('/', (req,res) => {
    return res.json({
        result: 'Bem vindo ao seu bloco de notas!'
    });
})

server.get('/notes', (req,res) => {
    return res.json({notes});
})

server.post('/notes', verifyData, (req,res) => {
    const {title, content, date, time} = req.body;

    const note={
        title,
        content,
        date,
        time
    }

    notes.push(note)

    return res.json({
        result: 'Nota cadastrada com sucesso! Nota cadastrada:',
        note
    })
})

server.get('/notes/:id', (req,res) =>{
    const{id} = req.params;

    return res.json({
        result: 'Nota encontrada:',
        note: notes[id]
    })
})

server.put('/notes/:id', verifyData, (req,res) =>{
    const {title, content, date, time} = req.body

    const{id} = req.params;
    const note = {
        title,
        content,
        date,
        time
    }

    notes[id] = note;

    return res.json({
        result: 'Os dados da nota foram atualizados com sucesso! Nota atualizada:',
        note
    })
})

server.delete('/notes/:id', (req,res) =>{
    const {title, content, date, time} = req.body
    const{id} = req.params;
    const note = {
        title,
        content,
        date,
        time
    }

    notes[id] = note;

    return res.json({
        result: 'A nota foi excluída com sucesso!'
    })
})

server.listen(3000);