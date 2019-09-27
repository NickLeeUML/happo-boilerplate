
## blobService.js
This file has functions to upload load image data to Azure.  The function `listSegment` is used to check if a screenshot alreads exsits. Because the blob names are based on md5 hash it just checks against the name. If a screenshot already exists, regardless of what happo report it belongs to, a duplicate will not be uploaded. No duplicate images exist. Happo prefers it what way.    

## happo.js
This file provides functions for interacting with the Happo API.


## puppeteer.js
[Puppeteer](https://github.com/GoogleChrome/puppeteer)
    This file provides functions for running puppeteer, clicking on DOM elements and taking screenshots.
    
Todo: 
    1. When clicking on buttons on a component there can be a delay in the final form.  A setTimeout is being used to wait for the DOM to reach it's final state.

When using CrossBrowserTesting as the browser for testing only 1 or 2 simultaneous connections were allowed at the same time. In order  to deal with this I wrote two functions `returnsPromise` and `processScripts` to sequentially resolve an array of JavaScript Promises. It's not need for this project but may be useful.  Basic example here. 
    From the functions returnsProise & processScripts
    https://repl.it/repls/RealRelievedSpellchecker


## processing.js
This file provides a function for use in puppeteer.js. It uses functions from happo.js and blobService.js that provide code for determining image uniqueness, image size and whether to upload/update blob storage endpoint. It returns an object representing the a Happo [Snapshot](https://happo.io/docs/api#Snapshot). 
    

## azure-pipelines.yml

This file provides steps used by Azure ci/cd to immitate the steps take in Happo's `happo-ci` script. When a pull request is made from the watched project this file runs.
    
This is the key in order to use the Happo API with Happo's built in GitHub pull request intergration. [Link to steps](https://github.com/happo/happo.io#integrating-with-your-continuous-integration-ci-environment) Notice the script steps reflect the steps in Happo's documentation. Step 4 is omitted from the yml; it's runs automatically.       

 
The script step named "setting git variables" initially checks out the current working branch name in order to correctly get set the sha values. This currently needs to be updated each time. 

To simulate two different projects I ran puppeteer against two different urls with different styling (seen in the URL variable). 

Make sure to set the change url when making a compare to the PR on GitHub. 


### Example command  to test locally
URL=https://997addd2.ngrok.io/Website.UI.Template.v6.happo-url SHA=1111 npm run ui-test;


### Important Setup 
 
#### Azure Blob

Azure StorageV2 is used as blob storage for the screenshots from Puppeteer. The storage account is used by the project to upload images as well as the Happo.io platform to access images for the dashboard.  

Make sure to set the CORS settings in the stoage account to allow access by happo.io . The settings I used: 
    **Allowed Origins** : https://happo.io
    **Allowed Methods** : GET
    **Allowed Headers** : * 
    **Exposed Headers** : * 
    **Max Age**: 600

[CORS support for Azure Storage](https://docs.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) 

Happo relies on URLs being unique for the bitmap (pixels of the screenshot). The same pixels should produce the same image with the same URL. [Happo URL creation](https://happo.io/docs/url-creation). To achieve this the project uses the [md5](https://www.npmjs.com/package/md5) package to deterministically generate urls based on image data.

#### Github 

The Happo GitHub App must be installed https://github.com/apps/happo. 
After installation, visit Happo settings and go to the Github integration tab. Activate the repository you want to use.  

Good Luck!