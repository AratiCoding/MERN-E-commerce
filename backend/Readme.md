# GUIDE AND COMMAND FOR BACKEND

```javascript
// create package.json file
npm init -y

// required dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

npm install nodemon --save-dev

// for image upload
npm install multer
```

- add above script in package.json
```javascript
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

```


## commands and steps to push teh code to git repo
```javascript
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/AratiCoding/MERN-E-commerce.git
git push -u origin main
```