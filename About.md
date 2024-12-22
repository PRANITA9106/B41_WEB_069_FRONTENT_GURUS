

# Task Management App - askMaster

## Project Overview

The **Task Management App** (askMaster) is designed to help users efficiently manage, collaborate, and track tasks. With features like task CRUD operations, drag-and-drop task boards, AI-powered predictions, and real-time collaboration, the app aims to optimize productivity for individuals and teams. Users can create, update, delete, and organize tasks, set deadlines, collaborate with others, and receive AI-based suggestions for better task management.

## Minimum Expected Features

### Task CRUD Operations
- **Create, Read, Update, and Delete tasks**: Users can manage tasks with a title, description, due date, priority, and status.
  - Status options: To-Do, In Progress, Completed
  - Task details: Title, Description, Due Date, Priority Level, and Status

### Task Board
- **Kanban-style board**: Display tasks categorized by status with drag-and-drop capabilities to move tasks between columns (To-Do, In Progress, Completed).

### Deadline Management
- **Set deadlines for tasks**: Users can create tasks with deadlines and receive reminders before the due date.

### User Authentication
- **Registration and login**: Secure user authentication with role-based access control:
  - Regular users
  - Admin users

### Task Assignment and Collaboration
- **Assign tasks to users**: Tasks can be assigned to multiple collaborators.
- **Collaborator comments**: Users can leave comments on tasks and tag other users to facilitate communication and updates.

## Unique Features

### Secured Sharable Links for Collaboration
- **Generate time-bound links**: Users can create a secure, expiring link to invite collaborators to join a task. This ensures added security for shared tasks.

### Tagging Users in Task Comments
- **Tagging functionality**: Users can tag collaborators in comments, triggering notifications for updates or new comments.

### Recurring Tasks
- **Set recurring tasks**: Users can create tasks that repeat daily, weekly, or monthly with reminders for each iteration.

### Customizable Task Board Layouts
- **Custom columns**: Users can create custom task board columns and save layouts for future use, catering to different workflows.

## Challenging Features

### AI-Based Predictions and Analytics
- **Predict task completion timelines**: AI will analyze past tasks, deadlines, and team communication to predict task completion and suggest priority adjustments.
- **Insights and analytics**: Display insights like expected completion rates, overdue trends, and task bottlenecks.

### Outcome Prediction Based on Pace
- **Predict task outcomes**: Based on the current pace of task completion, predict the probable outcomes (e.g., project on track or delays expected).
- **Suggestions for improvement**: AI will provide suggestions to enhance task management based on the predicted outcomes.

### Advanced Deadline Management
- **Automatic deadline adjustments**: If preceding tasks are delayed, deadlines of subsequent tasks will be automatically adjusted.
- **Cascading delay notifications**: Notify users of potential cascading delays due to missed deadlines.

### Offline Support with Syncing Capabilities
- **Offline task management**: Users can manage tasks offline, and the app will sync data automatically once back online.

## Additional Features

### Complete Responsive Design
- The app is fully responsive and optimized for both mobile and desktop devices, ensuring an excellent user experience across all screen sizes.

### Dark Mode
- Users can toggle between dark and light mode for a personalized experience and better visibility.

### Good UI/UX Design
- Focused on creating an intuitive, user-friendly interface with clean layouts, easy navigation, and enhanced user experience.

### Real-Time Updates
- **WebSockets integration**: Real-time updates for task modifications, ensuring that all collaborators are immediately notified when a task is updated by others.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone git@github.com:PRANITA9106/B41_WEB_069_FRONTENT_GURUS.git
cd B41_WEB_069_FRONTENT_GURUS
npm install
npm run dev
