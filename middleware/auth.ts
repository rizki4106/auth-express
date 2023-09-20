import { Request, Response, NextFunction } from "express";

// helper
import jwt from 'jsonwebtoken'

/**
 * Fungsi ini digunakan untuk mengecek apakah token jwt dikirimkan atau tidak
 * serta apakah token tersebut valid atau tidak.
 * Jika semuanya true maka akan diarahkan ke destinasi request
 * @param req 
 * @param res 
 * @param next 
 */
export function IsLogin(req: Request, res: Response, next: NextFunction){

    // cek apakah token dikirimkan atau tidak
    const headers = Object.keys(req.headers)

    if(headers.includes("authorization")){

        // cek apakah token kosong atau tidak
        const token = req.headers['authorization'].split(" ")
        
        if(token.length > 0){

            // cek apakah token valid atau tidak
            jwt.verify(token[1], process.env.JWT_KEY, (err, decoded) => {

                if(err){

                    // jika token tidak valid kirimkan pesan kesalahan
                    res.status(403).json({
                        status: 403,
                        pesan: "Token tidak valid"
                    })

                }else{

                    // set user
                    res.locals.user_id = decoded.id

                    // jika token valid maka lanjutkan request ke tujuan
                    next()
                }
            })

        }else{

            // jika token kosong maka kirimkan pesan kesalahan
            res.status(403).json({
                status: 403,
                pesan: "Token tidak boleh kosong"
            })
        }

    }else{

        // jika token tidak dikirimkan kirimkan pesan kesalahan
        res.status(403).json({
            status: 403,
            pesan: "Membutuhkan header authorization"
        })
    }
}