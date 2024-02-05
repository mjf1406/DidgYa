# Class Timers

A website that is meant to be displayed on a large monitor for students to see how much time is remaining on any given timer.

## Change Log

A [?] denotes that I am considering it, i.e. I'm not sure it should be implemented.

### To-do List

#### Low Priority

-   Integrated Supabase to store the data
    -   [x] createDidgYa
    -   [x] deleteDidgYa
    -   [ ] editDidgYa
    -   [ ] viewDidgYa
    -   [x] clickDidgYa
    -   [x] stopDidgYa
-   integrated Supabase Auth
-   added profile modal
-   5 DidgYas for free in the cloud and save others to localStorage

#### Medium Priority

-   added content in the view model; what do I add here?
-   on `editDidgya()`, only the items that were changed are updated in DidgYaList
-   added edit modal for the clicked DidgYa
-   notify the user about being offline

#### High Priority

-   [?] added a stopwatch for those with daily goals that shows last time it was done. Only do minutes and hours
-   updated modal button colors to align with palette
-   added icons to dropdowns : requires a custom dropdown for the SVG to display properly
    -   urine color, stool shape, stool color
-   added masturbation to presets
-   added boolean as input option when creating a DidgYa

### Complete

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
-   [PowerSync](https://www.powersync.com/blog/bringing-offline-first-to-supabase) -- "Bringing offline-first to Supabase, the right way"

## Landing Page

### Examples

-   https://www.youtube.com/watch?v=QYmNMHl156E
-   https://play-tailwind.tailgrids.com/

### Templates

-   https://www.tailwindawesome.com/resources/landwind
-   https://www.tailwindawesome.com/resources/play

### Sections

1. hero
   📢📢📢 inside of 5 seconds, what you do, why it matters, and what they need to do to get it 📢📢📢

    - headline emphasizes value, result or transformation
    - sub-headline clearly explains what you provide to get that result
    - call-to-action button
    - image
        - people look at the image for 6 seconds, a lot in the web
        - must get it right an emotional connect

2. Problem/Solution section
    - talk about the main _pain point_
        - larger text than the below
    - _agitate_ with examlpes
    - introduce your _solution_
    - add a video that hits on teh problem if possible
        - pages with video increase conversion by 86% on average
3. Benefits
    - Most compelling 3 benefits paired with feature(s) that make them possible
    - Benefit is not a feature
        - Stay Connected : Instancly conectw it hmulti-device bluetooth
            - Benefit is stay connected
            - features is bluetooth
4. Testimonials
    - at least 3
    - 72% of customers only take action after reading a positiev review
    - one that overcomes an objection
    - one that speaks to a benefit
    - one that speaks to teh results
    - include photo if possible
5. Features
    - 10 to 20
    - buying decision nis mad based on emotion first, then backed up by logic. This is the logic
6. FAQs
    - Answer common questions
    - handle common objections
    - a video for each one is great
7. Call to Action
    - Same CTA as in the Hero section
