export class Item {
    _id: any;
    idProduto: number;
    idMaterial: number;
    idCategoria: number;
    idAcabamentoList: number[];
    listaItens: string[];
    dimensoes: ItemDim;
    quantidade: number;
}

export class ItemDim {
    largura: number;
    altura: number;
    profundidade: number;
};