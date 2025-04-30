# Coding Variables in JavaScript

---

## Table of Contents

- [Introduction to JavaScript Files](#introduction-to-javascript-files)
  - [File Extensions](#file-extensions)
  - [Creating JavaScript Files in VS Code](#creating-javascript-files-in-vs-code)
- [Running JavaScript Code in VS Code](#running-javascript-code-in-vs-code)
  - [Using Code Runner Extension](#using-code-runner-extension)
- [Ways to Create Variables in JavaScript](#ways-to-create-variables-in-javascript)
  - [Using `var`](#using-var)
  - [Using `let`](#using-let)
  - [Using `const`](#using-const)
- [Semicolons and Statements](#semicolons-and-statements)
- [Variable Naming Rules](#variable-naming-rules)
- [Final Summary](#final-summary)

---

## Introduction to JavaScript Files

### File Extensions

- Files like images, music, and videos use extensions: `.jpg`, `.mp3`, `.mp4`, etc.
- JavaScript files use the `.js` extension.
  - Examples: `index.js`, `demo.js`, `variablesDemo.js`.

### Creating JavaScript Files in VS Code

- Click the "New File" button in the Explorer panel.
- Name the file with a `.js` extension, like `variablesDemo.js`.
- Press **Enter** to create and open the file for writing JavaScript code.

**Summary:**  
JavaScript files must end with a `.js` extension, and you can create them easily within VS Code’s file explorer.

---

## Running JavaScript Code in VS Code

### Using Code Runner Extension

- Install the **Code Runner** extension from the VS Code Extensions Marketplace.
  - Search "Code Runner", find the yellow play icon, and click **Install**.
- Once installed, you'll see a **Run Code** (play) button in the top-right of your editor window.
- Click the play button to run JavaScript files and see the output in the terminal.
- If there's no output and no error, your code is syntactically valid but likely doesn't contain output commands.

**Important Tip:**  
Remember to **save your file** before running it. A small circle on the tab indicates unsaved changes.

**Summary:**  
The Code Runner extension allows for one-click code execution directly within VS Code, simplifying your workflow.

---

## Ways to Create Variables in JavaScript

There are **three main ways** to declare variables in JavaScript:

---

### Using `var`

- Syntax:
  ```javascript
  var variableName = value;
  ```

- Examples:
  ```javascript
  var marks = 90;
  var score = 10;
  ```

- Behavior:
  - Creates a **bucket in memory** with a label (`marks`) and a value (`90`).
  - `var` is a **keyword** reserved in JavaScript.

---

### Using `let`

- Syntax:
  ```javascript
  let variableName = value;
  ```

- Examples:
  ```javascript
  let age = 24;
  let flag = 0;
  ```

- Behavior:
  - Similar to `var` in basic usage.
  - Also creates a bucket in memory.
  - Differences between `var` and `let` will become clearer when learning about **scope**.

---

### Using `const`

- Syntax:
  ```javascript
  const variableName = value;
  ```

- Examples:
  ```javascript
  const x = 100;
  ```

- Behavior:
  - Once declared, the value **cannot be changed**.
  - Used for constants.

---

**Summary:**  
JavaScript provides three keywords—`var`, `let`, and `const`—to create variables.  
Each creates memory storage, but they differ in how they behave with reassignments and scope.

---

## Semicolons and Statements

- A line of JavaScript code is called a **statement**—an instruction to the computer.
- Ending a statement with a **semicolon (;)** is:
  - **Optional in JavaScript**, but
  - **Recommended for clean and readable code**.

> Analogy:  
> Like punctuation in English, semicolons help mark the end of an instruction.

- JavaScript won’t throw an error if semicolons are omitted, but languages like **C++** and **Java** require them.

**Summary:**  
Semicolons are not required in JavaScript but are considered a best practice for clarity and maintainability.

---

## Variable Naming Rules

When naming variables in JavaScript, follow these important rules:

1. **Allowed Characters:**
   - Lowercase letters: `a` to `z`
   - Uppercase letters: `A` to `Z`
   - Digits: `0` to `9` (but not as the first character)
   - Special characters: `_` (underscore), `$` (dollar sign)

2. **Disallowed Characters:**
   - Spaces (` `), e.g., `first name` → ❌
   - Special characters like `#`, `%`, `@`, `&` → ❌

3. **Cannot Start With a Digit:**
   - `let 0james = 10;` → ❌
   - `let james0 = 10;` → ✅

4. **Cannot Use Keywords as Variable Names:**
   - Reserved keywords such as:
     - `let`, `const`, `var`, `for`, `if`, `else`, etc.
   - Example: `let let = 10;` → ❌

5. **Meaningful Names:**
   - Always use **descriptive and meaningful** variable names.
   - Good: `userScore`, `playerName`
   - Bad: `x`, `data1` (unless contextually clear)

**Examples of Valid Names:**
```javascript
let firstName = "John";
let player_001 = "James";
let $discount = 10;
```

**Examples of Invalid Names:**
```javascript
let 1name = "Error";    // Starts with digit ❌
let first name = "Joe"; // Contains space ❌
let for = 5;            // Uses keyword ❌
```

**Summary:**  
Follow proper naming conventions to avoid syntax errors and make code readable and maintainable. Stick to allowed characters and avoid reserved keywords.

---

## Final Summary

This lesson covered the **practical process of writing variables in JavaScript**, including:

- Creating `.js` files in VS Code.
- Installing and using the **Code Runner** extension to execute JavaScript code.
- Understanding **three ways to declare variables**: `var`, `let`, and `const`.
- Learning the importance and role of **semicolons** in writing clear instructions.
- Following strict but logical **naming rules** for variables to prevent errors and maintain clarity.

By mastering these basics, you’ve set a strong foundation for writing clean, error-free, and professional JavaScript code.

---