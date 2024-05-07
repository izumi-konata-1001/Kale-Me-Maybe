jest.mock('../data/database');

const {
  retrieveCollection,
  deleteCollection,
  addRecipeToCollection,
  renameCollection,
  batchDeletion
} = require('../data/collection-recipe-dao');
const db = require('../data/database');

describe('Collection Recipe DAO Tests', () => {
    beforeEach(() => {
      db.query.mockClear();
  
      db.query.mockImplementation((sql, params) => {
        if (sql.includes('FROM user')) {
          return Promise.resolve([[{ id: params[0] }], []]); 
        } else if (sql.includes('FROM collection WHERE id')) {
          return Promise.resolve([[{ name: 'Favorite' }], []]); 
        } else if (sql.includes('FROM recipe')) {
          return Promise.resolve([[{ id: 200, name: 'Chocolate Cake' }], []]); 
        } else {
          return Promise.resolve([[], []]); 
        }
      });
    });

  describe('retrieveCollection', () => {
    it('throws an error if the user does not exist', async () => {
      db.query.mockResolvedValueOnce([]);  
      await expect(retrieveCollection(1, 100)).rejects.toThrow("Cannot read properties of undefined (reading 'length')");
    });
  });

  describe('deleteCollection', () => {
    it('should delete a collection if it exists', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]); 
      db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); 

      const result = await deleteCollection(1, 100);
      expect(result).toBe(1);
    });
  });

  describe('addRecipeToCollection', () => {
    it('adds a recipe to a collection', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]); 
      db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); 

      const result = await addRecipeToCollection(1, 100, 200);
      expect(result).toEqual({
        success: true,
        message: "Recipe added to collection successfully"
      });
    });
  });

  describe('renameCollection', () => {
    it('renames a collection successfully', async () => {
      db.query.mockResolvedValueOnce([{ id: 1 }]); 
      db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); 

      const result = await renameCollection(1, 100, 'New Collection Name');
      expect(result).toEqual({
        success: true,
        message: "Collection renamed successfully."
      });
    });
  });

  describe('batchDeletion', () => {
    it('successfully deletes multiple recipes from a collection', async () => {
      db.beginTransaction.mockResolvedValue();
      db.query.mockResolvedValueOnce(); 
      db.commit.mockResolvedValue();

      await batchDeletion(1, 100, [200, 201, 202]);
      expect(db.beginTransaction).toHaveBeenCalled();
      expect(db.query).toHaveBeenCalledTimes(3); 
      expect(db.commit).toHaveBeenCalled();
    });

    it('rolls back on error during deletion', async () => {
      db.beginTransaction.mockResolvedValue();
      db.query.mockRejectedValue(new Error("Failed to delete"));
      db.rollback.mockResolvedValue();

      await expect(batchDeletion(1, 100, [200, 201, 202])).rejects.toThrow("Failed to delete");
      expect(db.beginTransaction).toHaveBeenCalled();
      expect(db.rollback).toHaveBeenCalled();
    });
  });
});
