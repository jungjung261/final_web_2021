const Account = require('../models/Account');
const Post = require('../models/Post');
const bcrypt = require("bcrypt");

class AdminController {
    // GET admin/home
    async renderHome(req, res, next) {
        const account = req.account;
        // get 10 newer post 
        const first_10_post = await Post.find({}).sort({ created_at: -1 }).limit(10).lean();
        res.render('./admin/home', { account, first_10_post });
    }
    
    // GET admin/departments
    async renderDepartmentPage(req, res, next) {
        const account = req.account;
        const departments = await Account.find({ role: 'department' }).lean();
        res.render('./admin/departmentPage', { account, departments });
    }

    async createDepartmentAccount(req, res, next) {
        const { username, category} = req.body;
        // check account exist
        let account = await Account.findOne({ username });
        if (account) {
            return res.status(400).json({
                message: "Tên tài khoản đã tồn tại"
        });}
        // hash default password and create account
        const hash = await bcrypt.hash('123456', 10);
        account = new Account({
            username,
            password: hash,
            role: 'department',
            category
        });
        await account.save();
        res.redirect('/admin/departments');
    }

    // GET admin/accounts
    async renderMyAccount(req, res, next) {
        const account = req.account;
        res.render('./admin/accounts', { account });
    }
}

module.exports = new AdminController();