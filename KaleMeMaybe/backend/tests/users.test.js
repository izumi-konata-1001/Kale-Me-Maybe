const request = require('supertest');
const app = require('../app.js');

jest.mock('../data/database', () => ({
  initializeDbConnection: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue([{}]),
    end: jest.fn()
  })
}));

jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn().mockResolvedValue({
    execute: jest.fn().mockResolvedValue([{}]),
    end: jest.fn()
  })
}));

jest.mock('../data/user-dao', () => ({
  retrieveUserByEmail: jest.fn(),
  generateToken: jest.fn().mockReturnValue('mocked-token'),
  retrieveUserAvatarById: jest.fn(),
  hashPassword: jest.fn(),
  insertNewUser: jest.fn(),
  checkPassword: jest.fn(),
  retrieveUserById: jest.fn(),
  updateUserProfileById: jest.fn(),
}));

jest.mock('../data/avatar-dao', () => ({
  retrieveAvatarByPath: jest.fn()
}));

const {
  retrieveUserByEmail,
  retrieveUserAvatarById,
  hashPassword,
  insertNewUser,
  checkPassword,
  retrieveUserById,
  updateUserProfileById
} = require('../data/user-dao');

const { retrieveAvatarByPath } = require('../data/avatar-dao');

describe('POST /users/login', () => {
  it('should login user successfully', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      encrypted_password: 'hashedpassword',
      avatar_id: 'avatar123'
    };
    const avatar = {
      image_path: 'path/to/avatar.jpg'
    };
    retrieveUserByEmail.mockResolvedValue(user);
    checkPassword.mockResolvedValue(true);
    retrieveUserAvatarById.mockResolvedValue(avatar);

    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Login successful!',
      authToken: 'mocked-token',
      username: user.name,
      useravatar: avatar.image_path,
      userid: user.id,
    });
  });

  it('should handle invalid credentials', async () => {
    retrieveUserByEmail.mockResolvedValue(null);
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(response.statusCode).toBe(401);
  });
});

describe('POST /users/signup', () => {
  it('should create a new user', async () => {
    retrieveUserByEmail.mockResolvedValue(null);
    hashPassword.mockResolvedValue('hashedpassword');
    insertNewUser.mockResolvedValue({ id: '2' });

    const response = await request(app)
      .post('/api/users/signup')
      .send({ email: 'jane@example.com', password: 'newpassword123' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: 'User created successfully.',
      userId: '2',
    });
  });

  it('should handle existing user error', async () => {
    retrieveUserByEmail.mockResolvedValue({ id: '1', email: 'jane@example.com' });
    const response = await request(app)
      .post('/api/users/signup')
      .send({ email: 'jane@example.com', password: 'newpassword123' });

    expect(response.statusCode).toBe(409);
  });
});

describe('GET /users/:userId', () => {
  it('should retrieve user profile', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      bio: 'Bio here',
      gender: 'Male',
      birth_date: '1990-01-01',
      city: 'City',
      avatar_id: 'avatar123'
    };
    const avatar = {
      image_path: 'path/to/avatar.jpg'
    };
    retrieveUserById.mockResolvedValue(user);
    retrieveUserAvatarById.mockResolvedValue(avatar);

    const response = await request(app).get('/api/users/1');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: 'User retrieved successfully.',
      id: user.id,
      name: user.name,
      bio: user.bio,
      gender: user.gender,
      birthDate: user.birth_date,
      city: user.city,
      avatarPath: avatar.image_path,
    });
  });
});

describe('POST /users/updateprofile', () => {
  it('should update user profile successfully', async () => {
    const avatar = {
      id: 'avatar123',
      image_path: 'path/to/newavatar.jpg'
    };
    retrieveAvatarByPath.mockResolvedValue(avatar);
    updateUserProfileById.mockResolvedValue({ success: true });

    const response = await request(app)
      .post('/api/users/updateprofile')
      .send({
        id: '1',
        name: 'John Doe Updated',
        bio: 'Updated Bio',
        gender: 'Male',
        birthDate: '1990-01-01',
        city: 'Updated City',
        avatarPath: avatar.image_path
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: 'User profile updated successfully.',
      username: 'John Doe Updated',
      useravatar: avatar.image_path,
    });
  });
});

