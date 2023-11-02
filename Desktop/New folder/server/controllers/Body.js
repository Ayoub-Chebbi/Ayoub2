const Body = require("../models/body");

module.exports.createBody = (req, res) => {
    // Create a new Body instance from the request body
    const newBody = new Body(req.body);

    newBody.save()
        .then(savedBody => {
            console.log(savedBody);
            res.json({ body: savedBody });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to create Body" });
        });
};

module.exports.getAllBodies = (req, res) => {
    Body.find()
        .then(bodies => {
            console.log(bodies);
            res.json(bodies);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to fetch Bodies" });
        });
};

module.exports.getBody = (req, res) => {
    const bodyId = req.params.id;

    Body.findById(bodyId)
        .then(body => {
            if (!body) {
                return res.status(404).json({ message: "Body not found" });
            }
            res.json(body);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to fetch Body" });
        });
};

module.exports.updateBody = (req, res) => {
    const bodyId = req.params.id;

    // Update the Body instance with the request body
    Body.findByIdAndUpdate(bodyId, req.body, { new: true })
        .then(updatedBody => {
            if (!updatedBody) {
                return res.status(404).json({ message: "Body not found" });
            }
            res.json(updatedBody);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to update Body" });
        });
};

module.exports.deleteBody = (req, res) => {
    const bodyId = req.params.id;

    Body.findByIdAndDelete(bodyId)
        .then(deletedBody => {
            if (!deletedBody) {
                return res.status(404).json({ message: "Body not found" });
            }
            res.json({ message: "Body deleted successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to delete Body" });
        });
};
