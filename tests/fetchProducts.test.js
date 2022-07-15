require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testando se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function')
  })

  it('Testando se ao executar a função fetchProducts com o argumento \'computador\' verificar se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })

  it('Testando Se ao chamar a função fetchProducts com o argumento \'computador\', a função fetch utiliza o endpoint', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })

  it('Testando se o retorno da função fetchProducts com o argumento \'computador\' é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  })

  it('Testando se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'))
  })
});
