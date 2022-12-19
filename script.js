

let app = new Vue ( {
    
    el:'#container',
    data : {
        //indice chat attiva
        activeChat: 0,
        // 
        activeMessage:-1,
        newMessage: {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            message: '',
            status:'sent'
        },
        userSearch : '',

        contacts : [
            {
                name: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent' 
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    },
                ]

            },
            {
                name: 'Fabio',
                avatar: 'img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },

                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    },
                ]
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    },
                    
                ]
            },
            {
                name: 'Alessandro B.',
                avatar: 'img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Alessandro L.',
                avatar: 'img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: 'img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: 'img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: 'img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        
            
        ]
    },

    methods: {
        // active cht = inde ==> (argomento)
        selectedChat: function(index) {
            this.activeChat = index
            this.activeMessage = -1
            if(this.activeChat !== index){
            this.contacts[index].visible = false
            } else {
            this.contacts[index].visible = true

            }
        },
        // valore aggiunto alla chat che sarà attiva
        addMessage: function(index) {
            let thisContact=this.contacts[index];
            
            if (this.newMessage.text !== '' ){
                thisContact.messages.push(this.newMessage);
                this.newMessage = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: '',
                status:'sent'};
                

                setTimeout(() => {
                    thisContact.messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        message: 'ok',
                        status:'received'
                    });
                    
                },1000);
            }
        },
        //apertura del menù del messagio
        selectedMessage: function(index){
            if(this.activeMessage == index) {
                this.activeMessage = -1

            } else {
                this.activeMessage = index
            }

        },
        
        //  cancella il messaggio che si seleziona
        deleteMessage: function(index){
            this.contacts[this.activeChat].messages.splice(index, 1);
        },
        // ultimo accesso
        getLastAccess: function() {
            let receivedEmpty = 'data non disponibile'
            let messagesCurrentChat = this.contacts[this.activeChat].messages;
            let filteredMessages = messagesCurrentChat.filter(message => message.status === 'received')
            
            if(filteredMessages != 0) {
                //prendo la data dei messagi ricevuti
                return filteredMessages.at(-1).date

            } else {
                // se non ci sono messaggi ricevuti,verrà scritto 
                return receivedEmpty
            }
        }
    }
}

)