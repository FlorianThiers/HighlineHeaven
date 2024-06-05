class Message {
    constructor({ id, title, question, getUserID, productID, sendUserID, viewed, created, updated }) {
        this.id = id;
        this.title = title;
        this.question = question;
        this.getUserID = getUserID;
        this.productID = productID;
        this.sendUserID = sendUserID;
        this.created = created;
        this.updated = updated;
        
        this.viewed = viewed ?? false;
    }
  }
  export default Message;
  