import pb from "./PocketbaseService";
import Order from "../Models/Order";
// import User from "../Models/User";

class OrderService {
  constructor({ error, setOrder }) {
    this.db = pb;
    this.error = error;
    this.orderSettler = setOrder;


  }

    

    async createOrder(order) {
        try {
            const response = await pb.collection('orders').create(order);
            return new Order({ id: response.id, ...response, service: this });
        } catch (e) {
            console.error('Error creating order:', e);
            this.error.setError(e.message);
        }

    }

}
// let authService = new AuthService({ user: new User(), error: {} });

export default OrderService;
