import { faker } from "@faker-js/faker";

export class DataGeneratorUtility {

    /**
     * Generates a random first name.
     */
    public static getFirstName(): string {
        return faker.person.firstName();
    }
    
    /**
     * Generates a random last name.
     */
    public static getLastName(): string {
        return faker.person.lastName();
    }

    /**
     * Generates a full name combining a first and last name.
     */
    public static getFullName(): string {
        return faker.person.fullName();
    }

    /**
     * Generates a standard valid email address format.
     */
    public static getEmail(): string {
        return faker.internet.email();
    }

    /**
     * Generates a randomized telephone or phone number string.
     */
    public static getPhoneNumber(): string {
        return faker.phone.number();
    }

    /**
     * Generates a unique internet username identifier.
     */
    public static getUserName(): string {
        return faker.internet.username(); 
    }

    /**
     * Generates a randomized alphanumeric string sequence.
     * @param length - Desired character count boundary (defaults to 10)
     */
    public static getPassword(length: number = 10): string {
        return faker.internet.password({ length });
    }

    /**
     * Generates a global country name.
     */
    public static getCountry(): string {
        return faker.location.country();
    }

    /**
     * Generates a local state/province territorial jurisdiction entity.
     */
    public static getState(): string {
        return faker.location.state();
    }

    /**
     * Generates a urban geographic center identifier.
     */
    public static getCity(): string {
        return faker.location.city();
    }

    /**
     * Generates a physical mail postal registration code (ZIP code).
     */
    public static getPin(): string {
        return faker.location.zipCode();
    }

    /**
     * Generates a complete physical avenue layout mapping profile.
     */
    public static getAddress(): string {
        return faker.location.streetAddress();
    }
}
