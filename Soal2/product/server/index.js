const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = require("./db_config");

const PORT = process.env.PORT || 3001;

app.post("/api/products", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    if (name === "" || description === "" || price === "") {
        res.status(400).send({
            message: "All fields must be filled"
        });
        return;
    }

    if (price === '0') {
        res.status(400).send({
            message: "Price must be greater than zero"
        });
        return;
    }

    const sql = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
    db.run(sql, [name, description, price], (err) => {
        if (err) {
            if (err.message.includes("UNIQUE") && err.message.includes("name")) {
                res.status(400).send({
                    message: "Product name must be unique"
                });
                return;
            }
            res.status(500).send({
                message: "error adding the product"
            });
            return;
        };

        res.send({
            name: name,
            description: description,
            price: price
        });
    });

});

app.get("/api/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.all(sql, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "error getting products"
            });
            return;
        };

        res.send(result);
    });
});

app.put("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.newName;
    const newDescription = req.body.newDescription;
    const newPrice = req.body.newPrice;

    if (newName === "" || newDescription === "" || newPrice === "") {
        res.status(400).send({
            message: "All fields must be filled"
        });
        return;
    }

    const sql = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    db.run(sql, [newName, newDescription, newPrice, id], function (err) {
        if (err) {
            if (err.message.includes("SQLITE_CONSTRAINT") && err.message.includes("UNIQUE") && err.message.includes("name")) {
                res.status(400).send({
                    message: "Product name must be unique"
                });
                return;
            }
            if (err.message.includes("SQLITE_RANGE") && err.message.includes("index")) {
                res.status(404).send({
                    message: "Product not found"
                });
                return;
            }
            res.status(500).send({
                message: "Cannot update the product"
            });
            return;
        };
        res.send({
            name: newName,
            description: newDescription,
            price: newPrice
        });
    });
});

app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM products WHERE id = ?";
    db.run(sql, [id], (err) => {
        if (err) {
            if (err.message.includes("SQLITE_RANGE") && err.message.includes("index")) {
                res.status(404).send({
                    message: "Product is not found"
                });
                return;
            }
            res.send(500).send({
                message: "Cannot delete the product"
            });
            return;
        };

        res.send({
            message: "Product deleted"
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});