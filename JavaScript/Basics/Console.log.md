# Showing Data to the User Using `console.log` in JavaScript

---

## Table of Contents

- [Introduction](#introduction)
- [Understanding Functions](#understanding-functions)
  - [Functions as Black Boxes](#functions-as-black-boxes)
- [Using the Built-in `console.log` Function](#using-the-built-in-consolelog-function)
  - [Purpose of `console.log`](#purpose-of-consolelog)
  - [Demonstration of `console.log`](#demonstration-of-consolelog)
- [Handling Multiple Values with `console.log`](#handling-multiple-values-with-consolelog)
- [Final Summary](#final-summary)

---

## Introduction

After creating variables and understanding basic naming conventions, the next step is to **display information to the user**.  
Whether it's a variable's value or any other piece of information, showing output is crucial during development.

---

## Understanding Functions

Functions play a key role in JavaScript (and programming in general) by performing specific tasks.

### Functions as Black Boxes

- **Analogy:**  
  Think of a **bank cashier** when you deposit money:
  - You give them a deposit slip and money.
  - You don't know the internal process, but you trust that the money is deposited.
  - You simply receive a receipt as confirmation.

- **Function Characteristics:**
  - A function **accepts an input**.
  - **Processes** the input internally (the internal process is hidden/abstracted from the user).
  - **Returns an output** after processing.
  
- **Key Concept:**  
  Functions are **black boxes** — you **don't need to know** how they work internally; you only interact with their inputs and outputs.

**Summary:**  
Functions take input, process it internally, and produce output, without exposing internal workings to the user.

---

## Using the Built-in `console.log` Function

JavaScript provides **inbuilt functions** that simplify tasks.  
The first such function introduced here is **`console.log`**, which is very important for displaying information during coding and debugging.

### Purpose of `console.log`

- **What `console.log` Does:**
  - It **takes data as input**.
  - It **displays that data** (prints it) on the screen (usually in the console).
  
- **General Function Structure:**
  - Functions usually look like `functionName(argument1, argument2, ...)`.
  - Similarly, `console.log` accepts one or more arguments to display.

- **Usage:**  
  You can use `console.log` to:
  - Display numbers
  - Display text
  - Display variables
  - Display multiple values

---

### Demonstration of `console.log`

**Basic Examples:**

1. **Printing a Number:**
   ```javascript
   console.log(10);
   ```
   - Displays `10` on the screen.

2. **Printing Text:**
   ```javascript
   console.log("Hello World");
   ```
   - Displays `Hello World` on the screen.
   - Text should be enclosed in **double quotes ("")**.

3. **Printing a Variable:**
   ```javascript
   let age = 30;
   console.log(age);
   ```
   - Creates a variable `age` with value `30`.
   - Displays the value `30`.

> **Note:**  
> - If you try to `console.log` a variable that does not exist, it will display **`undefined`**.
> - Always declare and initialize variables before using them.

**Output Example:**

Running the following:
```javascript
let age = 30;
console.log(10);
console.log("Hello World");
console.log(age);
```
Produces:
```
10
Hello World
30
```
Each output appears **on a new line** because each `console.log` is a separate call.

**Summary:**  
`console.log` is used to display values, text, or variables by passing them as arguments. Each call prints output on a new line.

---

## Handling Multiple Values with `console.log`

`console.log` can also print **multiple values** in a single line by separating them with commas.

**Example:**

```javascript
let age = 23;
console.log(age, 43, "Some random text", 45);
```

- Multiple values are **comma-separated**.
- They are displayed **space-separated** on the same line.

**Output:**
```
23 43 Some random text 45
```

**Important Points:**

- If you use **multiple `console.log` statements**, each prints on a new line.
- If you **pass multiple values in one `console.log`**, they are printed **on the same line**, space-separated.

**Comparison Example:**

```javascript
// Different lines
console.log(10);
console.log("Hello World");

// Same line
console.log(10, "Hello World");
```

**Outputs:**
```
10
Hello World
```
and
```
10 Hello World
```
respectively.

**Summary:**  
You can display multiple values in the same line by passing them together in a single `console.log`, separated by commas.

---

# Final Summary

In this lesson, we learned:

- **Functions** act as black boxes: they accept inputs, process them internally (hidden from the user), and return outputs.
- **`console.log`** is an **inbuilt JavaScript function** used to **display data** like numbers, text, or variables.
- Each **`console.log` statement prints output on a new line** by default.
- **Multiple values** can be printed **on the same line** by passing them as **comma-separated arguments** to a single `console.log`.

Understanding `console.log` is foundational to working with JavaScript because it helps you **visualize your program’s internal data** during development and debugging.

---