//we can load the current user
import userSWR from 'swr';

import fetcher from '@/lib/fetcher';

const userCurrentUser = () => {
    // SWR -> used to fetching data quite similar react query, fetch just once if the data already exist, avoid Redux and any state management for fetching
    const {data, error, isLoading, mutate} = userSWR ('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default userCurrentUser;
