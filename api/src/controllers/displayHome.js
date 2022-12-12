
const displayHome = async (req, res) => {
  let response = {
    message: "The dog API - Individual proyect for HENRY",
    createdBy: "Leandro Rocha",
  };
  res.json(response);
};

module.exports = displayHome;
