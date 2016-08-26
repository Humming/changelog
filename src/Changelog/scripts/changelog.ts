export class ChangeLog {
    id: number;
    version: string;
    message: string;
    username: string;
    createdOn: Date;
    updatedOn: Date;

    constructor(version, message, username) {
        this.version = version;
        this.message = message;
        this.username = username;

    }
}