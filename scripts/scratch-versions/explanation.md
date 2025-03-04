# `data.json` Files

The `data.json` files are used to store the names of JavaScript files within specific directories. These JSON files provide a centralized way to manage and execute scripts in various parts of the project.

## Purpose

The primary purpose of the `data.json` files is to:
1. Store the names of JavaScript files within a directory.
2. Facilitate the dynamic execution of these scripts by the extension.

## File Structure

Each `data.json` file follows a simple structure:
```json
{
  "files": [
    "exampleFile1.js",
    "exampleFile2.js",
    "exampleFile3.js"
  ]
}
