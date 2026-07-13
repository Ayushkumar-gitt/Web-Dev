import app from "./src/app.js";

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.get('/health', (request, response) => {
    response.status(200).json({
        status: "ok"
    })
})