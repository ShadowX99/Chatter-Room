 /**
  * Require MongoDB native node client to keep chat history.
  * 
  * @const  number   requires mongodb as database client
  * @param  {string} 'mongodb'
  */
 const mongo = require('mongodb').MongoClient;

 /**
 * Connect to MongoDB from localhost to database- chatter.
 */
mongo.connect('mongodb://127.0.0.1/chatter2', function(err, db){
    /**
     * If error in database connection - show error
     * 
     * @throws  {DatabaseError}
     */
        if(err){
            throw err;
                }});

/**
 * Require Express JS library.
 * 
 * @param {string}  "express"
 */
let app = require('express')();

/**
 * Require node http server library for websockets.
 * 
 * @param   {string} "http"
 * @param   {string} app
 */
let http = require('http').Server(app);

/**
 * Require socket.io library.
 * 
 * @param  {string} server 
 * @param {string} "socket.io"
 */
let io = require('socket.io')(http);

/**
 * Use index.html file for client appliction interaction.
 */

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

/**
 * Start socket.io connection.
 * 
 * @param {number}  socket
 */

io.on('connection', (socket) => {
    /**
     * Emit number of connections
     * @param {number}  noOfConnections
     */
    io.emit('noOfConnections', Object.keys(io.sockets.connected).length)

    /**
     * Emit diconnections.
     * @param {string} noOfConnections
     */
    socket.on('disconnect', () => {
        console.log('disconnected')
        io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
    })

    /**
     * Broadcast chat messages.
     * 
     * @param {string} message
     */
    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg)
    })

    /**
     * Broadcast user joining.
     * 
     * @param {string} name
     */
    socket.on('joined', (name) => {
        socket.broadcast.emit('joined', name)
    })

    /**
     * Broadcast user leaving.
     * 
     * @param {string} name
     */
    socket.on('leaved', (name) => {
        socket.broadcast.emit('leaved', name)
    })

    /**
     * Broadcast typing event.
     * 
     * @param {string[]}
     */
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    /**
     * Broadcast stopped typing.
     */
    socket.on('stoptyping', () => {
        socket.broadcast.emit('stoptyping')
    })

     ///chat.insert({username: username, message: message, towhom:towhom, sent_at: Date.now()}, function(){
                
        /**
         * Emit chat activity to client.
         * @param  {string[]} 'output'
         */
       // client.emit('output', [data]);



})

/**
 * HTTP Listen to port 3000
 */
http.listen(3000, () => {
    console.log('Server is started at http://localhost:3000')
})