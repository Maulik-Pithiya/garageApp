export const protectAdmin = (req, res, next) => {
    try {
        const adminToken = req.headers["x-admin-token"];
        const serverSecret = process.env.ADMIN_SECRET_KEY || "PrakashAutoAdminSecretKey2026";

        if (!adminToken || adminToken !== serverSecret) {
            return res.status(401).json({ message: "Unauthorized. Admin secret token is missing or invalid." });
        }
        next();
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
