const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const images = require("./routes/images");
const uploads = require("./routes/uploads");
// const menusections = require("./routes/menusections");
// const menuitems = require("./routes/menuitems");
// const cart = require("./routes/cart");
// const orders = require("./routes/orders");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/images", images);
app.use("/uploads", uploads);
// app.use("/grubhub/menu", menusections);
// app.use("/grubhub/menu", menuitems);
// app.use("/grubhub/cart", cart);
// app.use("/grubhub/orders", orders);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
