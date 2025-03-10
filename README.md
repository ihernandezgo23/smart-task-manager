# Task Manager App

## Description
This is a simple task management application built with React and TypeScript. It allows users to create, edit, and manage tasks with various attributes such as category, priority, and deadline. Tasks can also be marked as completed.

## Features
- Add new tasks with a title, description, category, priority, and optional deadline.
- Edit existing tasks.
- Mark tasks as completed or incomplete.
- Tasks are managed using the `useState` hook.

## Technologies Used
- React
- TypeScript
- UUID for unique task IDs
- Tailwind CSS for styling

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-manager
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
1. Fill in the task form with a title, description, category, priority, and optional deadline.
2. Click "Add Task" to create a new task.
3. Click "Edit" to modify an existing task.
4. Click "Complete" or "Decomplete" to toggle task completion status.

## Folder Structure
- `src/components/MainPage.tsx`: The main component handling task creation and management.
- `src/interfaces/interfaces.ts`: Type definitions for the task structure.