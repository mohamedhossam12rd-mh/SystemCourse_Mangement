exports.roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const role = req.admin?.role;
      if (!role) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};