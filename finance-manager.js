import fs from 'fs';
import csv from 'csv-parser';

/**
 * Prints a message to the console.
 */
export function printMsg() {
    console.log("This is a message from the demo package");
}

/**
 * Represents a bank account or wallet.
 */
export class Compte {
    /**
     * Creates an instance of Compte.
     * @param {string} nom - The name of the account.
     * @param {number} solde - The balance of the account.
     */
    constructor(nom, solde) {
        this.nom = nom;
        this.solde = solde;
    }
}

/**
 * Represents a category for transactions (e.g., food, transport, entertainment).
 */
export class Categorie {
    /**
     * Creates an instance of Categorie.
     * @param {string} nom - The name of the category.
     * @param {string} description - The description of the category.
     */
    constructor(nom, description) {
        this.nom = nom;
        this.description = description;
    }
}

/**
 * Represents a transaction.
 */
export class Transaction {
    /**
     * Creates an instance of Transaction.
     * @param {number} montant - The amount of the transaction.
     * @param {string} compte - The account associated with the transaction.
     * @param {Date} date - The date of the transaction.
     * @param {string} description - The description of the transaction.
     * @param {string} type - The type of the transaction.
     * @param {string} categorie - The category of the transaction.
     */
    constructor(montant, compte, date, description, type, categorie) {
        this.montant = montant;
        this.compte = compte;
        this.date = date;
        this.description = description;
        this.type = type;
        this.categorie = categorie;
    }
}

/**
 * Asynchronously creates accounts from a CSV file.
 *
 * @param {string} fichierCSV - The path to the CSV file containing account data.
 * @returns {Promise<Compte[]>} A promise that resolves to an array of Compte objects.
 * @throws Will throw an error if the CSV file cannot be read or processed.
 */
export async function createCompte(fichierCSV) {
    const comptes = [];

    try {
        const stream = fs.createReadStream(fichierCSV).pipe(csv());

        for await (const row of stream) {
            const { nom, solde } = row;
            const compte = new Compte(nom, parseFloat(solde));
            comptes.push(compte);
        }

        console.log('CSV file successfully processed');
        return comptes;
    } catch (error) {
        throw error;
    }
}

/**
 * Asynchronously creates transactions from a CSV file.
 *
 * @param {string} fichierCSV - The path to the CSV file containing transaction data.
 * @returns {Promise<Transaction[]>} A promise that resolves to an array of Transaction objects.
 * @throws Will throw an error if the CSV file cannot be read or processed.
 */
export async function createTransaction(fichierCSV) {
    const transactions = [];

    try {
        const stream = fs.createReadStream(fichierCSV).pipe(csv());

        for await (const row of stream) {
            const { montant, compte, date, description, type, categorie } = row;
            const transaction = new Transaction(
                parseFloat(montant),
                compte,
                new Date(date),
                description,
                type,
                categorie
            );
            transactions.push(transaction);
        }

        console.log('CSV file successfully processed');
        return transactions;
    } catch (error) {
        throw error;
    }
}

/**
 * Asynchronously creates categories from a CSV file.
 *
 * @param {string} fichierCSV - The path to the CSV file containing category data.
 * @returns {Promise<Categorie[]>} A promise that resolves to an array of Categorie objects.
 * @throws Will throw an error if the CSV file cannot be read or processed.
 */
export async function createCategorie(fichierCSV) {
    const categories = [];

    try {
        const stream = fs.createReadStream(fichierCSV).pipe(csv());

        for await (const row of stream) {
            const { nom, description } = row;
            const categorie = new Categorie(nom, description);
            categories.push(categorie);
        }

        console.log('CSV file successfully processed');
        return categories;
    } catch (error) {
        throw error;
    }   
}

/**
 * Exports account data to a JSON file.
 *
 * @param {Compte[]} comptes - The array of Compte objects to export.
 * @param {string} filename - The name of the JSON file to write to.
 */
export function exportComptesToJson(comptes, filename) {
    const jsonData = JSON.stringify(comptes, null, 2);
    fs.writeFileSync(filename, jsonData, 'utf8');
    console.log(`Comptes data has been written to ${filename}`);
}

/**
 * Exports transaction data to a JSON file.
 *
 * @param {Transaction[]} transactions - The array of Transaction objects to export.
 * @param {string} filename - The name of the JSON file to write to.
 */
export function exportTransactionsToJson(transactions, filename) {
    const jsonData = JSON.stringify(transactions, null, 2);
    fs.writeFileSync(filename, jsonData, 'utf8');
    console.log(`Transactions data has been written to ${filename}`);
}

/**
 * Exports category data to a JSON file.
 *
 * @param {Categorie[]} categories - The array of Categorie objects to export.
 * @param {string} filename - The name of the JSON file to write to.
 */
export function exportCategoriesToJson(categories, filename) {
    const jsonData = JSON.stringify(categories, null, 2);
    fs.writeFileSync(filename, jsonData, 'utf8');
    console.log(`Categories data has been written to ${filename}`);
}

/**
 * Calculates the balance of an account up to a specific date based on transactions.
 *
 * @param {Transaction[]} transactions - The array of Transaction objects.
 * @param {Compte} compte - The account to calculate the balance for.
 * @param {string} date - The date up to which to calculate the balance.
 * @returns {number} The balance of the account up to the specified date.
 */
export function soldeCompteByDate(transactions, compte, date) {
    const targetDate = new Date(date);
    let solde = compte.solde;

    for (const transaction of transactions) {
        if (transaction.compte === compte.nom && new Date(transaction.date) <= targetDate) {
            solde += transaction.montant;
        }
    }

    return solde;
}

/**
 * Calculates the total spending for a specific category within a date range.
 *
 * @param {Transaction[]} transactions - The array of Transaction objects.
 * @param {string} categorie - The category to calculate spending for.
 * @param {string} startDate - The start date of the date range.
 * @param {string} endDate - The end date of the date range.
 * @returns {number} The total spending for the specified category within the date range.
 */
export function spendingByCategorie(transactions, categorie, startDate, endDate) {
    const targetStartDate = new Date(startDate);
    const targetEndDate = new Date(endDate);
    let moneySpent = 0;

    for (const transaction of transactions) {
        if (new Date(transaction.date) >= targetStartDate && new Date(transaction.date) <= targetEndDate) {
            if (categorie === transaction.categorie) {
                moneySpent += transaction.montant;
            }
        }
    }

    return moneySpent;
}