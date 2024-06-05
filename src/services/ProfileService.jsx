import pb from "./PocketbaseService";
import User from "../Models/User";
// import User from "../Models/User";

class ProfileService {
  constructor({ error, setUser }) {
    this.db = pb;
    this.error = error;
    this.userSettler = setUser;

    this.editProfile = this.editProfile.bind(this);
    this.liveUpdate = this.liveUpdate.bind(this);
    this.seedUsers = this.seedUsers.bind(this);
  }

  async editProfile(data) {
    console.log(data);
    
    try {
        delete data.ProfileService;
        await pb.collection('users').update(data.id, data);
        return true;
    } catch (e) {
        console.log('Error:', e);
        return e;  // use this.error instead of error
    }
}

  liveUpdate(users) {
    Object.values(users).forEach(user => {
     pb.collection('users').subscribe(`${user.id}`, (e) => {
        if(product[product.id])this.userSettler(prevValues => {
            return {
                ...prevValues, 
                [user.id]: new User({id: user.id, ...user, service: this})
            }
        })
      });
    });
  }

  seedUsers(userID) {
    seedData.forEach( async user => {
    delete user.id;
      await pb.collection('users').create({...user, userID: userID}, {$autoCancel: false });
    });
  }


}
// let authService = new AuthService({ user: new User(), error: {} });

export default ProfileService;
