import connectMongo from '../../lib/utils/connectMongo'
import Compradores from '../../models/comprador'
import ms from 'ms'
const mercadopago = require ('mercadopago');
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addJob(req, res) {
    const db = await connectMongo()

    let preference = {
      items: [
        {
          title: 'Meu produto',
          unit_price: 50,
          quantity: 1,
        }
      ]
    };
    
    const mercadoPagoResponse = await mercadopago.preferences.create(preference)
    .then(async function(response){
      global.id = response.body.id;
      return await response
    }).catch(function(error){
      console.log(error);
    });

    return res.status(200).json(mercadoPagoResponse)

    // const job = await Compradores.create({
    //     ...req.body,
    //     status: 'pending',
    //     expireAt: Date.now() + ms('2m'),
    //   })
    // console.log(job)
    // return(job.json())
}
