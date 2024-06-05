import pb from "./PocketbaseService";
import Message from "../Models/Message";
// import User from "../Models/User";

class MessageService {
  constructor({ error, setMessages }) {
    this.db = pb;
    this.error = error;
    this.messageSettler = setMessages;

    this.getMessages = this.getMessages.bind(this);
    this.getMessagesByUser = this.getMessagesByUser.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

    async getMessages() {
        try {
        const response = await pb.collection('messages').getFullList();
        const messageObject = {};
        response.forEach(message => {
            messageObject[message.id] = new Message({ id: message.id, ...message, service: this });
        });
        this.messageSettler(messageObject);
        return Object.values(messageObject);
        } catch (e) {
        console.error('Error getting messages:', e);
        this.error.setError(e.message);
        }
    }

    async getMessagesByUser(id) {
        try {
            console.log('Getting messages for user:', id); // Add this line
            const response = await pb.collection('messages').getFullList({
                filter: `getUserID = '${id}'`
            });
            
            console.log('Response:', response); // Add this line
    
            const messageObject = {};
            response.forEach(message => {
                messageObject[message.id] = new Message({id: message.id,...message, service: this});
            });
            this.messageSettler(messageObject);
            return Object.values(messageObject);
        } catch (e) {
            console.error('Error getting messages:', e); // Add this line
            this.error.setError(e.message);
        }
    }

    async createMessage(message) {
        try {
            const response = await pb.collection('messages').create(message);
            return new Message({ id: response.id, ...response, service: this });
        } catch (e) {
            console.error('Error creating message:', e);
            this.error.setError(e.message);
        }
    }

    async updateMessage(message) {
        try {
            const response = await pb.collection('messages').update(message);
            return new Message({ id: response.id, ...response, service: this });
        } catch (e) {
            console.error('Error updating message:', e);
            this.error.setError(e.message);
        }
    }


}
// let authService = new AuthService({ user: new User(), error: {} });

export default MessageService;
