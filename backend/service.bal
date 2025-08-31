import ballerina/crypto;
import ballerina/http;
import ballerina/uuid;
import ballerinax/mongodb;

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
        Hospital? hospital = check hospitals->findOne({contactEmail: req.contactEmail});
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

    // Patient registration
    resource function post patients/register(PatientRegistrationRequest req) returns json|error {
        string id = uuid:createType1AsString();
        Patient patient = {
            id: id,
            fullName: req.fullName,
            lastName: req.lastName,
            phoneNumber: req.phoneNumber,
            dateOfBirth: req.dateOfBirth,
            gender: req.gender,
            address: req.address,
            emergencyContactName: req.emergencyContactName,
            emergencyContactPhone: req.emergencyContactPhone,

            generalPractitioner: req.generalPractitioner,
            practitionerRegistration: req.practitionerRegistration,
            diagnosis: req.diagnosis,
            comorbidities: req.comorbidities,

            requestedOrgan: req.requestedOrgan,
            bloodType: req.bloodType,
            riskFatality: req.riskFatality,
            urgencyLevel: req.urgencyLevel,
            estimatedSurvival: req.estimatedSurvival,

            identificationType: req.identificationType,
            idNumber: req.idNumber,

            // Add hospital information
            hospitalName: req.hospitalName,
            hospitalEmail: req.hospitalEmail
        };

        mongodb:Collection patients = check self.pulselinkDB->getCollection("patients");

        // Optional: Check for duplicates by ID number or other unique identifiers
        Patient? existingPatient = check patients->findOne({idNumber: patient.idNumber});
        if existingPatient is Patient {
            return {
                success: false,
                message: "Patient with this ID already exists"
            };
        }

        check patients->insertOne(patient);

        return {
            success: true,
            message: "Patient registered successfully",
            patientId: id
        };
    }

    // Donor registration
    resource function post donors/register(DonorRegistrationRequest req) returns json|error {
        string id = uuid:createType1AsString();
        Donor donor = {
            id: id,
            // Donor Identification
            fullName: req.fullName,
            estimatedAge: req.estimatedAge,
            dateTimeOfDeath: req.dateTimeOfDeath,
            gender: req.gender,
            causeOfDeath: req.causeOfDeath,
            brainDeathConfirmed: req.brainDeathConfirmed,

            // Medical Suitability
            bloodGroup: req.bloodGroup,
            knownComorbidities: req.knownComorbidities,
            wasOnVentilation: req.wasOnVentilation,
            availableOrgansForRetrieval: req.availableOrgansForRetrieval,

            // Consent Source
            consentType: req.consentType,
            nextOfKinName: req.nextOfKinName,
            relationshipToDonor: req.relationshipToDonor,
            contactNumber: req.contactNumber,

            // Hospital & Action
            hospitalName: req.hospitalName,
            unitWard: req.unitWard,
            loggedByStaffName: req.loggedByStaffName,
            role: req.role
        };

        mongodb:Collection donors = check self.pulselinkDB->getCollection("donors");

        check donors->insertOne(donor);

        return {
            success: true,
            message: "Donor registered successfully",
            donorId: id
        };
    }

}
