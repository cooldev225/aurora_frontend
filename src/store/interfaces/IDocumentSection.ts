import IDocumentAutoText from "./IDocumentAutoText";

export default interface IDocumentSection {
  id: number;
  title: string;
  free_text_default: string;
  auto_texts: Array<IDocumentAutoText>;
}
