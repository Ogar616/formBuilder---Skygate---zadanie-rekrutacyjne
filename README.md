## Responsive ReactJS App with persistent state build with indexeddb (DexieJS)

### Instalation 

You can see this application on:
http://kamilsobczyk.slask.pl/

or..

In your console:
1. Go to the folder where you want to store your project, and clone the new repository:
    git clone https://github.com/Ogar616/formBuilder-Skygate-zadanie-rekrutacyjne.git
2. To get inside project folder type:
    cd formBuilder-Skygate-zadanie-rekrutacyjne
3. To run application type:
    npm start
4. Application will open in a new tab of your favourite browser
5. Done!

## Project requirements:

Skygate - JS Coding Challenge

Summary
We’re excited to see your skills!  In order to get a better idea of your programming abilities, we’d like you to complete the following sample project.

Project Overview
One of the biggest problems today in the finance industry is collecting the data from users - the data that is then often stored in an inconsistent manner. Between 1000s of fillable PDFs, archaic online forms, and old databases, there’s a real big need for standardization. 

In order to better gather data from clients, we’ve built a complex form builder to handle these structures. For this project, you’ll be building a simple front-end version of our form builder that will generate a form for users to fill out.

Detailed Spec
https://drive.google.com/file/d/1arZJzvpY-8HhZsApw9BmcOwokRV2KD9g/view?usp=sharing
You’ll see in the above wireframe that there are 3 types of form inputs. Each of these can also have sub-inputs which will only show when the parent input is answered a certain way. 

The types of conditions are as follows
● Text
○ Equals - Text entered is equal to this value
● Number
○ Equals - Number entered is equal to this value
○ Greater than - Number entered is greater than this value
○ Less than - Number entered is less than this value
● Yes / No (radio)
○ Equals - Radio selected is equal to this value (either yes or no)

The user should be able to keep creating sub-inputs with conditions to as many levels deep as they would like. Each sub-input’s condition will correspond to the value of the parent input. By default, the create tab should start out blank with just the Add Input button there for the user to create their first input. This should be stored in the IndexedDB for persistence and loaded at page load.


Technical Requirements
The project should store a persistent state for the form objects in the IndexedDB as we aren’t using a backend or any external APIs. The entire app will live on the front-end without a backend.

The final deliverable should be a github repo that should contain everything
needed to easily run the project locally with a few commands (yarn install, yarn start) and view the result at localhost.

You may use webpack, browserify, or any similar library for easily running your project. Feel free to use a boilerplate setup as well so you can get to the actual development as soon as possible. You may use either Angular or React with either JSX, Typescript, or ES.Next.

Evaluation
The purpose of this project is to evaluate your skills on the following:
● Ability to work off of a wireframe and create user friendly UX
● Designing data structures for use in multiple modes:
○ Generating API friendly JSON from an object model
○ Rendering an interface based on an object model
○ Editing and deleting objects within a structure
● Understanding in how to navigate a recursive data structure
● Knowledge of front-end tooling

Upon delivery of this coding challenge, we’ll schedule a 15-25 minute call to walk through what you’ve built



