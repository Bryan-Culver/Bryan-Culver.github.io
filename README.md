# HallThrusterVis
This is a Web App to demonstrate the Hall Effect Thruster to the general public

Developers: 
Bryan Culver,
Cameron Troy,
Julio Jovel,
Ira Sigman,
Kyle Johnson

App initiated from https://github.com/facebook/create-react-app please visit their GitHub for more information or for creating your own React App. 

####For developers: 

After cloning the project, open a new project in your IDE by selecting the folder hall-eff-thr-vis. 

ensure that npm is installed and updated. 

Create branches from the dev branch, and make pull requests to the GitMaster. 

All developers will review pull requests from dev into master at the end of each sprint.

## For Stakeholders
As of Feburary 19, 2020 the fully interactive Hall Thruster Visualization WebApp is available through your internet browser. Follow the link below either by copying it into your browser URL or double clicking on the link:
  ## https://hall-thruster-vis.herokuapp.com/


## Available Scripts

While on the dev branch, In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` (not yet implemented)

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 'npm run heroku-postbuild'

Builds the app to the currently hosting website. The app is deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. 
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. 
All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. 
At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. 
However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Adding or changing 3D objects: <br />This information will help you change the images you want to view. <br />
the JSON file 'ComponentFilenames.json' has the names of all the OBJ files listed. <br />
The class 'Model.js' loads that file name (line 58) based on the super class that called it (line49), which is HomePageGrid.js.<br />
The class 'HomePageGrid.js' displays two Model type components (lines 57 and 71) and pass a variable from 'App.js' (lines 20 and 17).<br />
The constructor in 'App.js' initially uses the "Thruster" state and passes it to 'HomePageGrid.js' as it is called. (lines 29 and 9).<br/>
Consider that when adding a new 3d component object you should also add information for that object in the "ComponentInfoFile.json" file
so that the data can be displayed along with the component.

# Adding or modifying data in the Facts section
All information from the Facts section is held in the Facts.json file.  Each section is separated and has multiple facts attached to it.
The first part of each section has the file location of the image that is shown when that tab is clicked.  When adding information for the image, 
it references images that are in the assets/images folder.  Along with that it has credit information for that image.  The next pieces are numerically 
indexed and have the information attached to this.  The webapp structure takes the information directly from here and creates a carousel component 
for each fact piece.  To add more individual facts they just need to be added to the rest following the same structure but adding to the index number. 
The file is pulled into "FactCards.js" and read.  "FactCards.js" uses a hashmap to pull the information and then iterates through the hashmap to create
 the carousel cards that are displayed.
 
# Adding or modifying data in the Component Info Section
Each component when selected in the canvas has its own set of data that is displayed in the carousel below it.  That information is held in the 
ComponentInfoFile.json and is separated by each section.  Each fact is indexed under that component section and can be modified there.  If more facts
need to be added then they can be added under each section following the same format that is already there.  Each one of these is read into the webapp in 
"HomePageGrid.js" (lines 53-63 & 104-10) and is sent to "DataCars.js" to be made into a carousel card to be shown.  Consider that if you add a 3d component
 object to the canvas then you should follow the current structure in this file to add information for that new component object.    