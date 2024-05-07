jest.mock('../data/database');

const { retrieveAvatarByPath } = require('../data/avatar-dao');

describe('retrieveAvatarByPath', () => {
    const mockAvatar = { id: 1, image_path: 'path/to/avatar.jpg' };
    let mockExecute;
  
    beforeAll(async () => {
      const db = await require('../data/database');
      mockExecute = db.execute;
    });
  
    beforeEach(() => {
      mockExecute.mockClear();
    });
  
    it('should retrieve an avatar by path if exists', async () => {
      mockExecute.mockResolvedValue([[mockAvatar], []]);
      const avatar = await retrieveAvatarByPath('path/to/avatar.jpg');
      expect(avatar).toEqual(mockAvatar);
      expect(mockExecute).toHaveBeenCalled();
    });
  
    it('should return undefined if avatar does not exist', async () => {
      mockExecute.mockResolvedValue([[], []]);
      const avatar = await retrieveAvatarByPath('nonexistent/path.jpg');
      expect(avatar).toBeUndefined();
      expect(mockExecute).toHaveBeenCalled();
    });
  
    it('should handle errors thrown by the database', async () => {
      mockExecute.mockRejectedValue(new Error('Database error'));
      await expect(retrieveAvatarByPath('path/to/avatar.jpg')).rejects.toThrow('Database error');
    });
  });