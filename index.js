const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-jj.8jr5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productCollection = client.db("emaJohn").collection("product");
    //product update ,delete korle id diye korbo - add korte id er dorkar nai

    //(read) loading the products from db
    app.get("/product", async (req, res) => {
      console.log("query (from the api link", req.query);
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    //count - pagination
    app.get("/productcount", async (req, res) => {
      const query = {};
      //cursor for loading multiple elements
      const cursor = productCollection.find(query);
      const count = await cursor.count();
      res.send({ count });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world from Ema john");
});

app.listen(port, () => {
  console.log("Ema john server is Running on port - ", port);
});
