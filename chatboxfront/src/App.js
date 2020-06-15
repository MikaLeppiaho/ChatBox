import React, { useState, useEffect }  from 'react'
import Message from './components/Message'
import messageService from './services/messages'
import loginService from './services/login'




const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [messages,     setMessages]     = useState([])
    const [newMessage,   setNewMessage]   = useState('')
    const [username,     setUsername]     = useState('')
    const [password,     setPassword]     = useState('')
    const [user,         setUser]         = useState(null)


    //Efecti hakee palvelimelta listan viesteistä jotka saadaan tulostettua tilanmuutoksen messages -muuttujalla.
    useEffect(() => {
       messageService
        .getAll()
        .then(response => {
            console.log('Message', response)
            setMessages(response)
        })
   }, [])

   useEffect(() => {
       const loggedChatBoxUserJSON = window.localStorage.getItem('loggedChatBoxUser')

       if (loggedChatBoxUserJSON) {
           const user = JSON.parse(loggedChatBoxUserJSON)
           setUser(user)
           messageService.setToken(user.token)
       }
   },[] )
    
    const addMessage = (event) => {
        event.preventDefault()

        const messageObject = {
            content: newMessage,
            id: messages.length +1
        }

        messageService
            .create(messageObject)
            .then(response => {
                messageService.getAll()
                    .then(response => {
                    console.log('Message', response)
                    setMessages(response)
                    setNewMessage('')
                })
            })
    }

    //käytetään funktiota syöte -kentän synkronointiin
    const handleMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try{
            const user = await loginService.login({username, password})
            //Tallentaa käyttäjän tunnistetiedot selaimen muistiin
            window.localStorage.setItem(
                'loggedChatBoxUser',
                JSON.stringify(user)
                )
            messageService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log('Login ok!')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            console.log(errorMessage)
        }
    }

    
    const loginForm = () => {
        return(
            <form onSubmit={handleLogin}>
             <p>Login to participate in the chat!</p>
             <p><strong>Tip!</strong>Username: demo & password: salasana</p>
                <div>
                    username: 
                        <input
                            value={username}
                            name="Username"
                            onChange={({target}) => setUsername(target.value)} />
                </div>
                <div> 
                    password:
                        <input
                            value={password}
                            name="Password"
                            type="password"
                            onChange={({target}) => setPassword(target.value)}>
                        </input>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>

            </form>
        )
        
    }
    //Viestin lähetykseen tarvittavat näkymät aktivoituvat, kun kirjaudutaan
    const submitForm = () => {
        return(
        <form onSubmit={addMessage}>
                <input 
                    value={newMessage}
                    onChange={handleMessageChange}
                />
                <button type="submit">Send</button>
        </form>)
    }

    return (
        <div class="grid-container">
            <div class="grid-item">
            <h1> Chatbox  {user !== null && submitForm()}</h1> 
            </div>
            
            {user=== null && loginForm()}
            <div class="grid-item">
            <ul>
                {messages.map(message => <Message key={message.id} message={message} />)}
            </ul>

            </div>

        </div>
    )
}

export default App