// type
import {Request, Response} from 'express'

// model
const { UserModel } = require("../model")

// helper
const validasi = require('../helper/validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class UserController {

    /**
     * Menangani user register.
     * jika email belum terdaftar maka masukan data
     * namun jika email sudah terdaftar kirimkan pesan gagal
     * @param req 
     * @param res 
     */
    static store(req : Request, res : Response){

        // inisialisasi model
        const model = new UserModel()

        // validasi input
        validasi(req.body, [
            {name: "nama", kriteria: "string|max:20|required"},
            {name: "email", kriteria: "email|max:50|required"},
            {name: "password", kriteria: "string|required|max:20"}
        ]).then(async hasil => {

            // jika validasi berhasil maka cek apakah email sudah terdaftar atau belum
            const user_lama = await model.where({email: req.body.email}).get()

            if(user_lama.length > 0){

                // jika user terdaftar kirimkan pesan bahwa email telah terdaftar
                res.status(202).json({
                    "status": 202,
                    "pesan": `email ${req.body.email} telah terdaftar`
                })

            }else {

                // buat hash password
                const pswd = await bcrypt.hash(req.body.password, 5)

                // enkripsi password
                req.body['password'] = pswd

                // tambahkan created at
                req.body['created_at'] = new Date()
                
                // jika belum terdaftar maka masukan ke database
                model.insert(req.body)
                .then(hasil => {

                    res.status(200).json({
                        status: 200,
                        pesan: "user berhasil didaftarkan"
                    })

                }).catch(err => {

                    res.status(500).json(err)

                })
            }

        }).catch(err => {

            // jika validasi error maka kirimkan error
            res.status(403).json(err)
        })
    }

    /**
     * method dibawah ini digunakan untuk menangani proses login
     * langkah : 
     * 1.   cek apakah email terdaftar atau belum
     * 1.1  jika email terdaftar maka lanjut cek pasword
     * 1.2  jila email tidak terdaftar return status 202
     * 2.   cek password apakah password benar atau salah
     * 2.1  jika password benar maka generate jwt
     * 2.2  jika password salah maka kirimkan status 202
     */
    static async login(req: Request, res: Response){

        // inisialisasi model
        const model = new UserModel()

        // validasi input
        validasi(req.body, [
            {name: "email", kriteria: "required|email|max:50"},
            {name: "password", kriteria: "required|max:50"}
        ]).then(async hasil => {

            // validasi berhasil
            // ambil parameter
            const {email, password} = req.body
    
            // cek apakah email terdaftar atau tidak
            const user = await model.where({email: email}).get()
    
            if(user.length > 0){
    
                // jika email terdaftar maka cek password
                const pswd_hash = user[0].password
                const cek_password = await bcrypt.compare(password, pswd_hash)
    
                if(cek_password){
    
                    // jika password valid maka generate jwt dan kirimkan jwt
                    const token = jwt.sign({
                        id: user[0].id,
                    }, process.env.JWT_KEY, {expiresIn: "1h"})
    
                    return res.status(200).json({
                        status: 200,
                        token: token,
                    })
    
                }else{
    
                    // jika password tidak valid kirim pesan kesalahan
    
                    res.status(202).json({
                        status: 202,
                        pesan: "password salah"
                    })
                }
            }else{
    
                // jika email terdaftar kirim pesan kesalahan
                res.status(202).json({
                    status: 202,
                    pesan: "email tidak terdaftar"
                })
    
            }
        }).catch(err => {

            // validasi gagal
            res.status(500).json(err)
        })

    }

    /**
     * Method dibawah ini digunakan untuk mendapatkan data user berdasarkan id
     * yang terdapat pada json web token
     * 
     * Tahap:
     *  1. periksa apakah bearer token dikirimkan atau tidak
     *  2. periksa apakah bearer kosong atatu tidak
     *  3. periksa apakah token valid atau tidak
     *  4. jika semua poin true maka kirimkan data user jika tidak kirim pesan kesalahan
     */
    static async me(req: Request, res: Response){

        const model = new UserModel()

        // ambil user id dari middleware
        const user_id = res.locals.user_id

        // ambil user berdarkan id
        const user = await model.select("id, nama, email").find(user_id).get()

        res.json(user[0])
    }
}

module.exports = UserController