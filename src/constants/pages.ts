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
} as const;

export default pages;
