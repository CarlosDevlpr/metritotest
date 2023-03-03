export const validate = (schema) => async (req, res, next) => {
    try {
        const { body, query, params } = await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        }, { stripUnkown: true })
        req.body = body
        req.query = query
        req.params = params
        return next()
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message })
    }
}
