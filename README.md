# ArtLab 🎨

ArtLab is a collaborative online sketching tool that allows users to create and share drawings in real time. Built with Next.js and Express, the application supports a variety of tools and features such as pencil drawing, eraser, undo/redo actions, and image download.

## Features

- **Collaborative Drawing:** Real-time synchronization of drawing actions via WebSockets.
- **Drawing Tools:**
  - Pencil with customizable stroke color and size.
  - Eraser for removing unwanted strokes.
- **Action Tools:**
  - Undo and redo functionality.
  - Download the canvas as an image.
- **Responsive Canvas:** Automatically adjusts to fit the viewport size.
- **State Management:** Redux is used for managing the application's state.

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Express.js
- **State Management:** Redux
- **Real-time Communication:** Socket.IO
- **Styling:** CSS Modules

---

## Folder Structure

```markdown
## Folder Structure

The project is organized into the following structure:
```

src/
├── app/ # Main application entry and page layouts
│ ├── globals.css # Global styles for the application
│ ├── layout.tsx # Application layout component
│ └── page.tsx # Entry page for the app
├── components/ # Reusable React components
│ ├── menu/ # Components related to the action menu
│ │ └── Menu.tsx # Menu component for tool selection
│ ├── toolbox/ # Components for toolbox and configurations
│ │ └── Toolbox.tsx # Toolbox for color and size adjustments
│ └── board/ # Main drawing canvas component
│ └── Board.tsx # Canvas and drawing logic
├── lib/ # Shared utilities, constants, and Redux
│ ├── constants.ts # Application constants (e.g., menu items, colors)
│ ├── socket.ts # Socket.IO client for real-time collaboration
│ └── redux/ # Redux slices and state management
│ ├── store.ts # Redux store setup
│ ├── menuSlice.ts # Slice for menu-related state
│ └── toolboxSlice.ts # Slice for toolbox configurations
├── public/ # Static assets (images, icons, etc.)
│ └── favicon.ico # Favicon for the application

```

### Detailed Explanation

- **`app/`**: Contains the main application layout and entry points.
  - `globals.css`: Defines global CSS styles for the app.
  - `layout.tsx`: Manages the layout used across all pages.
  - `page.tsx`: The main page of the application.

- **`components/`**: Houses reusable React components.
  - `menu/`: Contains the `Menu` component for selecting tools and actions.
  - `toolbox/`: Includes the `Toolbox` component to adjust brush size, color, etc.
  - `board/`: The `Board` component manages the drawing canvas and related logic.

- **`lib/`**: Shared utilities and state management.
  - `constants.ts`: Stores application-wide constants like menu items and colors.
  - `socket.ts`: Handles real-time collaboration using Socket.IO.
  - `redux/`: Contains Redux slices for state management.

- **`public/`**: Static files that can be served directly (e.g., images, favicon).

This structure ensures the project remains modular, maintainable, and scalable.
```

## Installation and Setup

Follow these steps to get the project up and running:

### Prerequisites

- **Node.js** (v16 or higher) installed on your machine.
- **npm** or **yarn** for managing dependencies.

### Steps for Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sane-eagle/ArtLab.git
   cd ArtLab
   ```
2. **Install Dependencies**:

   ```bash
    npm install
   ```

3. **Start the Development Server**:

  ```bash
  npm run dev
  ```

## Usage

1. **Open the Application**:
   - Once the development server is running, open your browser and go to `http://localhost:3000`.
2. **Collaborate in Real Time**:
   - Share the URL with others to collaborate on the same canvas in real time.
3. **Select Drawing Tools**:
   - Use the pencil tool to draw on the canvas.
   - Adjust the stroke color and size using the toolbox.
4. **Undo and Redo Actions**:
   - Click on the undo/redo buttons to revert or redo drawing actions.
5. **Download the Drawing**:
   - Click on the download button to save the canvas as an image.

---

