export interface IUserResponse {
    status: number,
    statusMessage: string,
    admin: IUser[],
    accessToken: string

}

export interface IUser {
    _id: string,
    first_name: string,
    last_name:string,
    email: string,
    password: string,
}