# Class Timers

A website that is meant to be displayed on a large monitor for students to see how much time is remaining on any given timer.

## Change Log

-   2024/1/xx
    -   Integrated Supabase to store the data
        -   [x] createDidgYa
        -   [x] deleteDidgYa
        -   [ ] editDidgYa
        -   [ ] viewDidgYa
        -   [x] clickDidgYa
        -   [x] stopDidgYa
    -   Integrated Supabase Auth
    -   added profile modal
    -   5 DidgYas for free in the cloud and save others to localStorage
-   2024/1/xx
    -   added content in the view model; what do I add here?
    -   added edit modal for the clicked DidgYa
    -   on `editDidgya()`, only the items that were changed are updated in DidgYaList
    -   updated modal button colors to align with palette
    -   added delete button to inputs and options for the Create DidgYa modal
    -   font now correctly loads on GitHub
    -   models now no longer appear at the top, instead they appear in the center, on mobile
    -   added icons to dropdowns : requires a custom dropdown for the SVG to display properly
    -   added a stopwatch for those with daily goals that shows last time it was done. Only do minutes and hours
-   2024/2/4
    -
-   2024/2/4 1052
    -   added total quantity consumed in DidgYaLisItem
    -   added wipes, stool quantity, and stool shape to Poop default
    -   added pee to defaults
-   2024/2/3
    -   added fotns to the project to remove googlefonts api call: about 200 + 150 ms saved
    -   added daily goal to each DidgYaListItem
    -   fixed the icons so they are properly positioned and properly colored
    -   downloaded FontAwesome Icon to reduce 500ms calls to their CDN
    -   updated bg colors and button colors of DidgYaList to align with the palette
    -   moved the create DidgYa button to the top of the list of DidgYas
    -   reduced DOM overhead by only updating the necessary DidgYa when it changes, i.e. when it is started, deleted, or added
    -   removed value from `default` options for Poop
    -   added inputs to `createDidgYa()`
    -   added timed to `createDidgYa()`
    -   added daily goal to `createDidgYa()`
    -   added inputs to `clickDidgYa()`
    -   added daily goal to `defaults`
    -   removed unit type and switched the unit to be a text input
    -   renamed _inputs.selects_ to _inputs.options_
-   2024/1/27
    -   need to make sure duplicate names cannot be added
    -   updated DidgYa list item so that clicking views the item and then from within the view, you can delete and edit
    -   added basic view modal for the clicked DidgYa which includes a delete and edit button
-   2024/1/26
    -   added icon to show where the DidgYa is stored
    -   created `cloudDatabase.js` and `localDatabase.js` in prep for pushing data to the DB if they user decides to register and for showing which DidgYas are stored locally and which are stored in the cloud.
-   2024/1/25
    -   added emoji to `createDidgYa()`
    -   added elapsed time to DidgYas with `duration = true`
    -   ensured that the stop button hidden if the `duration = true` DidgYa is active
    -   ensured that the start button hidden if the `duration = true` DidgYa is active
    -   added delete confirmation modal for the clicked DidgYa
    -   added a description to the list showing how many times it was done today and how long since the last instance
    -   updated DidgYa list item styles to look more like a list
    -   added app name and logo placeholder to the top
-   2024/1/24
    -   DidgYas can now be created
    -   DidgYas displayed as a list in index.html
    -   All data can be deleted

## Dependencies

-   [TailwindCSS](https://tailwindcss.com/)
-   [Tippy.js](https://github.com/atomiks/tippyjs)
-   [Toastify.js](https://github.com/aleab/toastify)
-   [FontAwesome](https://fontawesome.com/)
-   [FlowBite](https://flowbite.com/)
-   [Chart.js](https://www.chartjs.org/)
