# Smart Clinic Management System - Architecture Design Document

## Section 1: Architecture Summary
The Smart Clinic Management System is built on a robust three-tier architecture that separates presentation, application logic, and data persistence. The presentation tier serves both dynamic HTML web pages (rendered via Thymeleaf for server-side MVC integration) and client-side web interfaces interacting with RESTful APIs using HTML, CSS, and JavaScript. The application tier, built with Java and Spring Boot, processes business logic through dedicated Controllers, Services, and Repositories. It incorporates a dual-database persistence layer: Spring Data JPA interfaces with a relational MySQL database to manage structured transactional data (Admins, Doctors, Patients, Appointments), while Spring Data MongoDB handles flexible, unstructured document data (Prescriptions and Medical Records).

## Section 2: Request/Response Flow Cycle
1. **Client Request:** The user (Admin, Doctor, or Patient) triggers an action via an HTML form or JavaScript `fetch()` REST API request from the browser.
2. **Security & Routing:** The request enters the Spring Boot application and is intercepted by Spring Security filters to validate JWT authentication and verify role-based permissions.
3. **Controller Handling:** The request is routed to the corresponding Spring Controller—either an MVC Controller (returning Thymeleaf view names) or a `@RestController` (returning JSON payloads).
4. **Business Logic Execution:** The Controller passes data to the Service Layer, which enforces business rules, input validations, and transactional logic.
5. **Data Access Layer Routing:** The Service Layer interacts with specific repositories based on the requested resource:
   - **MySQL Query:** Structured data operations (e.g., booking appointments, user management) call Spring Data JPA Repositories to query MySQL.
   - **MongoDB Query:** Flexible document operations (e.g., saving prescriptions, medical histories) call Spring Data MongoDB Repositories to query MongoDB.
6. **Persistence Layer Response:** The respective database executes the operation and returns entities or documents back to the Service Layer.
7. **Response Serialization & Rendering:** The Service returns processed data to the Controller:
   - **REST APIs:** The Controller serializes domain objects into JSON HTTP responses for client-side rendering.
   - **MVC Views:** The Controller populates a Spring `Model` object and passes it to Thymeleaf to render the final HTML page.
8. **Client Display:** The browser receives the HTTP response (HTML page or JSON payload) and updates the UI for the user.
