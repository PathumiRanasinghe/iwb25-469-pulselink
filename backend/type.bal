// type RegisterRequest record {|
//     string username;
//     string email;
//     string password;
// |};

// type LoginRequest record {|
//     string email;
//     string password;
// |};

type User record {|
    readonly string id;
    string username;
    string email;
    string password;
|};



type HospitalRegisterRequest record {|
    string hospitalName;
    string contactPerson;
    string contactEmail;
    string contactPhone;
    string address;
    string password;
|};


type Hospital record {|
    readonly string id;
    string hospitalName;
    string contactPerson;
    string contactEmail;
    string contactPhone;
    string address;
    string password;
    string role = "hospital";
|};


type LoginRequest record {|
    string contactEmail;
    string password;
|};