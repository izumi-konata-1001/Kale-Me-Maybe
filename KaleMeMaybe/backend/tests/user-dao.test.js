const {
    checkPassword,
    insertNewUser,
    hashPassword,
    retrieveUserAvatarById,
    retrieveUserByEmail,
    retrieveUserById,
    updateUserProfileById,
    insertNewThirdUser,
    insertThirdPartyTable,
    retrieveThirdPartyAccount,
} = require('../data/user-dao');
const db = require('../data/database');
const bcrypt = require('bcrypt');

jest.mock('../data/database');
jest.mock('bcrypt');

describe('User DAO Tests', () => {
    describe('checkPassword', () => {
        it('should return true if password matches hashed password', async () => {
            const password = 'password';
            const hashedPassword = '$2b$10$hashedPassword';

            bcrypt.compare.mockResolvedValueOnce(true); 

            const result = await checkPassword(password, hashedPassword);

            expect(result).toBe(true);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
        });

        it('should return false if password does not match hashed password', async () => {
            const password = 'password';
            const hashedPassword = '$2b$10$hashedPassword';

            bcrypt.compare.mockResolvedValueOnce(false); 

            const result = await checkPassword(password, hashedPassword);

            expect(result).toBe(false);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
        });
    });

    describe('insertNewUser', () => {
        it('should insert a new user into the database', async () => {
            const userData = { email: 'test@example.com', encrypted_password: 'hashedPassword' };
            const expectedResult = { id: undefined };

            db.execute.mockResolvedValueOnce([[{ insertId: 1 }]]);

            const result = await insertNewUser(userData);

            expect(result).toEqual(expectedResult);
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [userData.email, userData.encrypted_password]);
        });

        it('should throw an error if insertion fails', async () => {
            const userData = { email: 'test@example.com', encrypted_password: 'hashedPassword' };

            db.execute.mockRejectedValueOnce(new Error('Insertion failed'));

            await expect(insertNewUser(userData)).rejects.toThrow('Insertion failed');
        });
    });

    describe('hashPassword', () => {
        it('should hash the password using bcrypt', async () => {
            const password = 'password';
            const hashedPassword = '$2b$10$hashedPassword';

            bcrypt.hash.mockResolvedValueOnce(hashedPassword);

            const result = await hashPassword(password);

            expect(result).toBe(hashedPassword);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        });

        it('should throw an error if hashing fails', async () => {
            const password = 'password';

            bcrypt.hash.mockRejectedValueOnce(new Error('Hashing failed'));

            await expect(hashPassword(password)).rejects.toThrow('Hashing failed');
        });
    });

    describe('retrieveUserAvatarById', () => {
        it('should retrieve user avatar by id from the database', async () => {
            const avatarId = 1;
            const expectedResult = { id: 1, url: 'path/to/avatar' };

            db.execute.mockResolvedValueOnce([[expectedResult]]);

            const result = await retrieveUserAvatarById(avatarId);

            expect(result).toEqual(expectedResult);
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [avatarId]);
        });

        it('should return undefined if no avatar is found', async () => {
            const avatarId = 1;

            db.execute.mockResolvedValueOnce([[]]);

            const result = await retrieveUserAvatarById(avatarId);

            expect(result).toBeUndefined();
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [avatarId]);
        });
    });

    describe('retrieveUserByEmail', () => {
        it('should retrieve user by email from the database', async () => {
            const email = 'test@example.com';
            const expectedResult = { id: 1, email, name: 'Test User' };

            db.execute.mockResolvedValueOnce([[expectedResult]]);

            const result = await retrieveUserByEmail(email);

            expect(result).toEqual(expectedResult);
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [email]);
        });

        it('should return undefined if no user is found', async () => {
            const email = 'nonexistent@example.com';

            db.execute.mockResolvedValueOnce([[]]);

            const result = await retrieveUserByEmail(email);

            expect(result).toBeUndefined();
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [email]);
        });
    });

    describe('retrieveUserById', () => {
        it('should retrieve user by id from the database', async () => {
            const userId = 1;
            const expectedResult = { id: userId, email: 'test@example.com', name: 'Test User' };

            db.execute.mockResolvedValueOnce([[expectedResult]]);

            const result = await retrieveUserById(userId);

            expect(result).toEqual(expectedResult);
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [userId]);
        });

        it('should return undefined if no user is found', async () => {
            const userId = 999;

            db.execute.mockResolvedValueOnce([[]]);

            const result = await retrieveUserById(userId);

            expect(result).toBeUndefined();
            expect(db.execute).toHaveBeenCalledWith(expect.any(String), [userId]);
        });
    });

    describe('updateUserProfileById', () => {
        it('should update user profile by id in the database', async () => {
            const userId = 1;
            const name = 'Updated Name';
            const bio = 'Updated Bio';
            const gender = 'Male';
            const birthDate = '1990-01-01';
            const city = 'New City';
            const avatar_id = 1;

            const expectedQuery = `
                UPDATE user 
                SET name = ?, bio = ?, gender = ?, birth_date = ?, city = ?, avatar_id = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
              `;
            const expectedResult = { affectedRows: 1 }; 

            db.execute.mockResolvedValueOnce([expectedResult]);

            const result = await updateUserProfileById(userId, name, bio, gender, birthDate, city, avatar_id);

            expect(result).toEqual(expectedResult);
        });

        it('should throw an error if updating user profile fails', async () => {
            db.execute.mockRejectedValueOnce(new Error('Database error'));

            await expect(updateUserProfileById(1, 'Name', 'Bio', 'Gender', '1990-01-01', 'City', 1)).rejects.toThrowError('Database error');
        });
    });

    describe('insertNewThirdUser', () => {
        it('should insert a new user into the database', async () => {
            const email = 'newuser@example.com';
            const expectedQuery = 'INSERT INTO user (email, encrypted_password) VALUES (?, ?)';
            const expectedResult = { insertId: 1 }; 

            db.execute.mockResolvedValueOnce([expectedResult]);

            const result = await insertNewThirdUser(email);

            expect(result).toEqual({ id: 1 });
            expect(db.execute).toHaveBeenCalledWith(expectedQuery, [email, '']);
        });

        it('should throw an error if inserting new user fails', async () => {
            db.execute.mockRejectedValueOnce(new Error('Database error'));

            await expect(insertNewThirdUser('newuser@example.com')).rejects.toThrowError('Database error');
        });
    });

    describe('insertThirdPartyTable', () => {
        it('should insert a new record into the third party account table', async () => {
            const userId = 1;
            const provider = 'Google';
            const providerId = '123456789';
            const expectedQuery = 'INSERT INTO third_party_account (user_id, provider_name, provider_user_id) VALUES (?, ?, ?)';
            const expectedResult = { insertId: 1 }; 

            db.execute.mockResolvedValueOnce([expectedResult]);

            const result = await insertThirdPartyTable(userId, provider, providerId);

            expect(result).toEqual({ id: 1 });
            expect(db.execute).toHaveBeenCalledWith(expectedQuery, [userId, provider, providerId]);
        });

        it('should throw an error if inserting new third party table record fails', async () => {
            db.execute.mockRejectedValueOnce(new Error('Database error'));

            await expect(insertThirdPartyTable(1, 'Google', '123456789')).rejects.toThrowError('Database error');
        });
    });

    describe('retrieveThirdPartyAccount', () => {
        it('should retrieve a third party account by provider and provider_id', async () => {
            const provider = 'Google';
            const providerId = '123456789';
            const expectedQuery = 'SELECT * FROM third_party_account WHERE provider_name = ? AND provider_user_id = ?';
            const expectedResult = [{ id: 1, user_id: 1, provider_name: 'Google', provider_user_id: '123456789' }]; 

            db.execute.mockResolvedValueOnce([expectedResult]);

            const result = await retrieveThirdPartyAccount(provider, providerId);

            expect(result).toEqual(expectedResult[0]);
            expect(db.execute).toHaveBeenCalledWith(expectedQuery, [provider, providerId]);
        });

        it('should throw an error if retrieving third party account fails', async () => {
            db.execute.mockRejectedValueOnce(new Error('Database error'));

            await expect(retrieveThirdPartyAccount('Google', '123456789')).rejects.toThrowError('Database error');
        });
    });
});


