## Sorting Training system

The President of Democratic Republic of Potatostan has established a People Sorting Department. To train smart and valuable civil servants for this job, you need to create a **`Sorting Training system`**

live Demo: [live Demo](https://sorting-system.netlify.app/).

### It needs to work this way:

1. After clicking **`Start sorting`**, show a modal where it's possible to enter a number of people to add to the list.
2. The modal window needs to accept a number between **`20`** and **`100`**.
3. After clicking **`Start`**, generate the provided number of people, add them to the table as separate entries, and start a timer.
4. Each entry has a random email, a number of potatoes that this person has (must be unique) and a random name.
5. The user has to **`drag and drop`** the **rows** from the most potatoes at the top to the least potatoes at the bottom.
6. After the list is sorted in the correct order, stop the timer and show a success message with his score.

### Feature Breakdown:

- [x] Start `Sorting Button`
- [x] A button labeled `"Start sorting."`
- [x] When clicked `Start sorting`, a modal window appears.
- [x] Modal Window Accepts a `Number` input for the number of people to generate **(between `20` and `100`)**.
- [x] A **`Start`** button to generate the data and proceed.
- [x] Generate Random Data For the specified number of people:
- [x] `Random Name:` Use a library like `Faker.js` or generate manually.
- [x] `Random Email:` Can be generated based on the name or randomly.
- [x] `Unique Potato Count`: Ensure no duplicates.
- [x] Sortable Table
- [x] Displays the generated data in rows.
- [x] Columns include _`(Based on design)`_: - `Email` - `Potatoes` - `Tags` - `Full name` - `Location` - `Date / time`
- [x] Rows are `draggable` to rearrange.
- [x] Drag-and-Drop Sorting
- [x] Allow rows to be reordered by dragging.
- [x] Ensure the order is validated (most potatoes at the top).
- [x] Timer `(timer will start internally)`
- [x] Timer Starts when the list is generated.
- [x] Timer Stops when the sorting is correct order.
- [x] Displays elapsed time in the success message.
- [x] Success Message `(show modal)`
- [x] Show a congratulatory message with the user's score `(time taken to complete sorting)`.

### Installation, Development, and Deployment:

1. Prerequisites:
   - Node.js `(latest version v22.13.1)` and npm `(version v10.9.2)` installed.
   - Vue.js `(version 3)` and Vue CLI installed Vite CLI
   - Git installed.
2. Installation steps:

   - Clone the repository: `git clone https://github.com/masud001/sorting-training-system.git`
   - Go to the project folder `cd sorting-training-system`
   - Install dependencies: `npm install`
   - Install Vue.js and Vue CLI: `npm install -g @vue/cli`
   - Run the project from your terminal :`npm run dev`

3. Setting up the development environment:
   - Install a code editor or IDE (e.g., Visual Studio Code)
   - Install necessary extensions (e.g., Vue.js, TypeScript)
   - Configure the code editor or IDE for Vue.js development
4. Building the application:
   - Run `npm run build` to **Build** the application for production.
   - Run `npm run dev` to **Start** the development server.
   - Open a web browser and navigate to `http://localhost:5173`
5. Overview of testing:
   - Unit testing with Jest and Vue Test Utils
   - End-to-end testing with Cypress
6. Running tests:

   - Run `npm run test:unit` to run unit tests
   - Run `npm run test:e2e` to run end-to-end tests

7. Deployment steps:
   - Build the application for production: `npm run build`
   - Deploy the application to a production environment (e.g., Vercel, Netlify).
   - Configure environment variables and settings for production.
