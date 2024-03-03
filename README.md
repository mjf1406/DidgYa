# DidgYa

Did you do it? Did you experience it? DidgYa is an app designed to simplify the way you track various things that happen in your life, from daily tasks, like brushing your teeth or drinking water, to things you experience, like a headache or an epiphany.

## Change Log

-   2024/3/3
    -   added coffee grounds to stool shape in Poop
-   2024/2/19
    -   added a way to do a DidgYa for a user-specified date and time in the view modal
    -   changed view modal from current week to last 7 days.
    -   moved the DidgYa list to `me.html` and `index.html` is now a basic landing page. Thinking I'll switch over to `landing-test.html`
    -   added weekly average between DidgYas to view modal
    -   added daily averages for each day in the last 7 days to view modal
-   2024/2/15
    -   table dated is now sorted in descending order
    -   graph data now matches table data
    -   in view modal, graph data is for the current week only
-   2024/2/10
    -   created consts in `tests-generateTestData.js` for various vars
    -   added medication to DEFAULT_DIDGYAS
    -   created `generateTestData()` function to generate data for testing
    -   added pagination to data-table
    -   fixed: the timer interval now gets cleared when it reaches zero
    -   fixed: timer interval being finished will no longer do an extra DidgYa
    -   fixed: Brush Teeth was done twice for some reason
-   2024/2/9
    -   the intro text is now only displayed if the user has not been to the site before, stored in localStorage 'show-intro'
    -   added light and dark themes for data-table, but they do not align with my palette.
    -   applied palette to inputs
    -   chart no longer continually shrink and is now sized properly on mobile and desktop
    -   applied palette to custom dropdowns
    -   createInput now correctly returns the proper div
    -   added two kinds of timed Didgyas: (1) that just keeps track of how long you do it for, so the stopwatch starts once started, and (2) that starts a timer as soon as you click it to make sure you do it for a set amount of time
    -   moved wipes in Poop to the bottom
    -   changed .timed to .stopwatch in the DidgYa schema
    -   added .timer ot the DidgYa schema
    -   added .stopwatch to createDidgYa
    -   added .timer to createDidgYa
    -   modified the DidgYa records schema to be better, using input names as the keys
-   2024/2/8
    -   added endTime to DidgYa schema instead of in duration.endTime
-   2024/2/7
    -   icons now get added to the button when selecting in custom select
    -   chart.js tooltip now has the right time format
    -   `getTodayRecords()` now returns today's records, instead of all records
    -   added icons to dropdowns by implementing `createCustomDropdown()` in `helpers.js`
    -   Do DidgYa button not having its click listener. For some reason `newElement.addEventListener("click", function eventHandler(e)` had "click" set to ""
    -   DidgYas with measured durations not getting their list item updated. Was due to schema changing. Needed `didgYa.records.last().dt`
-   2024/2/6
    -   apply palette to Chart.js
    -   updated modal button colors to align with palette
    -   added basic chart to view modal
-   2024/2/5
    -   added boolean as input option when creating a DidgYa
    -   ensured the the same listener does not stack by replacing in place the delete and edit buttons in the view modal
    -   basic table of data is displayed in the view modal
    -   schema changed: now each record has `dt: new Date()`, whereas before, if there were no inputs, it was just an array
-   2024/2/4
    -   DidgYa text now hides on medium and smaller screens
    -   removed the Color.js dependency in `toasts.js` through the magic of HSL
    -   started `landing.html`
    -   updated footer icons to actually show
    -   removed pee, mouthwash, and floss from DEFAULTS
    -   added a way to add more presets that I created in Defaults.js as PRESET_DIDGYAS
    -   added delete button to each option when creating an input
    -   added delete button to inputs and options for the Create DidgYa modal
    -   font now correctly loads on GitHub
    -   models now no longer appear at the top, instead they appear in the center, on mobile
    -   added floss and mouthwash to DEFAULT_DIDGYAS
    -   DidgYa list is not alphabetized
    -   added total quantity consumed in DidgYaLisItem
    -   added wipes, stool quantity, and stool shape to Poop default
    -   added pee to defaults
-   2024/2/3
    -   added fonts to the project to remove googlefonts api call: about 200 + 150 ms saved
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
-   [PowerSync](https://www.powersync.com/blog/bringing-offline-first-to-supabase) -- "Bringing offline-first to Supabase, the right way"

## Landing Page

### Examples

-   https://www.youtube.com/watch?v=QYmNMHl156E
-   https://play-tailwind.tailgrids.com/

### Templates

-   https://www.tailwindawesome.com/resources/landwind
-   https://www.tailwindawesome.com/resources/play
