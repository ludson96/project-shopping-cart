require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testanto se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  })

  it('Testanto se a função fetchItem com o argumento "MLB1615760527", se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled()
  })

  it('Testanto se ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Testanto se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  })

  it('Testanto se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'))
  })
});
