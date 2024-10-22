// We require the express framework
const express = require("express")

// require the filesystem module
const fs = require("fs");

// We have 3 seperate apps (app1, app2, and app3) on different ports
const app1 = express()
const app2 = express()
const app3 = express()
const PORT1 = 3000;
const PORT2 = 3001;
const PORT3 = 3002;

//=======================================
// Part 1: Routes, Templates, and Views
//=======================================
const querystring = require('querystring');

const express1 = require("express")
app1.engine("engine1", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Here, we take the content of the template file,
        // convert it to a string, and replace sections of
        // it with the values being passed to the engine.
        const rendered = content
            .toString()
            .replaceAll("#speaker#", `${options.speaker}`)
            .replace("#quote#", `${options.quote}`);
        return callback(null, rendered);
    });
});

// Add morgan middleware to log requets to console
const morgan1 = require('morgan');
app1.use(morgan1('dev'));

// Add app middleware to parse the request body
// app1.use(express.json());
// app1.use(express.urlencoded({ extended: true }));

app1.set("views", "./views/");
app1.set("view engine", "engine1");
app1.use('/styles', express1.static('styles')); // serve static files from the 'styles' directory

// We support two views:
//
// 127.0.0.1:3000/jobs
// 127.0.0.1:3000/mandela

app1.get("", (req, res) => {
    res.redirect("/mandela");
})

app1.get("/", (req, res) => {
    res.redirect("/mandela");
})

app1.get("/mandela", (req, res) => {
    const options = {
        speaker: "Nelson Mandela",
        quote:
            `"The greatest glory in living lies not in never falling, but in rising every time we fall."`,
    };
    res.render("mandela", options);
});

app1.get("/jobs", (req, res) => {
    const options = {
        speaker: "Steve Jobs",
        quote: `"It doesn't matter how many times you fail. What matters is how many times you get back up."`
    };
    res.render("jobs", options);
});

app1.post("/submit", (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        const quote = parsedBody.quote;

        // Send it to the console
        console.log(`SERVER 1 (port ${PORT1}) - POST /submit: ${quote}`);

        // Send a response
        res.status(200).send({ message: "Quote submitted server 1" });
    });
});

// Start listening
app1.listen(PORT1, () => {
    console.log(`ALAB318.2.1 SERVER PART 1 is running on port: ${PORT1}. You better go catch it!`);
    console.log(`(No image or download button)`);
})

//=======================================
// Part 2: Middleware
//=======================================
const express2 = require("express")
app2.engine("engine2", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Here, we take the content of the template file,
        // convert it to a string, and replace sections of
        // it with the values being passed to the engine.
        const rendered = content
            .toString()
            .replaceAll("#speaker#", `${options.speaker}`)
            .replace("#quote#", `${options.quote}`);
        return callback(null, rendered);
    });
});

// Add morgan middleware to log requets to console
const morgan2 = require('morgan');
app2.use(morgan2('dev'));

// Add app middleware to parse the request body
app2.use(express2.json());
app2.use(express2.urlencoded({ extended: true }));

app2.set("views", "./views/");
app2.set("view engine", "engine2");
app2.use('/styles', express2.static('styles')); // serve static files from the 'styles' directory

// We support two views:
//
// 127.0.0.1:3001/jobs
// 127.0.0.1:3001/mandela
//

app2.get("", (req, res) => {
    res.redirect("/mandela");
})

app2.get("/", (req, res) => {
    res.redirect("/mandela");
})

app2.get("/mandela", (req, res) => {
    const options = {
        speaker: "Nelson Mandela",
        quote:
            `"The greatest glory in living lies not in never falling, but in rising every time we fall."`,
    };
    res.render("mandela", options);
});

app2.get("/jobs", (req, res) => {
    const options = {
        speaker: "Steve Jobs",
        quote: `"It doesn't matter how many times you fail. What matters is how many times you get back up."`
    };
    res.render("jobs", options);
});

app2.post("/submit", (req, res) => {

    console.log(`SERVER 2 (port ${PORT2}) - POST /submit: ${req.body.quote}`);
    console.log(req.body);

    // Get the quote property from the middleware
    const quote = req.body.quote;
    console.log(quote);
    // res.status(200).send({ message: "Quote submitted on server 2" });
});

// Start listening
app2.listen(PORT2, () => {
    console.log(`ALAB318.2.1 SERVER PART 2 is running on port: ${PORT2}. You better go catch it!`);
    console.log(`(Middleware installed)`);
})

//=======================================
// Part 3: Download button
//=======================================

const express3 = require("express")
app3.engine("engine3", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Here, we take the content of the template file,
        // convert it to a string, and replace sections of
        // it with the values being passed to the engine.
        const rendered = content
            .toString()
            .replaceAll("#speaker#", `${options.speaker}`)
            .replace("#quote#", `${options.quote}`)
            .replace("#id#", `${options.id}`);
        return callback(null, rendered);
    });
});

// Add morgan middleware to log requets to console
const morgan3 = require('morgan');
app3.use(morgan3('dev'));

// Add app middleware to parse the request body
app3.use(express3.json());
app3.use(express3.urlencoded({ extended: true }));

app3.set("views", "./views/");
app3.set("view engine", "engine3");
app3.use('/styles', express3.static('styles')); // serve static files from the 'styles' directory
app3.use('/public', express3.static('public')); // serve static files from the 'styles' directory


// We support two views:
//
// 127.0.0.1:3001/jobs
// 127.0.0.1:3001/mandela
//

app3.get("", (req, res) => {
    res.redirect("/mandela");
})


app3.get("/", (req, res) => {
    res.redirect("/mandela");
})

app3.get("/mandela", (req, res) => {
    const options = {
        speaker: "Nelson Mandela",
        quote:
            `"The greatest glory in living lies not in never falling, but in rising every time we fall."`,
        id: "mandela"
    };
    console.log(`SERVER 3 (port ${PORT3}) - GET /mandela:`);
    res.render("mandela", options);
});

app3.get("/jobs", (req, res) => {
    const options = {
        speaker: "Steve Jobs",
        quote: `"It doesn't matter how many times you fail. What matters is how many times you get back up."`,
        id: "jobs"
    };
    res.render("jobs", options);
});

app3.post("/submit", (req, res) => {

    console.log(`SERVER 3 (port ${PORT3}) - POST /submit: ${req.body.quote}`);
    console.log(req.body);

    // Get the quote property from the middleware
    const quote = req.body.quote;
    console.log(quote);
    // res.status(200).send({ message: "Quote submitted on server 3" });
});

app3.get("/download", (req, res) => {

    console.log(`SERVER 3 (port ${PORT3}) - GET /download: ${req.query.id}`);

    // Get the full request string
    // console.log(`The full request string from app3.get is: ${req.query.id}`);

    // Get the id property from the url
    const id = req.url.split("id=").pop();
    // console.log(id);

    // Get the server's current working directory
    // console.log(`The server's current working directory is: ${process.cwd()}`);

    let filename;

    if (id === "mandela") {
        filename = `nelsonmandela.webp`;
    } else if (id === "jobs") {
        filename = `stevejobs.webp`;
    } else {
        // Otherwise file not found
    return;
    }

    const path = `${__dirname}\\public\\${filename}`;

    // res.set("Content-Type", "image/webp");
    // res.set("Content-Disposition", "attachment; filename=nelsonmandela.webp");
    // res.set("Cache-Control", "no-cache");

    // res.set("Content-Type", "image/webp");
    // res.download('./nelsonmandela.webp');

    // console.log(`downloading file with id: ${id}`);
    // console.log(`The file to download is: ${filename}`);
    // console.log(`The full pathname is: ${path}`);

    // Check that the file exists on the server
    const fs = require('fs');
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            // console.error(`File ${path} does not exist!`);
            res.status(404).send(`File ${path} does not exist!`);
        } else {
            // console.log(`File ${path} exists!`);
        }
    });

    // And download it!
    res.download(path, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error downloading file');
        }
    });
});

// Start listening
app3.listen(PORT3, () => {
    console.log(`ALAB318.2.1 SERVER PART 3 is running on port: ${PORT3}. You better go catch it!`);
    console.log(`(Image with download button)`);
})

