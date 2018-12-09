export class Produto {
  id: number;
  nome: string;

  categoriaId: number;
  categoria: Categoria;

  materialId: number;
  material: Material;

  acabamentoId: number;
  acabamentos: Acabamento[];

  dimensoesId: number;
  dimensoes: Dimensoes;

  restricoes: number[];
  produtosFilho: number[];
}

export class Dimensoes {
  id: number;
  dimAltura: string;
  dimLargura: string;
  dimProfundidade: string;
}

export class Categoria {
  id: number;
  categoriaPaiId: number;
  descricao: string;
}

export class Material {
  id: number;
  descricao: string;
  acabamentos: number[];
};

export class Acabamento {
  id: number;
  descricao: string;
}