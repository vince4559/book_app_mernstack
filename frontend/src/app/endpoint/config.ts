const config = {
    API: () => 'https://book-app-mernstack-api.vercel.app',
    LOCAL_API :() => "http://localhost:5000"
};

export const getConfig = () => {
    return config.API()
}

