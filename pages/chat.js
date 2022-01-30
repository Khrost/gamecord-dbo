import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useMemo } from 'react';
import appConfig from '../config.json';
//banco de dados online
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU2Mjk5MywiZXhwIjoxOTU5MTM4OTkzfQ.fmoIj13QWyIfjv0GDNdLakXIluKb164LXvLPUs5t0MY";
const SUPABASE_URL = "https://kojqzxectxtqsijatbqr.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//como fazer um AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
/*supabaseClient.
        from("mensagens")//qual a tabela
        .select("*")//quer pegar tudo(*)
        .then((dados) => {
            console.log("dados da consulta " , dados);
        });//quando achar algum, faça
    //aparentemente ele usa o BD postgreass
*/
export default function ChatPage() {
    const [userMensage, setUserText] = React.useState('');//valor | variavel responsavel pela mudança
    const [listaDeMensagem, setListaDeMensagens] = React.useState([]);
    
    React.useEffect(() => {
        supabaseClient.
        from("mensagens")//qual a tabela
            .select("*")//quer pegar tudo(*)
            .order('id', {ascending: 'false'}) //mudando ordem para obter mensagens
            .then(({data/*,...*/}) => {
                console.log("dados da consulta " , data);
                setListaDeMensagens(data);//para pegar o conteúdo que esta sendo enviado
            });//quando achar algum, faça
    }, [/*listaDeMensagem*//*chave de ativação/ mudança em algo*/]) /*usado para algo que foge do fluxo padrão do component (execução)
    se não houvesse isso, cada vez que escrevesse uma letra, iria chamar o BD*/

    function handleNovaMensagem(newMessage) {
        const mensagem = {
            de: 'Khrost',
            Message: newMessage,
            id: listaDeMensagem.length + 1
        }

        supabaseClient
            .from("mensagens")
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log("criando mensagem: " , data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagem,
                ])
            })

        setListaDeMensagens([
            mensagem,
            ...listaDeMensagem,
            /*
            ...listaDeMensagem,
            mensagem, de baixo pra cima*/
        ])
        setUserText('');
    }

    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList mensagens={[]} /> */}
                    <MessageList Mensagens={listaDeMensagem} />
                    {/*listaDeMensagem.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.Message}
                                {/*de é o que cliquei e o text é o que eu quero}
                            </li>
                        )
                    }) fazendo funcionar na tag*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={userMensage}
                            onChange={(event) => { // ()=>é o mesmo que uma função
                                const valor = event.target.value;
                                setUserText(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();//evita a quebra de linha
                                    //console.log(event);
                                    handleNovaMensagem(userMensage);
                                    /*    setListaDeMensagens([
                                            ...listaDeMensagem, //pega todos os itens que tem na lista
                                            userMensage//somado com a atual
                                        ])
                                        setUserText('');//limpando a caixa de text
                                    */
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.Mensagens.map((atual) => {
                return (
                    <Text
                        key={atual.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${atual.de}.png`}
                            />
                            <Text tag="strong">
                                {atual.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {atual.Message}
                    </Text>
                )
            })}
        </Box>
    )
}