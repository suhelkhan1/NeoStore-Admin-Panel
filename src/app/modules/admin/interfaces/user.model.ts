export interface IUser {
    id: string,
    user_role: string,
    gmail_id: string,
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    password: string,
    phone_no: number,
    birth_date: Date,
    role: string,
    username: string,
    is_active: boolean,
    images: {
        id: string,
        userId: string,
        name: string,
        type: string,
        isActive: boolean,
        container: string,
        ImgURL: string,
        ThumbURL: string
    }
}

