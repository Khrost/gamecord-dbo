import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';

function Title(argTitle){
  const Tag = argTitle.tag || 'h1';
  
  return (

      <>
          <Tag>{argTitle.children}</Tag>
          <style jsx>{`
              ${Tag}{
                  color: ${appConfig.theme.colors.neutrals['900']};
                  font-size: 24px;
                  font-weight:600;
              }
          `}</style>
      </>
  );
}

export default function HomePage() {
  //const username = 'Khrost';
  const [username, setUsername] = React.useState('');//evolve tanto o antigo como o novo
  const roteamento = useRouter();
  //console.log(roteamento);//muitas funções, informações de navegação
  const isDisabled = () => {
    if(username.length <3) return true;
    else return false;
  }

  return (
    <>
      {/*<GlobalStyle /> foi para a pasta generica _app*/}
      <Box
      styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form" /*area do formulario*/
            onSubmit={function (infosDoEvent){
              infosDoEvent.preventDefault();/*previni o refresh da pag inteira*/
              console.log(infosDoEvent);
              //window.location.href = "/chat";//padrão para mudar de página
              
              //evitando o refrash da pagina através de roteamento do next
              //roteamento.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h1">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            {/*
            <input 
              type="text"
              value={username}
              onChange={function (event){
                //é chamada toda vez que o usuário escrever algo: o valor estará em
                //  event, ou seja, o primeiro argumento vai ser o valor
                
                console.log("usuario digitou " + event.target.value);
                //onde ta o valor
                const value = event.target.value;
                //trocar o valor da variavel
                //através do react
                setUsername(value);
              }}
            />*/}
            <TextField
              value={username}
              onChange={function (event){
                console.log("usuario digitou " + event.target.value);
                const value = event.target.value;
                setUsername(value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              disabled={username.length < 3} //só precisa colocar a condição diretamente
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}