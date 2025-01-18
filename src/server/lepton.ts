// Main file for interacting with lepton services
import { type User } from './dtos/user';

const getUserById = async (userId: string) => {
    return {
        user_id: userId,
        first_name: 'John',
        last_name: 'Doe',
        image: 'https://example.com/image.jpg',
        email: '',
    } as User;
};

const Lepton = {
    getUserById,
};

export default Lepton;
