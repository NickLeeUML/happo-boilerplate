# Documentation for Azure, Happo.io, Puppeteer UI testing 

## blobService.js

## happo.js
    This file provides functions for interacting with the Happo API.

    ### Functions:
        * getReportStatus
        * createReport
        * completeReport   (use with partials) 
        * uploadLogic
        * compare

    ### Left Todo: 
        1. How to do an Initial run when updating scrips?
        2. Addmore Error Handeling 
        3. What else todo when comparsion fails
        4. Add support for custom project name (must be consistant across api calls)
        5. How to take multiple screenshot



## puppeteer.js
    This file provides functions for running puppeteer, clicking on DOM elements and taking screenshots.

    ### Functions: 
        * catalogCourse
        * newsBlocksSlider
        * catalogCoursePromise
        * newsBlocksSliderPromise
        * promiseAll
        * returnsPromise
        * processScripts
    
    ### Left todo: 
        1. Add interactions with partials 
        2. Add support/test for many components
        3. Add dom interation ( potentially extract to other file ) 



## processing.js
    This file provides functions for use in puppeteer.js. It uses functions from happo.js and blobService.js that provide code for determing image uniqueness, image size and whether to upload/update blob storage endpoint.
    
    ### Functions: 
    * processScreenShot

## azure-pipelines.yml
    This file provides scripts used by Azure. 

    The steps used in built-in Happo command ( hapo-ci ) are replicated here by script steps. The point of  this allows for the integration for GitHub and Happo.io while adding the ability to upload specific screenshots.


## todo: 
    1.  In azure-pipelnes.yml the previous commit and current commit are being checked out, this should be done followed by building that commit and providing and endpoint to where it is built.

### Basic example of Sequentially resolving array of promises 
    From the functions returnsProise & processScripts
    https://repl.it/repls/RealRelievedSpellchecker


### Example commad  to test locally
     URL=https://997addd2.ngrok.io/Website.UI.Template.v6.happo-url SHA=1111 npm run ui-test;