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
    <img src="assets/logo.webp" alt="Logo" width="120" height="100">
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

Welcome to the repository where I've showcased my solution to the assigned technical challenge, demonstrating an analytical approach and strong development skills. My proposition revolves around the design and implementation of a specialized web scraping service, capable of receiving essential parameters and executing precise, automated data extraction. From defining extraction criteria to presenting results in a structured manner, this approach reflects my ability to tackle technical challenges rigorously and effectively. Join me in exploring this solution that seamlessly blends technology and creativity to successfully overcome intricate technical hurdles.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Puppeter](https://pptr.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [Husky](https://www.npmjs.com/package/husky)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

The environment necessary to run the service locally is detailed below.

### Prerequisites

- Npm (>=9.0.0)
- Yarn (>=1.22.0)
- Node (>=18.0.0)
- Puppeeter (>=10.0.0)
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/a-bianchi/ag-inc-assessment/
   ```
   
2. It is necessary to install chomium locally and this will depend on the operating system, use the following command:
   ```sh
   # Mac M1
   brew install chromium --no-quarantine
   ```
   for more information go to: https://www.chromium.org/getting-involved/download-chromium/

3. rename the .env.example file to .env and put the chromium path in the PUPPETEER_EXECUTABLE_PATH variable.
   ```sh
   PUPPETEER_EXECUTABLE_PATH=/Applications/Chromium.app/Contents/MacOS/Chromium
   ```

4. Import the <a href="https://github.com/a-bianchi/ag-inc-assessment/blob/develop/documents/ag-assessment-2">postman collection</a> located in the "apiDocumentation" folder to be able to test.

5. You can test if the service is running using the following command:
   ```sh
        curl -X POST \
        http://localhost:3000/execute \
        -H 'accept: */*' \
        -H 'Content-Type: application/json' \
        -d '{
          "credentials": {
              "email": "",
              "password": ""
          },
          "options": {
              "propertyType": 0,
              "transactionType": 0,
              "estateType": 0,
              "paymentType": 0
          }
        }'
   ```
  
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

```bash
# development
$ yarn start:dev:test
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
## Testing the Service Step by Step

Follow these steps to test the API endpoints. These steps will guide you through the process of making requests and using Postman.


1. Start the Service:
Run the following command in your terminal to start the service locally:
```bash
yarn start:dev:test
```
This command will initiate the service, making it ready to receive requests.

2. Send a POST Request:
Use the following CURL command to send a POST request to the service, including the provided credentials and optional parameters:
```bash
curl -X POST \
  http://localhost:3000/execute \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "credentials": {
        "email": "",
        "password": ""
    },
    "options": {
        "propertyType": 0,
        "transactionType": 0,
        "estateType": 0,
        "paymentType": 0
    }
}'
```
Adjust the credentials and options as needed. The numbers represent the position of each option.

3. Chromium Windows for Products:
Upon successful execution of the POST request, the service will initiate a Chromium window for each product to be uploaded. These products are located in the provided folder.

4. Chromium Path Configuration:
Note that for the service to work correctly, you need to provide the path to where Chromium is located in your local environment. Make sure to set up the appropriate path before running the service.

Note: Please keep in mind that this service is provided as an example. While the image and information files are located in the root folder for testing purposes, the primary idea is that this service can be consumed on-demand, sending all required data to complete the product upload form.


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
[product-screenshot]: assets/home.png
[challenge-document]: https://github.com/a-bianchi/ag-inc-assessment/blob/develop/document/ag-assessment-2.pdf
