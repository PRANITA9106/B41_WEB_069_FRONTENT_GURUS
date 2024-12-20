import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-20 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            About Page
          </h1>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Our Mission & Values
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            A more valuable way where customers are earned rather than bought.
            We’re obsessively passionate about it, and our mission is to help
            people achieve it. We focus on search engine optimization. It’s one
            of the least understood and least transparent aspects of great
            marketing, and we see that as an opportunity. We’re excited to
            simplify SEO for everyone through our software, education, and
            community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <img
            src="https://media.istockphoto.com/id/1477871401/photo/portrait-of-happy-young-businesswoman-arms-crossed-with-looking-at-camera-on-white-background.jpg?s=1024x1024&w=is&k=20&c=DHbWtsuz_HqLj0YIqKsf6jp53j7ScbnrvgVoMiPknS8="
            alt="Founding"
            className="rounded-full w-60 h-60 mb-4 md:mb-0 md:mr-20"
          />
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-400">
              Frontend UX Designer
            </h1>

            <h3 className="text-xl font-semibold text-gray-900">
              {" "}
              Name:Sandeep
            </h3>
            <h3> Mission:(Navbar Design)</h3>
            <p className="mt-4 text-lg">
              Task: .Design navbar UI. <br />
              Implement responsive navbar. <br />
              Add navigation links (e.g., Home, Profile, Logout)
              <br /> .Design and implement the navigation bar for the to-do list
              app, ensuring it's responsive and user-friendly. Deliverable:
              Navbar UI component with a clear structure for navigating between
              tasks, settings, etc.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-400">
              Frontend UX Designer
            </h1>

            <h3 className="text-xl font-semibold text-gray-900">
              {" "}
              Name:Utkarsh Raj 
            </h3>
            <h3> Mission:(Sidebar Design)</h3>
            <p className="mt-4 text-lg">
              Design sidebar UI. <br />
              Implement task filters (All, Active, Completed). <br />
              Make sidebar collapsible and responsive. <br />
              Task: Design and implement the sidebar, including task categories
              (e.g., All, Completed, Pending). Deliverable: Sidebar UI with
              well-defined task filters and smooth transitions.
            </p>
          </div>
          <img
            src="https://media.istockphoto.com/id/1477871401/photo/portrait-of-happy-young-businesswoman-arms-crossed-with-looking-at-camera-on-white-background.jpg?s=1024x1024&w=is&k=20&c=DHbWtsuz_HqLj0YIqKsf6jp53j7ScbnrvgVoMiPknS8="
            alt="Funding"
            className="rounded-full w-60 h-60 mb-4 md:mb-0 md:ml-20"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <img
            src="https://media.istockphoto.com/id/1477871401/photo/portrait-of-happy-young-businesswoman-arms-crossed-with-looking-at-camera-on-white-background.jpg?s=1024x1024&w=is&k=20&c=DHbWtsuz_HqLj0YIqKsf6jp53j7ScbnrvgVoMiPknS8="
            alt="Founding"
            className="rounded-full w-60 h-60 mb-4 md:mb-0 md:mr-20"
          />
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-400">
              Frontend UX Designer
            </h1>
            <h3 className="text-xl font-semibold text-gray-900">
              {" "}
              Name:Pranita
            </h3>
            <h3> Mission:(To-Do Task UI Design)</h3>

            <p className="mt-4 text-lg">
              Design task list UI with placeholders. <br />
              Design task item (checkbox, title, due date). <br />
              Add task actions: create, edit, mark as completed, delete. <br />
              Task: Design the main to-do list view and task components (e.g.,
              task creation, editing, marking as complete). Deliverable: Task
              item design with clear action buttons (edit, delete, mark as
              complete) and a simple, intuitive layout.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="md:w-1/3 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-400">
              Frontend UX Designer
            </h1>
            <h3 className="text-xl font-semibold text-gray-900">
              {" "}
              Name:Ashutosh Singh
            </h3>
            <h3> Mission:(API Design and Implementation)</h3>
            <p className="mt-4 text-lg">
              Define API routes for CRUD operations (tasks). <br />
              Implement user authentication (login/signup). <br />
              Connect API to database for storing tasks and users. <br />
              Task: Develop the backend API for task management (create, read,
              update, delete tasks). Handle user authentication, task storage,
              and interaction with the database. Deliverable: RESTful API
              endpoints for task CRUD operations and user management, including
              data validation, error handling, and database integration.
            </p>
          </div>
          <div className=" w-20"></div>
          <img
            src="https://media.istockphoto.com/id/1477871401/photo/portrait-of-happy-young-businesswoman-arms-crossed-with-looking-at-camera-on-white-background.jpg?s=1024x1024&w=is&k=20&c=DHbWtsuz_HqLj0YIqKsf6jp53j7ScbnrvgVoMiPknS8="
            alt="Vision"
            className="rounded-full w-60 h-60 mb-4 md:mb-0 md:ml-20"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
