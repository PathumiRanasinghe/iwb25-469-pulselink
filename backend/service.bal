import ballerina/http;
import ballerinax/mongodb;
import ballerina/uuid;
import ballerina/crypto;

configurable string mongodb_uri = ?;

mongodb:Client mongoDb = check new ({
    connection: mongodb_uri
});

service / on new http:Listener(9090) {
    private final mongodb:Database pulselinkDB;

    public function init() returns error? {
        self.pulselinkDB = check mongoDb->getDatabase("pulselink-db");
    }

    resource function get health() returns string|error {   
        return "PulseLink - Up and Running";
    }

    resource function get users() returns User[]|error {
        mongodb:Collection users = check self.pulselinkDB->getCollection("users");
        stream<User, error?> result = check users->find();
        return from User user in result
               select user;
    }

    //signup
    resource function post register(RegisterRequest req) returns string|error {

        string id = uuid:createType1AsString();
        User user = {id, ...req};

        mongodb:Collection users = check self.pulselinkDB->getCollection("users");
        
        //check email already exists
        User? existingUser = check users->findOne({email: user.email});
        if existingUser is () {
            return error("Email already exists");
        }

        string|crypto:Error hash = crypto:hashBcrypt(user.password);
        if hash is crypto:Error {
            return error("Failed to hash password");
        }
        user.password = hash;

        check users->insertOne(user);

        return "User registered successfully";
    }

    // login
    resource function post login(LoginRequest req) returns string|error {
        mongodb:Collection users = check self.pulselinkDB->getCollection("users");
        User? user = check users->findOne({email : req.email});
        if user is () {
            return error("User not found");
        }

        boolean|crypto:Error isValid = crypto:verifyBcrypt(req.password, user.password);
        if isValid is crypto:Error {
            return error("Failed to verify password");
        }
        if !isValid {
            return error("Invalid email or password");
        }

        return "Login successful";
    }

}
