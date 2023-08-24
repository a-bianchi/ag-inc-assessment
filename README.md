<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/a-bianchi/ag-inc-assessment">
    <img src="images/logo.webp" alt="Logo" width="120" height="100">
  </a>

<h3 align="center">Challenge</h3>

  <p align="center">
    Service scrapping.
    <br />
    <a href="https://github.com/a-bianchi/ag-inc-assessment"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]()

This project is an API designed to streamline inventory management for users. It empowers users to oversee their businesses, categorize products, and monitor stock changes. The API's core functionality includes updating product stock, which triggers stock history recording along with timestamps for each update. This documentation offers a concise guide on interacting with the API.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Nest.js](https://docs.nestjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [MySql](https://www.mysql.com/)
* [Typeorm](https://typeorm.io/)
* [Docker](https://www.docker.com/)
* [Swagger](https://swagger.io/)
* [Jest](https://jestjs.io/)
* [JWT](https://jwt.io/)
* [Husky](https://www.npmjs.com/package/husky)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The environment necessary to run the service locally is detailed below.

### Prerequisites

- Npm (>=9.0.0)
- Yarn (>=1.22.0)
- Node (>=18.0.0)
- Docker (>=4.21.1)
- Docker-compose (>=2.0.0)
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/a-bianchi/ag-inc-assessment/
   ```
   
2. To run the MySQL database and API service in the same container, use the following command:
   ```sh
   make start
   ```

3. Wait a few seconds for the containers to run and the migrations to be executed.

4. Import the <a href="https://github.com/a-bianchi/ag-inc-assessment/blob/develop/documents/ag-assessment-2">postman collection</a> located in the "apiDocumentation" folder to be able to test.

5. Open your browser and go to http://localhost:3000/documentation to see the API documentation.

6. You can test if the service is running using the following command:
   ```sh
   curl -X 'GET' \
   'http://localhost:3000/ping' \
   -H 'accept: */*'
   ```
  
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- TEST EXAMPLES -->
## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

<!-- TEST API EXAMPLES -->
## Testing the API

Follow these steps to test the API endpoints. These steps will guide you through the process of making requests and using Postman to automatically handle the authentication tokens.


1. Sign In to Obtain Authentication Token
   * Start by making a POST request to the endpoint: POST /v1/auth/local/signin.
   * Set the request body to the following JSON:
    ```json
    {
      "email": "test-admin@test.com",
      "password": "123456"
    }
    ```
    * This request is used to sign in and obtain an authentication token.
    * Once you send the request, Postman will automatically manage the received token and update the environment variables.

2. Using Authenticated Tokens for Other Endpoints
    * With the authentication token obtained from the previous step, you now have authorization to access other endpoints that require authentication.
    * Postman will handle the token management for you, using the updated environment variables.

Remember that these steps assume you have set up Postman to work with environment variables and that Postman automatically manages the token for you. This approach simplifies the testing process by taking care of the authentication details behind the scenes.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Alejo Bianchi - alejobianchi@gmail.com

Project Link: [https://github.com/a-bianchi/ag-inc-assessment](https://github.com/a-bianchi/ag-inc-assessment)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/a-bianchi/ag-inc-assessment/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alejobianchi
[product-screenshot]: images/models.svg
[challenge-document]: https://github.com/a-bianchi/ag-inc-assessment/blob/develop/document/ag-assessment-2.pdf
