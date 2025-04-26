import express from "express"

const server = express();


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});
