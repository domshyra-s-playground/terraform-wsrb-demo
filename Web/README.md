# Setup

## Certificates

#### Windows instructions for creating certificates.
1. install chocolatey `https://chocolatey.org/install`
2. then, the actual certificate library, 'choco install mkcert' `do this from admin`

#### Mac and Linux Pre-requisites
1. Install brew if you don't have it. `https://brew.sh/`
2. Install mkcert use `brew install mkcert`

#### To get certificates, you have the following commands.
3. run `mkcert -install` to install the root certificate
4. now run the following to create the actual certificates.


```bash
# Web/
//create a certificate folder
mkdir -p .cert
//create the actual certificates in the folder 
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

### Running 

After the certs are created, you can run the project using the following command.

```bash
# Web/
npm install
```
once the packages are installed, you are ready to run the project.

```bash
# Web/
npm start
```

this runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.


## How to update this project's node modules
Using npx:


might need to install `npm-check-updates` globally first, use `npm i -g npm-check-updates`


```bash
# Web/
npx npm-check-updates -u
npm i
```

