import React from "react";
import { Formik } from 'formik';
import axios from "axios"
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2'

export default function Index() {

  const sendPayment = async (comprador) => {

    const validator = validate(comprador)
    if(!validator.status) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validator.error,
      })
      return
    }
    const response = await axios.post('/api/add',
      comprador
    );

    const mp = new MercadoPago(process.env.MERCADO_PAGO_PUBLIC_KEY, {
      locale: 'pt-BR'
    });

    mp.checkout({
      preference: {
        id: response.data.response.id
      },
      autoOpen: true
    });
  }

  const validate = (values) => {
    const errors = [];
    if (!values.email) {
      return {status: false, error: 'Por favor informe o E-Mail!'}
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      return {status: false, error: 'Endereço de E-mail inválido!'}
    }

    if (!values.nome) {
      return {status: false, error: 'Por favor informe o nome!'}
    } 

    if (!values.rg) {
      return {status: false, error: 'Por favor insira o RG'}
    } 
    
    if (!values.celular) {
      return {status: false, error: 'Por favor insira o número de celular'}
    } else if (
      !/^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/.test(values.celular)
    ) {
      return {status: false, error: 'Celular inválido!'}
    }

    return {status: true}
  }


  return (
    <>
      <section className="flex justify-center items-center w-full h-screen">
        <div className="container mx-auto px-4 h-full">
          <script src="https://sdk.mercadopago.com/js/v2"></script>

          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10">
                  <Formik
                    initialValues={{}}
                    validate={values => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = 'Required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = 'Endereço de E-mail inválido!';
                      }
                      return errors;
                    }}
                    onSubmit={(values) => {
                      sendPayment(values)
                    }}
                  >
                    {({ isSubmitting, handleSubmit, handleChange, values }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email para recebimento do ingresso"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            name="nome"
                            value={values.nome}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Nome Completo"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="RG"
                          >
                            RG
                          </label>
                          <InputMask
                            mask="99.999.999-99"
                            value={values.rg}
                            name="rg"
                            onChange={handleChange}
                            placeholder="99.999.999-99"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                          </InputMask>
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="Celular"
                          >
                            Celular
                          </label>
                          <InputMask
                            mask="(99) 99999-9999"
                            name="celular"
                            value={values.celular}
                            onChange={handleChange}
                            placeholder="DDD + Celular"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          >
                          </InputMask>
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="Celular"
                          >
                            Qual sua atlética de coração?
                          </label>
                          <input
                            type="text"
                            name="atletica_coracao"
                            value={values.atletica_coracao}
                            onChange={handleChange}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Corudjango"
                          />
                        </div>

                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => sendPayment(values)}
                          >
                            Ir para pagamento
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
