import pb from "./PocketbaseService";
// import User from "../Models/User";

class AuthService {
  constructor({ user, error, authService }) {
    this.db = pb;
    this.user = user;
    this.error = error;
    this.authService = authService;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.loginFromCookies = this.loginFromCookies.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async login(usrn, ps) {
    console.log("user:", usrn, ps);
    try {
      const authData = await this.db
        .collection("users")
        .authWithPassword(usrn, ps);
      if (authData) {
        this.user.setUser(authData);
        console.log(authData);
        return true;
      } else {
        this.error.setError("Failed to login");
        return true;
      }
    } catch (e) {
      this.error.setError(e.message);
      return false;
    }
  }

  logout() {
    const authData = this.db.authStore.clear();
    this.user.setUser(null);
    return authData;
  }

  async loginFromCookies() {
      
      this.dataModel = {
          record: this.db.authStore.model,
          token: this.db.authStore.token
      }

      this.setUserModel(this.dataModel);

      // return this.dataModel;
  }


  async register(usrn, ps) {
    try {
      const authData = await this.db
        .collection("users")
        .create({
            username: usrn, 
            password: ps, 
            passwordConfirm: ps
        });
      if (authData) {
        this.login(usrn, ps);
        return true;
      } else {
        this.error.setError("Failed to register");
        return false;
      }
    } catch (e) {
      this.error.setError(e.message);
      return false;
    }
  }

  


    changePassword(oldPassword, newPassword) {
        try {
            this.db.collection('users').update(this.user.id, oldPassword, newPassword);
            return true;
        } catch (e) {
            this.error.setError(e.message);
            return false;
        }
    }



  setUserModel(data) {
    this.user.setUser({
      avatar: data.record.avatar,
      email: data.record.email,
      emailVisibility: data.record.emailVisibility,
      username: data.record.username,
      id: data.record.id,
      verified: data.record.verified,
    });
  }

   get isLoggedIn() {
    return this.db.authStore.isValid;
   }


}
// let authService = new AuthService({ user: new User(), error: {} });

export default AuthService;
