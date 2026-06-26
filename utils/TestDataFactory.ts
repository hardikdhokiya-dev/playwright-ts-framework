import { RegistrationData } from "../interfaces/RegistrationData";
import { DataGeneratorUtility } from "./DataGeneratorUtility";

export class TestDataFactory {

    static getRegistrationData(): RegistrationData {

        const password = DataGeneratorUtility.getPassword();

        return {
            firstName: DataGeneratorUtility.getFirstName(),
            lastName: DataGeneratorUtility.getLastName(),
            email: DataGeneratorUtility.getEmail(),
            telephone: DataGeneratorUtility.getValidPhoneNumber(),
            password: password,
            confirmPassword: password,
            newsletterSubscribe: "No",
            privacyPolicy: true
        };
    }
}

