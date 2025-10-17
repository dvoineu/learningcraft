---
trigger: manual
description: 
globs: 
---

# Cursor Rules and Workflow Guide

## Core Configuration

- **Version**: `v5`
- **Project Type**: `web_application`
- **Code Style**: `clean_and_maintainable`
- **Environment Support**: `dev`, `test`, `prod`

---

## Test-Driven Development (TDD) Rules

1. Write tests **first** before any production code.
2. Run tests before implementing new functionality.
3. Write the **minimal code** required to pass tests.
4. Refactor only after all tests pass.
5. Do not start new tasks until all tests are passing.
6. Place all tests in a dedicated `/tests` directory.
7. Explain why tests will initially fail before implementation.
8. Propose an implementation strategy before writing code.
9. Check for existing functionality before creating new features.

---

## Code Quality Standards

- Maximum file length: **300 lines** (split into modules if needed).
- Follow existing patterns and project structure.
- Write modular, reusable, and maintainable code.
- Implement proper error handling mechanisms.
- Use type hints and annotations where applicable.
- Add explanatory comments when necessary.
- Avoid code duplication; reuse existing functionality if possible.
- Prefer simple solutions over complex ones.
- Keep the codebase clean and organized.

---

## AI Assistant Behavior

1. Explain understanding of requirements before proceeding with tasks.
2. Ask clarifying questions when requirements are ambiguous or unclear.
3. Provide complete, working solutions for each task or bug fix.
4. Focus only on relevant areas of the codebase for each task.
5. Debug failing tests with clear explanations and reasoning.

---

## Things to Avoid

- Never generate incomplete or partial solutions unless explicitly requested.
- Never invent nonexistent functions, APIs, or libraries.
- Never ignore explicit requirements or provided contexts.
- Never overcomplicate simple tasks or solutions.
- Never overwrite `.env` files without explicit confirmation.

---

## Implementation Guidelines

### General Rules

1. Always check for existing code before creating new functionality.
2. Avoid major changes to patterns unless explicitly instructed or necessary for bug fixes.

### Environment-Specific Rules

- Mock data should only be used for **tests**, never for development or production environments.


### File Management

- Avoid placing scripts in files if they are intended to be run only once.


### Refactoring Rules

1. Refactor files exceeding **300 lines** to improve readability and maintainability.

### Bug Fixing Rules

1. Exhaust all options using existing patterns and technologies before introducing new ones.
2. If introducing a new pattern, remove outdated implementations to avoid duplicate logic.

---

## Workflow Best Practices

### Planning \& Task Management

1. Use Markdown files (`PLANNING.md`, `TASK.md`) to manage project scope and tasks:
    - **PLANNING.md**: High-level vision, architecture, constraints, tech stack, tools, etc.
    - **TASK.md**: Tracks current tasks, backlog, milestones, and discovered issues during development.
2. Always update these files as the project progresses:
    - Mark completed tasks in `TASK.md`.
    - Add new sub-tasks or TODOs discovered during development.

### Code Structure \& Modularity

1. Organize code into clearly separated modules grouped by feature or responsibility.
2. Use consistent naming conventions and file structures as described in `PLANNING.md`.
3. Never create a file longer than 500 lines of code; refactor into modules if necessary.

### Testing \& Reliability

1. Create unit tests for all new features (functions, classes, routes, etc.).
2. Place all tests in a `/tests` folder mirroring the main app structure:
    - Include at least:
        - 1 test for expected use,
        - 1 edge case,
        - 1 failure case (to ensure proper error handling).
3. Mock external services (e.g., databases) in tests to avoid real-world interactions.

### Documentation \& Explainability

1. Update `README.md` when adding features, changing dependencies, or modifying setup steps.
2. Write docstrings for every function using Google-style formatting:

```python
def example(param1: int) -&gt; str:
    """
    Brief summary of the function.

    Args:
        param1 (int): Description of the parameter.

    Returns:
        str: Description of the return value.
    """
```

3. Add inline comments explaining non-obvious logic and reasoning behind decisions.

---

## Verification Rule

I am an AI coding assistant that strictly adheres to Test-Driven Development (TDD) principles and high code quality standards. I will:

1. Write tests **first** before any production code.
2. Place all tests in a dedicated `/tests` directory.
3. Explain why tests initially fail before implementation begins.
4. Write minimal production code to pass the tests.
5. Refactor while maintaining passing tests at all times.
6. Enforce a maximum file length of **300 lines** per file (or 500 lines if specified).
7. Check for existing functionality before writing new code or features.
8. Explain my understanding of requirements before starting implementation work.
9. Ask clarifying questions when requirements are ambiguous or unclear.
10. Propose implementation strategies before writing any production code.
11. Debug failing tests with clear reasoning and explanations provided step-by-step.

---

## Server Management Best Practices

1. Restart servers after making changes to test them properly (only when necessary).
2. Kill all related servers from previous testing sessions to avoid conflicts.

---

## Modular Prompting Process After Initial Prompt

When interacting with the AI assistant:

1. Focus on one task at a time for consistent results:
    - Good Example: “Update the list records function to add filtering.”
    - Bad Example: “Update list records, fix API key errors in create row function, and improve documentation.”
2. Always test after implementing every feature to catch bugs early:
    - Create unit tests covering:
        - Successful scenarios,
        - Edge cases,
        - Failure cases.

---