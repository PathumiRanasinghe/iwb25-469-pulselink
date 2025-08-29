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

// Add to top of service.bal with other types
public type Patient record {
    string id;
    // Personal Information
    string fullName;
    string lastName;
    string phoneNumber;
    string dateOfBirth;
    string gender;
    string address;
    string emergencyContactName;
    string emergencyContactPhone;

    // Medical Information
    string generalPractitioner;
    string practitionerRegistration;
    string diagnosis;
    string comorbidities;

    // Organ Request Information
    string requestedOrgan;
    string bloodType;
    string riskFatality;
    string urgencyLevel;
    string estimatedSurvival;
    // string crossMatchReportUrl?;

    // Identification and Verification
    string identificationType;
    string idNumber;
};

public type PatientRegistrationRequest record {
    // Personal Information
    string fullName;
    string lastName;
    string phoneNumber;
    string dateOfBirth;
    string gender;
    string address;
    string emergencyContactName;
    string emergencyContactPhone;

    // Medical Information
    string generalPractitioner;
    string practitionerRegistration;
    string diagnosis;
    string comorbidities;

    // Organ Request Information
    string requestedOrgan;
    string bloodType;
    string riskFatality;
    string urgencyLevel;
    string estimatedSurvival;

    // Identification and Verification
    string identificationType;
    string idNumber;
};

public type Donor record {
    string id;
    // Donor Identification
    string fullName;
    string estimatedAge;
    string dateTimeOfDeath;
    string gender;
    string causeOfDeath;
    string brainDeathConfirmed;

    // Medical Suitability
    string bloodGroup;
    string knownComorbidities;
    string wasOnVentilation;
    string[] availableOrgansForRetrieval; // Changed to string array

    // Consent Source
    string consentType;
    string nextOfKinName;
    string relationshipToDonor;
    string contactNumber;
    string signatureUrl?;

    // Hospital & Action
    string hospitalName;
    string hospitalEmail?; // Add this field
    string unitWard;
    string loggedByStaffName;
    string role;
    string personFillingForm?;
};

public type DonorRegistrationRequest record {
    // Donor Identification
    string fullName;
    string estimatedAge;
    string dateTimeOfDeath;
    string gender;
    string causeOfDeath;
    string brainDeathConfirmed;

    // Medical Suitability
    string bloodGroup;
    string knownComorbidities;
    string wasOnVentilation;
    string[] availableOrgansForRetrieval; // Changed to string array

    // Consent Source
    string consentType;
    string nextOfKinName;
    string relationshipToDonor;
    string contactNumber;

    // Hospital & Action
    string hospitalName;
    string hospitalEmail?; // Add this field
    string unitWard;
    string loggedByStaffName;
    string role;
    string personFillingForm?;
};

