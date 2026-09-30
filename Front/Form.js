import React from 'react';
import { Alert, View } from 'react-native';
import { TextInput, Divider, Text, Button } from 'react-native-paper';
//import { TextInput as X} from 'react-native';

const Form = () => {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");

    function Cadastrar() {

        const url = "http://192.168.30.91:3000/add";
        //const url = "http://localhost:3000/add";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            }),

        })
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.status == "inserir") {
                    setNome('');
                    setEmail('');
          
                }
            }
            )


    }

    function Selecionar() {
        const url = "http://192.168.30.91:3000/"
        fetch(url, {
            method: 'GET'

        })
            .then((resp) => resp.json())
            .then((dados) => {
                console.log(dados);
             
            }

            )
    }

    function Deletar(id) {
        const url = `http://192.168.30.91:3000/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then((resp) => resp.json())
            .then((dados) => {
                console.log(dados);
             
            }

            )
    }


    return (
        <View style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}>
            <View style={{ marginTop: 5 }}>
                <TextInput
                    label="Nome"
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <Divider style={{ margin: 30 }} />
            <Button icon="alert" mode="contained" onPress={() => Cadastrar()}>
                Cadastrar
            </Button>
            <Text variant="bodyMedium">{nome}</Text>
            <Text variant="bodyMedium">{email}</Text>
          
           <Button icon="alert" mode="contained" onPress={() => Selecionar()}>
                Selecionar
            </Button>

           <Button icon="alert" mode="contained" onPress={() => Deletar('6ab478e7b6a7f662544406b6')}>
                deletar
            </Button>


        </View>
    )
}

export { Form };