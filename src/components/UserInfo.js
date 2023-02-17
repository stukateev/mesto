export  default class UserInfo {
    constructor({ nameField, jobField, avatarField }) {
        this._name = nameField;
        this._job = jobField;
        this._avatar = avatarField;
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.style.backgroundImage.slice(5,-2)
        };

    };

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._job.textContent = userData.about;
        this._avatar.style.backgroundImage = `url(${userData.avatar})`;
        this._userId = userData._id;
    }

    getUserId() {
        return this._userId;
    };
};