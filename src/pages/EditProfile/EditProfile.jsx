import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../consts/Routes';
import style from './EditProfile.module.css';
import { useProducts } from '../../Contexts/ProductContext';
import ProfileService from '../../services/ProfileService';

const EditProfile = () => {
    const { user} = useProducts();
    const [error, setError] = useState(null);
    const profileService = new ProfileService({error: {setError} });

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        name: '',
        avatar: '',
        work: '',
        bio: '',
        street: '',
        postcode: '',
        city: '',
        country: '',
        cardNumber: ''
    });

    const data = {
        id: user.id,
        username: profile.username,
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar,
        work: profile.work,
        bio: profile.bio,
        street: profile.street,
        postcode: profile.postcode,
        city: profile.city,
        country: profile.country,
        cardNumber: profile.cardNumber
    }

    const EditProfile = (data) => {
        console.log(data);
        profileService.editProfile(data)
        .then(() => {
            console.log('Profile edited successfully');
        }  

        )
    }

    return (
        <div className={style.container}>
            <div className={style.editProfile}>
                <h1>Edit Profile</h1>
                <img src={user.avatar} alt={user.id} />

                <div className={style.columns}>
                    <div className={style.column}>
                        <p>Username</p>
                        <input type="text" placeholder={user.username} value={profile.username} onChange={e => setProfile({...profile, username: e.target.value})} />
                        <p>Name</p>
                        <input type="text" placeholder={user.name} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                        <p>Email</p>    
                        <input type="email" placeholder={user.mail} value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                        <p>Bio</p>
                        <textarea placeholder={user.bio} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
                        <p>Street</p>
                        <input type="text" placeholder={user.street} value={profile.street} onChange={e => setProfile({...profile, street: e.target.value})} />
                        <p>Postcode</p>
                        <input type="text" placeholder={user.postcode} value={profile.postcode} onChange={e => setProfile({...profile, postcode: e.target.value})} />
                    </div>
                    <div className={style.column}>
                        <p>Avatar</p>
                        <input type="file" />
                        <p>Work</p>
                        <input type="text" placeholder={user.work} value={profile.work} onChange={e => setProfile({...profile, work: e.target.value})} />
                        <p>City</p>
                        <input type="text" placeholder={user.city} value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} />
                        <p>Country</p>
                        <input type="text" placeholder={user.country} value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})} />
                        <p>Card Number</p>
                        <input type="text" placeholder={user.cardNumber} value={profile.cardNumber} onChange={e => setProfile({...profile, cardNumber: e.target.value})} />
                        <Link to={ROUTES.profile}>
                            <button
                            className={style.editProfileButton}
                            onClick={() => EditProfile(data)}
                            >
                            Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditProfile;