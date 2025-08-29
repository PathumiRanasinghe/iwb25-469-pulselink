import ballerina/http;
import ballerinax/mongodb;
import ballerina/uuid;
import ballerina/crypto;

configurable string mongodb_uri = ?;

mongodb:Client mongoDb = check new ({
    connection: mongodb_uri
});

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        allowCredentials: true,
        maxAge: 3600
    }
}

service /api on new http:Listener(9090) {
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

    // //signup
    // resource function post register(RegisterRequest req) returns string|error {
    //     string id = uuid:createType1AsString();
    //     User user = {id, ...req};

    //     mongodb:Collection users = check self.pulselinkDB->getCollection("users");
        
    //     // Corrected duplicate check
    //     User? existingUser = check users->findOne({email: user.email});
    //     if existingUser is User {
    //         return error("Email already exists");
    //     }

    //     string|crypto:Error hash = crypto:hashBcrypt(user.password);
    //     if hash is crypto:Error {
    //         return error("Failed to hash password");
    //     }
    //     user.password = hash;

    //     check users->insertOne(user);

    //     return "User registered successfully";
    // }

        // Hospital signup
    resource function post register(HospitalRegisterRequest req) returns json|error {
        string id = uuid:createType1AsString();
        Hospital hospital = {
            id: id,
            hospitalName: req.hospitalName,
            contactPerson: req.contactPerson,
            contactEmail: req.contactEmail,
            contactPhone: req.contactPhone,
            address: req.address,
            password: req.password
        };

        mongodb:Collection hospitals = check self.pulselinkDB->getCollection("hospitals");
        
        // Check for duplicate email
        Hospital? existingHospital = check hospitals->findOne({contactEmail: hospital.contactEmail});
        if existingHospital is Hospital {
            return {
                success: false,
                message: "Email already exists"
            };
        }

        // Hash password
        string|crypto:Error hash = crypto:hashBcrypt(hospital.password);
        if hash is crypto:Error {
            return {
                success: false,
                message: "Failed to hash password"
            };
        }
        hospital.password = hash;

        check hospitals->insertOne(hospital);

        return {
            success: true,
            message: "Hospital registered successfully"
        };
    }

    // login
    resource function post login(LoginRequest req) returns json|error {
        mongodb:Collection hospitals = check self.pulselinkDB->getCollection("hospitals");
        Hospital? hospital = check hospitals->findOne({contactEmail : req.contactEmail});
        if hospital is () {
            return {
                success: false,
                message: "Hospital not found"
            };
        }

        boolean|crypto:Error isValid = crypto:verifyBcrypt(req.password, hospital.password);
        if isValid is crypto:Error {
            return {
                success: false,
                message: "Failed to verify password"
            };
        }
        if !isValid {
            return {
                success: false,
                message: "Invalid email or password"
            };
        }

        return {
            success: true,
            message: "Login successful",
            hospital: {
                hospitalName: hospital.hospitalName,
                contactEmail: hospital.contactEmail
            }
        };
    }

}
