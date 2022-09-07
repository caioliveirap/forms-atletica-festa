import connectMongo from '../../lib/utils/connectMongo'
import Compradores from '../../models/comprador'
import ms from 'ms'
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addJob(req, res) {
  const db = await connectMongo()

  const save = await Compradores.create({
    ...req.body,
    status: 'pending',
  })
  console.log(save)

  let preference = {
    items: [
      {
        title: 'Ingresso Atlética - Lote 1',
        unit_price: 50,
        quantity: 1,
        currency_id: "BRL"
      }
    ],
    payer: {
      id: save.id,
      name: req.body.nome,
      email: req.body.email,
      identification: {
        type: "RG",
        number: req.body.rg
      }
    },
    metadata: save,
    back_urls: {
      success: process.env.CURRENT_URL,
      pending: process.env.CURRENT_URL,
      failure: process.env.CURRENT_URL
    },
    "auto_return": "approved"
  };

  const mercadoPagoResponse = await mercadopago.preferences.create(preference)
    .then(async function (response) {
      global.id = response.body.id;
      return await response
    }).catch(function (error) {
      console.log(error);
    });



  return res.status(200).json(mercadoPagoResponse)

}
