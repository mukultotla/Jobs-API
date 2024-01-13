const register = async (req, res) => {
  res.json({
    msg: "Register controller",
  });
};

const login = async (req, res) => {
  res.json({
    msg: "Login controller",
  });
};

module.exports = {
  register,
  login,
};
