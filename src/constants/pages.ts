const pages = {
    todo: {
        name: 'todo',
        path: '/todo',
        children: {
            create: {
                name: 'create',
                path: '/todo/create',
            } 
        }
    },
    login: {
        name: 'login',
        path: '/login',
    }
} as const;

export default pages;
