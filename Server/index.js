const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const methodOverride = require('method-override');

app.use(cors());

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, resp, next) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(express.json());
//---- configurar o caminho do mongodb
const url = 'mongodb://localhost:27017/FatecVotorantim';

// --- teste de conexão
mongoose.connect(url)
    .then(
        () => { console.log('Conectou!') }
    ).catch(
        (e) => { console.log(e) }
    )

// montar o modelo de estrutura da coleção
let Us = mongoose.model("usuarios", {
    nome: String,
    email: String
});


// rota apresentação
app.get('/', async (req, res) => {
    // resultado
    const linhas = await Us.find({});
    if (linhas.length == 0) {
        return res.json({ erro: "não encontrado" })
    }
    return res.json(linhas)
    //  res.send('Hello World!')
})

// inserir dados
app.post("/add", async (req, resp) => {
   
    
    // pegar os registro do http
    // const {
    //     nome,
    //     email
    // } = req.body;
    let nomex = req.body.nome;
    let emailx = req.body.email;
    const insert = await new Us({ nome: nomex, email: emailx })
    insert.save();
    resp.json({ "status": "inserido" });


})

// delete
app.delete("/:id", async (req, resp) => {
    let id = req.params.id;
    await Us.deleteOne({ _id: id });
    resp.json({ "id": id, "status": "deletado" });
})

// put / patch
app.put("/altera/:id", async (req, resp) => {
    let id = req.params.id;
    let nomex = req.body.nome;
    let emailx = req.body.email;
    await Us.updateOne(
        { _id: id },
        {
            $set: {
                nome: nomex,
                email: emailx
            }
        }

    )
    resp.json({ "status": "Alterado" })
})
app.patch("/alteraP/:id", async (req, resp) => {
    let id = req.params.id;
    let nomex = req.body.nome;

    await Us.updateOne(
        { _id: id },
        {
            $set: {
                nome: nomex,

            }
        }

    )
    resp.json({ "status": "Alterado" })
})


app.listen(port, () => {
    console.log(`servidorstart http://localhost:${port}`)
})