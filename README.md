# Class Timers
A website that is meant to be displayed on a large monitor for students to see how much time is remaining on any given timer.

## Change Log
- 2024/1/xx
    - Integrated Supabase to store the data
       - [x] createDidgYa
       - [x] deleteDidgYa
       - [ ] editDidgYa
       - [ ] clickDidgYa
       - [ ] stopDidgYa
       - [ ] getDidgYas
    - Integrated Supabase Auth
    - added profile modal
    - 5 DidgYas for free in the cloud and save others to localStorage
- 2024/1/xx
    - added edit modal for the clicked DidgYa
    - added view modal for the clicked DidgYa
    - added inputs to `createDidgYa()`
    - added duration to `createDidgYa()`
    - added inputs to `clickDidgYa()`
    - need to make sure duplicate names cannot be added
- 2024/1/26
    - added icon to show where the DidgYa is stored
    - created `cloudDatabase.js` and `localDatabase.js` in prep for pushing data to the DB if they user decides to register and for showing which DidgYas are stored locally and which are stored in the cloud.
- 2024/1/25
    - added emoji to `createDidgYa()`
    - added elapsed time to DidgYas with `duration = true`
    - ensured that the stop button hidden if the `duration = true` DidgYa is active
    - ensured that the start button hidden if the `duration = true` DidgYa is active
    - added delete confirmation modal for the clicked DidgYa
    - added a description to the list showing how many times it was done today and how long since the last instance
    - updated DidgYa list item styles to look more like a list
    - added app name and logo placeholder to the top
- 2024/1/24
    - DidgYas can now be created
    - DidgYas displayed as a list in index.html
    - All data can be deleted

## Dependencies
- [TailwindCSS](https://tailwindcss.com/)
- [Tippy.js](https://github.com/atomiks/tippyjs)
- [Toastify.js](https://github.com/aleab/toastify)
- [FontAwesome](https://fontawesome.com/)
- [FlowBite](https://flowbite.com/)
- [Chart.js](https://www.chartjs.org/)
