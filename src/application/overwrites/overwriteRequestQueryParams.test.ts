import { getPostmanMappedOperation } from '../../../__tests__/testUtils/getPostmanMappedOperation'
import { overwriteRequestQueryParams } from '../../application'

describe('overwriteRequestQueryParams', () => {
  it('should overwrite the request query param', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: 'foo'
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should disable the request query param', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        disable: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should enable the request query param', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        disable: false
      }
    ]
    const pmOperation = await getPostmanMappedOperation()

    const queryParams = pmOperation.item.request.url.query.all()
    const firstQueryParamKey = queryParams[0]
    firstQueryParamKey.disabled = true

    // Set the updated query parameters in the request
    pmOperation.item.request.url.query.clear()
    pmOperation.item.request.url.query.add(firstQueryParamKey)

    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should append the request query param when overwrite is false', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: 'foo',
        overwrite: false
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should append the request query param when overwrite is true', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: 'foo',
        overwrite: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('overwrite overwrite the request query param with an empty when overwrite is true', async () => {
    const overwriteValues = [
      {
        key: 'id',
        value: '',
        overwrite: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should remove to the query param when remove is true', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        remove: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should not remove any the request query param, when a absent key', async () => {
    const overwriteValues = [
      {
        key: 'fake-key',
        remove: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should not insert the query param, if key found', async () => {
    const overwriteValues = [
      {
        key: 'id',
        value: 'foo-bar-baz',
        insert: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should insert the query param variable, if key not found', async () => {
    const overwriteValues = [
      {
        key: 'add-a-query-param',
        value: 'foo-bar-baz'
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should insert the query param variable with true insert option, if key not found', async () => {
    const overwriteValues = [
      {
        key: 'add-a-query-param',
        value: 'foo-bar-baz',
        insert: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should skip the query param variable with false insert option, if key not found', async () => {
    const overwriteValues = [
      {
        key: 'add-a-query-param',
        value: 'foo-bar-baz',
        insert: false
      }
    ]

    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should insert the query param variable with description, if key not found', async () => {
    const overwriteValues = [
      {
        key: 'add-a-query-param',
        value: 'foo-bar-baz',
        description: 'Additional query param'
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should overwrite the query param variable with a blank value', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: '',
        overwrite: true
      }
    ]

    const pmOperation = await getPostmanMappedOperation()
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should overwrite the query param variable with a null value', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: null,
        overwrite: true
      }
    ]
    const pmOperation = await getPostmanMappedOperation()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should overwrite the query param number variable with string value', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: -1,
        overwrite: true
      }
    ]

    const pmOperation = await getPostmanMappedOperation()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })

  it('should overwrite the query param boolean variable with string value', async () => {
    const overwriteValues = [
      {
        key: 'raw',
        value: false,
        overwrite: true
      }
    ]

    const pmOperation = await getPostmanMappedOperation()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = overwriteRequestQueryParams(overwriteValues, pmOperation)
    expect(result.item.request.url.query).toMatchSnapshot()
  })
})
