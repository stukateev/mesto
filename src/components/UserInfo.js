export  default class UserInfo {
    constructor({ nameField, jobField }) {
        this._name = nameField;
        this._job = jobField;
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        };
    };

    setUserInfo(userData) {
        this._name.textContent = userData.nameX;
        this._job.textContent = userData.info
    };
};