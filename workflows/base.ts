import { aboutHelio } from "./about-helio";
import { fieldOfWorkInformations } from "./field-of-work-informations";
import { contacts } from "./contacts";
import { sendRequest } from "./sendRequest";
import { website } from "./website";

const backMenu = '*Para voltar para o menu digite "Menu"*';

const menu = {
    messages: [
        '*Seja bem vindo ao Hélio Chat, escolha uma das opções abaixo para prosseguirmos com o atendimento:*\r\n\n',
        '[ *1* ] Sobre o Hélio \r\n',
        '[ *2* ] Área de atuação \r\n',
        '[ *3* ] Contatos \r\n',
        '[ *4* ] Enviar demanda \r\n\n',
        backMenu
    ]
}

const fieldOfWork = {
    messages: [
        '[ *5* ] Informações das áreas de atuações \r\n',
        '[ *6* ] Link para o site \r\n',
        backMenu
    ]
}

const base = {
    'newuser': {
        messages: ['*Olá! Eu sou seu atendente virtual e irei te auxiliar!*'],
        childrens: [
            menu,
        ]
    },
    '1': {
        messages: [
            '*Entendi você deseja obter mais informações sobre o Hélio.*\r\n'
        ],
        childrens: aboutHelio
    },
    '2': {
        messages: [
            '*Entendi você deseja saber qual a área de atuação do Hélio* \r\n\n',
        ],
        childrens: [fieldOfWork]
    },
    '3': {
        messages: [
            '*Entendi, os contatos de Hélio se encontram abaixo:*\r\n'
        ],
        childrens: contacts
    },
    '4': {
        messages: [
            '*Entendi você deseja enviar uma demanda*\r\n'
        ],
        childrens: [sendRequest]
    },
    '5': {
        messages: [
            '*Entendi você deseja obter mais informações sobre as áreas de atuação*\r\n'
        ],
        childrens: [fieldOfWorkInformations]
    },
    '6': {
        messages: [
            '*Entendi você deseja acessar o site*\r\n'
        ],
        childrens: [website]
    },
    'default': {
        messages: [
            'Desculpa, não entendi sua mensagem...\r\n',
        ],
        childrens: [menu]
    },
    'menu': {
        messages: [],
        childrens: [menu]
    },
    'done': {
        messages: [
            'Atendimento encerrado, Obrigado pelo contato!\r\n',
        ],
        childrens: []
    },
};

export { base, backMenu }