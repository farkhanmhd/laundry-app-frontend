import type { SidebarItem } from '@/component-types';
import { MapItems } from '@/lib/utils';
import { SheetLink } from './sheet-link';

interface Props {
  items: SidebarItem[];
}

export function SheetLinks({ items }: Props) {
  return (
    <ul className="flex flex-col">
      <MapItems
        of={items}
        render={(item, index) => (
          <SheetLink
            item={item}
            key={`${item.title.split(' ').join('')}-${index}`}
          />
        )}
      />
    </ul>
  );
}
