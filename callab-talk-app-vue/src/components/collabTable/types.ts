export interface CollabTableHeader {
  key: string;
  title?: string;
  width: number;
  callRenderer?(): HTMLElement;
}

export interface CallabTableData {
  key: string;
  label?: string;
}
