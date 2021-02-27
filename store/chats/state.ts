export interface Chat {
  id: string;
  title: string | null;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  typeId: string;
}

export interface ChatType {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface State {
  all: Chat[];
}

export default (): State => ({
  all: [],
});
