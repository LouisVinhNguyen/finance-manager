# Finance Manager

English will follow.

## Gestionnaire de Finances

Gestionnaire de Finances est une bibliothèque JavaScript (Node.js) pour gérer ses finances personnelles. Elle permet de créer et gérer des comptes, des catégories et des transactions, et fournit des fonctionnalités pour exporter des données vers des fichiers JSON et calculer les soldes et les dépenses.

## Installation

Pour installer le package, exécutez la commande suivante :

```bash
npm install finance-manager_lvn
```

## Utilisation

Voici quelques exemples d'utilisation de la bibliothèque Gestionnaire de Finances :

### Importation de la Bibliothèque

```javascript
import { Compte, Categorie, Transaction, createCompte, createTransaction, createCategorie, exportComptesToJson, exportTransactionsToJson, exportCategoriesToJson, soldeCompteByDate, spendingByCategorie } from 'finance-manager_lvn';
```

### Création de Comptes à partir d'un Fichier CSV

```javascript
const comptes = await createCompte('path/to/comptes.csv');
console.log(comptes);
```

### Création de Transactions à partir d'un Fichier CSV

```javascript
const transactions = await createTransaction('path/to/transactions.csv');
console.log(transactions);
```

### Création de Catégories à partir d'un Fichier CSV

```javascript
const categories = await createCategorie('path/to/categories.csv');
console.log(categories);
```

### Exportation des Données vers des Fichiers JSON

```javascript
exportComptesToJson(comptes, 'comptes.json');
exportTransactionsToJson(transactions, 'transactions.json');
exportCategoriesToJson(categories, 'categories.json');
```

### Calcul du Solde d'un Compte par Date

```javascript
const balance = soldeCompteByDate(transactions, comptes[0], '2025-12-31');
console.log(`Solde : ${balance}`);
```

### Calcul des Dépenses par Catégorie sur une Période

```javascript
const spending = spendingByCategorie(transactions, 'food', '2025-01-01', '2025-12-31');
console.log(`Dépenses totales pour la nourriture : ${spending}`);
```

## Points Importants

- La bibliothèque utilise le package `csv-parser` pour lire les fichiers CSV.
- Assurez-vous que les fichiers CSV sont correctement formatés avec les en-têtes appropriés.
- La fonction `soldeCompteByDate` calcule le solde d'un compte jusqu'à une date spécifique en fonction des transactions.
- La fonction `spendingByCategorie` calcule les dépenses totales pour une catégorie spécifique sur une période donnée.
- Si un fichier d'entrée est manquant ou mal formaté, la bibliothèque génère une erreur. Assurez-vous que vos fichiers CSV contiennent les en-têtes corrects.

## Licence

Ce projet n'est pas open-source et ne doit pas être distribué sans permission.

---

# Finance Manager

Finance Manager is a JavaScript (Node.js) library for managing personal finances. It allows you to create and manage accounts, categories, and transactions, and provides functionalities to export data to JSON files and calculate balances and spending.

## Installation

To install the package, run the following command:

```bash
npm install finance-manager_lvn
```

## Usage

Here are some examples of how to use the Finance Manager library:

### Importing the Library

```javascript
import { Compte, Categorie, Transaction, createCompte, createTransaction, createCategorie, exportComptesToJson, exportTransactionsToJson, exportCategoriesToJson, soldeCompteByDate, spendingByCategorie } from 'finance-manager_lvn';
```

### Creating Accounts from a CSV File

```javascript
const comptes = await createCompte('path/to/comptes.csv');
console.log(comptes);
```

### Creating Transactions from a CSV File

```javascript
const transactions = await createTransaction('path/to/transactions.csv');
console.log(transactions);
```

### Creating Categories from a CSV File

```javascript
const categories = await createCategorie('path/to/categories.csv');
console.log(categories);
```

### Exporting Data to JSON Files

```javascript
exportComptesToJson(comptes, 'comptes.json');
exportTransactionsToJson(transactions, 'transactions.json');
exportCategoriesToJson(categories, 'categories.json');
```

### Calculating Account Balance by Date

```javascript
const balance = soldeCompteByDate(transactions, comptes[0], '2025-12-31');
console.log(`Balance: ${balance}`);
```

### Calculating Spending by Category within a Date Range

```javascript
const spending = spendingByCategorie(transactions, 'food', '2025-01-01', '2025-12-31');
console.log(`Total spending on food: ${spending}`);
```

## Important Points

- The library uses the `csv-parser` package to read CSV files.
- Ensure that the CSV files are properly formatted with the correct headers.
- The `soldeCompteByDate` function calculates the balance of an account up to a specific date based on transactions.
- The `spendingByCategorie` function calculates the total spending for a specific category within a date range.
- If an input file is missing or incorrectly formatted, the library throws an error. Ensure your CSV files contain the correct headers.

## License

This project is not open-source and should not be distributed without permission.
