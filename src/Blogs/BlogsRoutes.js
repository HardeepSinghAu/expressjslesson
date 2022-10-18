const express = require('express');

// Create a bundle of routes. We'll export this out and then import it into src/index.js.
const routes = express.Router();

// This is the "root" route for the Router instance. 
// Its actual name in the URL will depend on how it's configured in src/index.js
routes.get('/', (request, response) => {

    response.json({

    "message": `Received a request on ${request.originalUrl}`
    });
});

// Set up route params with the colon before the name.
routes.get('/:blogID', (request, response) => {

    response.json(`Received a GET request for a blog post with ID of ${request.params.blogID}`);

});

// Use Postman or another HTTP tool to visit a POST route.
routes.post('/:blogID', (request, response) => {
    console.log(request.body);

    response.json({

    message: `Received a POST request for a blog post with ID of ${request.params.blogID}`,
        bodyContent: request.body
    });
});

module.exports = routes;



// const express = require('express');
// const { getSpecificPost, getAllPosts, createSpecificPost, updateSpecificPost, deleteSpecificPost } = require('./BlogFunctions');

// // Create a bundle of routes. We'll export this out and then import it into src/index.js.
// const routes = express.Router();

// // This is the "root" route for the Router instance. 
// // Its actual name in the URL will depend on how it's configured in src/index.js
// routes.get('/', async (request, response) => {

//     let queryResult = await getAllPosts();
//     response.json(queryResult);
//     //response.json(`Received a request on ${request.originalUrl}`);
// });

// // Set up route params with the colon before the name.
// routes.get('/:postID', async (request, response) => {

//     let queryResult = await getSpecificPost(request.params.postID);
//     response.json(queryResult)
//     // response.json(`Received a GET request for a post with ID of ${request.params.postID}`);

// });

// routes.put('/:postID', async (request, response) => {

//     let updateResult = await updateSpecificPost({
//         postID: request.params.postID,
//         postTitle: request.body.postTitle,
//         postContent: request.body.postContent,
//         postAuthorID: request.body.postAuthorID
//     })

//     response.json(updateResult);
// });

// routes.delete('/:postID', async (request, response) => {
//     let deleteResult = deleteSpecificPost(request.params.postID);
//     response.json(deleteResult);

// });

// // Use Postman or another HTTP tool to visit a POST route.
// routes.post('/', async (request, response) => {
    
//     let creationResult = await createSpecificPost({
//         postTitle: request.body.postTitle,
//         postContent: request.body.postContent,
//         postAuthorID: request.body.postAuthorID
//     })

//     response.json(creationResult);
    
//     // Cleanly build a response OBJ
//     // let jsonResponse = {
//     //     message:`Received a POST request for a post with ID of ${request.params.postID}`,
//     //     receivedBody: request.body
//     // }

//     // response.json(jsonResponse);
// });


// module.exports = routes;