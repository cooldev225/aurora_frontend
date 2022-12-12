import IDocumentAutoText from "./IDocumentAutoText";

export default interface IDocumentSection {
  id: number;
  title: string;
  free_text_default: string;
  use_autotext: boolean;
  auto_texts: Array<IDocumentAutoText>;
}
