import React from 'react';
import { View } from 'react-native';
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
            headers:{
             'Content-Type':'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            }),
            
        })
        .then( (resp)=> resp.json())
        .then( (dados)=> {
          if(dados.status == "inserir"){
              setNome('');
              setEmail('');
          }
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
            <Button icon="alert" mode="contained" onPress={ ()=> Cadastrar()}>
                Cadastrar
            </Button>
            <Text variant="bodyMedium">{nome}</Text>
            <Text variant="bodyMedium">{email}</Text>



        </View>
    )
}

export { Form };