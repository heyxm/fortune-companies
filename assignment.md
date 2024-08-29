# Chronicling America API Task

## Overview

You are tasked with creating a simple web application using Vue.js (v3) or NuxtJS that interfaces with the Chronicling America API. The application should allow users to search for newspaper titles using various parameters and display the results in a user-friendly interface. Additionally, the application should provide a detail view for each title, retrieving information using the specific LCCN (Library of Congress Control Number).

## API Details

This project will use the Chronicling America API to fetch newspaper data. Below is an overview of the key API endpoints and how they should be used in your application:

### **Search Titles**

-   **Endpoint:** `/search/titles/results/`
-   **Parameters:**
    -   `terms`: The search query.
    -   `format`: Set to `json` for JSON responses (default is `html`).
    -   `page`: Used for pagination. (can be ignored. See [Optional Enhancements](#optional-enhancements))
-   **Example:** `/search/titles/results/?terms=michigan&format=json&page=5`

### **Retrieve Title Information**

-   **Endpoint:** `/lccn/{lccn}.json`
-   **Parameters:**
    -   `{lccn}`: The Library of Congress Control Number for the specific newspaper.
-   **Example:** `/lccn/sn87056278.json`

### **Auto Suggest**

-   **Endpoint:** `/suggest/titles/`
-   **Parameters:**
    -   `q`: The query for auto-suggest functionality.
-   **Example:** `/suggest/titles/?q=Florida`

**_You can read more about their public API [here](https://chroniclingamerica.loc.gov/about/api/)._**

## Functional Requirements

### 1. Search View

#### Search Functionality:

-   Implement a search input that allows users to query the Chronicling America API for newspaper titles using the `/search/titles/results/` endpoint.
-   The search should allow users to enter a query term (`terms`).
-   Ensure that all API requests use the JSON response format by specifying `format=json` in the query parameters.
-   Add a button or any other mechanism to initiate the search, ensuring the query is sent to the API using the appropriate parameters.
-   Pagination support is optional. Refer to [Optional Enhancements](#optional-enhancements) for more details.

#### Search Results Display:

-   Display the search results in either a list or grid format, showing key information such as `title`, `place of publication`, `start year`, `end year`, `publisher`, and `frequency`. You may choose between list or grid based on your overall UI implementation approach.
-   Include a visual indication when the search is in progress (e.g., a loading spinner) and handle cases where no results are found with a user-friendly message.

### 2. Detail View

#### Navigation:

-   Implement routing to handle navigation between the search results and the detail view using Vue Router or NuxtJS's routing features.

#### Detail Page:

-   When a user clicks on a search result, navigate to a detail page that retrieves and displays detailed title information about the selected newspaper.

#### Using the LCCN:

-   Extract the `lccn` from the search result (e.g., `"lccn": "sn87056278"`).
-   Use the `lccn` to make a request to the endpoint `/lccn/{lccn}.json` to retrieve the title information.

#### Display relevant details on the detail page, such as:

-   `title`
-   `place of publication`
-   `start year`
-   `end year`
-   `publisher`
-   `frequency`
-   `language`
-   Any other relevant information provided by the API.

-   Include a back button or link to return to the search results.

#### Error Handling:

-   Ensure that if detailed data cannot be retrieved, the user is informed with a user-friendly message. They should be able to navigate back to the search results easily.

## Technical Requirements

### 1. Frameworks and Tools:

-   Use plain Vue.js (version 3) or NuxtJS as the primary framework for this project.
-   For state management, you may use Vuex, Pinia, or NuxtJS’s built-in state management features.
-   You may use any CSS framework or library (e.g., Tailwind, Bootstrap) or write custom CSS.
-   Ensure cross-browser compatibility for modern browsers (Chrome, Firefox, Edge).

### 2. Code Quality:

-   Follow best practices for Vue.js development, including component-based architecture.
-   Write modular, reusable components, especially for the search results and detail view.
-   Ensure your code is well-formatted and adheres to a consistent coding style.
-   Use comments where necessary to explain complex logic, but avoid over-commenting self-explanatory code.
-   Maintain a clean and well-structured commit history. Avoid pushing meaningless commit messages. Each commit should be meaningful and represent a logical chunk of work (Proper use of version control will be part of the evaluation).

### 3. Error Handling and Edge Cases:

-   Handle cases where the API response is empty, or fields are missing (e.g., display "N/A" or a placeholder if certain data is not available).
-   Validate and sanitize any user inputs, such as the search query, to prevent security vulnerabilities.
-   Errors can be displayed either inline or with a global toast component (or both, depending on the origin of the error).

## Optional Enhancements:

-   Consider implementing pagination when calling a search endpoint. Either:
    -   allow users to navigate between pages of results.
    -   implement an infinite scroll component.
-   Add basic unit tests for your components using Vue Test Utils or any testing library of your choice.

## Submission Guidelines

### 1. Create a GitHub Repository:

-   Create a GitHub repository and push your code there.
-   Either create a public repository or invite the interviewers to a private one.

### 2. Instructions:

-   Provide clear instructions in a `README.md` file on how to install dependencies and run the application.
-   Specify any environment variables or configurations required to run the project.
-   Note any assumptions made or limitations of your implementation.

## Assessment Criteria

### 1. Functionality:

-   The application should run smoothly and perform all required tasks as described.
-   Error handling should be robust, with appropriate feedback provided to the user.

### 2. Code Quality:

-   The code should be well-structured, easy to read, and follow best practices.
-   Proper use of Vue.js conventions and modern JavaScript features will be evaluated.
-   Make sure to ESLint and Prettier for code style control.

### 3. User Experience:

-   The application should be intuitive to use, with a clean and responsive design.
-   Navigation between views should be seamless and maintain state as expected.

### 4. Documentation:

-   The `README.md` file should provide clear and complete instructions on setting up and running the application.
