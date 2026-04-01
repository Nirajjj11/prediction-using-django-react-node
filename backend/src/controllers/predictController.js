const axios = require("axios");

exports.predict = async (req, res) => {
      try {
            const { features } = req.body;

            const response = await axios.post(
                  "http://127.0.0.1:8000/api/predict/",
                  { features }
            );

            res.json(response.data);

      } catch (err) {
            res.status(500).json({ msg: "Prediction failed" });
      }
};