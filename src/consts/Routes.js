const ROUTES = {
  home: "/",
  category: { path: "/category/:id", to: "/category/" },
  detail: { path: "/detail/:id", to: "/detail/" },
  library: "/library",
  login: "/login",
  profile: "/profile",
  editProfile: "/editProfile",
  changePassword: "/changePassword",
  myProducts: "/myProducts",
  addProduct: "/addProduct",
  editProduct: "/editProduct",
  shoppingcart: "/shoppingcart",
  checkOut: "/checkOut",
  message: "/message",
  messages: "/messages",
  notfound: "*"
};

export default ROUTES;