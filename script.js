var socket = io();

const input = document.getElementById('input');

const btn = document.getElementById('btn');

const insertBox = document.getElementById('insert');

const insertChatElement = document.getElementById('insertChatElement');

const inserChat = document.getElementById('insertChat');

// const newElement = {};

btn.addEventListener('click', () => {
    const name = input.value;

    if(name) {
        console.log(name);
        input.value = '';

        socket.emit('user addition', name);

        addChatOptions();
    }

});

function addChatOptions() {
    const searchBox = document.createElement('input');
    const searchButton = document.createElement('input');

    searchBox.setAttribute('type','text');
    searchBox.setAttribute('placeholder','search a name to chat');
    searchBox.setAttribute('id', 'sbox');

    searchButton.setAttribute('type','submit');
    searchButton.setAttribute('id', 'sbutton');
    searchButton.setAttribute('value','search');
    searchButton.style.marginLeft = '4px';

    insertBox.appendChild(searchBox);
    insertBox.appendChild(searchButton);

    // newElement["searchBox"] = searchBox;
    // newElement["searchButton"] = searchButton; 

    searchButton.addEventListener('click', () => {
        socket.emit('search user', searchBox.value);
        searchBox.value = '';
    });
}


socket.on('search user', userData => {
    if(!userData) {
        // console.log('user not found');

        const label = document.createElement('label');
        label.textContent = "user not found";
        label.style.marginLeft = "4px";
        label.style.color = "red";
        insertBox.appendChild(label);
    
    } else {
        createChatBox(userData);
    }
});


function createChatBox(username) {

    const chatBox = document.createElement('input');
    const sendButton = document.createElement('input');

    chatBox.setAttribute('type','text');
    chatBox.setAttribute('placeholder','type here');
    chatBox.setAttribute('id', 'cbox');

    sendButton.setAttribute('type','submit');
    sendButton.setAttribute('id', 'sendbutton');
    sendButton.setAttribute('value','send');
    sendButton.style.backgroundColor = "green";
    sendButton.style.marginLeft = '4px';

    insertChatElement.appendChild(chatBox);
    insertChatElement.appendChild(sendButton);

    sendButton.addEventListener('click', () => {
        const message = chatBox.value;
        if(message) {
            
            const messageBox = document.createElement('p');
            messageBox.textContent = "You: " + chatBox.value;
            inserChat.appendChild(messageBox);
            socket.emit('chat message', { message, username });
            chatBox.value = "";

        }
    });
}

socket.on('chat message', chatInfo => {
    const messageBox = document.createElement('p');
    messageBox.textContent = chatInfo.from + ' : ' + chatInfo.message;
    inserChat.appendChild(messageBox);
}); 

socket.on('registered', user => {
    console.log('user registered successfully ' + user);
});