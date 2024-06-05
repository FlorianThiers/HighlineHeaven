class Order {
    constructor({ id, firstname, street, postcode, card, mail, stad, land, cvc, products, total, created, updated }) {
      this.id = id;
      this.firstname = firstname;
        this.street = street;
        this.postcode = postcode;
        this.card = card;
        this.mail = mail;
        this.stad = stad;
        this.land = land;
        this.cvc = cvc;
        this.products = products;
        this.total = total;
        this.created = created;
        this.updated = updated;
    }
    
  }
  export default Order;
  