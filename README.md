#SocialMediaApp

*This project is adapted from Scott Rich's 'Sentiment Analysis App' found here: https://www.ibm.com/developerworks/library/wa-nodejs-app/*

##"Simple Sentiment Analysis application"

Sample application demonstrating how to build a sentiment analysis app usind Node.js and a couple modules.
The application takes a keyword or hashtag, connects to Twitter to get a stream of matching tweets, and runs those tweets through a sentiment-analysis module to produce a sentiment score.

You can play with an instance of the application running at http://simplesentimentanalysis.ng.bluemix.net/

You can explore the code by clicking into the SimpleSentimentAnalysis folder.

##Running the application on your desktop
Download the source of the application by selecting the SimpleSentimentAnalysis folder and selecting "Export as zip" from the Actions menu(Actions) in the navigator.

Unzip the application in a working directory.

Use npm to get the required modules:

<code>npm install</code>
Run the application with node:

<code>node app.js</code>
You should see a confirmation that the application is running on port 3000, and you can access it with your browser at http://localhost:3000.

##Running the application using a Cloud Foundry PaaS runtime
If you have access to a Cloud Foundry-based runtime, like the Pivotal Cloud Foundry offering or IBM's BlueMix, you can also run the application in those environments.

##Licensed under the EPL (see [license.txt](https://hub.jazz.net/project/srich/Sentiment%20Analysis%20App/overview#https://hub.jazz.net/project/srich/Sentiment%2520Analysis%2520App/_rZP_QIf9EeOEAdgB1rj08Q/_rZXUAIf9EeOEAdgB1rj08Q/f/license.txt))