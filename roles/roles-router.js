const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/roles.db3"
  },
  debug: true
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  roleID = req.params.id;
  db("roles")
    .first()
    .where({ id: roleID })
    .then(role => {
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  db("roles")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("roles")
        .first()
        .where({ id })
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  db("roles")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
