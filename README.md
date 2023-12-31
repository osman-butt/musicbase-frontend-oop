# musicbase-frontend-oop

MusicBase is a web application that allows users to search for artists, albums, and songs. It also provides full CRUD functionality and a user-friendly interface to explore and discover music.


![UI](https://github.com/osman-butt/musicbase-frontend-oop/blob/main/assets/images/ui.PNG)


## Features

- Search for artists, albums, and songs
- View detailed information about artists, albums, and songs
- Create, read, update and delete albums, artists and songs
- User-friendly interface for easy navigation

## Deployed app

* See a live version of the frontend [https://osman-butt.github.io/musicbase-frontend-oop/](https://osman-butt.github.io/musicbase-frontend-oop/) (note that the backend is hosted on Azure - when it is not used for a while, it goes into sleep mode. Update the page a few times, for the server to start up!)
* Link to deployed backend [https://musicbase-app.azurewebsites.net/api/v2](https://musicbase-app.azurewebsites.net/api/v2)
* The backend of this project is managed in a separate repository: [https://github.com/osman-butt/musicbase-backend](https://github.com/osman-butt/musicbase-backend).

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
* Live Server extension for VS Code

### Fork and Clone
* Fork the repository by clicking the "Fork" button in the top right corner of the GitHub page.

OR

* Clone the repository to your local machine using the following command in your terminal:
```bash
git clone https://github.com/osman-butt/musicbase-frontend-oop.git
```

## Running the App
Start the app using Live Server in Visual Studio Code:
1. Open the project in Visual Studio Code.
2. Right-click on index.html in the file explorer.
3. Select "Open with Live Server".

The app should now be running in your default web browser.

## Local development
* First install the backend from [here](https://github.com/osman-butt/musicbase-backend).
* Follow the Local installation guide from [here](https://github.com/osman-butt/musicbase-backend/blob/main/README.md)
* Change the ```endpoint``` variable in the frontend project ```musicbase-frontend-oop/js/utility/restApi.js```.
* The frontend now uses the local MySQL database.
