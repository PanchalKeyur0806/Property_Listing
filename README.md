
# Property Listing

This project is a React-based Property Listing App designed to demonstrate frontend development, API integration, and state management skills. It allows users to view, filter, add, and explore property listings with a clean and responsive UI.


## Features

- Fetch properties using a GET API.
- Add new properties using a POST API.
- Responsive design for all screen sizes.
- Search listings by name or location.
- Filter listings by property type.
- View complete details of a property in a modal popup.
- Auto-refresh list after adding a new property.


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database & ORM:** MongoDB, mongoose


## API Reference

#### Get all items

```http
  GET /api/property
```

| Query Parameter |  Description  |
| :-------- | ------------- |
| `name`    |    search by name of the property |
| `type`    | search By Type of the property Ex:- residential, commercial, land and Indrustial|
|`location` | search property by location|

#### POST item

```http
  POST /api/property/
```

## Run Locally

Clone the project

```bash
  git clone git@github.com:PanchalKeyur0806/Property_Listing.git
```

Go to the project directory

```bash
  cd project_name
```
Go to Server Dir
```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Go to Client Dir
```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Feedback

If you have any feedback, please reach out to us at panchalkeyur694@gmail.com or call directly at +91 9106450963

