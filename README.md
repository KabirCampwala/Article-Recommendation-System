# Article-Recommendation-System

Steps to run the project:

 - Download the repo in your directory
 - Open the terminal and navigate to the project directory
 - Run the command `npm install`
 - Run the command `pip install scikit-learn`
 - Once all dependencies are installed, run `nodemon server.js`
 - Enter a query on the webpage and hit enter to see the results

Changes to make in the project:

- Changes for article_recommender.py:
    - Update the code to fetch the following info from the JSON file:
        - [x] Author name
        - [] Article text snippet (max 100 words)
    - Add the following routes to server.js:
        - [] `Discover` route will contain the form to get recommendations
        - []  `About` route that will show information regarding the entire project  <i>done N</i>
        - [] `Sign-Up` route will contain a sign-up form <i>done N</i>
        - [] `Login` route will contain a login form  <i>done N</i>
        - [] `Articles` route will contain all the articles on a single page
        - [] `Home` route shall be our landing page
    - Add the following to views directory:
        - [] `discover.ejs` will be connected to `/discover`
        - [] `about.ejs` will be connected to `/about` <i>done N</i>
        - [] `sign-up.ejs` will be connected to `/signup` <i>done N</i>
        - [] `login.ejs` will be connected to `/login`  <i>done N</i>
        - [] `articles.ejs` will be connected to `/articles`
        - [] `home.ejs` will be connected to `/home` <i>done?</i>
