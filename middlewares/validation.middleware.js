
const validation = (schema) => {
    return async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues.map(issue => ({
                    field: issue.path,
                    message: issue.message
                }))
            })
        }
        req.body = result.data;
        next();
    }
}
export default validation;