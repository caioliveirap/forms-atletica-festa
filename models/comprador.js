import mongoose from 'mongoose'
import ms from 'ms'
import moment from 'moment'

const compradorSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  nome: {
    type: String,
  },
  atletica_coracao: {
    type: String,
  },
  celular: {
    type: String,
  },
  rg: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: moment().add(2, 'minutes').toDate(),
  },
})

// Expire Documents at a Specific Clock Time
compradorSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

const Compradores = mongoose.models.Comprador || mongoose.model('Comprador', compradorSchema)

export default Compradores
