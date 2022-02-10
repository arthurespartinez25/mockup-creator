class Users{
    constructor(PersonID,Username,Password,LastName,FirstName,Email){
        this.PersonID = PersonID;
        this.Username = Username;
        this.Password = Password;
        this.LastName = LastName;
        this.FirstName = FirstName;
        this.Email = Email;
    }
}

module.exports = Users;