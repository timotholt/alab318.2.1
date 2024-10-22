const express = require("express")
const app = express()
const PORT = 3000;
// const fs = require("fs")




/////////////////////////////
// Section 3 - Sending Content
// serve static files from the styles directory
app.use(express.static("./styles"));


// require the filesystem module
const fs = require("fs");
// define the template engine
app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views/"); // specify the views directory
app.set("view engine", "perscholas"); // register the template engine

app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };

  res.render("index", options);
});





/////////////////////////////






// this will only run for a GET request at localhost:3000/
// express looks at two things, the method and the url
app.get("/", (req, res) => {
  res.send(`A ${req.method} request was made at ${req.url}`)
})

app.get("/express", (req, res) => {
  res.send("<h1>Creating routes with Express is simple!</h1>")
})


app.get("/user", (req, res) => {
  res.send("Recieved a GET request for user")
})

app.post("/user", (req, res) => {
  res
    .status(201)
    .send({
      message: "User has been created",
      body: {
        username: "johndoe123",
        email: "test@test.com"
      }
    })
})



// Route Path Flexibility

// ? - optional
//matches:
//abcd or acd
app.get("/ab?cd", (req,res) => {
  res.send("ab?cd")
})
//matches:
//color or colour
app.get("/colou?r", (req,res) => {
  res.send("colou?r")
})

// + 
// matches:
// efgh
// effffffffffffgh
app.get('/ef+gh', (req, res) => {
  res.send("ef+gh")
})

// *
// matches
// ijkl
// ijANYTHING-CAN-GO-HEREkl
app.get('/ij*kl', (req, res) => {
  res.send("ij*kl")
})


// ()
// matches:
// /lmnop
// /lmp
app.get("/lm(no)?p", (req, res) => {
  res.send("/lm(no)?p")
})


// regex
// app.get(/a/, (req, res) => {
//   res.send("theres a 'a' in the path")
// })

app.get(/.*fly$/, (req, res) => {
  res.send("fly at the end of word")
});


app.get("/greeting/:name", (req, res) => {
  res.send(`this is the param: ${req.params.name}`)
})

app.get("/flights/:from-:to", (req, res) => {
  res.send(`Flight coming from ${req.params.from} and going to ${req.params.to}`)
})

app.route('/learner')
  .get((req, res) => {
    res.send('Get a random learner')
  })
  .post((req, res) => {
    res.send('Add a learner')
  })
  .put((req, res) => {
    res.send("Update the learner's info")
  })

app.get('go-somewhere', (req, res) => {
    res.redirect('https://medium.com')
})




app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}. You better go catch it!`)
})