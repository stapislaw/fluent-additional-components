import { IStackStyles } from "@fluentui/react";

export interface IPropertyGridProps {
  compact?: boolean | undefined;
  items: any[][];
  styles?: IStackStyles | undefined;
  onChange?: (name: string, value: any) => void;
}
