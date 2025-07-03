export default class Autorizacao {

    validarToken(req, res, next) {
        if (!req.headers.chaveapi || req.headers.chaveapi !== "PFSII") {
            return res.status(401).json({ msg: "Credenciais inválidas!" });
        } 
        next();
    }
}
