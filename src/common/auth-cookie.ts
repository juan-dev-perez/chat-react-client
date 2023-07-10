import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const saveJWT = (token: string) => {
    cookies.set('JWT',token,{
        secure: true,
        sameSite: 'strict',
    })
}

export const getJWT = () => cookies.get('JWT');

export const deleteJWT = () => cookies.remove('JWT');