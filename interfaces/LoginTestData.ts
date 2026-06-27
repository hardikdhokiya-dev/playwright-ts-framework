export interface LoginTestData {

    testName: string;
    email: string;
    password: string;
    expected: "success" | "failure";
}