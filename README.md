# Democratic Republic of Potatostan

The President of Democratic Republic of Potatostan has established a People Sorting Department. To train smart and valuable civil servants for this job, you need to create a Sorting Training system.

### It needs to work this way:

- After clicking "Start sorting", show a modal where it's possible to enter a number of people to add to the list.
- The modal window needs to accept a number between 20 and 100.
- After clicking Start, generate the provided number of people, add them to the table as separate entries, and start a timer.
- Each entry has a random email, a number of potatoes that this person has (must be unique) and a random name.
- The user has to drag and drop the rows from the most potatoes at the top to the least potatoes at the bottom.
- After the list is sorted in the correct order, stop the timer and show a success message with his score.

Build the solution using vue.js and use the design [provided here](https://www.figma.com/file/CgzEuikiavWxnATzw8umdv/?node-id=101%3A49*)

### Feature Breakdown

-[x] Start Sorting Button -[x] A button labeled "Start sorting." -[x] When clicked, a modal window appears. -[x] Modal Window -[x] Accepts a number input for the number of people to generate (between 20 and 100). -[x] A "Start" button to generate the data and proceed. -[x] Generate Random Data For the specified number of people: -[x] Random Name: Use a library like Faker.js or generate manually. -[x] Random Email: Can be generated based on the name or randomly. -[x] Unique Potato Count: Ensure no duplicates.

-[x] Sortable Table -[x] Displays the generated data in rows. -[x] Columns include: - Name - Email - Potato Count -[x] Rows are draggable to rearrange. -[x] Drag-and-Drop Sorting -[x] Allow rows to be reordered by dragging. -[x] Ensure the order is validated (most potatoes at the top).

-[x] Timer -[x] Starts when the list is generated. -[x] Stops when the sorting is correct. -[x] Displays elapsed time in the success message.

-[x] Success Message -[x] Show a congratulatory message with the user's score (time taken to complete sorting).
