import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User =
{
    id: string,
    name: string,
    email: string,
    createdAt: string

}

type GetUsersResponse =
{
    totalCount: number,
    users:User[]
}

export async function getUsers(page:number): Promise<GetUsersResponse>
{
    const {data, headers} = await api.get('users', {params: {page},});

    const totalCount = Number(headers['x-total-count']);

    const users =  data.users.map(user=>{
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
                day:'2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {totalCount, users};
}

export function useUsers(page:number)
{
    //como a chave users não muda, o cache continua ativado
    //necessário passar page para entender que há
    //uma informação que está mudando
    return useQuery(['users',page], () => getUsers(page),
    {
        staleTime: 1000 * 60 * 10, //10 minutos
    })
}

// - use essa linha quando usar SSR
// export function useUsers(page:number, options: UseQueryOptions)
// {
//     //como a chave users não muda, o cache continua ativado
//     //necessário passar page para entender que há
//     //uma informação que está mudando
//     return useQuery(['users',page], () => getUsers(page),
//     {
//         staleTime: 1000 * 60 * 10, //10 minutos
//         ...options,
//     })
// }