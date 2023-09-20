const Models = require("./models");
class UserModel extends Models {
    constructor() {
        super(...arguments);
        this.table = "user";
    }
}
module.exports = UserModel;
//# sourceMappingURL=UserModel.js.map