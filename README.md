
# Cyrano Server

Cyrano is a learning project by [hilarious potato](https://github.com/hilarious-potato) during our web development bootcamp at [Ironhack](https://www.ironhack.com/). 

Cyrano Server is the Backend for the Cyrano App, which provides users a simple way to share encrypted messages. The process of encryption and decryption happens entirely in the frontend. That has brought up a few challenges for us. Maybe, we haven’t solved them entirely on CIA level, but it works 💪!
## Tech Stack

 Node, Express, Mongoose


## Demo

[Cyrano App](https://cyrano.netlify.app)

[This backend](https://cyrano-api.adaptable.app/api)


## Run Locally

Clone the project

```bash
  git clone https://github.com/hilarious-potato/cyrano-server
```

Go to the project directory

```bash
  cd cyrano-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ORIGIN=domain-of-your-frontend.com` 

`SECRET=a-random-secret-for-jwt-token`

You can generate a secret in `node` by running `require('crypto').randomBytes(64).toString('hex')`



## Feedback

If you have any feedback, please [create an issue](https://github.com/hilarious-potato/cyrano-server/issues/new/)
## Authors

Hilarious Potato are:

- [@PDXIII](https://www.github.com/PDXIII)
- [@denefi](https://www.github.com/denefi)

## License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)


