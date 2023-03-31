export interface Usecase {
  execute(...args: any): Promise<any>;
}
