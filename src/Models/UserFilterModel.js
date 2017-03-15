 class UserFilterModel {
    constructor(config){
       this.firstName = config.firstName || '';
       this.lastName = config.lastName || '';
       this.userId = config.userId || null;
       this.email = config.email || '';
    }
}

export default UserFilterModel;