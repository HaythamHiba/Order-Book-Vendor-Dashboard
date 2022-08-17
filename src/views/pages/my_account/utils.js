export const initialValues = (user) => {
    return {
        status:user?.status,
        username: user?.username,
        logo:user?.logo,
        name_ar:user?.name["ar"],
        name_en:user?.name["en"],

    }
}
