export interface UserEntity {
    email: string;
    fname: string;
    lname: string;
    fullName: string;
    readonly username: string;
    readonly _id : string;
    created: Date;
    isActive: Boolean;
    roles: [string];
}