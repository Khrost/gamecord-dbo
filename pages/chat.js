import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useMemo } from 'react';
import appConfig from '../config.json';
//banco de dados online
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU2Mjk5MywiZXhwIjoxOTU5MTM4OTkzfQ.fmoIj13QWyIfjv0GDNdLakXIluKb164LXvLPUs5t0MY";
const SUPABASE_URL = "https://kojqzxectxtqsijatbqr.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const [userMensage, setUserText] = React.useState('');//valor | variavel responsavel pela mudança
    const [listaDeMensagem, setListaDeMensagens] = React.useState([]);
    
    React.useEffect(() => {
        supabaseClient.
        from("mensagens")
            .select("*")
            .order('id', {ascending: false})
            .then(({data}) => {
                console.log("dados da consulta " , data);
                setListaDeMensagens(data);
            });
    }, [])

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
        ])
        setUserText('');
    }

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

                    <MessageList Mensagens={listaDeMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={userMensage}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setUserText(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' ) {
                                    event.preventDefault();
                                    if(userMensage.length > 0){
                                        handleNovaMensagem(userMensage);
                                    }
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
                        <Button
                            disabled={userMensage.length < 1}
                            onClick={(event) => {
                                event.preventDefault();
                                //console.log(event);
                                if(userMensage.length > 0){
                                    handleNovaMensagem(userMensage);
                                }
                            }}
                            type='submit'
                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
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
    console.log(props);
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
                                src={`https://github.com/vanessametonini.png`}
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