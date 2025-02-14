import { createCategorie } from '../finance-manager';
import fs from 'fs';
import csv from 'csv-parser';
import { Categorie } from '../finance-manager'; // Adjusted import path

jest.mock('fs');
jest.mock('csv-parser');

describe('createCategorie', () => {
    it('should create categories from a CSV file', async () => {
        const mockData = [
            { nom: 'Category1', description: 'Description1' },
            { nom: 'Category2', description: 'Description2' }
        ];

        fs.createReadStream.mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                [Symbol.asyncIterator]: jest.fn().mockReturnValue(mockData[Symbol.iterator]())
            })
        });

        const categories = await createCategorie('path/to/mock.csv');

        expect(categories).toHaveLength(2);
        expect(categories[0]).toBeInstanceOf(Categorie);
        expect(categories[0].nom).toBe('Category1');
        expect(categories[0].description).toBe('Description1');
        expect(categories[1].nom).toBe('Category2');
        expect(categories[1].description).toBe('Description2');
    });

    it('should throw an error if the CSV file cannot be read', async () => {
        fs.createReadStream.mockImplementation(() => {
            throw new Error('File read error');
        });

        await expect(createCategorie('path/to/mock.csv')).rejects.toThrow('File read error');
    });

    it('should return an empty array if the CSV file is empty', async () => {
        const mockData = [];

        fs.createReadStream.mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                [Symbol.asyncIterator]: jest.fn().mockReturnValue(mockData[Symbol.iterator]())
            })
        });

        const categories = await createCategorie('path/to/mock.csv');

        expect(categories).toHaveLength(0);
    });

    it('should handle missing values in the CSV file', async () => {
        const mockData = [
            { nom: 'Category1', description: 'Description1' },
            { nom: 'Category2' } // Missing description
        ];

        fs.createReadStream.mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                [Symbol.asyncIterator]: jest.fn().mockReturnValue(mockData[Symbol.iterator]())
            })
        });

        const categories = await createCategorie('path/to/mock.csv');

        expect(categories).toHaveLength(2);
        expect(categories[0]).toBeInstanceOf(Categorie);
        expect(categories[0].nom).toBe('Category1');
        expect(categories[0].description).toBe('Description1');
        expect(categories[1]).toBeInstanceOf(Categorie);
        expect(categories[1].nom).toBe('Category2');
        expect(categories[1].description).toBeUndefined();
    });

    it('should handle a large number of categories', async () => {
        const mockData = Array.from({ length: 1000 }, (_, i) => ({
            nom: `Category${i + 1}`,
            description: `Description${i + 1}`
        }));

        fs.createReadStream.mockReturnValue({
            pipe: jest.fn().mockReturnValue({
                [Symbol.asyncIterator]: jest.fn().mockReturnValue(mockData[Symbol.iterator]())
            })
        });

        const categories = await createCategorie('path/to/mock.csv');

        expect(categories).toHaveLength(1000);
        expect(categories[0]).toBeInstanceOf(Categorie);
        expect(categories[0].nom).toBe('Category1');
        expect(categories[0].description).toBe('Description1');
    });
});