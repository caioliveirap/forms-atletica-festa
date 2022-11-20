// import connectMongo from '../../lib/utils/connectMongo'
// import Compradores from '../../models/comprador'
// import ms from 'ms'
// const mercadopago = require ('mercadopago');
// mercadopago.configure({
//   access_token: "TEST-715951337777038-090614-54e1f4c502970a623ed89b7b527c010e-273833247"
// });
import connectMongo from '../../lib/utils/connectMongo'
import Compradores from '../../models/comprador'
import axios from 'axios'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addJob(req, res) {
    try {
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${req.body.data.id}`,
    {
        headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        }
    })

    if(response.data.status == "approved") {
        const db = await connectMongo()
        const up = await Compradores.findOneAndUpdate({_id: response.data.metadata._id}, {...response.data.metadata, status: "approved"}).exec()
    }
    console.log(await response.data)
    } catch (error) {
        
    }
    return res.status(200).json({})
}
