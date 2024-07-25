import {readFileSync, writeFileSync} from "fs"

//Read

export const readCustom = (filePath) =>{
    try {
        return readFileSync(filePath,"utf-8");
    } catch (error) {
        return `An error occurred while reading the file`
    }
}

// Write
export const writeCustom = (filePath,content) =>{
    try {
        writeFileSync(filePath,content);
        returnm `The file was written successfully`
    } catch (error) {
        return `An error occurred while writing the file`
    }
}