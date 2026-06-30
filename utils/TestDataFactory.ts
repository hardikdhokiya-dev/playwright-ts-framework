import { BillingAddressData } from "../interfaces/BillingAddressData";
import { RegistrationData } from "../interfaces/RegistrationData";
import { DataGeneratorUtility } from "./DataGeneratorUtility";

export class TestDataFactory {


    /**
     * Generates a complete registration data object populated with
     * realistic and unique test data.
     *
     * @returns RegistrationData object containing valid registration details.
     */
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


    /**
     * Generates valid billing address test data for guest checkout.
     *
     * @returns BillingAddressData populated with realistic test values.
     */
    public static getBillingAddressData(): BillingAddressData {

        return {
            firstName: DataGeneratorUtility.getFirstName(),
            lastName: DataGeneratorUtility.getLastName(),
            address1: DataGeneratorUtility.getAddress(),
            city: DataGeneratorUtility.getCity(),
            postalCode: DataGeneratorUtility.getPostalCode(),
            country: "Canada",
            state: "Ontario"
        };

    }



















}

