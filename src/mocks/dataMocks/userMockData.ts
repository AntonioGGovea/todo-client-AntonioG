import { UserModel } from '../../interfaces';

const getUser = (id = 1): UserModel => ({
    email: `user-${id}@email.com`,
    password: `user-password-${id}`,
});

const userMockData = {
    getUser,
    getFailingUser: () => getUser(3),
};

export default userMockData;
