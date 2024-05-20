export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const TodoFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Notiztitel muss angegeben werden'),
  new ErrorMessage('id', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
  new ErrorMessage('id', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
  new ErrorMessage('users', 'required', 'Es muss ein User angegeben werden'),
];
