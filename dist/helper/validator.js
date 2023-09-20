/**
 * Fungsi untuk mengecek apakah suatu value dikirimkan atau tidak
 * @param {string} name -> nama input
 * @param {string} input -> value yang akan divalidasi
 * @returns {Returns}
 */
function required(name, input) {
    // cek apakah valid atau tidak
    let valid = input.length > 0;
    return {
        valid: valid,
        message: `${name} tidak boleh kosong`
    };
}
/**
 *
 * @param {String} name -> nama input
 * @param {String} input -> value yang akan divalidasi
 * @param {number} max -> maksimal panjang value
 * @returns {Returns}
 */
function max(name, input, max) {
    // cek panjang input
    let cek = input.length <= max;
    return {
        valid: cek,
        message: cek ? "" : `${name} tidak boleh lebih panjang dari ${max} karakter`
    };
}
/**
 *
 * @param {String} name -> nama input
 * @param {String} input -> value yang akan divalidasi
 * @param {number} min -> minimum panjang value
 * @returns {Returns}
 */
function min(name, input, min) {
    // cek panjang input
    let cek = input.length >= min;
    return {
        valid: cek,
        message: cek ? "" : `${name} tidak boleh lebih pendek dari ${min} karakter`
    };
}
function stringValidation(name, input) {
    // cek apakah input string atau bukan
    // @ts-ignore
    // isNaN akan mengembalikan nilai false jika yang diinput adalah nomor
    // dan mengembalikan true jika yang diinput adalah huruf abcd dst
    let cek = isNaN(input);
    return {
        valid: cek,
        message: `${name} harus string`
    };
}
/**
 * validasi apakah string yang dikirimkan sudah sesuai format email atau belum
 * @param name
 * @param input
 * @returns
 */
function email(name, input) {
    // alpha numerik @ alpha numerik . alphabet
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return {
        valid: emailPattern.test(input),
        message: `${name} tidak sesuai format`
    };
}
function validasi(input, criteria) {
    return new Promise((resolve, reject) => {
        let hasil = [];
        // 
        criteria.forEach(items => {
            // split kriteria berdasarkan simbol |
            const criteria_ = items.kriteria.split('|');
            // cek kriteria yang dikirimkan ( required, max, dll )
            criteria_.forEach(row => {
                if (row.includes("required")) {
                    // mengecek apakah suatu nilai dikirimkan atau tidak
                    hasil.push(required(items.name, input[items.name]));
                }
                else if (row.includes("max")) {
                    // mengecek apakah suatu parameter melebihi batas panjang atau tidak
                    hasil.push(max(items.name, input[items.name], parseInt(row.split(":")[1])));
                }
                else if (row.includes("min")) {
                    // mengecek apakah suatu parameter melebihi batas pendek atau tidak
                    hasil.push(min(items.name, input[items.name], parseInt(row.split(":")[1])));
                }
                else if (row.includes("string")) {
                    // mengecek apakah suatu input termasuk data string atau bukan
                    hasil.push(stringValidation(items.name, input[items.name]));
                }
                else if (row.includes("email")) {
                    // mengecek apakah suatu input termasuk email atau bukan
                    hasil.push(email(items.name, input[items.name]));
                }
            });
        });
        // cek hasil jika terdapat yang valid = false maka reject
        // jika tidak ada valid = false maka resolve
        const tidak_valid = hasil.filter(items => !items.valid);
        if (tidak_valid.length > 0) {
            // kirimkan pesan error
            reject(tidak_valid);
        }
        else {
            // kirimkan input form
            resolve(input);
        }
    });
}
module.exports = validasi;
//# sourceMappingURL=validator.js.map