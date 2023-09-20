"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../database/init");
class Models {
    constructor() {
        this.primaryKey = "id";
        this.field = "*";
    }
    /**
     * Menambil data berdasarkan primary key
     * @param id
     */
    find(id) {
        // set sql query
        this.sql = `SELECT ${this.field} FROM ${this.table} WHERE ${this.primaryKey} = ${id}`;
        return this;
    }
    /**
     * Select spesifik field
     */
    select(field) {
        this.field = field;
        return this;
    }
    /**
     * fungsi ini digunakan untuk mengambil data dari database menjadi bentuk array object
     */
    get() {
        return new Promise((resolve, reject) => {
            // jalankan query
            init_1.connection.query(this.sql, (err, result, fields) => {
                // cek apakah ada error atau tidak jika ada kirimkan error
                if (err !== null) {
                    reject(err);
                }
                // jika tidak ada kirimkan hasil
                resolve(result);
            });
        });
    }
    /**
     * Menambil data berdasarkan kriteria
     */
    where(kriteria) {
        // ambil key kriteria
        const key = Object.keys(kriteria);
        // definisikan query
        let kr = `SELECT * FROM ${this.table} WHERE`;
        // set kriteria key dan value
        key.forEach((items, i) => {
            kr += i + 1 == key.length ? ` ${items}='${kriteria[items]}'` : ` ${items}='${kriteria[items]}' AND `;
        });
        // set sql query
        this.sql = kr;
        return this;
    }
    /**
     * Memasukan data ke database
     * @param {object} field -> key dan value field
     */
    insert(field) {
        return new Promise((resolve, reject) => {
            // inisialisasi sql query untuk insert data
            let sql = `INSERT INTO ${this.table} (`;
            // ambil field apa saja yang ingin diisi
            let keys = Object.keys(field);
            // set field key ke sql query
            keys.forEach((items, i) => {
                sql += i + 1 == keys.length ? `${items})` : `${items}, `;
            });
            // tambahkan query value
            sql += " VALUES (";
            // set setiap value ke sql query
            keys.forEach((items, i) => {
                sql += i + 1 == keys.length ? `${init_1.connection.escape(field[items])})` : `${init_1.connection.escape(field[items])}, `;
            });
            // execute query
            init_1.connection.query(sql, (err, res) => {
                if (err !== null) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
}
module.exports = Models;
//# sourceMappingURL=models.js.map