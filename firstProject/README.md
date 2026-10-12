# First Project

This project is a React application created with Vite and styled with Tailwind CSS.

## Create a React project with Vite

1. Create a new Vite project:

   ```bash
   npm create vite@latest
   ```

2. Choose a package name when prompted.

3. Choose:

   - Framework: `React`
   - Variant: `JavaScript`

4. Move into the new project directory:

   ```bash
   cd your-project-name
   ```

5. Install the project dependencies:

   ```bash
   npm install
   ```

## Install Tailwind CSS

1. From inside the project directory, install Tailwind CSS and its Vite plugin:

   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

2. Open `vite.config.js` and add the Tailwind plugin:

   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

3. Add the Tailwind import to `src/index.css`:

   ```css
   @import "tailwindcss";
   ```

## Run the project

From inside the project directory, start the development server:

```bash
npm run dev
```
