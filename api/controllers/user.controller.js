import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import Alumni from '../models/alumni.model.js';
export const test = (req, res) => {
    res.json({
        message: 'vvvvv',
    });
}
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await Alumni.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password, // Already hashed if updated
                    currentJob: req.body.currentJob,
                    experience: req.body.experience,
                    company: req.body.company,
                    industry: req.body.industry,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can ony delete your own account!"));
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};