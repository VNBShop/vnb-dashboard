export type DataResponse<TData> = {
  data: {
    metadata: TData & { message?: string }
    success: boolean
  }
}

export type DataError<TData> = {
  response: {
    data: {
      metadata: TData & { message?: string }
      success: boolean
    }
  }
}
