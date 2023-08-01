const Database = {}; 

function setUser(username, socket) {
    if(!Database[username]) {
        Database[username] = {
            name: username,
            connection: socket
        };
    }
    return Database[username];
}

function getUser(username) {
    return Database[username];
}

module.exports = {
    setUser,
    getUser
};

