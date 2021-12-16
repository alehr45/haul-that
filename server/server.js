const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const cors = require("cors");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// Stripe
const stripe = require("stripe")(
  "sk_test_51J5FyiBb3XyTBbshdI9GIRcPh3hm5QsfFlJQ6KvhC9qA06tDerZSu6MffyfI6MdC1HTsbmqop8RWCatHizZB4Zbv00ylMKUOvm"
);
const PORT = process.env.PORT || 3001;
const app = express();
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

<<<<<<< HEAD
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

=======
>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700
// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
=======
// Creates session for user payment
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  console.log("here");
  // console.log(req)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/profile",
  });

  res.json({ url: session.url });
});

>>>>>>> 116e57a45a372bd484d856432ad975c3653c3700
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
