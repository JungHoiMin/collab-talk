export interface CollabTableHeader {
  key: string;
  title?: string;
  width?: number;
  callRenderer?(): HTMLElement;
}

export interface CallabTableRow {
  key: string;
  label?: string;
}

export type CallabTableData = CallabTableRow[];
