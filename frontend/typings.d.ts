

export type book = {
        _id:string
      name: string,
      author: string,
      description: string,
      price: number | any,
      available: boolean|any ,
      photo: string,
      category: string,
      ebook: string,
}


export type bookProps = {
    params:{
        bookId:string
    }
}
