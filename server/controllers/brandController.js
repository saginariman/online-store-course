const ApiError = require("../error/ApiError");
const { Brand } = require("../models/models");

class BrandController {
    async create (req, res, next) {
        try {
            const {name} = req.body;
            const type = await Brand.create({name})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res) {
        res.status(200).json({message: "WORKING!!!"})
    }
}

module.exports = new BrandController()