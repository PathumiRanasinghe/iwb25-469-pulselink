type RegisterRequest record {|
    string username;
    string email;
    string password;
|};

type LoginRequest record {|
    string email;
    string password;
|};
type User record {|
    readonly string id;
    string username;
    string email;
    string password;
|};