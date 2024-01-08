export default class UserModel{
    constructor(name, email, password,id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    static signUp(name, email, password){
        const newUser = new UserModel(name, email, password);
        newUser.id = users.length + 1;
        users.push(newUser);
        return newUser;
    }

    static signIn(email, password){
        const user = users.find(
    (u) => u.email == email && u.password == password);
   
        return user;
    }
     
    static getAll(){
        return users;
    }
}

var users = [{
    id: 1,
    name: 'User1',
    email: 'user1@scom.com',
    password: 'Password1',
},
{
    id: 2,
    name: 'User2',
    email: 'user2@scom.com',
    password: 'Password2',
},
];