import DialogList from '@components/dialogs/create-dialog/list/list';

export const DialogListEmpty: React.FC = () => {
  return <div>The list is empty</div>;
};

export type ListFunc = () => any[];

export interface DialogListWrapperProps {
  loading: boolean;
  error: boolean;
  items: any[] | ListFunc;
  onActiveItemChanged?: (index: string) => void;
}

export const DialogListWrapper: React.FC<DialogListWrapperProps> = ({
  loading,
  error,
  items,
  onActiveItemChanged = (index: string) => {},
}) => {
  if (loading || error) return <DialogList items={[]} skeleton />;

  const data = typeof items === 'function' ? items() : items;

  if (!data.length) return <DialogListEmpty />;

  return <DialogList items={data} onActiveItemChanged={onActiveItemChanged} />;
};

export default DialogListWrapper;
