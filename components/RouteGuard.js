import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { isAuthenticated, readToken } from '@/lib/authenticate';
import { favoritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    useEffect(() => {
        const url = router.pathname;
        if(!authCheck(url)){
            router.push("/login");
        }
        else if (authCheck(url)){
            updateAtoms();
        }
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const token = isAuthenticated();
        const path = url.split('?')[0];
        //console.log(`paths: ${PUBLIC_PATHS.includes(path)}  token : ${token}`)
        console.log(`authCheck Route guard: ${readToken()}`);

        if (!token && !PUBLIC_PATHS.includes(path)) {
            return false
        }
        else{
            return true
        }
    }

    async function updateAtoms() {
        try {
            const fav = await getFavourites();
            const hist = await getHistory();
            setFavorites(fav);
            setSearchHistory(hist);
        } catch (error) {
            console.log(error);
        }
    }

    return <>{children}</>;
}
