import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const SECRET_KEY = process.env.JWT_SECRET;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.user = user;
        next();
    });
}

export function authorizeRole(...allowedRoles) {
    // Flatten ensures ['admin'] and 'admin' both work
    const rolesToAllow = allowedRoles.flat(); 

    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ error: "Access denied: No roles" });
        }

        const hasRole = req.user.roles.some(role =>
            rolesToAllow.includes(role)
        );

        if (!hasRole) return res.status(403).json({ error: "Access denied" });
        next();
    };
}