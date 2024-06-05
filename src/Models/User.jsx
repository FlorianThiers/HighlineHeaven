class User {
    constructor({ id = null, username = '', email = '', name= '', avatar = '', bio = '', street = '', postcode = '', work = '', city = '', country = '', cardNumber = '' } = {}) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.avatar = avatar;
        this.bio = bio;
        this.street = street;
        this.postcode = postcode;
        this.work = work;
        this.city = city;
        this.country = country;
        this.cardNumber = cardNumber;

    }

    setUser({ id, username, email, name, avatar, bio, street, postcode, work, city, country, cardNumber }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.avatar = avatar;
        this.bio = bio;
        this.street = street;
        this.postcode = postcode;
        this.work = work;
        this.city = city;
        this.country = country;
        this.cardNumber = cardNumber;
    }
}

export default User;