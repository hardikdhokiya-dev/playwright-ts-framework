import fs from "fs";
import { parse } from "csv-parse/sync"; //synchronous version of the parser

export class DataReader {

    /**
     * Reads a JSON file and parses it into a strongly-typed object or array.
     * @param relativePath - Path to the file relative to the project root
     * @returns 
     */

    public static readJson <T> (relativePath: string) : T{

        if (!fs.existsSync(relativePath)){
            throw new Error (`JSON file not found at path: ${relativePath}`)
        }

        const fileContent = fs.readFileSync(relativePath, 'utf-8');
        return JSON.parse(fileContent) as T;

    }




    /**
     * Reads a CSV file synchronously and parses it into an array of strongly-typed objects.
     * @param relativePath - Path to the file relative to the project root
     * @returns 
     */

    public static readCsv<T> (relativePath : string) : T[]{

        if (!fs.existsSync(relativePath)){
            throw new Error (`CSV file not found at path: ${relativePath}`)
        }
        
        // parse() from 'csv-parse/sync' instantly returns a fully populated array
        const readFile = fs.readFileSync(relativePath);
        const parsedData = parse(readFile, {columns : true, skip_empty_lines : true, trim : true, cast : true});

        return parsedData as T[];


    }

    

}