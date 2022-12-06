import IDocumentSection from "./IDocumentSection";

export default interface IDocumentTemplate {
  id: number;
  title: string;
  type: string;
  use_autotext: boolean;
  sections: Array<IDocumentSection>;
}
