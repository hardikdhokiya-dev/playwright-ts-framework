/**
 * Shifts Failures from Runtime to Compile-Time
 * Decouples Test Data Setup from Method Execution
 * Improves Maintenance and Readability
 */
export interface RegistrationData{

        firstName : string;
        lastName : string;
        email : string;
        telephone : string;
        password : string;
        confirmPassword : string;
        newsletterSubscribe : "Yes" | "No"; // Enforced exact string literals matching the UI
        privacyPolicy : boolean;

}